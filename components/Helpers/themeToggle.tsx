
import React, { FC,useEffect, useState } from "react";
import { useThemeContext } from '../../store/theme';
import { ThemeToggleProps } from "../../types/Helpers";


const ThemeToggle: FC<ThemeToggleProps> = ({className}) => {

  const { isDark, setIsDark } = useThemeContext();

  const [displaySettings, setDisplaySettings] = useState({
    position: 'translate(0px)',
    text: 'light',
    label: 'Activate Light Mode',
  })


  useEffect(()=>{
    if(isDark){
      setDisplaySettings({
        position: 'translate(13px)',
        text: 'dark',
        label: 'Activate Light Mode',
      })
      
    }else{
      setDisplaySettings({
        position: 'translate(0px)',
        text: 'light',
        label: 'Activate Dark Mode',
      })
    }
  },[isDark])

  return (
 
    <>
       <button
        aria-label={displaySettings.label}
        title={displaySettings.label}
        onClick={() => {
          setIsDark(!isDark)
        }}
        className={`${className} h-full flex justify-center items-center gap-2 group`}
      >
           <div className="wrap form-check-input appearance-none w-[30px]  rounded-full float-left h-[17px] align-top  bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm relative ">
            <input className='opacity-0 w-0 h-0' type="checkbox" />
            <span className={`absolute h-[13px] w-[13px] top-[2px]   left-[2px] rounded-full bg-custom-primary transition-transform`} style={{
              transform: displaySettings.position
            }}></span>
          </div>
          <span className='font-gaegu uppercase text-custom-secondary group-hover:text-custom-accent'>Toggle <span>{displaySettings.text}</span> mode</span>
      </button>


    
    </>

    
  )
}

export default ThemeToggle;
