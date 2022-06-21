import ProfilForm from "../components/ProfilForm";
import Upload from "../components/uploadProducteur";
import Image from "../components/Image";
import Marches from "../components/Marches";
import ModalPointDeVente from "../components/ModalPointDeVente";
import React, { useState} from 'react';
import styles from "../App.css";
import { useLocation } from "react-router-dom";

const ProfilFormPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const producteur = location.state;
    return (
        <>
        <div className="formPage">
            <h5>1/ {producteur.nom_exploitation} : Mettez à jour votre profil ici </h5>
             {/* <h1>PAGE PROFIL FORMULAIRE</h1> */}
             <ProfilForm producteur={producteur}/>
             </div>
            <div className="formPage">
            <h5>2/ Mettez à jour votre photo</h5>
            <Upload producteur={producteur}/>

            {/* <Image  producteur={producteur}/> */}
            {/* <main>
                <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
                Ajouter un nouveau point de vente
                </button>
                {isOpen && <ModalPointDeVente setIsOpen={setIsOpen} producteur={producteur} />}
            </main> */}
             </div>
             <div className="formPage">
             <h5>3/ Choississez un ou plusieurs points de vente</h5>
             <h7>Vous avez la possibilité de créer votre point de vente ou de choisir parmi les marchés partenaires</h7>
                <Marches producteur={producteur}/>
             </div>
          
       
        
        </>
    );
}
export default ProfilFormPage;