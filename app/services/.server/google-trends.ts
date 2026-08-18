import { XMLParser } from 'fast-xml-parser'
import { ContentItem } from '~/models/.server/content-item'
import { TrendSource } from '~/models/.server/trend-source'

export const GOOGLE_TRENDS_RSS = 'https://trends.google.com/trending/rss?geo=JP'
export const GOOGLE_TRENDS_PAGE = 'https://trends.google.com/trending?geo=JP&hl=ja'

const unsafe = /地震|津波|台風|豪雨|洪水|噴火|災害|事故|死亡|死去|訃報|殺人|逮捕|容疑|事件|火災|爆発|行方不明|食中毒|感染|病気|選挙|首相|大臣|政党|国会|戦争|株価|為替|仮想通貨|暗号資産|暴落|炎上|不倫|離婚|借金|覚醒剤|麻薬|中傷/i
const categories = [
  ['アニメ', /アニメ|声優|劇場版|放送|配信|主題歌/],
  ['映画', /映画|シネマ|興行|上映|監督/],
  ['音楽', /歌手|楽曲|新曲|アルバム|ライブ|ツアー|バンド|シンガー|ラッパー|CDTV/],
  ['アイドル', /アイドル|デビュー|メンバー|センター|K-?POP|ボーイズグループ|ガールズグループ/],
  ['俳優', /俳優|女優|出演|主演/],
  ['ゲーム', /ゲーム|Switch|PlayStation|Xbox|Steam|アップデート|スト6|ポケモン/],
  ['漫画', /漫画|マンガ|コミック|連載|単行本/],
  ['ドラマ', /ドラマ|大河|朝ドラ|最終回/],
] as const

export async function syncGoogleTrends() {
  let fetchedAt = new Date()
  try {
    let response = await fetch(GOOGLE_TRENDS_RSS, { headers: { 'user-agent': 'NumaCertificate/1.0 (+RSS reader)' }, signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error(`Google Trends RSS returned ${response.status}`)
    let xml = await response.text()
    let parsed = new XMLParser({ ignoreAttributes: false, removeNSPrefix: false }).parse(xml)
    let entries = toArray(parsed?.rss?.channel?.item)
    for (let entry of entries) await saveEntry(entry, fetchedAt)
    await TrendSource.create({ public_id: crypto.randomUUID(), source: 'google_trends', region: 'JP', source_url: GOOGLE_TRENDS_RSS, status: 'success', item_count: entries.length, fetched_at: fetchedAt, created_at: fetchedAt, updated_at: fetchedAt, bag: { copyright: parsed?.rss?.channel?.copyright } })
    return { ok: true, count: entries.length }
  } catch (error) {
    await TrendSource.create({ public_id: crypto.randomUUID(), source: 'google_trends', region: 'JP', source_url: GOOGLE_TRENDS_RSS, status: 'error', item_count: 0, error: error instanceof Error ? error.message : String(error), fetched_at: fetchedAt, created_at: fetchedAt, updated_at: fetchedAt })
    throw error
  }
}

async function saveEntry(entry: any, fetchedAt: Date) {
  let name = String(entry.title || '').trim()
  if (!name) return
  let text = [name, entry.description, ...toArray(entry['ht:news_item']).map((item: any) => item['ht:news_item_title'])].filter(Boolean).join(' ')
  let category = categories.find(([, pattern]) => pattern.test(text))?.[0]
  let review_status = unsafe.test(text) ? 'rejected' : category ? 'approved' : 'pending'
  let traffic = String(entry['ht:approx_traffic'] || '')
  await ContentItem.upsert({ public_id: crypto.randomUUID(), name, category, review_status, source: 'google_trends', source_url: GOOGLE_TRENDS_PAGE, source_item_url: entry.link, traffic, trend_score: trafficScore(traffic), fetched_at: fetchedAt, last_seen_at: fetchedAt, published_at: review_status === 'approved' ? fetchedAt : null, created_at: fetchedAt, updated_at: fetchedAt, bag: { description: entry.description, picture: entry['ht:picture'], news_titles: toArray(entry['ht:news_item']).map((item: any) => item['ht:news_item_title']).filter(Boolean) } })
}

function trafficScore(value: string) { let number = Number(value.replace(/[^\d]/g, '')) || 0; return value.includes('万') ? number * 10000 : /K/i.test(value) ? number * 1000 : number }
function toArray<T>(value: T | T[] | undefined): T[] { return value ? Array.isArray(value) ? value : [value] : [] }
