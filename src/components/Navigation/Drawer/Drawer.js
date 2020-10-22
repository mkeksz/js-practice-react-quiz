import React from 'react'
import classes from './Drawer.module.sass'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    1, 2, 3
]

export default props => {
  const cls = [classes.Drawer]

  if (!props.isOpen) cls.push(classes.close)

  function renderLinks() {
    return links.map((link, index) => {
      return (
          <li key={index}>
            <a>Link {link}</a>
          </li>
      )
    })
  }

  return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {renderLinks()}
          </ul>
        </nav>
        {props.isOpen ? <Backdrop onClick={props.onClose}/> : null}
      </>
  )
}
