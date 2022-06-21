import ProfilProducteur from "../components/ProfilProducteur";
import React, { useState, useEffect } from 'react';
import { NavBtn } from "../components/Navbar/NavbarElements";
import Button from "react-bootstrap/Button";


const Profil = () => {

  const renderProfilPage = () => {

    return (
      <>
        <ProfilProducteur />
      </>
    )
  }

  useEffect(() => {
    const producteur_access_token = localStorage.getItem('producteur_access_token');
    console.log("PRODUCTEUR ACCESS TOKEN", producteur_access_token)
    if (producteur_access_token === null || producteur_access_token === "undefined") {
      window.location.href = "/"
    }
  }, []);

  return (
    <>
      {renderProfilPage()}
    </>
  );
}
export default Profil;
