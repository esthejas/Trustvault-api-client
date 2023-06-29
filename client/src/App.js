import Signup from '../src/pages/login/signup'
import Home from './pages/home/home';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Createvault from './pages/createvault/createvault';
import Viewvault from './pages/viewvault/viewvault';
import Updatevault from './pages/updatevault/updatevault';
import { Keyprovider } from './components/context';
import NomOtpAuth from './pages/otpauth/otpauth';
import Nomgetdata from './pages/nomgetdata/nomgetdata';

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
          <Route path="/nominee/otp" element={<NomOtpAuth/>} />
          <Route path="/nominee/vault" element={<Nomgetdata />} />
        </Routes>
      </Router>
    </Keyprovider>
    
  );
}

export default App;
