import React from 'react'
import classes from './AnswersList.module.sass'
import AnswerItem from './AnswerItem/AnswerItem'

export default props => (
  <ul className={classes.AnswersList}>
    {props.answers.map((answer, index) =>
        <AnswerItem
            answer={answer}
            key={answer.id}
            onAnswerClick={props.onAnswerClick}
            state={props.state ? props.state[answer.id] : null}
        />
        )
    }
  </ul>
)
