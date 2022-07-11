
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import  {ReactNode } from "react";
import * as prismicT from "@prismicio/types";
import { PrismicRichText } from "@prismicio/react";
import SVG from 'react-inlinesvg';

interface FooterProps {
  credit: prismicT.RichTextField;

}
const PageFooter = ({ credit}:FooterProps): JSX.Element => {

  return (
     <div className={` flex flex-row items-center h-20  fixed bottom-0 left-0  z-20 w-full  justify-center bg-custom-primary`}>

      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        <PrismicRichText 
          field={credit}
          components={{
            image: ({node}) => {
              return(
                <SVG className="icon text-custom-white" no-cors="true" src={node?.url} width={node.dimensions?.width} height={node.dimensions?.height} title={node?.alt ? node?.alt : 'Svg icon inside a button' } />
              )
            },
          }}
        />  
      </div>
    </div>
  )
};


export default PageFooter;