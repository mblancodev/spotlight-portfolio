import Link from 'next/link'

import { MailIcon } from '@/components/Icons/MailIcon'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { contactEmail } from '@/lib/site'

const iconClassName = 'h-5 w-5 fill-current'

const links = [
  {
    href: 'https://github.com/mblancodev',
    label: 'GitHub',
    icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/manabl/',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
  {
    href: `mailto:${contactEmail}`,
    label: 'Email',
    icon: MailIcon,
  },
]

export const SocialLinks = () => {
  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/8 text-foreground/70 transition hover:text-foreground"
        >
          <link.icon className={iconClassName} />
        </Link>
      ))}
    </div>
  )
}
