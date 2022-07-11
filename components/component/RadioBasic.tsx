
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { FC,  useCallback,  useRef, useState } from "react";
import  {ReactNode } from "react";
import * as Yup from 'yup';
import { fieldTypes } from "../../types/Form";



interface fieldValue  {
  uid: string
  type?: fieldTypes
  label?: string
  placeholder?: string
  requiredErrorMsg?: string
  options?: any[]

}

const RadioBasic = ({uid, type, label='', placeholder, requiredErrorMsg, options}:fieldValue): JSX.Element => {

    return (
        <div role="group" aria-labelledby="my-radio-group" className={` field-group flex flex-col  gap-6 `} >
          {label !== '' && <label>{label}</label>}

            {options?.map(({uid: optionUID,label,img})=>{
                
                return(
                    <label key={optionUID} className="radio-option-group  field-wrapper cursor-pointer">
                        <Field
                            className={`p-4 border`}
                            name={uid}
                            type="radio"
                            value={optionUID}
                        />

                        <span>{label}</span>
                    </label>
                )
            })}
        </div>
    )
};

export default RadioBasic;