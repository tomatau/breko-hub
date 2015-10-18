import React from 'react';
import style from './App.module.scss';
import './Appy.css';
import img from '~/src/assets/avatar.jpeg';

class App extends React.Component {
  render() {
    return (
      <main className={style.app}>
        <img src={img} alt="Me"/>
        The App
      </main>
    )
  }
}

export default App;
