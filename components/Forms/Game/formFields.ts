import * as Yup from 'yup';
import ISOCountryCode from '../../../db/ISOCountryCode.json';

export const user = {
    'id': 1,
    'label': 'User creation' ,
    'fields': [
        {
            uid: 'name',
            defaultValue: '',
            type: 'textInput'  as const,
            placeholder: 'Your name',
            label: 'What shall we call you?',
            requiredErrorMsg: 'ERRRor msg'
        },
       {
            uid: 'avatar',
            defaultValue: 'squid',
            type: 'radioStyled'  as const,
            label: 'Choose your avatar',
            requiredErrorMsg: 'You need to select an avatar',
            options: [
                {
                    uid: 'squid',
                    label: 'Squid',
                    img: 'TEST IMG'
                },
                {
                    uid: 'llama',
                    label: 'Llama',
                    img: 'TEST IMG'
                }
            ]
            
        },
    ],
    'validationSchema': 
        Yup.object().shape({
            name: Yup.string().required(`We need to know your name`),
            avatar: Yup.string().required(`You need to select an avatar`)
        }),
        
}


export const category = {
    'id': 2,
    'label': 'Category',
    'fields': [
       {
            uid: 'category',
            type: 'checkboxStyled'  as const,
            label: 'Choose a category',
            defaultValue: ['general_knowledge'],
            requiredErrorMsg: 'You need to set a category!',
            options: [
                {
                    uid: 'random',
                    label: 'Random',
                    img: 'TEST IMG'
                },
                {
                    uid: 'maths',
                    label: 'Maths',
                    img: 'TEST IMG'
                }
            ]
        },
        {
            uid: 'question_region',
            type: 'select'  as const,
            label: 'Choose a question region',
            defaultValue: 'GB',
            requiredErrorMsg: '',
            options: ISOCountryCode
        }
    ],
    'validationSchema': 
        Yup.object().shape({
            category: Yup.array().min(1, 'You must select at least one category').of(Yup.string().required()).required(),
            question_region: Yup.string().required(`err`),
        }),
}

export const settings = {
    'id': 3,
    'label': 'Settings',
    'fields': [
        {
            uid: 'difficulty',
            defaultValue: 'easy',
            type: 'radioBasic'  as const,
            label: 'Choose a difficulty',
            requiredErrorMsg: 'You need to set a difficulty!',
            options: [
                {
                    uid: 'easy',
                    label: 'Easy',
                },
                {
                    uid: 'medium',
                    label: 'Medium',
                },
                {
                    uid: 'hard',
                    label: 'Hard',
                }
            ]
        },
        {
            uid: 'limit',
            defaultValue: '10',
            type: 'number'  as const,
            placeholder: 'e.g 10',
            label: 'Number of questions',
            requiredErrorMsg: 'You need to set a number of questions!'
        }
    ],
    'validationSchema': 
        Yup.object().shape({
            difficulty: Yup.string().required(`err`),
            limit: Yup.number().max(20)
        }),
}



export const formFields = [
    user,
    category,
    settings
];
  

type initialProps = {
    [key: string]: any 
}

export const initialValues:initialProps = {};

formFields.map((val) => {
    val.fields.map((val) => {
        initialValues[val.uid] = val?.defaultValue
    })
}) 


