import React, {useState} from 'react'
import classes from './QuizCreator.module.sass'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default props => {
  const [quiz, setQuiz] = useState([])
  const [isFormValid, setIsFormValid] = useState(false)
  const [formControls, setFormControls] = useState(createFormControls())
  const [rightAnswer, setRightAnswer] = useState(1)

  const submitHandler = event => event.preventDefault()
  const addQuestionHandler = event => {
    event.preventDefault()

    const _quiz = quiz.concat()
    const index = _quiz.length + 1

    const {question, option1, option2, option3, option4} = formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswer,
      answers: [
        {
          text: option1.value,
          id: option1.id
        },
        {
          text: option2.value,
          id: option2.id
        },
        {
          text: option3.value,
          id: option3.id
        },
        {
          text: option4.value,
          id: option4.id
        }
      ]
    }

    _quiz.push(questionItem)

    setQuiz(_quiz)
    setIsFormValid(false)
    setRightAnswer(1)
    setFormControls(createFormControls())
  }
  const createQuizHandler = event => {
    event.preventDefault()

    console.log(quiz)
  }
  const selectChangeHandler = event => {
    setRightAnswer(+event.target.value)
  }
  const changeHandler = (value, controlName) => {
    const _formControls = {...formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    _formControls[controlName] = control

    setFormControls(_formControls)
    setIsFormValid(validateForm(_formControls))
  }

  function renderControls() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]

      return (
          <React.Fragment key={controlName}>
            <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={event => changeHandler(event.target.value, controlName)}
            />
            {index === 0 ? <hr/> : null}
          </React.Fragment>
      )
    })
  }

  const select = <Select
      label="Выберите правильный ответ"
      value={rightAnswer}
      onChange={selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
  />

  return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={submitHandler}>
            {renderControls()}

            {select}

            <Button
              type="primary"
              onClick={addQuestionHandler}
              disabled={!isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
                type="success"
                onClick={createQuizHandler}
                disabled={quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
  )
}
