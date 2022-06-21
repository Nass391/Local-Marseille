import React, { useState, useEffect } from 'react';
import Map from "./../components/Map";
import Producteur from "./../components/Producteur";
import Filter from "./../components/Filter";
import { getAllProducteurs } from '../api/apiProducteur'
import '../App.css';
import Background from "../assets/M005.jpg";
// import Background from "../assets/Vegetables.jpeg";
// import Background from "../assets/agriculture_urbaine1.jpg";


function Home() {

  const [producteurs, setProducteurs] = useState([])

  const filterProducteurs = (data) => {
    setProducteurs(data)
  }

  useEffect(() => {
    console.log("DATAS", producteurs)
    getAllProducteurs().then((response) => {
      setProducteurs(response);
    })
  }, []);

  return (
    <>
      <img className="backgroundImage" src={Background} width="100%" height={250} alt="producteur" />
      <Filter filterHandler={filterProducteurs} />
      
      <Map producteurs={producteurs} />
      <Producteur producteurs={producteurs} />
    </>
  );
};

export default Home;