import React, {useEffect, useState} from 'react'
import classes from './QuizList.module.sass'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

export default () => {
  const [quizes, setQuizes] = useState([])
  const [loading, setLoading] = useState(true)

  function renderQuizes() {
    return quizes.map(quiz => (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
    ))
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('/quizes.json')

        const _quizes = []
        Object.keys(response.data).forEach((key, index) => {
          _quizes.push({
            id: key,
            name: `Тест №${index + 1}`
          })
        })
        setQuizes(_quizes)
        setLoading(false)
      }
      catch (e) {
        console.log(e.message)
      }
    }

    fetch()
  }, [])

  return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {loading ? <Loader/> : <ul>{renderQuizes()}</ul>}
        </div>
      </div>
  )
}
