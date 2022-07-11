import create from "zustand";
import { persist } from 'zustand/middleware'
import { getQuizQuestions } from "../utils/helpers";

interface GameStore {
    name: string ;
    avatar?: any | undefined;
    category?: any | undefined;
    difficulty?: any | undefined;
    limit: number ;
    question_region?: any | undefined;
    quiz?: any[] | undefined
    updateUser: (name: string, avatar: string) => void;
    updateCategory: (category: string) => void;
    updateSettings: (difficulty: string, limit: number) => void;
    setQuestionRegion: (location: string) => void;
    setInitialRegion: (location: string) => void;
}

const initialState = {
    name: '',
    avatar: 'squid',
    category: [],
    difficulty: 'medium',
    limit: 10,
    question_region: '',
}

export const userStore = create<GameStore>()(persist(
      (set, get) => ({
        ...initialState,
        updateUser: (newName: any, newAvatar: any) => set(
          () => ({ name: newName, avatar: newAvatar })
        ),

        setInitialRegion: (newLocation: any) => set(
          (state) => {
            // if nothing set (by user) then automatically add the user ip country in\
            if(state.question_region === ""){
              return(
                { question_region: newLocation}
              )
            }else{return state}
          }
        ),
        setQuestionRegion: (newLocation: any) => set(
          () => ({question_region: newLocation})
        ),
        updateCategory: (newCategory: any) => set(
          () => ({ category: newCategory})
        ),
        updateSettings: (newDifficulty: any, newLimit: number) => set(
          () => ({ difficulty: newDifficulty, limit: newLimit })
        ),
       
    }),
  {
    name: 'game-settings-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
  )
);

