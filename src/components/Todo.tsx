import clsx from 'clsx'

/** Highlighted in development so placeholders are obvious. Plain text in production. */
export function Todo({ children }: { children: React.ReactNode }) {
  let dev = process.env.NODE_ENV !== 'production'

  return (
    <span
      className={clsx(
        'box-decoration-clone break-words',
        dev &&
          'rounded-md bg-teal-400/10 px-1 text-teal-700 dark:text-teal-300',
      )}
    >
      {children}
    </span>
  )
}

export function MaybeTodo({ text }: { text: string }) {
  if (text.includes('TODO(manuel)')) {
    return <Todo>{text}</Todo>
  }

  return text
}
