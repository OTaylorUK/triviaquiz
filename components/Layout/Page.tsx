
import { SliceZone } from "@prismicio/react";
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import { PageFooter } from "../Footer";
import { PageHeader } from "../Header";
import Global from "./Global";

const Page: FC<LayoutProps> = ({  children, seo, header,footer,colourPalette }) => {

  return (
    <>
      <Global seo={seo} colourPalette={colourPalette}>
        <PageHeader {...header}/>
        <div className="container px-4  lg:px-12 flex flex-col">
          {children}
        </div>
        <PageFooter {...footer}/>
      </Global> 
    </>
  )
};

export default Page;