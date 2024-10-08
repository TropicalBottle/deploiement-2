import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";
import {useState} from "react";

function App() {
  // const [count, setCount] = useState(0);
  //
  // const ClickOnMe = () => {
  //   setCount(count+1);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Counter/>

        {/*<button onClick={ClickOnMe}>click me</button>*/}
        {/*<br/>*/}
        {/*<span data-testid="count">{count}</span>*/}
      </header>
    </div>
  );
}

export default App;
