
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import Seo from "../Helpers/Seo";
import  {ReactNode } from "react";
import ColourPalette from "../Helpers/ColourPalette";


interface TestProps {
  children?: ReactNode,
  seo: {
    title: string,
    description: string,
    ogImage: {
      url?: string
    },
  };
  colourPalette: any
}



const Global: FC<TestProps> = ({ children, seo,colourPalette }) => {

  return (
    <>
      <Seo {...seo} />
      <div className="bg-custom-primary">
        {children}    
      </div>
      <ColourPalette palette={colourPalette} />
    </>
  )
};

export default Global;