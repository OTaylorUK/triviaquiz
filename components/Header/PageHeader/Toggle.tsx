import * as React from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { ToggleProps } from "../../../types/Header";

const Path = (props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const Toggle = ({ menuOpen, toggle}:ToggleProps): JSX.Element => {

  return(
    <motion.button 
    animate={menuOpen ? "open" : "closed"}
    className={`  text-inherit z-2 block p-2 lg:hidden`} 
    onClick={toggle}
  >

    <svg  className="" width="23" height="23" viewBox="0 0 23 23">
      <Path
        // d="M 2 2.5 L 20 2.5"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </motion.button>
  )
};



export default Toggle;