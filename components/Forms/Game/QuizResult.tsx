

import { Form, Formik } from "formik";
import React, { FC,  useCallback,  useEffect,  useRef, useState } from "react";
import  {ReactNode } from "react";
import { useRouter } from "next/router";
import Question from "./Question";
import { gameStore } from "../../../store/game";
import shallow from 'zustand/shallow'
import SVG from 'react-inlinesvg';
import { userStore } from "../../../store/user";

interface FooterProps {
    children?: ReactNode,
}

const QuizResult = ({ children }:FooterProps): JSX.Element => {

    const { setMessage, results } = gameStore(state => ({ 
        setMessage: state.setMessage,
        results: state.results,
      }), shallow)



    const renderResult = (step: number) => {
        
        const {questions,isCorrect, correctAnswer,userAnswer} = results![step - 1]
        
     return <div>
        <p>Question: {questions}</p>
        <div>
            {isCorrect ? 
            <div>
                <p>Your answer &quot;{userAnswer}&ldquo; was correct.</p>
            </div> : 
             <div>
                <p>Your answer: &quot;{userAnswer}&ldquo; was correct.</p>
                <p>The correct answer was &quot;{correctAnswer}&ldquo;.</p>
            </div>}
        </div>
     </div>
    //  return <Question data={questions[step]}/>
    }
      
    const generateResultMessage = (results: any) => {
        const count = results.length 
        const numberCorrect = results.filter((question: { isCorrect: boolean; }) => question.isCorrect === true).length  // -> 3
        const percentCorrect = Number(((numberCorrect / count) * 100).toFixed(1))

        return conditionalMessage(percentCorrect)
    }

    const conditionalMessage = (percent: number) => {
        const { name  } = userStore(state => ({ 
            name: state.name,
          }), shallow)
        // const message = `You got ${percentCorrect}% correct!`
        let message:string, emoji:string;

        if(percent === 100){
            message = `Amazing job ${name}!`
            emoji = `🥳`
        }else if(percent >= 80){
            message = `Great job ${name}!`
            emoji = `🙌`
        }else if(percent >= 60){
            message = `Good effort ${name}!`
            emoji = `🎉`
        }else if(percent >= 40){
            message = `Nice try ${name}!`
            emoji = `👏`
        }else{
            message = `Oh no ${name}!`
            emoji = `😓`
        }

        return {
            main: message,
            secondary: `You got ${percent}% correct.`,
            emoji: emoji
        }

    }


    const {main, secondary,emoji} = generateResultMessage(results)

    useEffect(()=>{

        console.log(main);
        
        setMessage(main)
    },[main,setMessage])


    const [reviewQuestion, setReviewQuestion] = useState<null | number>(null)
  

    const listAnswers = (results: any) => {

        const list = results.map((result: any, i:number)=>{

            let imgSrc,imgAlt,svgColour;

            if(result.isCorrect === true){
                imgSrc = '/tick.svg'
                imgAlt = 'Icon of a tick'
                svgColour = 'text-custom-accent-secondary'

            }else{
                imgSrc = '/cross.svg'
                imgAlt = 'Icon of a cross'
                svgColour = 'text-custom-accent-primary'

            }

            return(
                <div key={i} className="flex flex-col gap-1 text-custom-primary text-center group cursor-pointer" onClick={()=> setReviewQuestion(i+1)}>
                    <div className={`p-2 bg-white border rounded-full ${svgColour}`}>
                        <SVG className="icon"  src={imgSrc} title={imgAlt} />
                    </div>
                   <span className="text-sm text-custom-white">{i+1}</span>
                </div>
            )
        })
        return list
    }

    return(
        <div>
            <div className="flex flex-col">
                <p>{secondary}</p>
                <p className="text-8xl">{emoji}</p>
            </div>
            <div className="flex flex-row gap-2 ">
                {listAnswers(results)}
            </div>
            <div className="question">
            {reviewQuestion !== null && renderResult(reviewQuestion)}
            </div>
        </div>
    )
};

export default QuizResult;