import type { NextPage } from 'next'
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices/index.js";
import ColourPalette from '../components/Helpers/ColourPalette';
import { PageProps } from '../types/PageType';
import { App, Page } from '../components/Layout';
import { fetchGlobalComponents } from '../utils/helpers';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';


type initialValuesProps = {
  [key: string]: any
}


const Home: NextPage<PageProps> = (props) => {
console.log("🚀 ~ file: index.tsx ~ line 10 ~ props", props)

const {slices, seo, colourPalette,header, footer} = props 
  

const {items, primary} = slices[0]
const {defaultValue, equiredErrorMsg, label, uid} = primary;

const router = useRouter()

const initialValues: initialValuesProps = {
  [uid as string]: ''
};

const validationSchema =  Yup.object().shape({
  dashboard: Yup.string().required(equiredErrorMsg as string),
});

const _handleSubmit = (values: any, actions: any) => {

  const {dashboard} = values
  
  switch (dashboard) {
    case "play-game":
      router.push('/play/create-game')
      
      break;
    case "sign-in":
      router.push('/login')
    
      break;
    case "sign-up":
  
      break;

    default:
      break;
  }


}


  return (
    <>
      <App seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={'dashboard'} className='max-w-[50%] m-x-auto border bg-slate-800 p-2 flex flex-col gap-5 justify-center items-center'>
               
                <SliceZone 
                  slices={slices} 
                  components={components}
                />
                
                 <div className=" w-full flex flex-row flex-wrap">
                  <div className=" flex-1 " >
                    <button
                      className="btn-default w-full bg-red-200"
                      disabled={isSubmitting}
                      type="submit"
                    >
                     Next
                    </button>
                    {isSubmitting && (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>

              </Form>
            )}
          </Formik>
      </App>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'dashboard')

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
