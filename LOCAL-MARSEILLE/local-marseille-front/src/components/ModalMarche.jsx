import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiDivideFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { createPlace } from "../api/apiPlace";
import { createHoraire } from "../api/apiHoraire";
import Form from "react-bootstrap/Form";

const ModalMarche = ({ setIsOpen, producteur, marche }) => {
  const tabHoraireInit = {
    id: 0,
    jour: null,
    heure_debut: null,
    heure_fin: null,
    frequence: null,
  };
  // const tabHoraire2 = {id:2, jour:"Mardi", heure_debut:"08:00", heure_fin : "12:00", frequence : "Tous les mois"}
  // 0 - Set useState
  const [inputsHoraire, setInputsHoraire] = useState({});
  const [tabHoraire, setTabHoraire] = useState([]);

  // 4 - Envoie des donnés du formulaire et des checkboxs vers le back-end
  const handleSubmit = () => {
    const id = { producteurId: producteur.id };
    const inputs = {
      titre: marche.titre,
      adresse: marche.adresse,
      description: marche.description,
      latitude: marche.latitude,
      longitude: marche.longitude,
      image: marche.image,
    };
    const data = { ...inputs, ...id };
    createPlace(data).then((response) => {
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
    });
  };

  const handleChangeHoraire = (id, event) => {
    const name = event.target.name;
    const value = event.target.value;

    // setInputsHoraire(values => ({ ...values, [name]: value }))

    const horaire = tabHoraire.find((item) => item.id === id);
    horaire[name] = value;

    setTabHoraire([...tabHoraire.filter((item) => item.id !== id), horaire]);
  };

  const addHoraire = () => {
    console.log("add horaire");
    // setTabHoraire(tabHoraire.id += 1)
    console.log("check add horaire", tabHoraire);
    const newHoraire = tabHoraireInit;
    newHoraire.id = tabHoraire.length + 1;
    setTabHoraire([...tabHoraire, newHoraire]);
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
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              {" "}
              Ajouter {marche.titre} comme point de vente pour{" "}
              {producteur.nom_exploitation}
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <div className="containerModal">
              <div className="leftContainer">
                <div className="modalMarcheTitre"> {marche.titre}</div>
                <div>{marche.recap}</div>
                <div>{marche.description}</div>
                <div className="ProducteureAdressExploitation">
                  <img width={30} height={30} src="/adress.png" />
                  {marche.adresse}
                </div>
              </div>

              <div className="rightContainer">
                <img
                  onClick={() => setIsOpen(true)}
                  src={"http://127.0.0.1:8000/file/" + marche.image}
                  width={200}
                  height={200}
                  alt="marchés"
                />
              </div>
            </div>
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

          <div>{renderSelectHoraire()}</div>
          <div className="buttonformCreneau">
            <button
              class="btn btn-success"
              onClick={() => {
                handleSubmit();
                setIsOpen(false);
              }}
            >
              Choisir ce marché
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMarche;
