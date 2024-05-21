import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import Diagnose from './pages/Diagnose';
import MorePage from './pages/MorePage';
import ForgotPassword from './pages/ForgotPassword'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'
import PlantSunlight from './pages/PlantSunlight';
import Category from './pages/Category';
import DiagnoseResult from './pages/DiagnoseResult';
import ErrorPage from './pages/ErrorPage';
import Plant from './pages/Plant';
import MyDiagnose from './pages/MyDiagnose';
import ChatBotPage from './pages/ChatBotPage';
import ExpertPage from './pages/ExpertPage';
import ExpertQuestionPage from './pages/ExpertQuestionPage';
import DiagnoseQuestions from './pages/DiagnoseQuestions';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {
  return (
    <>
      <Router>
      <NavBar />
      <Routes>
      <Route path='/' element={<HomePage/>} />
      
      <Route path='/profile' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />

      </Route>
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/diagnose' element={<Diagnose/>} />
      <Route path='/more-page' element={<MorePage/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/category/:categoryName' element={<Category />} />
      <Route path='/category/:categoryName/:plantId/' element={<Plant />}/>
      <Route path='/category/:categoryName/:plantId/PlantSunlight' element={<PlantSunlight />}/>
      <Route path='/my-plants/:diagnoseId' element={<DiagnoseResult/>} />
      <Route path='/error' element={<ErrorPage/>} />
      <Route path='/my-diagnose' element={<MyDiagnose/>} />
      <Route path='/chatbot' element={<ChatBotPage/>} />
      <Route path='/expert' element={<ExpertPage/>} />
      <Route path='/expert/:diagnoseId' element={<ExpertPage/>} />
      <Route path='/chatbot/:diagnoseId' element={<ChatBotPage/>} />
      <Route path='/diagnose-questions' element={<ExpertQuestionPage/>} />
      <Route path='/diagnose-questions/:diagnoseId' element={<ExpertQuestionPage/>} />
      <Route path='/expert-questions/:diagnoseId' element={<DiagnoseQuestions/>} />
      
      </Routes>


      


      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
