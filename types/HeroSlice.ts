import * as prismicT from "@prismicio/types";

export type HeroSlice = prismicT.Slice<
	"hero",
	{
		title: prismicT.RichTextField;
		description: prismicT.RichTextField;
	}
>;
