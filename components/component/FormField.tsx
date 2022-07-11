
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { FC,  useCallback,  useRef, useState } from "react";
import  {ReactNode } from "react";
import * as Yup from 'yup';
import { fieldTypes } from "../../types/Form";
import CheckboxBasic from "./CheckboxBasic";
import CheckboxStyled from "./CheckboxStyled";
import Number from "./Number";
import RadioBasic from "./RadioBasic";
import RadioStyled from "./RadioStyled";
import Select from "./Select";
import TextInput from "./TextInput";


interface fieldValue  {
  uid: string
  type: fieldTypes
  label: string
  placeholder?: string
  requiredErrorMsg?: string
  dynamicData?: any
  options?: any
}

const renderError = (message:string) => <p className="form-helper">{message}</p>;



const FormField = (props:fieldValue): JSX.Element => {

    const {type, uid} = props
    let field;

    switch (type) {
        case 'textInput':
            console.log(props);
            
            field = <TextInput {...props} />
            break;

        case 'radioStyled':
            field = <RadioStyled {...props} />
            break;

        case 'radioBasic':
            field = <RadioBasic {...props} />
            break;

        case 'checkboxStyled':
            field = <CheckboxStyled {...props} />
            break;

        case 'checkboxBasic':
            field = <CheckboxBasic {...props} />
            break;

        case 'number':
            field = <Number {...props} />
            break;

        case 'select':
            field = <Select {...props} />
            break;
        default:
            break;
    }

    return (
        <div className={`field-group  `} >
            {field}
            <ErrorMessage name={uid} render={renderError} />
        </div>
    )
};

export default FormField;