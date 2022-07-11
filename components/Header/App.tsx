
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import  {ReactNode } from "react";
import { useRouter } from "next/router";

interface FooterProps {
  children?: ReactNode,
}
interface AppHeader  {
  title: string
}

const App = ({title}:AppHeader): JSX.Element => {
  const router = useRouter()

  console.log({router});
  
  return (
    <div className=" w-full flex flex-row flex-wrap">
      <div className=" flex-1 " >
        <button
          className=" bg-red-200"
          onClick={()=> router.back()}
        >
          PREVIOUS PAGE
        </button>
        {title}
      </div>
    </div>
  )
};

export default App;