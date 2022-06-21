import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
//  import { getAllProducteurs } from '../api/apiProducteur'

const Producteur = ({ producteurs }) => {
  //    const [producteurs, setProducteurs] = useState([]);

  // 2 - AFFICHAGE DES PRODUCTEURS
  const renderProducteurs = () => {
    return producteurs.map((producteur) => {
      if (producteur.image) {
        return (
          <>
            <div key={producteur.id} className="cardProducteur" >

              <Link
                className="linkColor"
                to={{
                  pathname: `/producteur/${producteur.id}`,
                }}
                state={producteur}

              >
                <div className="imageProducteur-container">
                  <img
                    className="imageProducteur"
                    src={"http://127.0.0.1:8000/file/" + producteur.image}
                  />
                </div>

                <div className="divText">
                  <div className="producteurName">
                    {producteur.nom}- {producteur.prenom}
                  </div>
                  <div className="producteurSoustitre-grid">
                    {producteur.nom_exploitation}
                  </div>
                </div>
              </Link >
            </div>
          </>
        );
      }

    });
  };

  // 3 - AFFICHAGE DES PRODUCTEURS-PLACES
  const renderProducteursPlaces = (p) => {
    return p.map((producteurplace) => {
      return (
        <div className="ProducteurPlaces" key={producteurplace.id}>
          {producteurplace.titre}
        </div>
      );
    });
  };

  // 4 - AFFICHAGE DES PRODUCTEURS-PRODUITS
  const renderProducteursProduits = (p) => {
    return p.map((producteurproduit) => {
      return <div key={producteurproduit.id}>{producteurproduit.label}</div>;
    });
  };

  return <div className="Producteurs">{renderProducteurs()}</div>;
};
export default Producteur;
