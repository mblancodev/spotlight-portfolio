import Link from 'next/link'
import { MailIcon } from '../Icons/MailIcon'
import { GitHubIcon, LinkedInIcon } from '../SocialIcons'
import clsx from 'clsx'

function SocialLink({
  icon: Icon,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      <span className="ml-4">{children}</span>
    </Link>
  )
}

export const SocialLinks = ({ altStyles = false }: { altStyles?: boolean }) => {
  const linksClassNames = altStyles
    ? 'flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500'
    : 'transition dark:text-zinc-200 dark:hover:text-teal-500'
  return (
    <div className={clsx('mt-6 flex gap-6', altStyles ? 'flex-col' : '')}>
      <SocialLink
        href="https://github.com/mblancodev"
        className={linksClassNames}
        aria-label="Follow on GitHub"
        icon={GitHubIcon}
      >
        {altStyles ? 'Follow on GitHub' : ''}
      </SocialLink>
      <SocialLink
        className={linksClassNames}
        href="https://www.linkedin.com/in/manabl/"
        aria-label="Follow on LinkedIn"
        icon={LinkedInIcon}
      >
        {altStyles ? 'Follow on Linkedin' : ''}
      </SocialLink>
      <SocialLink
        icon={MailIcon}
        href="mailto:manuel@astrolle.com"
        className={
          altStyles
            ? 'mt-8 inline-flex border-t border-zinc-100 pt-8 text-white dark:border-zinc-700/40'
            : ''
        }
      >
        {altStyles ? 'manuel[at]astrolle.com' : ''}
      </SocialLink>
    </div>
  )
}
