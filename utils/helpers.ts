import axios from "axios"
import * as Yup from 'yup';


export const capitalizeString = (str: string) => {
    if (typeof str !== 'string' || !str) return str

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const numIsOdd = (index: number) => {
	return index % 2 === 0 ? false : true
}


export const resolveVariation = (variation: string, SectionComponents: any) => {
	const Section = SectionComponents[capitalizeString(variation)]
  
	if (Section) {
	  return Section
	}
  
	console.error('Cant find section', capitalizeString(variation))
	return null
}

export const outputVariableString = (val:string | undefined | (string | undefined)[] ) => {
	let returnString: any = '';
	if(Array.isArray(val)){
		let retArr: any = []

		val.forEach(element => {
		let val = outputVariableString(element);
		if(val.length > 0 ){
			retArr = [...retArr, outputVariableString(element)]
		}
		});

		returnString += retArr.join(' ')
	}else if(typeof val !==  'undefined' && typeof val !==  null){
		returnString += val
	}

	return returnString
}

export const findAndReplaceHolder = (replaceVals: any, str:string ) => {
	var placeholders = str?.match(/\$(.*?)\$/g)
	if (placeholders) {
		let newString = '';

		placeholders?.map((placeholder, i) => {

		// text without placeholder characters
		var phText: string = placeholder.substring(1, placeholder.length - 1);

		// replacen with new value
		if (replaceVals[phText as unknown as number]) {
			if (newString !== '') {
			newString = newString.replace(placeholder, replaceVals[phText as unknown as number])
			
			} else {
			if (str) {
				newString = str?.replace(placeholder, replaceVals[phText as unknown as number])
			}
			
			}
		}
		})
		return newString;
	} else {
		return str;
	}

}

export const getQuizCategories = async () => {

	const sourceURL = "https://the-trivia-api.com/api/categories";
	const response = await axios.get(sourceURL);
	const categories = await response.data
	const quizCategories = formatQuizCategories(categories)
  
    return quizCategories;
}


export const findTheLongestString = (myarry: any[]) => {
    var max = myarry[0].length;
    myarry.map(item => max = Math.max(max, item.length));
    return myarry.filter(item => item.length == max);
}


export const formatQuizCategories: any = (categories: any[]) => {
	const formattedCategores = [];

	for (const [key, value] of Object.entries(categories)) {
	  const mainString = findTheLongestString(value as []) // required due to the way the data is returned with tags in variable order
	  
	  const newObj = {
		uid: mainString[0],
		label: key,
		img: 'TEST IMG'
	  }
	  formattedCategores.push(newObj)
	}
	return formattedCategores
}

  
export const getGeoInfo = async () => {

	return await axios({
		method: "GET",
		url: "https://ipapi.co/json/",
	  })
};


interface formData {
    avatar: string,
    name: string,
    category: string[],
    difficulty: string,
    limit: number,
    question_region: string
}

const formatForAPI = (values: formData) =>{

    const {limit, category, difficulty, question_region} = values
    const categories = category.join(',')

    const requestURL = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=${limit}&difficulty=${difficulty}&region=${question_region}`

	return requestURL;
    
  }


export const fetchQuestions = async (values:formData) => {
	return await axios({
		method: "GET",
		url: formatForAPI(values),
	})
};

interface questionProps {
   id: string
   correctAnswer: string
   incorrectAnswers: string[]
   category: string
   type: string
   question: string
}




 type answerProp = {
    [key: string ]: {
		uid: string,
		question: string,
		answer: string
		options: any[]
	 } 
}


export const getQuizQuestions = async (values:formData) => {
	
    const quizQuestions = await fetchQuestions(values) as any
	// const correctAnswers: answerProp[] = [];
	const correctAnswers: answerProp = {};
	const initialValues:any = {};

	const formattedQuestions = quizQuestions.data.map((val: questionProps, index: number)=>{
		const questionNumber = `question-${index + 1}`
		let questionType = ''

		initialValues[questionNumber] = ''

		// merge all possible answers
		val.incorrectAnswers.push(val.correctAnswer)
		const options = val.incorrectAnswers.map((value,key)=>{
			return{
				uid: `answer-${key}`,
				label: value,
			}
		})

		// for checking correct answers at end of game
		correctAnswers[questionNumber] = {
			uid: `answer-${val.incorrectAnswers.lastIndexOf(val.correctAnswer)}`,
			question: val.question,
			answer: val.correctAnswer,
			options: options
		}


		switch (val.type) {
			case 'Multiple Choice':
				questionType = 'radioBasic' as const
				break;
			default:
				break;
		}

		return {
			uid: questionNumber,
			questionNumber: index + 1,
			type: questionType ,
			category: val.category,
			question: val.question,
			options: options,
			validationSchema: 
			Yup.object().shape({
				[questionNumber]:  Yup.string().required(`You must select an answer`)
			}),
		}
	})

	return {
		questions: formattedQuestions,
		answers: correctAnswers,
		initialValues: initialValues,
	};
};


export const fetchGlobalComponents = async (client: any)  =>{
	const header =  await client.getSingle("header");
	const footer =  await client.getSingle("footer");
	const colourPalette =  await client.getSingle("colour-palette");
  
	return {
	  header: header?.data,
	  footer: footer?.data,
	  colourPalette: colourPalette?.data,
	}
  }
  