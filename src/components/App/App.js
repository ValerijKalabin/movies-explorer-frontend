import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
