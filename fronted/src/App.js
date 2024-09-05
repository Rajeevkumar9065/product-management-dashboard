
import './App.css';
import Nav from './Componenets/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Componenets/Footer';
import SignUp from './Componenets/SignUp';
import PrivateComponent from './Componenets/PrivateComponent';
import Login from './Componenets/Login';
import AddProduct from './Componenets/AddProduct';
import ProductList from './Componenets/ProductList';
import UpdateProduct from './Componenets/UpdateProduct';


function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path="/" element={<ProductList/>} />
        <Route path="/add" element={<AddProduct/>} />
        <Route path="/update/:id" element={<UpdateProduct/>} />
        <Route path="/logout" element={<h1>logout product Component</h1>} />
        </Route>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path='/Login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    </>
  );
}

export default App;
