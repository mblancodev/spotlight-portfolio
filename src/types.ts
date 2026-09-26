import { ImageProps } from 'next/image'

export interface RoleType {
  company: string
  title: string
  img?: boolean
  logo?: ImageProps['src']
  /** Shown in the logo circle until a real asset exists. */
  initials?: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  highlights: string[]
  note?: string
}
