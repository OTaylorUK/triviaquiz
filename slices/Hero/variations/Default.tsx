import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import * as prismicT from "@prismicio/types";
import {
	SliceComponentProps,
} from "@prismicio/react";
import Button from '../../../components/component/Button';
import { HeroSlice } from '../../../types/HeroSlice';
import Buttons from '../../../components/component/Buttons';

const Default = ({ slice }: SliceComponentProps<HeroSlice>) => {

  const {primary,items, slice_type} = {...slice}
  const {title, description} = primary;

  console.log({items});
  
  return(
    <section 
      id={slice_type}
      data-type={slice_type}
      className={`w-full pt-20 lg:pt-0 min-h-[100vh] flex justify-center items-center text-left `}
    >
      <div className="flex flex-col gap-8  text-center items-center text-custom-white">
          <PrismicRichText 
            field={title}
          />  
           <PrismicRichText 
            field={description}
          /> 
          <Buttons buttons={items} replaceKey={true}/>
      </div>


  </section>
  )
}

export default Default