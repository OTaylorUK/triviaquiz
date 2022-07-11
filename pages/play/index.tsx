import type { NextPage } from 'next'
import { SliceZone } from "@prismicio/react";
import { createClient } from "../../prismicio";
import ColourPalette from '../../components/Helpers/ColourPalette';
import { PageProps } from '../../types/PageType';
import { App, Page } from '../../components/Layout';
import Create from '../../components/Forms/Game/Create';
import { userStore } from '../../store/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Quiz from '../../components/Forms/Game/Quiz';
import { gameStore } from '../../store/game';
import shallow from 'zustand/shallow'
import { fetchGlobalComponents } from '../../utils/helpers';
import Game from '../../components/Layout/Game';

const Home: NextPage<PageProps> = (props) => {

  const {slices, seo, colourPalette,header, footer} = props 

  // if user has game settings set continue 
  // else redirect to the /create page
  // const{ questions, answers, initialValues,createNewGame, setupQuiz } = gameStore()

  const { questions, answers, initialValues,createNewGame, setupQuiz, updateActiveStep, results,setResults  } = gameStore(state => ({ 
    questions: state.questions,
    answers: state.answers,
    initialValues: state.initialValues,
    createNewGame: state.createNewGame,
    setupQuiz: state.setupQuiz,
    updateActiveStep: state.updateActiveStep,
    results: state.results,
    setResults: state.setResults,
  }), shallow)


  const currentSettings = userStore(state => ({ 
    avatar: state.avatar,
    name: state.name,
    category: state.category,
    difficulty: state.difficulty,
    limit: state.limit,
    question_region: state.question_region,
  }), shallow)


  const router = useRouter()

  useEffect(() => {
    if (questions?.length === 0) {
      router.push('/play/create-game')
    }
  }, [questions,router])
  // const [results, setResults] = useState<null | {}>(null)

  const resetGame = () => {
    setResults(null)
    updateActiveStep(0)
    setupQuiz(currentSettings)
  }
  
  return (
    <>
      <Game seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
        <Quiz results={results} setResults={setResults} />
      <br />

      <div className="flex flex-row gap-4">

        <button className='border p-2 bg-red-200' onClick={() => resetGame()}>Restart</button>
        <button className='border p-2 bg-red-600' onClick={() => createNewGame([])}>New quiz</button>
      </div>
      </Game>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

   // GLOBAL
   const{header, footer, colourPalette} = await fetchGlobalComponents(client)

   // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'play')

  return {
    props: {
      slices: page.data?.slices,
      colourPalette: colourPalette,
      header: header,
      footer: footer,
      seo: {
        title: page.data?.title ? page.data?.title : 'Ollie Taylor: Web Developer',
        description: page.data?.description ? page.data?.description : 'Ollie Taylor is a Frontend developer and designer passionate about building modern web applications using React.',
        ogImage: page.data?.ogImage,
      },
    },
  };
}

export default Home
