import axios from 'axios'
import React, { useState, useContext, createContext } from 'react'

export const table = {
  Sports: 21,
  History: 23,
  Politics: 24,
  "General Knowledge": 9, 
  Geography: 22,
  Books: 10,
  Films: 11,
  Music: 12,
  Vehicles: 28 
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'Sports',
    difficulty: 'easy',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        setQuiz,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
