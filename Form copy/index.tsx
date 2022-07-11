import React, { FC } from "react";
import { resolveVariation } from '../../utils/helpers';
import * as SectionComponents from './variations'

interface LayoutProps {
  slice: any,
}

const Form: FC<LayoutProps> = ({ slice }) => {
  const SectionComponent = resolveVariation(slice?.variation, SectionComponents)

  if (!SectionComponent) {
    return <div key={slice.variation}>Missing slice: {slice.variation}</div>
  }

  return <SectionComponent slice={slice}  />
}

export default Form