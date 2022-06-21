import React, { useState, useEffect } from 'react';
import { getAllMarches } from '../api/apiPlace';
import ModalMarche from "./ModalMarche";
import styles from "../App.css";
import ModalPointDeVente from "../components/ModalPointDeVente";

const Marches = ({ producteur }) => {

    const [marches, setMarches] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [modal, setModal] = useState([]);

    // 2 - AFFICHAGE DES PLACES
    const renderPlaces = () => {
        return (<>
            {isOpen && <ModalMarche setIsOpen={setIsOpen} producteur={producteur} marche={modal} />}
            {marches.map(marche => {
                return (
                    <div key={marche.id} className="cardMarche" onClick={() => { setIsOpen(true); setModal(marche) }}>
                        <div className='marcheCliquezIci' > Choisir ce marché</div>
                        <img className="imageCardMarche" src={"http://127.0.0.1:8000/file/" + marche.image}  alt="marchés" />
                        <div className='marcheTitreForm'> {marche.titre}</div>
                    </div>
                );
            })}
        </>)
    };

    useEffect(() => {
        getAllMarches().then((response) => {
            setMarches(response)
        })
    }, []);

    return (
        <div className='gridMarche'>
            <button className="buttonAdd" onClick={() => setIsOpen1(true)}>
                Ajouter votre propre point de vente
                <img src={"http://127.0.0.1:8000/file/add.png"} className="img-fluid img-bordered" width="300px" alt="Mhello"
                />
            </button>
            {isOpen1 && <ModalPointDeVente setIsOpen1={setIsOpen1} producteur={producteur} />}
            {renderPlaces()}
        </div>
    )
}
export default Marches;