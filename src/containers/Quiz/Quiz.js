import React, {useEffect, useState} from 'react'
import classes from './Quiz.module.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

export default props => {
  const [results, setResults] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/quizes/${props.match.params.id}.json`)
        const _quiz = response.data
        console.log(_quiz)
        setQuiz(_quiz)
        setLoading(false)
      }
      catch (e) {
        console.log(e.message)
      }
    })()
  }, [props.match.params.id])

  const onAnswerClickHandler = answerId => {
    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') return
    }

    const question = quiz[activeQuestion]
    const res = results

    if (question.rightAnswer === answerId) {
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
  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }
  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }

  return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            loading
              ? <Loader/>
              : isFinished
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
