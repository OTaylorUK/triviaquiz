
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
}


const Number = ({uid, type, label='', placeholder, requiredErrorMsg}:fieldValue): JSX.Element => {
    return (
        <div className={`field-group  `} >
          {label !== '' && <label>{label}</label>}

             <Field
                className={`form-input`}
                id={uid}
                name={uid}
                placeholder={placeholder}
                type="number"
                aria-label={uid}
             />
        </div>
    )
};

export default Number;