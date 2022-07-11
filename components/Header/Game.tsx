
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import  {ReactNode } from "react";
import { useRouter } from "next/router";
import { gameStore } from "../../store/game";
import shallow from 'zustand/shallow'
import { userStore } from "../../store/user";


const Game = ({}): JSX.Element => {
  const {activeStep,resultMessage} = gameStore(state => ({ 
    activeStep: state.activeStep,
    resultMessage: state.resultMessage,
  }), shallow)

  const {avatar,limit} = userStore(state => ({ 
    avatar: state.avatar,
    limit: state.limit,
  }), shallow)

  
console.log({resultMessage});

  const questionNumber = activeStep + 1

  const percentCompleted = (questionNumber / limit) * 100

  const isCompleted = questionNumber > limit ? true : false


  const currentQuestion = `Question ${questionNumber} / ${limit}`
  console.log({questionNumber});
  
  return (
    <div className=" w-full flex p-4  flex-row flex-wrap">
      <div className="flex flex-col gap-2 bg-custom-secondary rounded-lg overflow-hidden w-full">
        <div className=" flex-1 p-4 text-center" >
          {isCompleted ? <div>{resultMessage}</div> :  <div>{currentQuestion}</div>}
        </div>
        <div className="w-full h-2">
          <div className="bg-custom-accent-primary h-full" style={{width:`${percentCompleted}%`}}></div>
        </div>
      </div>
    </div>
  )
};

export default Game;