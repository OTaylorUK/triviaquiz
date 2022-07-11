import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { FC,  useCallback,  useRef, useState } from "react";
import  {ReactNode } from "react";
import * as Yup from 'yup';
import { fieldTypes } from "../../../types/Form";
import FormField from "../../component/FormField";

type fieldValue = {
  uid: string
  type: fieldTypes
  label: string
  placeholder?: string
  requiredErrorMsg?: string
  options?: any[] | object
}
interface FooterProps {
  data: {
    id: number
    type: fieldTypes
    uid: string
    options: fieldValue[]
    question: string
  },
}
// category: "Film & TV"
// options: 
// question: "Which actor has featued in films including The Favourite and The Mummy?"
// questionNumber: 1
// type: "radioBasic"
// uid:


const Question = ({data}:FooterProps): JSX.Element => {
  console.log({data});

  const {type, uid, options, question} = data


  // uid: string
  // type: fieldTypes
  // label: string
  // placeholder?: string
  // requiredErrorMsg?: string
  // dynamicData?: any
  
  return (
    <>

      <div className="question">
        <p>{question}</p>
      </div>
      <div className="possible-answers">
       <FormField uid={uid} type={type } label={""} options={options} />

      </div>
    </>
  )
};

export default Question;