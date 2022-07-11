

import React from "react";
import { motion, Variants } from "framer-motion";
import Button from "../../component/Button";
import MenuToggle from "./Toggle";
import NavMenu from "./Menu";
import { NavbarProps } from "../../../types/Header";

const container: Variants = {
  offscreen: {
    opacity: 0 ,
    
  },
  onscreen: {
    opacity: 1,
    
    transition: {
      staggerChildren: .45,
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    }
  }
};

const listItem = {
  offscreen: { opacity: 0, y: '-100%' },
  onscreen: { opacity: 1, y: 0 }
}





const Navbar = ({ scrolled, navItem, logo,  isMobile, menuIsOpen, setMenuIsOpen}:NavbarProps): JSX.Element => {
  return (
    <>
      <motion.nav
      
        className=" z-0 bg-inherit px-6 lg:px-10 py-5 overflow-hidden  container max-w-screen-xl m-auto   flex flex-row items-center   h-full top-[0] transition-[top] duration-300 justify-between"
        initial="offscreen"
        whileInView="onscreen"
        animate={isMobile ?  "offscreen" :  "onscreen"}

        variants={container}
        viewport={{ once: true, amount: 0.8 }}
      >

            <div className="block">
              <motion.div variants={listItem} >
                <Button  classList={`text-inherit w-36  `} style={'text'}   type={'link'} content={logo.content} />
              </motion.div>
            </div>
        
            <NavMenu scrolled={scrolled} navItem={navItem} isMobile={isMobile} menuIsOpen={menuIsOpen}  />

				    <MenuToggle menuOpen={menuIsOpen} toggle={() => setMenuIsOpen((prevState: any) => !prevState)} />


      </motion.nav>
    </>
  );
};

export default Navbar;