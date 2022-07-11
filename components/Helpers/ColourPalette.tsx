import React, { FC } from "react";
import { ColourProps } from "../../types/Helpers";

const createCSSVar = (type:string, name: string,  value: string) => {
	return `--theme-${type}-${name}:${value};`;
}

const createGroupCSSVar = (groupName: string,name: string, val1: string, val2: string) => {
	let returnString = '';

	if (val1) {
		returnString = createCSSVar(groupName, name, val1)
	}else if (val2){
		returnString = createCSSVar(groupName, name, val2)
	}
	return returnString
}



const ColourPalette: FC<ColourProps> = ({palette}) => {
	
	let paletteAll = '';

	palette.colour.map(({name,dark,light})=>{
		const niceName = name.toLowerCase().replace(' ', '-')
		paletteAll = paletteAll.concat(createGroupCSSVar('light', niceName, light, dark))
		paletteAll = paletteAll.concat(createGroupCSSVar('dark', niceName, light, dark))
	})
	
	return (
		<style jsx global>{`
		:root{
			${paletteAll}
		}
	  `}</style>
	);
}
 
export default ColourPalette;