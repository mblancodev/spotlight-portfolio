import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center">
      <div className="flex flex-col items-center">
        <p className="text-base font-medium text-foreground/50">404</p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-foreground/65">
          This page doesn’t exist or has moved.
        </p>
        <Button href="/" variant="secondary" className="mt-4">
          Back to home
        </Button>
      </div>
    </Container>
  )
}
