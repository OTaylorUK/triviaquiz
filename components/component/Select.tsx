
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { FC,  useCallback,  useRef, useState } from "react";
import  {ReactNode } from "react";
import * as Yup from 'yup';
import { fieldTypes } from "../../types/Form";



interface fieldValue  {
  uid: string
  type: fieldTypes
  label: string
  placeholder?: string
  requiredErrorMsg?: string
  options?: object

}

const Select = ({uid, type, label, placeholder, requiredErrorMsg, options}:fieldValue): JSX.Element => {


    const createOptions = (options: object| undefined) => {

        if(options === undefined) return null 
        const allOptions = Object.entries(options).map(([key, value]) => {
            return (
                <option key={key} value={key}>
                    {value}
                </option>
            )
        })
        return allOptions
    }
    

    return (
        <div role="group" aria-labelledby="my-radio-group" className={` field-group flex flex-col  gap-6 `} >

            <Field as="select" name={uid}>
                
                {createOptions(options)}
            </Field>

        </div>

    )
};

export default Select;