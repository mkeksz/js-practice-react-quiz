import React from 'react'
import classes from './QuizList.module.sass'
import {NavLink} from 'react-router-dom'

export default props => {
  function renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
          <li key={quiz}>
            <NavLink to={'/quiz/' + quiz}>Тест {quiz}</NavLink>
          </li>
      )
    })
  }

  return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>
            {renderQuizes()}
          </ul>
        </div>
      </div>
  )
}
