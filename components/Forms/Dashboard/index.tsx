
import { Form, Formik } from "formik";
import React, { FC,  useCallback,  useEffect,  useRef, useState } from "react";
import  {ReactNode } from "react";
import * as Yup from 'yup';
import { userStore } from "../../../store/user";
import { getGeoInfo, getQuizQuestions } from "../../../utils/helpers";
// import {formFields,initialValues, category, settings, user} from "./formFields";
// import InnerForm from "./InnerForm";
import axios from "axios"
import { useRouter } from "next/router";
import { gameStore } from "../../../store/game";
import shallow from 'zustand/shallow'


interface FooterProps {
  children?: ReactNode,
  quiz: any
}


function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() =>{
    setHasMounted(true)
  }, [])

  return hasMounted
}

function _sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}





const Dashboard = ({ children, quiz}:FooterProps): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter()


  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() =>{

    setHasMounted(true)

  },[])


  if (!hasMounted) return <div>Loading....</div>


  if(activeStep === formFields.length) {
    return(
      <div>SUCCESS HERE! - start the game</div>
    )
  }

 

  const currentValidationSchema = formFields[activeStep]['validationSchema'];
  
  const isLastStep = activeStep === formFields.length - 1;

  const _handleSubmit = (values: any, actions: any) => {

    switch (activeStep) {
      case 0:
        updateUser(values.name, values.avatar)
        break;
      case 1:
        updateCategory(values.category)
        break;

      case 2:
        console.log('HERE');
        updateSettings(values.difficulty, values.limit)
        setQuestionRegion(values.question_region)
        break;
      default:
        break;
    }


    if (isLastStep) {
      _submitForm(values, actions);
      console.log('Reached the end!');
      
    } else {
      console.log('eeweew@');

      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }


  }

  

  const _submitForm = async (values: any, actions: any) => {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);


    // setupQuiz(values)
    // const quizQuestions = await getQuizQuestions(values) as any
    
    // //
    // createQuiz(quizQuestions)
    router.push('/play')

    setActiveStep(activeStep + 1);
  }

  const _handleBack = () => {
    console.log('go back');
    
    setActiveStep(activeStep - 1);
  }


  // uses game store
  const initialValues = {
    avatar: avatar,
    name: name,
    category: category,
    difficulty: difficulty,
    limit: limit,
    question_region: question_region,
  }

  
  return (
    <>
      {activeStep === formFields.length ? (
          // <CheckoutSuccess />
          <div>SUCCESS</div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={'test1'} className='max-w-[50%] m-auto border bg-slate-800 p-2 flex flex-col gap-5 justify-center items-center'>
                {_renderStepContent(activeStep, quiz)}

                <div className=" w-full flex flex-row flex-wrap">
                  {activeStep !== 0 && (
                    <button className="flex-1 btn-default bg-red-500" onClick={_handleBack} type="button" >
                      Back
                    </button>
                  )}
                  <div className=" flex-1 " >
                    <button
                      className="btn-default w-full bg-red-200"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </button>
                    {isSubmitting && (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

    </>
  )
};

export default Dashboard;