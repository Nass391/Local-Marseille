import axios from 'axios';

// 1 - RECUPERATION DES PLACES EN BASE DE DONNEES
export async function getAllPlaces() {
    const url = "http://127.0.0.1:8000/api/place/index";
    const config = {
        method: "get",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    };
    try {
        const response = await axios(config);
        const result = response.data.places;
        console.log("RESPONSE AXIOS GET ALL PLACES", result)
        return result;
        // setPlaces([...result])
    } catch (error) {
        return error;
    }
};

// 2 - RECUPERATION DES MARCHES EN BASE DE DONNEES
export async function getAllMarches() {
    const url = "http://127.0.0.1:8000/api/marche/index";
    const config = {
        method: "get",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    };
    try {
        const response = await axios(config);
        const result = response.data.marches;
        console.log("RESPONSE AXIOS GET ALL PLACES", result)
        return result;
        // setPlaces([...result])
    } catch (error) {
        return error;
    }
};
// 3 - CREATE PLACE
export async function createPlace(data) {
    const url = "http://127.0.0.1:8000/api/place/create";

    const config = {
        method: "post",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": localStorage.getItem("producteur_access_token"),
        },
        data: data
    };
    try {
        const response = await axios(config);
        const result = response.data;
        console.log("RESPONSE AXIOS CREATE PLACE", result)
        return result;
    } catch (error) {
        return error;
    }
}

// 4 - DELETE PLACE
export async function deletePlace(id) {
    const url = `http://127.0.0.1:8000/api/place/delete/${id}`;

    const config = {
        method: "delete",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": localStorage.getItem("producteur_access_token"),
        },
    };
    try {
        const response = await axios(config);
        const result = response.data;
        console.log("RESPONSE AXIOS DELETE PLACE", result)
        return result;
    } catch (error) {
        return error;
    }
}