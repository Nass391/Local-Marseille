import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getOneProducteur } from "../api/apiProducteur";
import { icons } from "react-icons/lib";
import Background from "../assets/Vegetables.jpeg";
import MapProducteurById from "./../components/MapProducteurById";
import { Marker, Popup } from 'react-map-gl';

const ViewProducteurDetails = () => {
  const [producteur, setProducteur] = useState(null);
  const location = useLocation();
  const data = location.state;
  console.log("PRODUCTEUR DATA", data.id);

  // 3 - AFFIC-AGE DES PLACES & HORAIRES (à partir des producteurs)
  const renderProducteursPlaces = (p) => {
    return p?.map((producteurplace) => {
      return (
        <tbody className="ProducteurPlaces" key={producteurplace.id}>
          <tr>
            <td className='column-horaire-marche'>{producteurplace.titre} </td>
            {renderPlacesHoraires(producteurplace.horaires)}
          </tr>
        </tbody>
      );
    });
  };
  // AFFICHAGE DES PRODUITS (à partir des producteurs)
  const renderProducteursProduits = (p) => {
    return p?.map((producteurproduit) => {
      return <div key={producteurproduit.id}>{producteurproduit.label}</div>;
    });
  };
  // AFFICHAGE DES HORAIRES (à partir des places)
  const renderPlacesHoraires = (p) => {
    return p?.map((horaire) => {
      return (
        <tr key={horaire.id}>
          <td>
            {horaire.jour} : {horaire.heure_debut} - {horaire.heure_fin} /
            {horaire.frequence}
          </td>
        </tr>
      );
    });
  };
  useEffect(() => {
    getOneProducteur(data.id).then((response) => {
      setProducteur(response);
    });
  }, []);

  return (
    <>
      <div>
        <div className="backgroundProducteur">
          <img
            className="backgroundImage1"
            src={"http://127.0.0.1:8000/file/" + producteur?.image}
            width="100%"
            height={350}
            alt="producteur"
          />
          <div className="center2">
            {producteur?.nom_exploitation}
          </div>
        </div>

        <div className="Divprincipal">
          <div className="texte-details">
            <div className="containerGauche">
              <div className="CartProducteur">
                <div
                  style={{
                    fontFamily: 'Barlow Semi Condensed, sans-serif',
                    fontstyle: 'ExtraBold',
                    fontSize: '20px',
                    fontWeight: '900',
                    letterSpacing: '0.15em',
                    WebkitTextStroke: '1px grey',
                    color: 'white',
                    textAlign: "center",
                  }}
                >
                  {producteur?.nom_exploitation}
                </div>
                <div className="ViewProducteurDetail">
                  <strong>
                    {producteur?.nom} {producteur?.prenom}
                  </strong>
                </div>
                <div>
                  <div className="DetailsProducteur">
                    <div className="ProducteurSousTitre">
                      {producteur?.sous_titre}
                    </div>

                    <div className="DescriptionActivité">
                      {producteur?.description_activite}
                    </div>
                  </div>
                  <div className="Info">
                    <div className="ProducteureAdressExploitation">
                      <img width={30} height={30} src="/adress.png" />
                      {producteur?.adresse_exploitation}
                    </div>

                    <div className="Producteuremail">
                      <img
                        className="emailLogo"
                        width={20}
                        height={20}
                        src="/email.png"
                      />
                      {producteur?.email}
                    </div>
                    <div style={{
                      fontFamily: "Chewy",
                      fontstyle: "ExtraBold",
                      fontSize: "20px",
                      fontWeight: "900",
                      letterSpacing: "0.15em",
                      color: "green",
                    }}> Produits vendus:
                      {renderProducteursProduits(producteur?.produits)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container-Image-Map">
            <div>
              <img
                className="carteProducteur"
                src={"http://127.0.0.1:8000/file/" + producteur?.image}
                width={450}
                height={400}
                alt="producteur"
              />
            </div>
          </div>

        </div>
      </div>
      <div>

        {/* TABLE HORRAIRES */}
        <div className="producteur-details-container-central-2">
          <div className="cont-left">
            <div className='table-horaires-producteur'>
              <div><h4> Présence sur les marchés</h4></div>
              <table className="table table-style">
                <thead className="table-head">
                  <tr>
                    <th>Pointe de vente</th>
                    <th>Créneaux d'ouverture</th>
                  </tr>
                </thead>
                {renderProducteursPlaces(producteur?.places)}
              </table>
            </div>
          </div>
          <div className="cont-right">
            <MapProducteurById />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProducteurDetails;
