import * as prismicT from "@prismicio/types";


export interface AnimationWrapperProps {
  children: JSX.Element | JSX.Element[] ,
  innerClass?: string| null | undefined
  type?: string| null | undefined
  variantType?: "alt" | "default" 
  settings?: {
    bounce?: number,
    delay?: number,
    duration?: number,
  }
}

export interface ColourProps {
	palette: {
		colour: any[]
	}
}
export interface LoadingProps {
  time: number
  setIsLoading: any
}

export interface ThemeToggleProps {
	className?: string
}