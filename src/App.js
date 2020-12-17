import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import { Link  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1> - Learning how to use Cognito and Router - </h1>
      <Link to='/'>Home</Link>
      <br/>
      <Link to='/about'>About</Link>
      <Routes/>

    </div>
  );
}

export default App;
