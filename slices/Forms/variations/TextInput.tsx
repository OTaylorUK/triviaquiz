import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import * as prismicT from "@prismicio/types";
import {
	SliceComponentProps,
} from "@prismicio/react";
import Button from '../../../components/component/Button';
import {default as IndTextInput} from '../../../components/component/TextInput';
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
    formHelp:prismicT.RichTextField
	}
>;
type initialValuesProps = {
  [key: string]: any
}

const TextInput = ({ slice }: SliceComponentProps<RadioSlice>) => {

  const {primary,items, slice_type} = {...slice}
  const {defaultValue, equiredErrorMsg, label, uid, formHelp} = primary;
  console.log("🚀 ~ file: TextInput.tsx ~ line 30 ~ TextInput ~ primary", primary)
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
    <div 
      className={`w-full flex-1 flex flex-col justify-center items-center text-left `}
    >
      {items.map((item, i) =>{
        return(
          <IndTextInput uid={item.uid as string} type={item.type as any} placeholder={item.label as string} key={i} label={''}  />
        )
        })}


  </div>
  )
}

export default TextInput