import React,{Suspense} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UploadFiles from './uploadFiles';

import Home from './page/home';
import TripDetail from './page/tripDetails'
import Favorite from './page/favorite';
import Contact from './page/contact';
import About from './page/about';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './page/login';
import Additem from './page/addItem';
import User from './page/user';
import UserList from './page/userList';
import { initContext, ContextProvider } from './context';

const AppContext=()=>{
  const context=initContext({});
  return (
    <ContextProvider initialState={context.state} reducer={context.reducer}>
        <App />
    </ContextProvider>
  )
}
function App(props) {
  return (
    <React.Fragment>
      <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route path="/tripDetail/:ID" component={TripDetail} />
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/favorite" component={Favorite} />
            <Route path="/login" component={Login} />
            <Route path="/userprofile" component={User} />
            <Route path="/additem/:ID" component={Additem} />
            <Route path="/userList"  component={UserList} />
          </Switch>
          <Footer />
      </Router>
    </React.Fragment>    
  );
}

export default AppContext;
