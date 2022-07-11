import { useEffect, useState } from 'react'

type scrollHandlerProps = "no-scroll" | "hero" | "scrolled"

export const useScrollHandler = () => {

  const [scroll, setScroll] = useState<scrollHandlerProps>("no-scroll");

  useEffect(() => {
    const onScroll = () => {

      if(window.scrollY > 80 && window.scrollY  < 1000){
        setScroll("hero");
      }else if(window.scrollY >= 1000){
        setScroll("scrolled");
      }else{
        setScroll("no-scroll");
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);

  return scroll;
};