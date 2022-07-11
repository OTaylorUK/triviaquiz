
import React, { FC, useCallback, useState } from "react";
import { useScrollHandler } from "../../hooks/useScrollHandler";
import { motion } from "framer-motion"
import Navbar from "./PageHeader/Navbar";
import { useResizeDetector } from "react-resize-detector";
import { HeaderProps } from "../../types/Header";


const PageHeader: FC<HeaderProps> = ({logoContent, navItem}) => {
    const scrolled = useScrollHandler();
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false);

    let navClass = '';

	const onResize = useCallback(() => {
		if (window === undefined) return
		// setMenuOpen(false)
		if(window){
			setMenuIsOpen(false)
			if(window.innerWidth < 1024){
				setIsMobile(true)
			}else{
				setIsMobile(false)
			}
		}
	}, []);
	const { ref } = useResizeDetector({onResize});


    switch (scrolled) {
        case "hero":
            navClass = ' text-custom-white'
            break;
        case "scrolled":
            navClass = `bg-custom-white text-custom-primary shadow-sm  `
            break;
        default:
            navClass = 'bg-custom-primary text-custom-white'
            break;
    }
    
    const variants = {
        'no-scroll': { 
            opacity: 1,
            y: menuIsOpen ? 0 : '10%' ,

        },
        'hero': {
            opacity: 0, 
            y: "-100%" ,
            transition: {
                type: "spring",
                bounce: .8,
                duration: .8,
                delay: .2
              }
        },
        'scrolled': { 
            opacity: 1,
            y: 0
        },
    }

    const logo = {
        content: logoContent,
    }

    return(
        <div ref={ref} className={` flex flex-row items-center h-20  fixed top-0 left-0  z-20 w-full `}>
            <motion.header
            animate={scrolled}
            variants={variants}
            className={`w-full ${navClass}`}
            >
                <Navbar navItem={navItem} logo={logo} menuIsOpen={menuIsOpen} scrolled={scrolled} setMenuIsOpen={setMenuIsOpen} isMobile={isMobile} />
            </motion.header>
        </div>
    )
}

export default PageHeader;