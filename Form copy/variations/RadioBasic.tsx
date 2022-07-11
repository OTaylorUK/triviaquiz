import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import * as prismicT from "@prismicio/types";
import {
	SliceComponentProps,
} from "@prismicio/react";
import Button from '../../../components/component/Button';
import {default as RadioFields} from '../../../components/component/RadioBasic';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

type RadioSlice = prismicT.Slice<
	"hero",
	{
		defaultValue: prismicT.KeyTextField
    equiredErrorMsg:prismicT.KeyTextField
    label:prismicT.KeyTextField
    uid:prismicT.KeyTextField
	}
>;
type initialValuesProps = {
  [key: string]: any
}

const RadioBasic = ({ slice }: SliceComponentProps<RadioSlice>) => {

  const {primary,items, slice_type} = {...slice}
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
        router.push('/play')
        
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

  return(
    <section 
      id={slice_type}
      data-type={slice_type}
      className={`w-full flex-1 flex flex-col justify-center items-center text-left `}
    >
      <div className="w-full flex-1 rounded-lg  bg-custom-secondary flex flex-col gap-8  text-center items-center text-custom-white">
         <h3>{label}</h3>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={'dashboard'} className='max-w-[50%] m-auto border bg-slate-800 p-2 flex flex-col gap-5 justify-center items-center'>
               
                 <RadioFields options={items} uid={uid as string} />
               
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

          {/* <Buttons buttons={items} replaceKey={true}/> */}
      </div>


  </section>
  )
}

export default RadioBasic