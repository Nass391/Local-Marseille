import axios from 'axios';


//  LOGIN PRODUCTEUR
export async function loginProducteur(email, password) {
    const url = "http://127.0.0.1:8000/api/auth/login/producteur";
    var config = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: {
            email: email,
            password: password,
        },
    };
    try {
        var response = await axios(config);
        console.log("RESPONSE AXIOS LOGIN PRODUCTEUR", response.data.producteur_access_token);
        var producteur_access_token = response.data.producteur_access_token;
        console.log("PRODUCTEUR ACCESS TOKEN AFTER LOGIN", producteur_access_token);
        localStorage.setItem('producteur_access_token', producteur_access_token);
        window.location.href = "/"
    } catch (error) {
        return error;
    }
}

// REGISTER PRODUCTEUR
export async function registerProducteur(nom, prenom, email, password, nomExploitation, adresseExploitation, latitude, longitude) {
    const url = "http://127.0.0.1:8000/api/auth/register/producteur";
    var config = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            nom_exploitation: nomExploitation,
            adresse_exploitation: adresseExploitation,
            latitude: latitude,
            longitude: longitude,
        },
    };
    try {
        var response = await axios(config);
        console.log("RESPONSE", response.data.producteur_access_token);
        var producteur_access_token = response.data.producteur_access_token;
        console.log("PRODUCTEUR ACCESS TOKEN AFTER REGISTER", producteur_access_token);
        localStorage.setItem('producteur_access_token', producteur_access_token);
        window.location.href = "/"
    } catch (error) {
        return error;
    }
}

//  GET MY PROFIL PRODUCTEUR
export async function getMyProfilProducteur() {
    const token = localStorage.getItem("producteur_access_token");
    const url = "http://127.0.0.1:8000/api/myprofil";
    console.log(token)
    var config = {
        method: "GET",
        url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            token: token,
        },
    };
    try {
        const response = await axios(config);
        const result = response.data;
        console.log("RESPONSE AXIOS GET MY PROFIL PRODUCTEUR", result);
        return result;
    } catch (error) {
        console.log("RESPONSE error GET MY PROFIL PRODUCTEUR", error);
        return error;
    }
}

// RECUPERATION DES DONNEES D'UN PRODUCTEUR EN BASE DE DONNEES
export async function getOneProducteur(id) {
    const url = `http://127.0.0.1:8000/api/producteur/${id}`;
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
        const result = response.data.producteur;
        console.log("RESPONSE AXIOS GET ONE PRODUCTEUR", result)
        // setProducteur(result)
        return result;
    }
    catch (error) {
        return error;
    }
};

// 1 - RECUPERATION DES PRODUCTEURS EN BASE DE DONNEES
export async function getAllProducteurs() {
    const url = "http://127.0.0.1:8000/api/producteur/index";
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
        const result = response.data.producteurs;
        console.log("RESPONSE AXIOS GET ALL PRODUCTEURS", result)
        // setProducteurs([...result])
        return result;

    } catch (error) {
        return error;
    }
};

export async function updateProducteur(data) {
    const url = `http://127.0.0.1:8000/api/producteur/update/${data.producteurId}`;
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
        console.log("RESPONSE AXIOS UPDATE PRODUCTEUR", result)
        // setProducteurs([...result])
        return result;

    } catch (error) {
        return error;
    }
};
// axios.post(`http://127.0.0.1:8000/api/producteur/update/${id}`, { ...inputs, produitId: produitsProducteur })