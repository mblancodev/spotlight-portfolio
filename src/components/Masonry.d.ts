declare function Masonry(props: {
  items: Array<{
    id: string | number
    img: string
    url?: string
    height: number
    title?: string
    slug?: string
  }>
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: string
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
  onSelect?: (item: {
    id: string | number
    img: string
    url?: string
    height: number
    title?: string
    slug?: string
  }) => void
}): JSX.Element

export default Masonry
