import './App.scss';
import AuthPage from './Components/AuthPage/AuthPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthPage />
      <ToastContainer />
    </div>
  );
}

export default App;
