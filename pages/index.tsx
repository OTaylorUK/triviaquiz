import type { NextPage } from 'next'
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices/index.js";
import ColourPalette from '../components/Helpers/ColourPalette';
import { PageProps } from '../types/PageType';
import { Page } from '../components/Layout';
import { fetchGlobalComponents } from '../utils/helpers';

const Home: NextPage<PageProps> = (props) => {
console.log("🚀 ~ file: index.tsx ~ line 10 ~ props", props)

  const {slices, seo, colourPalette,header, footer} = props 
  
  return (
    <>
      <Page seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
        <SliceZone 
          slices={slices} 
          components={components}
        />
      </Page>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'home')

  return {
    props: {
      slices: page.data?.slices,
      colourPalette: colourPalette,
      header: header,
      footer: footer,
      seo: {
        title: page.data?.title ? page.data?.title : 'Ollie Taylor: Web Developer',
        description: page.data?.description ? page.data?.description : 'Ollie Taylor is a Frontend developer and designer passionate about building modern web applications using React.',
        ogImage: page.data?.ogImage,
      },
    },
  };
}

export default Home
