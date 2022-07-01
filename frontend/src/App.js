import { BrowserRouter,Redirect,Route,Switch } from 'react-router-dom';

import './App.css';
import Login from './login/login';
import Signin from "./login/signin";
import Urlview from './urlview';
import Verified from './verified';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Urlview}/>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/signin" component={Signin} />
        <Route path="/verified" component={Verified}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;




