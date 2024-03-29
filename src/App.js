import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile';
import MyPlants from './pages/MyPlants';
import NavBar from './components/NavBar';
import Diagnose from './pages/Diagnose';
import MorePage from './pages/MorePage';
import ForgotPassword from './pages/ForgotPassword'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'
import PlantSunlight from './pages/PlantSunlight';
import Category from './pages/Category';
import Plant from './pages/Plant';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {
  return (
    <>
      <Router>
      
      <Routes>
      <Route path='/' element={<HomePage/>} />
      
      <Route path='/profile' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />

      </Route>
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/my-plants' element={<MyPlants/>} />
      <Route path='/diagnose' element={<Diagnose/>} />
      <Route path='/more-page' element={<MorePage/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/category/:categoryName' element={<Category />} />
      <Route path='/category/:categoryName/:plantId/' element={<Plant />}/>
      <Route path='/category/:categoryName/:plantId/PlantSunlight' element={<PlantSunlight />}/>

      </Routes>


      


      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
