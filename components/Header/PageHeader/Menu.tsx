

import React from "react";
import { motion } from "framer-motion";
import Button from "../../component/Button";
import { NavMenuProps } from "../../../types/Header";



const listItem = {
  offscreen: { opacity: 0, y: '-100%' },
  onscreen: { opacity: 1, y: 0 }
}


const variants = {
  open: { opacity: 1, x: 0,
    transition: {
      bounce: 0,
      duration: 0.25,
    } },
  closed: { opacity: 0, x: "100%" },
}

const Menu = ({ scrolled, isMobile, menuIsOpen,  navItem}:NavMenuProps): JSX.Element => {


  if(isMobile){
    return(
      <motion.ul
				initial={isMobile ? {opacity: 0, x: "100%" } : {}}
				animate={menuIsOpen ? "open" : "closed"}
				variants={isMobile ? variants : {}}
				className={`${scrolled === 'no-scroll' ? 'bg-custom-primary' : 'bg-inherit'} shadow-md text-inherit  -z-30  h-[101vh]  absolute   min-w-[60vw]  flex-col gap-[3vh] p-12   flex justify-center items-start top-0 right-0`}
				>

            {navItem.map((item: any, i: number)=>{
              let variableClass = 'text-inherit';
              if(item.style === 'ghost' || item.style === 'ghost-small'){
                variableClass = ''
              }
                return(
                  <motion.li key={i} className="w-full" variants={listItem} >
                        <Button actionTarget={item.target} file={item.file}   classList={`relative justify-start z-10 ${variableClass}`} style={item.style !== null ? item.style : 'text'}   type={item.action !== null ? item.action : 'link'} content={item.content} />
                  </motion.li>
                )
            })}
				</motion.ul>
    )
  }else{
    return(
      <ul className={`flex flex-row gap-6 items-center`}>
      {navItem.map((item: any, i: number)=>{
        let variableClass = 'text-inherit';
        if(item.style === 'ghost' || item.style === 'ghost-small'){
          variableClass = ''
        }
          return(
            <motion.li key={i} variants={listItem} >
                  <Button actionTarget={item.target} file={item?.file}   classList={`relative z-10 ${variableClass}`} style={item.style !== null ? item.style : 'text'}   type={item.action !== null ? item.action : 'link'} content={item.content} />
            </motion.li>
          )
      })}
    </ul>
    )
  }
  
};

export default Menu;