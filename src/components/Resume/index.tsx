'use client'

import { RoleType } from '@/types'
import { ArrowDownIcon } from '../Icons/ArrowDownIcon'
import { Button } from '../Button'
import { BriefcaseIcon } from '../Icons/BriefcaseIcon'
import { AstrolleIcon } from '../Icons/AstrolleIcon'
import Infrapedia from '@/images/logos/infrapedia.svg'
import Edgeuno from '@/images/logos/edgeuno.svg'
import Agrimanager from '@/images/logos/agrimanager.png'
import Image, { ImageProps } from 'next/image'

export function Resume() {
  let resume: Array<RoleType> = [
    {
      company: 'Astrolle Inc',
      title: 'Co-Founder',
      // @ts-expect-error x
      logo: <AstrolleIcon className="text-gray-800 dark:text-white" />,
      start: '2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Edgeuno SAS',
      title: 'Frontend Developer',
      logo: Edgeuno,
      img: true,
      start: '2022',
      end: '2024',
    },
    {
      company: 'Infrapedia Inc',
      title: 'Software Engineer',
      logo: Infrapedia,
      img: true,
      start: '2019',
      end: '2022',
    },
    {
      company: 'Agrolevels SAS',
      title: 'Junior Frontend Developer',
      logo: Agrimanager,
      img: true,
      start: '2018',
      end: '2020',
    },
  ]

  async function downloadCV() {
    try {
      const url = '/cv.pdf'
      const link = document.createElement('a')
      link.href = url
      link.download = 'CV_Manuel-Blanco.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        variant="secondary"
        onClick={() => downloadCV()}
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Role({ role }: { role: RoleType }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full p-1 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        {role.img ? (
          <Image
            src={role.logo as ImageProps['src']}
            alt=""
            className="h-7 w-7 object-cover object-left"
            unoptimized
          />
        ) : (
          <>{role.logo}</>
        )}
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only dark:text-white">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}
