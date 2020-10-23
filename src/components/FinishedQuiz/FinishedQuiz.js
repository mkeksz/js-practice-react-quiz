import React from 'react'
import classes from './FinishedQuiz.module.sass'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

export default props => {
  const successCount = Object.keys(props.results).reduce((acc, key) => {
        if (props.results[key] === 'success') acc++
        return acc
      }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quiz, index) => {
          const cls = [
              'fa',
              props.results[quiz.id] === 'error' ? 'fa-times' : 'fa-check',
              classes[props.results[quiz.id]]
          ]

          return (
            <li key={quiz.id}>
              <strong>{index + 1}. </strong>
              {quiz.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}
