import React, { useState } from 'react'
import { loginProducteur } from '../api/apiProducteur'
import Button from 'react-bootstrap/Button';
import {NavBtn, NavBtnLink} from "../components/Navbar/NavbarElements";

function SignIn() {
    // States for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        try {
            loginProducteur(email, password);
        } catch (error) {
            return error;
        }
    };

    // Handle "email"
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    // Handle "password"
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
<div className="SigninFormCtn">
        <form onSubmit={handleSubmitLogin} className="SigninForm">
            <div className="mb-3">
                <label className="form-label">Adresse email</label>
                <input type="email" className="form-control" value={email} onChange={handleEmail} />
            </div>
            <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-control" value={password} onChange={handlePassword} />
            </div>
            <div className='BtnNavBtn'>
            <Button type="submit" variant="success" className="SigninSubmitButton">Connectez-vous ! </Button>
            <NavBtn>
                        <NavBtnLink  to="/signup" >Pas encore de compte? Inscrivez-vous!</NavBtnLink>
                    </NavBtn>
                    </div>
        </form>
        </div>

    )
}

export default SignIn;