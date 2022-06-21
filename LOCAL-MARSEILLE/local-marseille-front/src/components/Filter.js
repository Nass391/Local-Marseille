import React, { useState, useEffect } from 'react';
import { getAllProducteurs } from '../api/apiProducteur'
import { getallProduits } from '../api/apiProduit'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Filter = (props) => {

    const [produits, setProduits] = useState([])
    const [selectedProduitsIds, setSelectedProduitsIds] = useState([])
    const [producteurs, setProducteurs] = useState([])
    const [filteredProducteurs, setFilteredProducteurs] = useState([])

    useEffect(() => {
        getallProduits().then((response) => {
            console.log("RESPONSE PRODUITS", response.produits)
            setProduits([...response.produits])
        })
        getAllProducteurs().then((response) => {
            setProducteurs(response);
            setFilteredProducteurs(response);
        })
    }, []);

    const checkProducteurs = (producteur) => {
        console.log(producteur)
        for (const selectProduitId of selectedProduitsIds) {
            const p = producteur.produits.find(p => p.id == selectProduitId)
            console.log(p)
            console.log(selectProduitId)
            if (p) {
                return true
            }
        }
        return false
        // producteurs.map((producteur) => (producteur.produits.id.find(p => p == )))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedProduitsIds.length === 0) {
            props.filterHandler([...producteurs]);
            return
        }
        const productSelected = producteurs.filter(checkProducteurs);
        console.log("PRODUCTSELECTED", productSelected)
        // setFilteredProducteurs([...productSelected])
        props.filterHandler([...productSelected]);
    };

    const renderMenuProduit = () => {
        return (
            <Form onSubmit={handleSubmit} className="menuFilterForm">
                <Form.Label className="menuFilterTitre">Choisissez vos produits...</Form.Label>
                {produits.map((prod, index) => (

                    <Form.Check
                        inline
                        label={prod.label}
                        value={prod.id}
                        name="produits"
                        onChange={(v) => {
                            const idProduit = v.target.value;
                            //  alert(idProduit)
                            const existe = selectedProduitsIds.find(p => p == idProduit)
                            if (existe) {
                                const newProduitsProducteurList = selectedProduitsIds.filter((item) => item !== idProduit)
                                setSelectedProduitsIds([...newProduitsProducteurList])
                            } else {
                                setSelectedProduitsIds([...selectedProduitsIds, idProduit])
                            }
                        }
                        }
                        type="checkbox"
                        id={index}
                    />
                ))}
                <Button variant="success" type="submit">
                    C'est parti !
                </Button>
            </Form >
        )
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                {renderMenuProduit()}
            </div>
        </>
    )
}
export default Filter;