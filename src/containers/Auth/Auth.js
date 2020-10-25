import React, {useState} from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default props => {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  })
  const [isFormValid, setIsFormValid] = useState(false)

  const loginHandler = () => {

  }
  const registerHandler = () => {

  }
  const submitHandler = event => {
    event.preventDefault()
  }
  const onChangeHandler = (event, controlName) => {
    const formCntrls = {...formControls}
    const control = {...formCntrls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formCntrls[controlName] = control

    let _isFormValid = true

    Object.keys(formCntrls).forEach(name => {
      _isFormValid = formCntrls[name].valid && _isFormValid
    })

    setFormControls(formCntrls)
    setIsFormValid(_isFormValid)
  }

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      return (
          <Input
              key={controlName + index}
              type={control.type}
              value={control.value}
              valid={control.valid}
              touched={control.touched}
              label={control.label}
              shouldValidate={!!control.validation}
              errorMessage={control.errorMessage}
              onChange={event => onChangeHandler(event, controlName)}
          />
      )
    })
  }

  function validateControl(value, validation) {
    if (!validation) return true

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={submitHandler} className={classes.AuthForm}>
            {renderInputs()}

            <Button type="success" disabled={!isFormValid} onClick={loginHandler}>Войти</Button>
            <Button type="primary" disabled={!isFormValid} onClick={registerHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
  )
}
