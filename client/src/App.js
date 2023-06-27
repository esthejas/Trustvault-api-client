import Signup from '../src/pages/login/signup'
import Home from './pages/home/home';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Createvault from './pages/createvault/createvault';
import Viewvault from './pages/viewvault/viewvault';
import Updatevault from './pages/updatevault/updatevault';
import { Keyprovider } from './components/context';

function App() {
  return (
    <Keyprovider>
      <Router>
        <Routes>
          <Route path="/" element ={ <Signup />}/>
          <Route path='/home' element ={<Home />}/>
          <Route path='/createvault' element={<Createvault/>}/>
          <Route path='/viewvault' element={<Viewvault/>}/>
          <Route path='/updatevault' element={<Updatevault/>}/>
          
        </Routes>
      </Router>
      </Keyprovider>
    
  );
}

export default App;
