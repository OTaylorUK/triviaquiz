

import React from "react";
import { motion, Variants } from "framer-motion";
import { AnimationWrapperProps } from "../../types/Helpers";


const AnimationWrapper = ({ type = 'default', variantType = 'default', innerClass = 'flex flex-col gap-2' , children, settings}:AnimationWrapperProps): JSX.Element => {

  const { 
    bounce = 0.2,
    delay = 0.45,
    duration = 0.45,  
  } = {...settings}


const animation: Variants = {
  offscreen: {
    y:'100%' ,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: bounce,
      duration: duration,
      delay: delay
    }
  }
};


const altAnimation: Variants = {
  offscreen: {
    opacity: 0
  },
  onscreen: {
    opacity: 1,
    // transition: {
    //   duration: duration,
    //   delay: delay
    // }
  }
};




switch (type) {
  case 'ul':
    return (
      <>
          <motion.ul className={` ${innerClass}`}  variants={variantType === 'default' ? animation: altAnimation}>
            {children}
          </motion.ul>
  
      </>
    );
    break;

  default:
    return (
      <>
          <motion.div className={` ${innerClass}`}  variants={variantType === 'default' ? animation: altAnimation}>
            {children}
          </motion.div>
  
      </>
    );

    break;
}

  
};

export default AnimationWrapper;