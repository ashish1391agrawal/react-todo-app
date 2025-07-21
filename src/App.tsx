import { Box, Grid } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

import Header from './components/Header'
import Home from './components/Home'
import useStyles from './styles'
import mocks from './mocks'
import { ChangeEvent, useRef, useState } from 'react';
import { ChildRefComponentInterface } from './components/Home/types'

const App = () => {
  const [bacgroundImage, setBackground] = useState('https://img.theculturetrip.com/wp-content/uploads/2017/10/the-ridge-shimla.jpg')

  const { todoLists } = mocks()

  const parentRef = useRef<ChildRefComponentInterface>()

  const handleBackground = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files
    if (!!file && file.length > 0) setBackground(URL.createObjectURL(file[0]))
  }

  const updateTodoLists = (): void => {
    const { current } = parentRef
    if (current) current.addNewList()
  }

  const classes = useStyles({ bacgroundImage })

  return (
    <Grid className={classes.root}>
      <Router>
        <Header
          addNewList={updateTodoLists}
          handleBackground={handleBackground}
        />
        <Box className={classes.todoAppContainer}>
          <Routes>
            <Route path="/" element={<Home todoLists={todoLists} ref={parentRef} />}>
              <Route index element={<Home todoLists={todoLists} ref={parentRef} />} />
            </Route>
          </Routes>
        </Box>
      </Router>
    </Grid>
  );
}

export default App;
