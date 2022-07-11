import * as prismicT from "@prismicio/types";

export interface PageProps {
  slices: any[],
  header: {
    logoAction: string,
    logoContent:  prismicT.RichTextField,
    logoTarget: string,
    navItem: any[]
  },
  footer: {
    credit: prismicT.RichTextField,
  }
  colourPalette: {
    colour: any
  },
  seo: {
    title: string,
    description: string,
    ogImage: {
      url?: string
    },
  }
  quiz: any
}