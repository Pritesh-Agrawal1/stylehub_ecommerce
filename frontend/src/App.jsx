import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import About from './pages/About';
import Userdashboard from './pages/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pages/ProfileInfo';
import Adminroute from './components/Adminroute';
import Admindashboard from './pages/Admindashboard';
import UsersList from './pages/UserList';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Kids from './pages/Kids';
import CategoryMgt from './pages/CategoryMgt';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} /> 
        <Route path='/register' element={<UserRegistration />} />  
        <Route path='/about' element={<About />} /> 
        <Route path='/contact' element={<Contact />} />

        <Route path='/mens' element={<Mens />} />
        <Route path='/womens' element={<Womens />} />
        <Route path='/kids' element={<Kids />} />

        <Route path='/user' element={<Privateroute />}>
         <Route path='dashboard' element={<Userdashboard />} /> 
         <Route path='profile-info' element={<ProfileInfo />} /> 
        </Route>

        <Route path='/admin' element={<Adminroute />}>
          <Route path='dashboard' element={<Admindashboard />} /> 
          <Route path='users' element={<UsersList />} />
          <Route path='products' element={<ProductList />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='categorymgt' element={<CategoryMgt />} />
        </Route>
        

      </Routes>
    </Router>
);
}

export default App
