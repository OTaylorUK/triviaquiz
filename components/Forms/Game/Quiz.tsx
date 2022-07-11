
import { Form, Formik } from "formik";
import React, { FC,  useCallback,  useEffect,  useRef, useState } from "react";
import  {ReactNode } from "react";
import { useRouter } from "next/router";
import Question from "./Question";
import { gameStore } from "../../../store/game";
import shallow from 'zustand/shallow'
import QuizResult from "./QuizResult";

interface FooterProps {
  children?: ReactNode,
  setResults: any
  results: any
}

// questions: any
// initialValues: {}
// answers: {
//   [key: string]: any 
// }


const _renderStepContent = (step: number, questions: any) => {
  return <Question data={questions[step]}/>
}


function _sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const Quiz = ({ children, results, setResults }:FooterProps): JSX.Element => {

  const { questions, answers, initialValues,activeStep, updateActiveStep } = gameStore(state => ({ 
    activeStep: state.activeStep,
    questions: state.questions,
    answers: state.answers,
    initialValues: state.initialValues,
    updateActiveStep: state.updateActiveStep,
  }), shallow)



  const router = useRouter()


  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() =>{
    setHasMounted(true)
  },[])


  // useEffect(() =>{
  // },[activeStep])
  

  if (!hasMounted || !questions) return <div>Loading....</div>

  const isLastStep = activeStep === questions.length - 1;

  if(results !== null ){
    return <QuizResult results={results} />

  }else if(!questions[activeStep]){
    return <div>LOADING SCREEN....</div>

  }

  const currentValidationSchema = questions[activeStep]['validationSchema'];

   

  const _submitForm = async (values: any, actions: any) => {
    await _sleep(1000);
    type answerProp = {
      [key: string ]: {
      uid: string,
      question: string,
      answer: string
      options: any[]
     } 
  }
  


    const results = Object.entries(answers as answerProp).map(([key, value]) => {
      const answer = values[key] 
      const isCorrect = value.uid === answer ? true : false

      const userAnswer: any = value.options.filter((val: { uid: any; }) => val.uid === answer);
     
      return{
        isCorrect: isCorrect,
        questions: value.question,
        correctAnswer: value.answer,
        userAnswer: userAnswer[0].label
      }

    })

    setResults(results)

  }


  const _handleSubmit = (values: any, actions: any) => {

    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
    }

    updateActiveStep(activeStep + 1);


  }

  const _handleBack = () => {
    console.log('go back');
    updateActiveStep(activeStep - 1);

   }
  
  
  return (
    <>
      
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={'test2'} className='max-w-[50%] m-auto border bg-slate-800 p-2 flex flex-col gap-5 justify-center items-center'>
                {_renderStepContent(activeStep, questions)}

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
                      {isLastStep ? 'Finish' : 'Next'}
                    </button>
                    {isSubmitting && (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>

    </>
  )
};

export default Quiz;