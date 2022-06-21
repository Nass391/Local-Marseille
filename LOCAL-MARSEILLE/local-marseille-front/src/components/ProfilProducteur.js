import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from "./Navbar/NavbarElements";
import { getOneProducteur, getMyProfilProducteur } from '../api/apiProducteur'
import { deletePlace } from '../api/apiPlace'

const Profil = () => {

  // 0 - Set useState
  const [producteur, setProducteur] = useState(null);

  // 3 - AFFICHAGE DES PLACES & HORAIRES (à partir des producteurs)
  const renderProducteursPlaces = (p) => {
    return p?.map(producteurplace => {
      return (
        <tbody className="ProducteurPlaces" key={producteurplace.id} >
          <tr>
            <td className='column-horaire-marche'>{producteurplace.titre} </td>
            {renderPlacesHoraires(producteurplace.horaires)}
            <td>
              <Button onClick={() => { deletePlace(producteurplace.id).then((response) => { window.location.reload(true) }) }} variant="danger">
                Supprimer
              </Button>
            </td>
          </tr>
        </tbody>
      );
    })
  };
  // AFFICHAGE DES PRODUITS (à partir des producteurs)
  const renderProducteursProduits = (p) => {
    return p?.map(producteurproduit => {
      return (
        <div key={producteurproduit.id} className="profil-producteur-produits" >
          {producteurproduit.label}
        </div>
      );
    })
  };
  // AFFICHAGE DES HORAIRES (à partir des places)
  const renderPlacesHoraires = (p) => {
    return p?.map(horaire => {
      return (
        <tr key={horaire.id} >
          <td >{horaire.jour} :  {horaire.heure_debut} - {horaire.heure_fin} /  {horaire.frequence}    </td>
        </tr>
      );
    })
  };

  function handleSubmitLogout() {
    localStorage.clear();
    window.location.href = "/"
  }
  // 5 - Set useEffect
  useEffect(() => {
    getMyProfilProducteur().then((data) => {
      getOneProducteur(data.id).then((response) => {
        setProducteur(response)
      })
    });
  }, []);

  return (
    <div>
      {/* BANDEAU IMAGE */}
      <div className="backgroundProducteur">
        <img
          className="backgroundImage1"
          src={"http://127.0.0.1:8000/file/" + producteur?.image}
          width="100%"
          height={300}
          alt="producteur"
        />
        <div className="center2" >
          {producteur?.nom_exploitation}
        </div>
      </div>

      {/* PROFIL */}
      <div className='container-profil'>
        <div className='container-central'>

          <div className='container-left'>
            <div>
              <img className="img-profil-producteur" src={"http://127.0.0.1:8000/file/" + producteur?.image} alt="producteur" />
            </div>
          </div>
          <div className='container-milieu'>
            <div style={{
              fontFamily: 'Barlow Semi Condensed, sans-serif',
              fontstyle: 'ExtraBold',
              fontSize: '40px',
              fontWeight: '900',
              letterSpacing: '0.15em',
              WebkitTextStroke: '1px grey',
              color: 'white',
            }}> {producteur?.prenom} {producteur?.nom}</div>
            <div className='profil-producteur-sous_titre'> {producteur?.sous_titre}</div>
            <div className='profil-producteur-description_activite'> {producteur?.description_activite}</div>
            <div className='profil-contact'>
              <img width={30} height={30} src="/adress.png" />
              {producteur?.adresse_exploitation}
            </div>
            <div className='profil-contact'>
              <img
                className="emailLogo"
                width={20}
                height={20}
                src="/email.png"
              />  {producteur?.email}</div>
          </div>
          <div className='container-right'>
            <NavLink
              to={{ pathname: `/profil/update/${producteur?.id}` }}
              state={producteur}
              activeStyle={{ color: 'black' }}
            >
              <Button variant='success' className='button-maj-profil-producteur'>
                Mettre à jour mon profil
              </Button>
            </NavLink>
            <div style={{
              fontFamily: "Chewy",
              fontstyle: "ExtraBold",
              fontSize: "20px",
              fontWeight: "900",
              letterSpacing: "0.15em",
              color: "green",
            }}> Mes produits:
              {renderProducteursProduits(producteur?.produits)}
            </div>

          </div>
        </div>
        {/* TABLE HORRAIRES */}

        <div className='table-horaires-profil'>
          <div><h4> Présence sur les marchés</h4></div>
          <table className="table table-style">
            <thead className="table-head">
              <tr>
                <th>Pointe de vente</th>
                <th>Créneaux d'ouverture</th>
                <th>Action</th>
              </tr>
            </thead>
            {renderProducteursPlaces(producteur?.places)}
          </table>
          <Button className="button-dec"  variant="danger"
            onClick={() => handleSubmitLogout()}
            activeStyle={{ color: 'black', cursor: 'pointer' }}
          >
            Se déconnecter
          </Button>
        </div>



      </div >
    </div>
  )

};

export default Profil;