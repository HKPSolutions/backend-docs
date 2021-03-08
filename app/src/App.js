import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom'
import BetaDocsPage from './pages/BetaDocsPage/BetaDocsPage';
import HomePage from './pages/HomePage/HomePage';
// import PageNotFoundPage from './pages/PageNotFoundPage/PageNotFoundPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/beta-api-docs' component={BetaDocsPage}/>
        {/* <Route exact path='/page-not-found' component={PageNotFoundPage} /> */}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
