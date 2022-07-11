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
    label: string
    fields: fieldValue[]
  },
  dynamicData?: any
}

const InnerForm = ({data,dynamicData}:FooterProps): JSX.Element => {
  const {fields} = data
  
  return (
    <>
      {fields.map((field)=> {
        return(
          <FormField key={field.uid} {...field} dynamicData={dynamicData} />
        )
      })}
    </>
  )
};

export default InnerForm;