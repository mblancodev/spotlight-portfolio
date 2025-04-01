import { ImageProps } from "next/image";

export interface RoleType {
  company: string
  title: string
  img?: boolean;
  logo: string | Element | ImageProps["src"]
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}
