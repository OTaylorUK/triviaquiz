import * as prismicT from "@prismicio/types";

export interface HeaderProps {
  logoContent:  prismicT.RichTextField,
  // logoTarget: string,
  navItem: any[]
}
export interface NavMenuProps {
  navItem: any
  scrolled: string
  isMobile: boolean
  menuIsOpen: boolean
}
export interface NavbarProps {
  navItem: any
  scrolled: string
  menuIsOpen: boolean
  isMobile: boolean
  setMenuIsOpen: any
  logo: {
    content: any
  }
}
export interface ToggleProps {
  menuOpen: boolean
  toggle: any
}
