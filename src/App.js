import logo from './logo.svg';
import './App.css';

import List from './List'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <List />
    </div>
  );
}

export default App;
