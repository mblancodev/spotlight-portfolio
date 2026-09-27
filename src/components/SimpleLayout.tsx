import { Container } from '@/components/Container'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container>
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-normal tracking-tight text-foreground/65 sm:text-base">
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
