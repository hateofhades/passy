import './App.scss';
import AuthPage from './Components/AuthPage/AuthPage';
import MainPage from './Components/MainPage/MainPage';
import Logout from './Components/Logout';
import CategoriesPage from './Components/CategoriesPage/CategoriesPage';
import AddPage from './Components/AddPage/AddPage';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const user = useSelector(state => state.user.value);

  return (
    <Router>
      <Switch>
        <Route path="/register" component={AuthPage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/logout" component={Logout} />
        {user.username === "" && <Route path="/" component={AuthPage} />}
        {user.username !== "" && <Route exact path="/" component={MainPage} />}
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/add" component={AddPage} />
      </Switch>
    </Router>
  );
}

export default App;
