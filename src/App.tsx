import React from 'react';
import './App.scss';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button disabled>hello</Button>
      <Button className="custom" size='small' type='primary'>hello</Button>
    </div>
  );
}

export default App;
