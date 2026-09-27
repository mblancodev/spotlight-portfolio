declare function DriftWall(props: {
  items?: Array<{
    image: string
    title?: string
    href?: string
    interactive?: boolean
    projectName?: string
  }>
  columns?: number
  tileWidth?: number
  tileHeight?: number
  gap?: number
  radius?: number
  tilt?: number
  turn?: number
  roll?: number
  perspective?: number
  depth?: number
  speed?: number
  direction?: string
  variance?: number
  parallax?: number
  pauseOnHover?: boolean
  lift?: number
  /** Scale of the hovered tile, on top of the lift. */
  zoom?: number
  fade?: number
  dim?: number
  /** Opacity of the overlay tint on idle tiles. */
  shade?: number
  grayscale?: boolean
  overlayColor?: string
  onSelect?: (item: {
    image: string
    title?: string
    interactive?: boolean
    projectName?: string
  }) => void
  className?: string
  style?: React.CSSProperties
}): JSX.Element

export default DriftWall
