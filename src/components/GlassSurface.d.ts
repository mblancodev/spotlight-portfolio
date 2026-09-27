declare function GlassSurface(props: {
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  opacity?: number
  blur?: number
  displace?: number
  backgroundOpacity?: number
  saturation?: number
  distortionScale?: number
  redOffset?: number
  greenOffset?: number
  blueOffset?: number
  xChannel?: string
  yChannel?: string
  mixBlendMode?: string
  /** Edge refraction via an SVG backdrop filter. Turn off for very tall panels. */
  refraction?: boolean
  className?: string
  style?: React.CSSProperties
}): JSX.Element

export default GlassSurface
