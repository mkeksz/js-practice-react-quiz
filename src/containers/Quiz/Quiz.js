import React, {useState} from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

export default () => {
  const [results, setResults] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [quiz] = useState([
    {
      id: 1,
      question: 'Какого цвета небо?',
      rightAnswerId: 2,
      answers: [
        {text: 'Черный', id: 1},
        {text: 'Синий', id: 2},
        {text: 'Красный', id: 3},
        {text: 'Зеленый', id: 4}
      ]
    },
    {
      id: 2,
      question: 'В каком году основали Санкт-Петербург?',
      rightAnswerId: 3,
      answers: [
        {text: '1700', id: 1},
        {text: '1702', id: 2},
        {text: '1703', id: 3},
        {text: '1803', id: 4}
      ]
    }
  ])

  const onAnswerClickHandler = answerId => {
    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') return
    }

    const question = quiz[activeQuestion]
    const res = results

    if (question.rightAnswerId === answerId) {
      if (!res[question.id]) res[question.id] = 'success'

      setAnswerState({[answerId]: 'success'})
      setResults(res)
      const timeout = setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true)
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
        }
        clearTimeout(timeout)
      }, 1000)

    }
    else {
      res[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(res)
    }
  }

  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }

  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }

  return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            isFinished
              ? <FinishedQuiz
                    results={results}
                    quiz={quiz}
                    onRetry={retryHandler}
                />
              : <ActiveQuiz
                    answers={quiz[activeQuestion].answers}
                    question={quiz[activeQuestion].question}
                    onAnswerClick={onAnswerClickHandler}
                    quizLength={quiz.length}
                    answerNumber={activeQuestion + 1}
                    state={answerState}
                />
          }
        </div>
      </div>
  )
}
