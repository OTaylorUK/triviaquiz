
import React, { FC,  useCallback,  useRef, useState } from "react";
import { AppLayoutProps, LayoutProps } from "../../types/Layout";
import { AppFooter } from "../Footer";
import { AppHeader } from "../Header";
import Global from "./Global";


const App: FC<AppLayoutProps> = ({ children, seo, header,footer,colourPalette }) => {

  return (
    <>
    <Global seo={seo} colourPalette={colourPalette}>
     <AppHeader title={seo.title}/>
     <div className="min-h-[100vh] container px-4 justify-center items-center gap-4  lg:px-12 flex flex-col">
          {children}
      </div>
      <AppFooter/>
    </Global>
    </>
  )
};

export default App;