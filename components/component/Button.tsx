import Link from 'next/link'
import SVG from 'react-inlinesvg';
import React, { FC } from "react";
import * as prismicT from "@prismicio/types";
import { PrismicRichText } from '@prismicio/react';
import { ButtonProps } from '../../types/Button';
import { useAnalyticsEvent } from '../../hooks/useAnalytics';

const formatButtonLink = (link: any) => {

  const retSettings = {
    target: '_self',
    btnHref: '',
    currentPage: '',
    isCurrentPage: false,
  }
  
  switch (link?.link_type.toLowerCase()) {
    case 'web':
      if(link?.url){
        retSettings.btnHref = link?.url
        retSettings.target = '_blank'
      }
      break;
  
    case 'document':
      if(link?.slug){
        if (link?.slug !== 'home-page') {
          retSettings.btnHref = `/${link?.slug}`
        }else{
          retSettings.btnHref = `/`
        }
        if(retSettings.currentPage === retSettings.btnHref){
          retSettings.isCurrentPage = true
        }
        retSettings.target = '_self'
      }

      break;
  }

  return retSettings

}

const formatButtonContent = (content: prismicT.RichTextField | null ) : JSX.Element | null => {

  return (
    <PrismicRichText 
        field={content}
        components={{
          paragraph: ({ children }) =>  <>{children}</>,
          image: ({node}) => {
            return(
              <SVG className="icon" no-cors="true" src={node?.url} width={node.dimensions?.width} height={node.dimensions?.height} title={node?.alt ? node?.alt : 'SVG icon inside a button' } />
            )
          },
        }}
      />  
  )
}

const Button: FC<ButtonProps> = ({ file, target='_self', classList ='', type='button', style = 'default', link = null, eventHandler, textFirst = true, content}) => {


  const { trackCustomEvent }  = useAnalyticsEvent();

  let isCurrentPage = false;


  let variableClass = '';

  switch (style.toLowerCase()) {
    case 'text':
      variableClass = 'btn-text'
      break;
    case 'icon':
      variableClass = 'btn-icon'
      break;
    case 'ghost':
      variableClass = 'btn-ghost'
      break;
    case 'ghost-small':
      variableClass = 'btn-ghost-small'
      break;
    case 'ghost-filled':
      variableClass = 'btn-ghost-filled'
      break;
    default:
      variableClass = 'btn-default'
      break;
  }

  const buttonClass = classList.concat(` ${isCurrentPage ? 'is-current-page' : ''} btn ${variableClass}`)


  const triggerEvent = () => {
      trackCustomEvent({eventName:'clicked_download_cv', 
      eventTitle:'download_cv'
      });
  }

  if(type === 'link' && link){
    const {btnHref } = formatButtonLink(link)
    return (
      <Link  href={btnHref}>
        <a  key={`link`} className={buttonClass} target={target}>{formatButtonContent(content)}</a>
      </Link>
    )
  }else{
    
    // ScrollLink
    switch (type) {
      case 'download':
        console.log(file);
        
        return(
          <a key={`btn`} onClick={() => triggerEvent()} href={file?.url} target="_blank" className={buttonClass} rel="noreferrer">
          {formatButtonContent(content)}
        </a>
        )
        break;
      default:
        return(
          <button key={`btn`} className={buttonClass}>
            {formatButtonContent(content)}
          </button>
        )
        break;
    }
  
    }
}

export default Button

