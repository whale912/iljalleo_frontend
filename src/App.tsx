import React from 'react';
import './App.css';
import Header from './layouts/header';
import Menu from './layouts/menu';
import Main from './layouts/main';

function App() {
  return (
      <div className="wrap-div">
          <Header/>
          <Menu/>
          <Main/>
      </div>
  );
}

export default App;
