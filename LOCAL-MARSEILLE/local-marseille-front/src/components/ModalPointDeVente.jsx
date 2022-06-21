import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import UploadPlace from "./uploadPlace";
import { createPlace } from "../api/apiPlace";
import { createHoraire } from "../api/apiHoraire";

const ModalPointDeVente = ({ setIsOpen1, producteur }) => {
  const tabHoraireInit = {
    id: 0,
    jour: null,
    heure_debut: null,
    heure_fin: null,
    frequence: null,
  };

  // 0 - Set useState
  const [inputsPlace, setInputsPlace] = useState({});
  const [result, setResult] = useState([]);
  const [inputsHoraire, setInputsHoraire] = useState({});
  const [tabHoraire, setTabHoraire] = useState([]);

  // 3 - Récupération des données du formulaire

  const handleChangePlace = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsPlace((values) => ({ ...values, [name]: value }));
    console.log(inputsPlace);
  };

  // const handleChangeHoraire = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputsHoraire(values => ({ ...values, [name]: value }))
  //   console.log(inputsHoraire)
  // }

  const handleChangeHoraire = (id, event) => {
    const name = event.target.name;
    const value = event.target.value;

    const horaire = tabHoraire.find((item) => item.id === id);
    horaire[name] = value;

    setTabHoraire([...tabHoraire.filter((item) => item.id !== id), horaire]);
  };

  // Function to convert adress place
  async function convertAdress() {
    return await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputsPlace.adresse}.json?limit=1&access_token=pk.eyJ1IjoibmFzczM5MSIsImEiOiJjbDNscHd2Z2IwMm13M2JwandyaTE3YXJhIn0.SBuLEnFF56RiFtUIFiFDYw`
      )
      .then(function (response) {
        return response.data.features[0].center;
      })
      .catch(function (error) {
        return error;
      });
  }

  const addHoraire = () => {
    console.log("add horaire");
    // setTabHoraire(tabHoraire.id += 1)
    console.log("check add horaire", tabHoraire);
    const newHoraire = tabHoraireInit;
    newHoraire.id = tabHoraire.length + 1;
    setTabHoraire([...tabHoraire, newHoraire]);
  };
  // 4 - Envoie des donnés du formulaire et des checkboxs vers le back-end
  const handleSubmit = (event) => {
   
    event.preventDefault();
    try {
      convertAdress().then(function (res) {
        const idProducteur = { producteurId: producteur.id };
        const latitude = { latitude: res[1] };
        const longitude = { longitude: res[0] };
        const dataPlace = {
          ...inputsPlace,
          ...idProducteur,
          ...latitude,
          ...longitude,
        };

        createPlace(dataPlace).then((response) => {
          setResult(response);
          console.log("RESULT FOR UPLOAD", response);

          const placeID = { placeId: response.id };
          for (const horaire of tabHoraire) {
            const dataUtil = {
              jour: horaire.jour,
              heure_debut: horaire.heure_debut,
              heure_fin: horaire.heure_fin,
              frequence: horaire.frequence,
            };
            const dataHoraire = { ...dataUtil, ...placeID };
            createHoraire(dataHoraire);
          }

          // const dataHoraire = {...inputsHoraire, ...placeID}
          // console.log("DATA HORAIRE", dataHoraire)
          // createHoraire(dataHoraire);
        });
      });
      window.alert("Votre point de vente à bien été ajouté votre profil");
    } catch (error) {
      return error;
    }
  };

  const renderSelectHoraire = () => {
    return tabHoraire.map((creneau) => {
      return (
        <div key={creneau.id} className="selectCreneau">
          <Form.Select
            aria-label="Default select example"
            name="jour"
            onChange={(event) => {
              handleChangeHoraire(creneau.id, event);
            }}
          >
            <option>Choisir un jour</option>
            <option value="Lundi">Lundi</option>
            <option value="Mardi">Mardi</option>
            <option value="Mercredi">Mercredi</option>
            <option value="Jeudi">Jeudi</option>
            <option value="Vendredi">Vendredi</option>
            <option value="Samedi">Samedi</option>
            <option value="Dimanche">Dimanche</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            name="heure_debut"
            onChange={(event) => {
              handleChangeHoraire(creneau.id, event);
            }}
          >
            <option>Choisir une heure de début</option>
            <option value="6:00">6:00</option>
            <option value="7:00">7:00</option>
            <option value="8:00">8:00</option>
            <option value="9:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            name="heure_fin"
            onChange={(event) => {
              handleChangeHoraire(creneau.id, event);
            }}
          >
            <option>Choisir une heure de fin</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
            <option value="00:00">00:00</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            name="frequence"
            onChange={(event) => {
              handleChangeHoraire(creneau.id, event);
            }}
          >
            <option>Choisir une fréquence</option>
            <option value="hebdomadaire">Hebdomadaire</option>
            <option value="mensuel">Mensuel</option>
            <option value="Saisonnier">Saisonnier</option>
          </Form.Select>
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen1(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              Ajouter un point de vente pour {producteur.nom_exploitation}
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen1(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className={styles.modalContent}>
            <div className="allInputsForm">
              <Form onSubmit={handleSubmit}>
                <div className="inputsModalPointdeVente">
                  <Form.Group>
                    <Form.Label>
                      Veuillez renseigner un nom pour ce nouveau point de vente
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="titre"
                      value={inputsPlace.titre || ""}
                      onChange={handleChangePlace}
                    />
                  </Form.Group>
                </div>
                <div className="inputsModalPointdeVente">
                  <Form.Group>
                    <Form.Label>
                      Veuillez renseigner une desccription du point de vente
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={inputsPlace.description || ""}
                      onChange={handleChangePlace}
                    />
                  </Form.Group>
                </div>

                <div className="inputsModalPointdeVente">
                  <Form.Group>
                    <Form.Label>
                      Veuillez renseigner une adresse valide (google Maps)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="adresse"
                      value={inputsPlace.adresse || ""}
                      onChange={handleChangePlace}
                    />
                  </Form.Group>
                </div>
                <div className="buttonAddCreneau" onClick={addHoraire}>
                  <img
                    src={"http://127.0.0.1:8000/file/add.png"}
                    className="img-fluid img-bordered"
                    width="30px"
                    alt="Mhello"
                  />
                  Ajouter un créneau d'ouverture
                </div>

                {renderSelectHoraire()}
                <div className="buttonFormModalDiv">
                  <button
                    class="btn btn-success"
                    variant="primary"
                    type="submit"
                  >
                    Créer un nouveau point de vente
                  </button>
                </div>
              </Form>
            </div>
            <div className="allInputsForm">
              <UploadPlace result={result} />
            </div>
          </div>
          <div className={styles.actionsContainer}></div>
        </div>
      </div>
    </>
  );
};

export default ModalPointDeVente;
