import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages';
import Profil from './pages/profil';
import Contact from './pages/contact';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Producteurs from './pages/producteurs';
import Places from './pages/places';
import ProfilFormPage from './pages/ProfilFormPage';
import ViewProducteurDetails from './pages/ViewProducteurDetails';
import Footer from './components/Footer';
function App() {

  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/profil" element={<Profil />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            {/* <Route path="/producteurs" element={<Producteurs />}></Route> */}
            <Route path="/producteur/:id" element={<ViewProducteurDetails />}></Route>
            <Route path="/places" element={<Places />}></Route>
            <Route path="/profil/update/:id" element={<ProfilFormPage />}></Route>
          </Routes>
        </Router>
        <Footer />
      </div>
     
    </>
  );
}

export default App;