import { useEffect, useRef, useState } from 'react'
import { AwardIcon, BarChart3Icon, CheckIcon, ChevronRightIcon, DownloadIcon, FlameIcon, HomeIcon, PlusIcon, RotateCcwIcon, SettingsIcon, Share2Icon, SparklesIcon, XIcon } from 'lucide-react'

const KEY = 'numaochi-data-v1'
const works = [
  { name: '呪術廻戦', category: 'アニメ', emoji: '🌀', color: 'from-violet-400 to-fuchsia-500' },
  { name: '薬屋のひとりごと', category: 'アニメ', emoji: '🌿', color: 'from-emerald-400 to-teal-500' },
  { name: 'Ado', category: '音楽', emoji: '🎵', color: 'from-rose-400 to-pink-500' },
  { name: 'XG', category: 'アイドル', emoji: '✨', color: 'from-cyan-400 to-blue-500' },
  { name: '推しの子', category: 'アニメ', emoji: '🌙', color: 'from-amber-400 to-orange-500' },
  { name: '葬送のフリーレン', category: 'アニメ', emoji: '🪄', color: 'from-cyan-400 to-indigo-500' },
  { name: 'Mrs. GREEN APPLE', category: '音楽', emoji: '🍏', color: 'from-lime-400 to-emerald-500' },
  { name: 'BE:FIRST', category: 'アイドル', emoji: '🕺', color: 'from-blue-400 to-violet-500' },
  { name: 'Number_i', category: 'アイドル', emoji: '⚡', color: 'from-red-400 to-orange-500' },
  { name: 'King Gnu', category: '音楽', emoji: '👑', color: 'from-slate-500 to-indigo-600' },
  { name: 'SPY×FAMILY', category: 'アニメ', emoji: '🥜', color: 'from-pink-400 to-red-400' },
  { name: 'ブルーロック', category: 'アニメ', emoji: '⚽', color: 'from-blue-400 to-cyan-500' },
  { name: '原神', category: 'ゲーム', emoji: '🗺️', color: 'from-sky-400 to-violet-500' },
  { name: 'Pokémon TCG Pocket', category: 'ゲーム', emoji: '🃏', color: 'from-yellow-400 to-orange-500' },
  { name: 'ストリートファイター6', category: 'ゲーム', emoji: '🥊', color: 'from-orange-400 to-red-500' },
  { name: '正体', category: '映画', emoji: '🎬', color: 'from-slate-500 to-blue-600' },
  { name: 'ラストマイル', category: '映画', emoji: '📦', color: 'from-amber-400 to-red-500' },
  { name: 'timelesz', category: 'アイドル', emoji: '⏳', color: 'from-rose-400 to-violet-500' },
  { name: 'Creepy Nuts', category: '音楽', emoji: '🎧', color: 'from-purple-400 to-slate-600' },
  { name: '地面師たち', category: 'ドラマ', emoji: '🏙️', color: 'from-stone-500 to-amber-700' },
  { name: 'ダンダダン', category: 'アニメ', emoji: '👽', color: 'from-lime-400 to-purple-500' },
  { name: '怪獣8号', category: 'アニメ', emoji: '🦖', color: 'from-emerald-500 to-slate-600' },
  { name: 'チェンソーマン', category: 'アニメ', emoji: '🪚', color: 'from-orange-500 to-red-600' },
  { name: 'ハイキュー!!', category: 'アニメ', emoji: '🏐', color: 'from-orange-400 to-slate-600' },
  { name: '僕のヒーローアカデミア', category: 'アニメ', emoji: '💥', color: 'from-green-400 to-blue-500' },
  { name: '鬼滅の刃', category: 'アニメ', emoji: '⚔️', color: 'from-emerald-500 to-red-500' },
  { name: '忘却バッテリー', category: 'アニメ', emoji: '⚾', color: 'from-sky-400 to-blue-600' },
  { name: 'チ。―地球の運動について―', category: 'アニメ', emoji: '🌍', color: 'from-indigo-500 to-slate-700' },
  { name: 'ゼルダの伝説', category: 'ゲーム', emoji: '🗡️', color: 'from-emerald-400 to-yellow-500' },
  { name: 'スプラトゥーン3', category: 'ゲーム', emoji: '🦑', color: 'from-fuchsia-400 to-lime-500' },
  { name: 'あつまれ どうぶつの森', category: 'ゲーム', emoji: '🏝️', color: 'from-green-400 to-cyan-500' },
  { name: '崩壊：スターレイル', category: 'ゲーム', emoji: '🚂', color: 'from-blue-500 to-purple-600' },
  { name: 'モンスターハンターワイルズ', category: 'ゲーム', emoji: '🐲', color: 'from-amber-500 to-stone-600' },
  { name: 'マリオカート', category: 'ゲーム', emoji: '🏎️', color: 'from-red-500 to-blue-500' },
  { name: 'YOASOBI', category: '音楽', emoji: '🌃', color: 'from-blue-500 to-pink-500' },
  { name: '藤井 風', category: '音楽', emoji: '🍃', color: 'from-emerald-400 to-sky-500' },
  { name: 'Vaundy', category: '音楽', emoji: '🎸', color: 'from-orange-400 to-violet-500' },
  { name: '米津玄師', category: '音楽', emoji: '🫧', color: 'from-cyan-400 to-indigo-500' },
  { name: 'Official髭男dism', category: '音楽', emoji: '🎹', color: 'from-yellow-400 to-red-500' },
  { name: 'サカナクション', category: '音楽', emoji: '🐟', color: 'from-blue-400 to-slate-600' },
  { name: 'Snow Man', category: 'アイドル', emoji: '❄️', color: 'from-sky-300 to-blue-500' },
  { name: 'SixTONES', category: 'アイドル', emoji: '💎', color: 'from-indigo-400 to-violet-600' },
  { name: 'NiziU', category: 'アイドル', emoji: '🌈', color: 'from-pink-400 to-yellow-400' },
  { name: 'LE SSERAFIM', category: 'アイドル', emoji: '🪽', color: 'from-rose-400 to-slate-500' },
  { name: 'NewJeans', category: 'アイドル', emoji: '🐰', color: 'from-cyan-300 to-pink-400' },
  { name: 'aespa', category: 'アイドル', emoji: '🪐', color: 'from-purple-500 to-cyan-400' },
  { name: 'ゴールデンカムイ', category: '映画', emoji: '🏔️', color: 'from-amber-500 to-slate-600' },
  { name: 'キングダム', category: '映画', emoji: '🏹', color: 'from-red-500 to-amber-600' },
  { name: '侍タイムスリッパー', category: '映画', emoji: '🎞️', color: 'from-stone-500 to-orange-500' },
  { name: 'はたらく細胞', category: '映画', emoji: '🩸', color: 'from-red-400 to-pink-500' },
  { name: 'VIVANT', category: 'ドラマ', emoji: '🐪', color: 'from-amber-500 to-orange-700' },
  { name: '不適切にもほどがある！', category: 'ドラマ', emoji: '📺', color: 'from-fuchsia-400 to-indigo-500' },
  { name: 'アンナチュラル', category: 'ドラマ', emoji: '🔬', color: 'from-cyan-500 to-slate-600' },
  { name: 'MIU404', category: 'ドラマ', emoji: '🚔', color: 'from-blue-500 to-yellow-400' },
  { name: 'ブラッシュアップライフ', category: 'ドラマ', emoji: '🕊️', color: 'from-pink-400 to-sky-500' },
  { name: 'Netflix ボーイフレンド', category: 'リアリティ', emoji: '☕', color: 'from-green-400 to-amber-500' },
  { name: 'QuizKnock', category: 'YouTube', emoji: '💡', color: 'from-red-400 to-blue-500' },
  { name: 'オモコロチャンネル', category: 'YouTube', emoji: '🤹', color: 'from-yellow-400 to-red-500' },
  { name: 'にじさんじ', category: 'VTuber', emoji: '🎨', color: 'from-red-400 to-indigo-500' },
  { name: 'ホロライブ', category: 'VTuber', emoji: '▶️', color: 'from-sky-400 to-blue-600' },
]
const answers = [
  { id: 'not_interested', label: '興味ない', icon: '😶', tone: 'border-slate-200 bg-white' },
  { id: 'not_trendy', label: '流行りには乗りたくない', icon: '🙅', tone: 'border-violet-200 bg-violet-50' },
  { id: 'curious', label: 'ちょっと気になる', icon: '👀', tone: 'border-amber-200 bg-amber-50' },
  { id: 'already_like', label: 'すでに好き', icon: '💘', tone: 'border-pink-200 bg-pink-50' },
]
const feed = [
  { name: 'Ado', before: '「声が強すぎて耳が痛い」', now: 'ライブ映像を何度も見返す', days: 12, emoji: '🎵', color: 'bg-pink-100' },
  { name: '薬屋のひとりごと', before: '「長編アニメは無理」', now: '1日で全話を追う', days: 19, emoji: '🌿', color: 'bg-emerald-100' },
  { name: 'XG', before: '「人気を知ってるだけで興味なし」', now: 'MVとメンバー愛を深掘りする', days: 27, emoji: '✨', color: 'bg-cyan-100' },
]
const sample: Data = {
  predictions: [
    { id: 'p1', name: '薬屋のひとりごと', answer: 'not_trendy', date: '2026-04-12T10:00:00.000Z' },
    { id: 'p2', name: '薬屋のひとりごと', answer: 'not_interested', date: '2026-05-03T10:00:00.000Z' },
    { id: 'p3', name: 'Ado', answer: 'curious', date: '2026-06-18T10:00:00.000Z' },
  ],
  reports: [{ id: 'r1', name: '薬屋のひとりごと', level: 5, trigger: '雑談で「この作品面白い」って言われて、数日後に全話完走してた', date: '2026-07-02T10:00:00.000Z' }],
}

export default function Page() {
  let [tab, setTab] = useState<Tab>('home')
  let [data, setData] = useState<Data | null>(null)
  let [settings, setSettings] = useState(false)
  let [toast, setToast] = useState('')
  useEffect(() => { let value = localStorage.getItem(KEY); setData(value ? JSON.parse(value) : sample) }, [])
  useEffect(() => { if (data) localStorage.setItem(KEY, JSON.stringify(data)) }, [data])
  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(''), 2200) }
  function reset() { setData(sample); setSettings(false); setTab('home'); notify('サンプルデータに戻しました') }
  if (!data) return <div className="min-h-screen bg-[#fff9fc]" />
  let pages = {
    home: <Home go={setTab} />,
    predict: <Predict data={data} save={setData} notify={notify} />,
    report: <ReportPage data={data} save={setData} notify={notify} go={setTab} />,
    analysis: <Analysis data={data} go={setTab} />,
    certificate: <Certificate data={data} notify={notify} />,
  }
  return <div className="min-h-screen bg-[#fff9fc] text-slate-800"><div className="mx-auto min-h-screen max-w-md bg-[#fff9fc] pb-24 shadow-2xl shadow-pink-100/60">
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-pink-100 bg-[#fff9fc]/90 px-5 backdrop-blur-xl"><button onClick={() => setTab('home')} className="flex items-center gap-2"><span className="flex size-9 -rotate-6 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white shadow-md"><FlameIcon className="size-5" fill="currentColor" /></span><span className="text-lg font-black">沼落ち認定証</span></button><button aria-label="設定" onClick={() => setSettings(true)} className="btn btn-ghost btn-circle btn-sm"><SettingsIcon className="size-5" /></button></header>
    <main>{pages[tab]}</main>
    <nav className="fixed bottom-0 left-1/2 z-40 grid h-[76px] w-full max-w-md -translate-x-1/2 grid-cols-5 border-t border-pink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"><Nav active={tab === 'home'} label="ホーム" icon={HomeIcon} go={() => setTab('home')} /><Nav active={tab === 'predict'} label="予想" icon={SparklesIcon} go={() => setTab('predict')} /><Nav active={tab === 'report'} label="ハマった" icon={PlusIcon} go={() => setTab('report')} main /><Nav active={tab === 'analysis'} label="分析" icon={BarChart3Icon} go={() => setTab('analysis')} /><Nav active={tab === 'certificate'} label="認定証" icon={AwardIcon} go={() => setTab('certificate')} /></nav>
    {settings && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/30 p-3" onClick={() => setSettings(false)}><div className="w-full max-w-md rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()}><div className="flex justify-between"><h2 className="text-xl font-black">設定</h2><button onClick={() => setSettings(false)}><XIcon /></button></div><p className="mt-3 text-sm leading-6 text-slate-500">データはこのブラウザの中だけに保存され、外部には送信されません。</p><button onClick={reset} className="btn mt-6 w-full rounded-2xl border-rose-200 bg-rose-50 text-rose-600"><RotateCcwIcon className="size-4" />サンプルデータに戻す</button></div></div>}
    {toast && <div className="toast toast-center toast-top z-[60] mt-14"><div className="alert rounded-full bg-slate-900 px-5 py-3 text-sm text-white"><CheckIcon className="size-4" />{toast}</div></div>}
  </div></div>
}

function Home({ go }: { go: (tab: Tab) => void }) {
  return <><section className="px-5 pb-7 pt-8"><div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff0f7] via-[#f8efff] to-[#fff8d9] p-6 ring-1 ring-pink-100"><div className="absolute -right-4 -top-5 text-7xl opacity-20">🫠</div><span className="badge border-0 bg-white/80 text-[11px] font-bold text-pink-600">その発言、保存しました</span><h1 className="mt-4 text-3xl font-black leading-tight">あの日の「ハマらない」を<br /><span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">笑える証拠</span>にしよう。</h1><p className="mt-4 text-sm leading-6 text-slate-600">冷めていた自分も、いまの熱狂も。ぜんぶ並べて愛でる沼落ち記録。</p><button onClick={() => go('predict')} className="btn mt-5 rounded-full border-0 bg-slate-900 text-white">今日の予想をする <ChevronRightIcon className="size-4" /></button></div></section><section className="px-5"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold text-pink-500">MINNA NO NUMA</p><h2 className="mt-1 text-xl font-black">みんなのハマり事例</h2></div><span className="text-xs text-slate-400">※サンプル</span></div><div className="space-y-4">{feed.map((item) => <article key={item.name} className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><span className={`flex size-11 items-center justify-center rounded-2xl text-xl ${item.color}`}>{item.emoji}</span><div><h3 className="font-black">{item.name}</h3><p className="text-xs text-slate-400">沼落ち観測レポート</p></div><span className="ml-auto rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-amber-700">{item.days}日</span></div><div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><div className="rounded-2xl bg-slate-50 p-3"><small className="font-black text-slate-400">BEFORE</small><p className="mt-2 text-sm font-bold">{item.before}</p></div><ChevronRightIcon className="size-4 text-pink-300" /><div className="rounded-2xl bg-pink-50 p-3"><small className="font-black text-pink-400">NOW</small><p className="mt-2 text-sm font-bold">{item.now}</p></div></div></article>)}</div></section></>
}

function Predict({ data, save, notify }: PageProps) {
  let [today, setToday] = useState(dayKey())
  let [count, setCount] = useState(6)
  let [remote, setRemote] = useState<Work[]>([])
  let [cursor, setCursor] = useState<string | null | undefined>(undefined)
  let [source, setSource] = useState<'loading' | 'google' | 'local'>('loading')
  let more = useRef<HTMLDivElement>(null)
  let daily = remote.length ? remote : dailyWorks(today)
  async function loadTrends(next?: string | null) { try { let response = await fetch(`/api/trends${next ? `?cursor=${encodeURIComponent(next)}` : ''}`); if (!response.ok) throw new Error(); let result = await response.json(); let incoming = result.items.map(trendWork); if (!next && !incoming.length) { setSource('local'); setCursor(null); return }; setRemote((current) => [...new Map([...current, ...incoming].map((item) => [item.name, item])).values()]); setCursor(result.next_cursor); setSource('google') } catch { setSource('local'); setCursor(null) } }
  useEffect(() => { loadTrends() }, [])
  useEffect(() => { if (source === 'google' && cursor && count >= daily.length - 5) loadTrends(cursor) }, [count, cursor, daily.length, source])
  useEffect(() => { let now = new Date(), midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); let timer = window.setTimeout(() => { setToday(dayKey()); setCount(6) }, +midnight - +now + 100); return () => window.clearTimeout(timer) }, [today])
  useEffect(() => { if (!more.current || count >= daily.length) return; let observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setCount((value) => Math.min(value + 5, daily.length)) }, { rootMargin: '300px' }); observer.observe(more.current); return () => observer.disconnect() }, [count, daily.length])
  function choose(work: Work, answer: string) { save({ ...data, predictions: [...data.predictions, { id: crypto.randomUUID(), name: work.name, answer, date: new Date().toISOString() }] }); notify('回答を記録しました') }
  return <section className="px-5 py-7"><p className="text-xs font-black tracking-widest text-violet-500">DAILY TREND FEED</p><h1 className="mt-2 text-2xl font-black">これ、そのうち好きになりそう？</h1><div className="mt-3 flex items-center justify-between rounded-2xl bg-violet-50 px-4 py-3"><div><p className="text-xs font-black text-violet-600">{source === 'google' ? 'Google Trendsをもとにした話題の候補' : '今日の流行り候補'}</p><p className="mt-1 text-[11px] text-slate-500">{source === 'google' ? '日本の急上昇検索・15分ごとに取得' : '取得できないため保存済み候補を表示中'}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-500">{shortDay(today)}</span></div>{source === 'google' && <a href="https://trends.google.com/trending?geo=JP&hl=ja" target="_blank" rel="noreferrer" className="mt-2 block text-right text-[11px] font-bold text-violet-500">出典：Google Trends ↗</a>}<div className="mt-6 space-y-6">{daily.slice(0, count).map((work) => { let previous = data.predictions.filter((item) => item.name === work.name).at(-1); return <article key={`${today}-${work.name}`} className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-lg shadow-pink-100/50"><div className={`flex h-52 flex-col items-center justify-center bg-gradient-to-br ${work.color} text-white`}><span className="text-6xl">{work.emoji}</span><span className="mt-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{work.category}</span><h2 className="mt-2 text-2xl font-black">{work.name}</h2></div><div className="p-4">{previous && <p className="mb-3 text-xs text-slate-400">前回の回答：<b className="text-slate-600">{label(previous.answer)}</b></p>}<div className="grid grid-cols-2 gap-2">{answers.map((item) => <button key={item.id} onClick={() => choose(work, item.id)} className={`min-h-12 rounded-xl border px-2 text-xs font-bold active:scale-[.97] ${previous?.answer === item.id ? 'border-pink-400 bg-pink-100 text-pink-600 ring-2 ring-pink-100' : item.tone}`}><span className="mr-1">{item.icon}</span>{item.label}</button>)}</div></div></article> })}</div><div ref={more} className="flex h-28 items-center justify-center text-sm font-bold text-violet-400">{count < daily.length ? <><span className="loading loading-dots loading-md" /><span className="ml-2">次の流行りを探しています</span></> : <div className="text-center"><p className="text-lg">🎉</p><p className="mt-2 text-slate-500">今日の候補はここまで</p><p className="mt-1 text-xs font-normal text-slate-400">明日0:00に新しい順番で更新します</p></div>}</div></section>
}

function ReportPage({ data, save, notify, go }: PageProps & { go: (tab: Tab) => void }) {
  let names = [...new Set([...data.predictions.map((item) => item.name), ...works.map((item) => item.name)])]
  let [name, setName] = useState(names[0]), [custom, setCustom] = useState(''), [level, setLevel] = useState(4), [trigger, setTrigger] = useState('')
  function submit(event: React.FormEvent) { event.preventDefault(); let target = custom.trim() || name; save({ ...data, reports: [...data.reports, { id: crypto.randomUUID(), name: target, level, trigger: trigger.trim(), date: new Date().toISOString() }] }); notify('沼落ちを認定しました！'); go('analysis') }
  return <section className="px-5 py-7"><div className="rounded-[2rem] bg-gradient-to-br from-pink-500 to-violet-500 p-6 text-white"><span className="text-5xl">🙌</span><h1 className="mt-4 text-3xl font-black">ハマった！</h1><p className="mt-2 text-sm text-white/80">おめでとうございます。潔く報告しましょう。</p></div><form onSubmit={submit} className="mt-6 space-y-6"><Field title="何にハマった？"><select value={name} onChange={(event) => setName(event.target.value)} className="select h-14 w-full rounded-2xl border-pink-100 bg-white">{names.map((item) => <option key={item}>{item}</option>)}</select></Field><Field title="候補にない場合"><input value={custom} onChange={(event) => setCustom(event.target.value)} className="input h-14 w-full rounded-2xl border-pink-100 bg-white" placeholder="作品名・人物名を入力" /></Field><div><div className="mb-3 flex justify-between"><b>現在のハマり度</b><b className="text-pink-500">{level}/5</b></div><div className="flex justify-between rounded-2xl bg-white p-3 ring-1 ring-pink-100">{[1,2,3,4,5].map((value) => <button type="button" key={value} onClick={() => setLevel(value)} className={`flex size-12 items-center justify-center rounded-xl text-2xl ${value <= level ? 'bg-pink-100' : 'bg-slate-50 grayscale opacity-30'}`}>🔥</button>)}</div></div><Field title="きっかけ（任意）"><textarea value={trigger} onChange={(event) => setTrigger(event.target.value)} maxLength={80} className="textarea min-h-28 w-full rounded-2xl border-pink-100 bg-white" placeholder="友だちに薦められた第3話で…" /></Field><button className="btn h-14 w-full rounded-2xl border-0 bg-slate-900 text-white"><FlameIcon />沼落ちを報告する</button></form></section>
}

function Analysis({ data, go }: { data: Data; go: (tab: Tab) => void }) {
  let targets = [...new Set(data.reports.map((item) => item.name))], [name, setName] = useState(targets[0] || '')
  let events = timeline(data, name), report = [...events].reverse().find((item) => item.kind === 'report'), days = events[0] && report ? diff(events[0].date, report.date) : 0
  if (!targets.length) return <section className="px-5 py-7"><h1 className="text-2xl font-black">ハマった流れ</h1><Empty title="まだ沼は観測されていません" body="「ハマった！」から報告すると、ここに流れが現れます。" /></section>
  return <section className="px-5 py-7"><p className="text-xs font-black tracking-widest text-pink-500">NUMA JOURNEY</p><h1 className="mt-2 text-2xl font-black">ハマった流れ</h1><select value={name} onChange={(event) => setName(event.target.value)} className="select mt-5 h-12 w-full rounded-2xl border-pink-100 bg-white font-bold">{targets.map((item) => <option key={item}>{item}</option>)}</select><div className="mt-5 rounded-3xl bg-gradient-to-br from-violet-100 to-pink-100 p-5"><p className="font-bold">あなたは <span className="text-3xl font-black text-pink-500">{days}日</span> かけて<br />静かに沼へ近づいていました。</p><p className="mt-2 text-xs text-slate-500">抵抗もまた、沼落ちの一部です。</p></div><div className="mt-7 pl-2">{events.map((item, index) => <div key={item.id} className="relative flex gap-4 pb-7"><div className={`z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${item.kind === 'report' ? 'bg-pink-500 text-white' : 'bg-white ring-1 ring-pink-200'}`}>{item.kind === 'report' ? <FlameIcon className="size-4" /> : emoji(item.answer)}</div>{index < events.length - 1 && <div className="absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-px bg-pink-200" />}<div><p className="text-xs font-bold text-slate-400">{date(item.date)}</p><p className="mt-1 font-black">{item.kind === 'report' ? `「ハマった！」熱量 ${item.level}/5` : `「${label(item.answer)}」`}</p>{item.kind === 'report' && item.trigger && <p className="mt-2 text-sm text-slate-500">きっかけ：{item.trigger}</p>}</div></div>)}</div><button onClick={() => go('certificate')} className="btn h-14 w-full rounded-2xl border-0 bg-slate-900 text-white"><AwardIcon />認定証を見る</button></section>
}

function Certificate({ data, notify }: { data: Data; notify: (message: string) => void }) {
  let targets = [...new Set(data.reports.map((item) => item.name))], [name, setName] = useState(targets[0] || ''), report = [...data.reports].reverse().find((item) => item.name === name), past = data.predictions.filter((item) => item.name === name), cold = past.find((item) => item.answer === 'not_trendy') || past.find((item) => item.answer === 'not_interested') || past[0], days = cold && report ? diff(cold.date, report.date) : 0
  async function output(share: boolean) { if (!report) return; let blob = await draw(name, cold, report, days), filename = `${name}-沼落ち認定証.png`, file = new File([blob], filename, { type: 'image/png' }); if (share && navigator.share && navigator.canShare?.({ files: [file] })) await navigator.share({ title: '沼落ち認定証', text: `${name}に沼落ちしました！`, files: [file] }); else download(blob, filename); notify(share ? '認定証を用意しました' : '画像を保存しました') }
  if (!targets.length || !report) return <section className="px-5 py-7"><h1 className="text-2xl font-black">沼落ち認定証</h1><Empty title="認定できる沼がありません" body="ハマった報告をすると、共有できる認定証が作られます。" /></section>
  return <section className="px-5 py-7"><p className="text-xs font-black tracking-widest text-violet-500">CERTIFICATE</p><h1 className="mt-2 text-2xl font-black">沼落ち認定証</h1><select value={name} onChange={(event) => setName(event.target.value)} className="select mt-5 h-12 w-full rounded-2xl border-pink-100 bg-white font-bold">{targets.map((item) => <option key={item}>{item}</option>)}</select><div className="relative mt-5 overflow-hidden rounded-[2rem] bg-[#211436] p-3 shadow-2xl"><div className="absolute -right-12 -top-12 size-48 rounded-full bg-pink-500/30 blur-2xl" /><div className="relative rounded-[1.45rem] border border-white/20 p-5 text-white"><div className="text-center"><small className="font-bold tracking-[.25em] text-pink-300">OFFICIAL NUMA CERTIFICATE</small><AwardIcon className="mx-auto mt-4 size-10 text-yellow-300" /><h2 className="mt-2 text-3xl font-black">沼落ち認定証</h2><p className="text-xs text-white/50">華麗なる手のひら返しを称えます</p></div><div className="mt-6 rounded-2xl bg-white/10 p-4 text-center"><small className="text-white/50">認定対象</small><p className="mt-1 text-2xl font-black text-yellow-200">{name}</p></div><div className="mt-4 rounded-2xl bg-black/20 p-4"><small className="font-black tracking-widest text-pink-300">BEFORE · {cold ? date(cold.date) : '記録なし'}</small><p className="mt-2 text-lg font-black">「{cold ? label(cold.answer) : 'まさかハマるとは…'}」</p></div><p className="my-3 text-center text-xs font-bold text-white/50">── {days} DAYS LATER ──</p><div className="rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 p-4"><small className="text-white/70">NOW · {date(report.date)}</small><p className="mt-2 text-lg font-black">ハマり度 {report.level}/5　{'🔥'.repeat(report.level)}</p></div><p className="mt-5 text-center text-sm font-bold">{judge(days, report.level)}</p><p className="mt-5 text-center text-[10px] tracking-widest text-white/30">#沼落ち認定証</p></div></div>{!cold && <p className="mt-3 text-center text-xs text-slate-400">過去の回答がないため、報告日を起点にしています。</p>}<div className="mt-5 grid grid-cols-2 gap-3"><button onClick={() => output(false)} className="btn rounded-2xl bg-white"><DownloadIcon className="size-4" />画像で保存</button><button onClick={() => output(true)} className="btn rounded-2xl border-0 bg-pink-500 text-white"><Share2Icon className="size-4" />共有する</button></div></section>
}

function Nav({ active, label: text, icon: Icon, go, main }: NavProps) { return <button onClick={go} className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${active ? 'text-pink-500' : 'text-slate-400'}`}><span className={main ? '-mt-5 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white shadow-lg' : ''}><Icon className={main ? 'size-6' : 'size-5'} /></span>{text}</button> }
function Field({ title, children }: { title: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-black">{title}</span>{children}</label> }
function Empty({ title, body }: { title: string; body: string }) { return <div className="mt-8 rounded-3xl border border-dashed border-pink-200 bg-white p-8 text-center"><span className="text-5xl">🫧</span><h2 className="mt-4 font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{body}</p></div> }
function label(id: string) { return answers.find((item) => item.id === id)?.label || id }
function emoji(id: string) { return answers.find((item) => item.id === id)?.icon || '•' }
function date(value: string) { return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value)) }
function diff(a: string, b: string) { return Math.max(0, Math.ceil((+new Date(b) - +new Date(a)) / 86400000)) }
function judge(days: number, level: number) { return level === 5 ? '全力で否定していた頃も含め、見事な沼落ちです。' : days > 60 ? 'じっくり熟成された、味わい深い沼落ちです。' : '気づいたときには手遅れ。たいへん良い沼落ちです。' }
function timeline(data: Data, name: string): Event[] { return [...data.predictions.filter((item) => item.name === name).map((item) => ({ ...item, kind: 'prediction' as const })), ...data.reports.filter((item) => item.name === name).map((item) => ({ ...item, kind: 'report' as const }))].sort((a, b) => +new Date(a.date) - +new Date(b.date)) }
async function draw(name: string, cold: Prediction | undefined, report: Report, days: number) { let canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1350; let ctx = canvas.getContext('2d')!, bg = ctx.createLinearGradient(0,0,1080,1350); bg.addColorStop(0,'#211436'); bg.addColorStop(.6,'#522057'); bg.addColorStop(1,'#db2777'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1350); ctx.strokeStyle='rgba(255,255,255,.3)'; ctx.lineWidth=3; ctx.strokeRect(55,55,970,1240); ctx.textAlign='center'; ctx.fillStyle='#f9a8d4'; ctx.font='700 28px sans-serif'; ctx.fillText('OFFICIAL NUMA CERTIFICATE',540,140); ctx.fillStyle='#fde68a'; ctx.font='900 76px sans-serif'; ctx.fillText('沼落ち認定証',540,245); ctx.fillStyle='#fff'; ctx.font='900 58px sans-serif'; ctx.fillText(name,540,420); ctx.fillStyle='#f9a8d4'; ctx.font='700 26px sans-serif'; ctx.fillText(`BEFORE · ${cold ? date(cold.date) : '記録なし'}`,540,570); ctx.fillStyle='#fff'; ctx.font='900 48px sans-serif'; ctx.fillText(`「${cold ? label(cold.answer) : 'まさかハマるとは…'}」`,540,650); ctx.fillStyle='rgba(255,255,255,.6)'; ctx.font='700 26px sans-serif'; ctx.fillText(`${days} DAYS LATER`,540,760); ctx.fillStyle='#fff'; ctx.font='900 56px sans-serif'; ctx.fillText(`ハマり度 ${report.level}/5`,540,920); ctx.font='700 30px sans-serif'; ctx.fillText(judge(days,report.level),540,1080); ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fillText('#沼落ち認定証',540,1210); return new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!), 'image/png')) }
function download(blob: Blob, name: string) { let url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url) }
function dayKey() { let now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}` }
function shortDay(value: string) { let [, month, day] = value.split('-'); return `${Number(month)}/${Number(day)}` }
function dailyWorks(day: string) { return [...works].sort((a, b) => hash(`${day}-${a.name}`) - hash(`${day}-${b.name}`)) }
function hash(value: string) { let result = 2166136261; for (let char of value) { result ^= char.charCodeAt(0); result = Math.imul(result, 16777619) } return result >>> 0 }
function trendWork(item: TrendItem): Work { let styles: Record<string, Pick<Work, 'emoji' | 'color'>> = { アニメ: { emoji: '📺', color: 'from-violet-400 to-fuchsia-500' }, 映画: { emoji: '🎬', color: 'from-amber-400 to-red-500' }, 音楽: { emoji: '🎵', color: 'from-rose-400 to-pink-500' }, アイドル: { emoji: '✨', color: 'from-cyan-400 to-blue-500' }, 俳優: { emoji: '🎭', color: 'from-orange-400 to-violet-500' }, ゲーム: { emoji: '🎮', color: 'from-blue-400 to-indigo-600' }, 漫画: { emoji: '📚', color: 'from-emerald-400 to-teal-500' }, ドラマ: { emoji: '📺', color: 'from-pink-400 to-violet-500' } }; return { name: item.name, category: item.category || '話題', ...(styles[item.category] || { emoji: '🔥', color: 'from-pink-400 to-violet-500' }) } }

type Tab = 'home' | 'predict' | 'report' | 'analysis' | 'certificate'
type Prediction = { id: string; name: string; answer: string; date: string }
type Report = { id: string; name: string; level: number; trigger: string; date: string }
type Data = { predictions: Prediction[]; reports: Report[] }
type Event = (Prediction & { kind: 'prediction' }) | (Report & { kind: 'report' })
type PageProps = { data: Data; save: (data: Data) => void; notify: (message: string) => void }
type NavProps = { active: boolean; label: string; icon: any; go: () => void; main?: boolean }
type Work = typeof works[number]
type TrendItem = { name: string; category: string; trend_score: number; traffic?: string }
