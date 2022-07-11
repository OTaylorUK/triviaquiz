import * as prismicT from "@prismicio/types";

export type GeneralDefault = prismicT.Slice<
	"general",
	{
		title: prismicT.RichTextField,
		text: prismicT.RichTextField,
		uid: prismicT.KeyTextField
		image: {
			url: string, 
			dimensions?: any, 
			alt?: string, 
		}
	}
>;

export type GeneralTechStack = prismicT.Slice<
	"general",
	{
		title: prismicT.RichTextField,
		text: prismicT.RichTextField,
		uid: prismicT.KeyTextField
	}
>;

