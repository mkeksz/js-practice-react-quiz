import React, {useState} from 'react'
import classes from './Layout.module.sass'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

export default props => {
  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => setMenu(!menu)
  const menuCloseHandler = () => setMenu(false)

  return (
    <div className={classes.Layout}>

      <Drawer
          isOpen={menu}
          onClose={menuCloseHandler}
      />

      <MenuToggle
          onToggle={toggleMenuHandler}
          isOpen={menu}
      />

      <main>
        {props.children}
      </main>

    </div>
  )
}

