const STATUSES = ['approved', 'rejected'] as const
const CATEGORIES = ['アニメ', '映画', '音楽', 'アイドル', '俳優', 'ゲーム', '漫画', 'ドラマ', 'その他'] as const

export const contentItemReviewSchema = {
  safeParse(value: Record<string, unknown>): ReviewResult {
    let public_id = typeof value.public_id === 'string' ? value.public_id.trim() : ''
    let review_status = typeof value.review_status === 'string' ? value.review_status : ''
    let category = typeof value.category === 'string' ? value.category : undefined
    if (!public_id || !isOneOf(review_status, STATUSES) || category && !isOneOf(category, CATEGORIES)) return { success: false }
    return { success: true, data: { public_id, review_status, category } }
  },
}

function isOneOf<T extends string>(value: string, choices: readonly T[]): value is T {
  return choices.includes(value as T)
}

type ReviewData = {
  public_id: string
  review_status: typeof STATUSES[number]
  category?: typeof CATEGORIES[number]
}

type ReviewResult = { success: true; data: ReviewData } | { success: false }
