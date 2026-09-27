import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'h-11 rounded-xl bg-foreground px-5 font-medium text-background hover:opacity-90',
  secondary:
    'rounded-xl border border-foreground/8 bg-background px-5 py-2.5 font-medium text-foreground hover:bg-foreground/5',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'focus-ring inline-flex items-center justify-center gap-2 text-sm transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
