const dev = process.env.NODE_ENV !== 'production'
const MARK = 'TODO(manuel)'

/**
 * Copy with TODO notes removed. Text that is all TODO becomes empty; a TODO
 * sentence inside real copy ("… services. TODO(manuel): active users. The …")
 * is cut out and the rest kept.
 */
export function withoutTodos(text: string) {
  if (!text.includes(MARK)) return text
  if (text.trimStart().startsWith(MARK)) return ''
  return text.replace(/\s*TODO\(manuel\):.*?(?:\.(?=\s|$)|$)/g, '').trim()
}

/** False when the text would render as nothing: TODO-only copy in production. */
export function hasContent(text?: string | null): text is string {
  return Boolean(text && (dev ? text : withoutTodos(text)))
}

/** Highlighted in development so placeholders are obvious. Hidden in production. */
export function Todo({ children }: { children: React.ReactNode }) {
  if (!dev) return null

  return (
    <span className="rounded-md bg-teal-400/10 box-decoration-clone px-1 break-words text-teal-700 dark:text-teal-300">
      {children}
    </span>
  )
}

export function MaybeTodo({ text }: { text: string }) {
  if (!text.includes(MARK)) return text
  if (!dev) return withoutTodos(text) || null
  return <Todo>{text}</Todo>
}
