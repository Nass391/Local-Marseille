import React, { useState } from 'react'
import axios from 'axios';
import { registerProducteur } from '../api/apiProducteur'
import Button from 'react-bootstrap/Button';

function SignUp() {

    // States for registration
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nomExploitation, setNomExploitation] = useState("");
    const [adresseExploitation, setAdresseExploitation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        try {
            convertAdress().then(function (res) { registerProducteur(res[1], res[0]); })

        } catch (error) {
            return error;
        }
    };

    // Handle "nom"
    const handleNom = (e) => {
        setNom(e.target.value);
    };
    // Handle "nom de l'exploitation"
    const handleNomExploitation = (e) => {
        setNomExploitation(e.target.value);
    }

    // Handle "adresse de l'exploitation"
    const handleAdresseExploitation = (e) => {
        setAdresseExploitation(e.target.value);
    }

    // Handle "Prenom"
    const handlePrenom = (e) => {
        setPrenom(e.target.value);
    };

    // Handle "email"
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    // Handle "password"
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Function to convert adress exploitation
    async function convertAdress() {
        return await axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adresseExploitation}.json?limit=1&access_token=pk.eyJ1IjoibmFzczM5MSIsImEiOiJjbDNscHd2Z2IwMm13M2JwandyaTE3YXJhIn0.SBuLEnFF56RiFtUIFiFDYw`)
            .then(function (response) {
                return (response.data.features[0].center);
            })
            .catch(function (error) {
                return (error)
            })
    }
    // Function to register producteur
    async function registerProducteur(latitude, longitude) {
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
                image: "M005.jpg"
            },
        };
        console.log(config);
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
    return (
        <div>
            <form onSubmit={handleSubmitRegister} className="SignupForm">
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="Name" className="form-control" value={nom} onChange={handleNom} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input type="Name" className="form-control" value={prenom} onChange={handlePrenom} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nom de votre exploitation</label>
                    <input type="Name" className="form-control" value={nomExploitation} onChange={handleNomExploitation} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adresse de votre exploitation</label>
                    <input type="Name" className="form-control" value={adresseExploitation} onChange={handleAdresseExploitation} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={handleEmail} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handlePassword} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password </label>
                    <input type="password" className="form-control" />
                </div>
                <Button type="submit" variant="success" >Enregistrez-vous ! </Button>
            </form>
        </div>
    )
}
export default SignUp;
