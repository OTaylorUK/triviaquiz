import * as prismicT from "@prismicio/types";

export interface ButtonProps {
  currentPage?: string,
  target?: string,
  type: string,
  actionTarget?: string,
  style: string,
  classList?: string,
  textFirst?: boolean,
  eventHandler?: any
  file?: any
  icon?: any
  link?: any,
  text?: prismicT.AnyRegularField,
  content: prismicT.RichTextField 
}