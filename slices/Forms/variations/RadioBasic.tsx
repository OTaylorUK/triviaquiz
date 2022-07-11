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
    <div 
      className={`w-full flex-1 flex flex-col justify-center items-center text-left `}
    >
      <RadioFields options={items} uid={uid as string} />

  </div>
  )
}

export default RadioBasic