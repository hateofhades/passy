import './App.scss';
import AuthPage from './Components/AuthPage/AuthPage';
import Logout from './Components/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.value);

  return (
    <div className="App">
      {user.username === "" && <AuthPage />}
      {user.username !== "" && <Logout />}
      <ToastContainer />
    </div>
  );
}

export default App;
