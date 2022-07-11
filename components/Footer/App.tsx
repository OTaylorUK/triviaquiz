
import React, { FC,  useCallback,  useRef, useState } from "react";
import { LayoutProps } from "../../types/Layout";
import  {ReactNode } from "react";

interface FooterProps {
  children?: ReactNode,
}



const App: FC<FooterProps> = ({ children}) => {

  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <h2>Footer - App</h2>
    </>
  )
};

export default App;