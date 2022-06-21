import axios from 'axios';

// 1 - RECUPERATION DES PRODUITS EN BASE DE DONNEES
export async function getallProduits() {
    const url = "http://127.0.0.1:8000/api/produit/index";
    const config = {
        method: "get",
        url,
        // headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        // }
    };
    try {
        const response = await axios(config);
        const result = response.data;
        console.log("RESPONSE AXIOS GET ALL PRODUITS", result)
        return result;
    } catch (error) {
        return error;
    }
};