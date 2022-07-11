import * as prismicT from "@prismicio/types";

export type  ProjectDefault = prismicT.Slice<
	"project",
	{
		title: prismicT.RichTextField;
		text: prismicT.RichTextField;
		uid: prismicT.KeyTextField;
		buttonGithub: prismicT.RichTextField;
		buttonWebsite: prismicT.RichTextField;
	}
>;

export interface ProjectProps {
  index: number
  github: any
  image: any
  name:  any,
  summary:  any,
  tools:  any,
  website:  any,
  buttonGithub: prismicT.RichTextField;
  buttonWebsite: prismicT.RichTextField;
}

