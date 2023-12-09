import logo from './logo.svg';
import './App.css';
import Index from "./routes/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/Global.css"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <Index/>
      <ToastContainer />
     
    </div>
  );
}

export default App;
