import create from "zustand";
import { persist } from 'zustand/middleware'
import { getQuizQuestions } from "../utils/helpers";

interface GameStore {
    questions?: any[] | undefined | never[]
    answers?: any | undefined
    initialValues?: any | undefined
    activeStep: number
    resultMessage: string
    results: any[] | null
    setQuestions: (questions: any[]) => void;
    setAnswers: (answers: any[]) => void;
    setInitialValues: (initialValues: any[]) => void;
    setupQuiz: (initialValues: quizSettings) => void;
    createNewGame: (initialValues: any[]) => void;
    updateActiveStep: (number: number) => void;
    setMessage: (resultMessage: string) => void;
    setResults: (resultMessage: any[] | null) => void;
}

const initialState = {
    questions: [],
    results: [],
    answers: {},
    initialValues: {},
    activeStep: 0,
    resultMessage: ''
}

interface quizSettings {
  avatar: any;
  name: string
  category: any;
  difficulty: any;
  limit: any;
  question_region: any;
}

export const gameStore = create<GameStore>()(persist(
      (set, get) => ({
        ...initialState,
        setQuestions: (newQuestions: any[]) => set(
          () => ({ questions: newQuestions })
        ),
        setResults: (newResults: any[] | null) => set(
          () => ({ results: newResults })
        ),
        setMessage: (newMessage: string) => set(
          () => ({ resultMessage: newMessage })
        ),
        
        setAnswers: (newAnswers: any) => set(
          () => ({ answers: newAnswers })
        ),
        updateActiveStep: (newNumber: any) => set(
          () => ({ activeStep: newNumber })
        ),
        setInitialValues: (newInitialValues: any) => set(
          () => ({ initialValues: newInitialValues })
        ),
        setupQuiz: async (values: quizSettings) => {
          // with same settings just new questions
          const quizQuestions = await getQuizQuestions(values) as any
          set({ 
            activeStep: 0,
            questions: quizQuestions.questions,
            answers: quizQuestions.answers,
            initialValues: quizQuestions.initialValues
          });
        },
        createNewGame:  () => {
          // clear settings & quiz -> redirect to /create-page
          set({ questions: []});
        }
    }),
  {
    name: 'game-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
  )
);
