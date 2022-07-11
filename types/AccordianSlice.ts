import * as prismicT from "@prismicio/types";

export type AccordianDefault = prismicT.Slice<
	"Accordian",
	{
		title: prismicT.RichTextField,
		text: prismicT.RichTextField,
		uid: prismicT.KeyTextField;
	}
>;


