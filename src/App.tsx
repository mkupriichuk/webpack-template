import './styles/app.scss';
import twitter from 'icons/twitter.svg'
import samoyed from 'images/samoyed.jpg'
import React from 'react';
import { Button } from './components';

const App = (): JSX.Element => {
  return (
    <>
    <div className="container">
      <h1>Hello</h1>
      <div className="hero">
        <img src={twitter} alt=""/>
        <img src={samoyed} alt=""/>
      </div>
			<Button type="big">button</Button>
    </div>
    </>
  )
}

export default App
