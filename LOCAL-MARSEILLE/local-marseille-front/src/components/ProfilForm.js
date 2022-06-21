import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import styles from "../App.css";
import Modal from "./ModalPointDeVente";
import { getallProduits } from '../api/apiProduit'
import { updateProducteur } from '../api/apiProducteur'

import { NavLink } from ".././components/Navbar/NavbarElements";
import { FaWindows } from 'react-icons/fa';
// import { useLocation } from "react-router-dom";

const Profil = ({ producteur }) => {

  // 0 - Set useState
  // const [producteur, setProducteur] = useState(null);
  const [produits, setProduits] = useState(null);
  const [produitsProducteur, setProduitsProducteur] = useState([]);
  const [inputs, setInputs] = useState({});
  // const location = useLocation();
  // const producteur = location.state;

  // 3 - Récupération des données du formulaire
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log("INPUT", inputs)
  }

  // 4 - Envoie des donnés du formulaire et des checkboxs vers le back-end
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("ID PRODUITS SELECTIONNES", produitsProducteur);
    console.log("INPUTS ", produitsProducteur);
    const producteurId = { producteurId: producteur.id }
    console.log("ID PRODUCTEUR", producteurId);
    const produitId = { produitId: produitsProducteur }
    const data = { ...inputs, ...producteurId, ...produitId }
    console.log("DATA PRODUCTEUR", data);
    updateProducteur(data);
    window.alert("Votre profil producteur a bien été mis à jour");
  }

  // 5 - Set useEffect
  useEffect(() => {
    console.log("DATA", producteur)
    // getOneProducteur()
    getallProduits().then((response) => {
      setProduits(response)
    })
  }, []);

  return (

    <div className='formProfil'>

      <NavLink to="/profil">
        <div className='buttonRetour'>
          <img src={"http://127.0.0.1:8000/file/back.png"} className="img-fluid img-bordered" width="20px" alt="Mhello"
          />  Retourner sur mon profil
        </div>
      </NavLink>
      {/* <div className='profilformTitre'>{producteur?.nom_exploitation} </div> */}
      <div className="app flex-row align-items-center"></div>

      <Form onSubmit={handleSubmit}>

        <div className='inputTitre'>
          <Form.Group>
            <Form.Label>
              <div style={{ fontFamily: 'roboto', fontstyle: 'Regular', fontSize: '20px', fontWeight: '400', color: '#388D59', textAlign: "left", }}>
                Veuillez renseigner un titre
              </div>
            </Form.Label>

            <Form.Control
              type="text"
              name="sous_titre"
              value={inputs.sous_titre || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div className='inputDescription'>
          <Form.Group>
            <Form.Label>Veuillez renseigner une description</Form.Label>
            <Form.Control as="textarea" rows={3}
              type="text"
              name="description_activite"
              value={inputs.description_activite || ""}
              onChange={handleChange} />
          </Form.Group>
        </div>
        <div className='inputDescription'>
          <Form.Group>
            <div>
              <Form.Label>Veuillez sélectionner les catégories de produits que vous proposez </Form.Label>
            </div>
            <div>
              {produits?.produits.map((prod, index) => (
                <>
                  <Form.Check
                    inline
                    label={prod.label}
                    value={prod.id}
                    name="produits"
                    onChange={(v) => {
                      const idProduit = v.target.value;
                      console.log(idProduit);
                      console.log(produitsProducteur)
                      const existe = produitsProducteur.find(p => p == prod.id)
                      console.log(existe)
                      if (existe) {
                        console.log("je rentre dans le existe");
                        const newProduitsProducteurList = produitsProducteur.filter((item) => item != idProduit)
                        setProduitsProducteur([...newProduitsProducteurList])
                      } else {
                        console.log("je rentre dans le else");
                        setProduitsProducteur([...produitsProducteur, idProduit])
                      }
                    }}
                    type="checkbox"
                    id={index}
                  />
                </>
              ))}
            </div>
          </Form.Group>
        </div>
        <button class="btn btn-success" variant="primary" type="submit">
          Valider les modifications de mon profil
        </button>
      </Form>

    </div>
  )
};

export default Profil;
