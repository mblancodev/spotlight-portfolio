declare function AccordionGallery(props: {
  items?: Array<{
    image: string
    label?: string
    alt?: string
    link?: string
  }>
  defaultIndex?: number
  accentColor?: string
  overlayColor?: string
  textColor?: string
  height?: number
  gap?: number
  radius?: number
  expandRatio?: number
  orientation?: 'horizontal' | 'vertical'
  duration?: number
  ease?: string
  parallax?: number
  tilt?: number
  stagger?: number
  trigger?: 'hover' | 'click'
  showLabels?: boolean
  grayscale?: boolean
  className?: string
  onChange?: (index: number, item?: { image: string; label?: string }) => void
  onSelect?: (index: number, item?: { image: string; label?: string }) => void
}): JSX.Element

export default AccordionGallery
