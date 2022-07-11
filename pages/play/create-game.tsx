import type { NextPage } from 'next'
import { SliceZone } from "@prismicio/react";
import { createClient } from "../../prismicio";
import { components } from "../../slices/index.js";
import ColourPalette from '../../components/Helpers/ColourPalette';
import { PageProps } from '../../types/PageType';
import { App, Page } from '../../components/Layout';
import Create from '../../components/Forms/Game/Create';
import { userStore } from '../../store/user';
import axios from "axios"
import { fetchGlobalComponents, getQuizCategories } from '../../utils/helpers';


const Home: NextPage<PageProps> = (props) => {
console.log("🚀 ~ file: index.tsx ~ line 10 ~ props", props)

  const {slices, seo, colourPalette,header, footer, quiz} = props 

  
  return (
    <>
      <App seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
        <Create quiz={quiz}/>
      </App>
      {/* <ColourPalette palette={colourPalette} /> */}
    </>
  )
}





export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'create')
  const quizCategories = await getQuizCategories()

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
      quiz:{
        categories: quizCategories
      }
    },
  };
}

export default Home
