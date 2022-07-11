import * as prismicT from "@prismicio/types";

export interface FooterProps {
  copyright: string,
  isFixed: boolean,
  text:  prismicT.RichTextField,
  title:  prismicT.RichTextField,
  altLinks:  prismicT.RichTextField,
  alternativeContact:  any[],
  ref: any,
}