declare function FlexCarousel(props: {
  items?: Array<{ src: string; alt?: string; title?: string; subtitle?: string }>
  preset?: string
  intro?: string
  cardHeight?: number
  gap?: number
  radius?: number
  fit?: string
  squeeze?: number
  focusOnClick?: boolean
  autoplay?: boolean
  interval?: number
  captions?: boolean
  captureWheel?: boolean
  onChange?: (index: number, item?: unknown) => void
  onSelect?: (index: number, item?: unknown) => void
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}): JSX.Element

export default FlexCarousel
