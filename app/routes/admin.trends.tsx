import { Form } from 'react-router'
import { contentItemReviewSchema } from '~/.server/db/validators'
import { ContentItem } from '~/models/.server/content-item'

export async function loader({ request }) {
  requireAdmin(request)
  return { items: await ContentItem.pending() }
}

export async function action({ request }) {
  requireAdmin(request)
  let form = Object.fromEntries(await request.formData())
  let result = contentItemReviewSchema.safeParse(form)
  if (!result.success) return Response.json({ error: '入力内容を確認してください' }, { status: 400 })
  await ContentItem.review(result.data.public_id, result.data.review_status, result.data.category)
  return Response.json({ ok: true })
}

export default function Page({ loaderData: { items } }) {
  return <main className="mx-auto min-h-screen max-w-3xl bg-[#fff9fc] p-5 text-slate-800"><p className="text-xs font-black tracking-widest text-violet-500">TREND REVIEW</p><h1 className="mt-2 text-3xl font-black">候補の承認</h1><p className="mt-2 text-sm text-slate-500">自動判定できなかったGoogle Trendsの候補です。内容を確認して公開または除外してください。</p><div className="mt-7 space-y-4">{items.map((item) => <article key={item.public_id} className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><span className="badge badge-sm border-0 bg-violet-50 text-violet-600">{item.traffic || '話題度不明'}</span><h2 className="mt-2 text-xl font-black">{item.name}</h2><p className="mt-1 text-xs text-slate-400">取得：{item.fetched_at.toLocaleString('ja-JP')}</p></div><a href={item.source_item_url || item.source_url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">出典 ↗</a></div><Form method="post" className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2"><input type="hidden" name="public_id" value={item.public_id} /><select name="category" className="select select-sm rounded-xl border-pink-100"><option>アニメ</option><option>映画</option><option>音楽</option><option>アイドル</option><option>俳優</option><option>ゲーム</option><option>漫画</option><option>ドラマ</option><option>その他</option></select><button name="review_status" value="rejected" className="btn btn-sm rounded-xl bg-slate-100">除外</button><button name="review_status" value="approved" className="btn btn-sm rounded-xl border-0 bg-pink-500 text-white">承認</button></Form></article>)}{!items.length && <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-10 text-center text-slate-500">確認待ちの候補はありません</div>}</div></main>
}

function requireAdmin(request: Request) {
  let url = new URL(request.url)
  let secret = url.searchParams.get('key') || request.headers.get('x-admin-key')
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) throw new Response('Not Found', { status: 404 })
}
