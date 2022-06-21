import { Nav, NavLogo, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import React, { useState, useEffect } from 'react';
import Logo from "./notre-dame.png";
import LogoFarm from "./farm.png";
import LogoStall from "./stall.png";
import LogoEnter from "./enter.png";
import LogoFermer from "./fermer.png";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const producteur_access_token = localStorage.getItem('producteur_access_token');
    // function handleSubmitAdmin() {
    //     window.location.assign("http://127.0.0.1:8000/admin")
    // }

    // function handleSubmitLogout() {
    //     localStorage.clear();
    //     window.location.href = "/"
    // }
    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    };
    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, []);
    return (<>
        <Nav>
            <Bars onClick={() => { toggleNav(); console.log("allo"); }} />
            <div className="Nav-Bar-Menu">
                <NavMenu>
                    <NavLink to="/" activeStyle={{ color: 'black' }}>
                        <div className="Logo-Text">
                            <div> <img className="Logo-NavBar" src={Logo} alt="logo" /></div>
                            <div> Local Marseille</div>
                        </div>

                    </NavLink>
                    {/* <NavLink to="/" activeStyle={{ color: 'black' }} >
                    Accueil
                </NavLink> */}
                    <div className="pts-vente-producteur">
                        <NavLink className="points-de-vente" to="/places" activeStyle={{ color: 'black' }} >
                            <div className="Stall-Text">
                                <img className="Logo-Stall" src={LogoStall} alt="logo" />
                                Points de vente
                            </div>
                        </NavLink>

                        {producteur_access_token !== null ? (
                            <NavLink className="espace-producteur" to="/profil" activeStyle={{ color: 'black' }} >
                                <div className="Farm-Text">
                                    <img className="Logo-Farm" src={LogoFarm} alt="logo" />
                                    <div className="Farm-Text-text"> Espace Producteur</div>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/signin" activeStyle={{ color: 'black' }} >
                                <div className="Enter-Text">
                                    <img className="Logo-Enter" src={LogoEnter} alt="logo" />
                                    Se connecter
                                </div>
                            </NavLink>
                        )}
                    </div>

                </NavMenu>
            </div>
            {toggleMenu ? <div
                style={{
                    'z-index': "1000",
                    'border': "1px solid #198754",
                    'border-radius': "10px",
                    position: "absolute",
                    padding: "1.5rem",
                    top: "50px", 'font-size': "2.5vh",
                    width: "35vw",
                    right: "0px", 'background-color': "white"
                }}>
                <div className="burgerButtonDiv">
                    <h4>MENU</h4>

                </div>

                <NavLink to="/" activeStyle={{ color: 'black' }}>

                    <div className="burgerButtonDiv" style={{ 'z-index': 7 }}>

                        <div> Local Marseille</div>
                    </div>
                </NavLink>


                <NavLink to="/places" activeStyle={{ color: 'black' }} >
                    <div className="burgerButtonDiv">
                        Points de vente
                    </div>
                </NavLink>

                {producteur_access_token !== null ? (
                    <NavLink to="/profil" activeStyle={{ color: 'black' }} >
                        <div className="burgerButtonDiv">
                            Espace Producteur
                        </div>
                    </NavLink>
                ) : (
                    <NavLink to="/signin" activeStyle={{ color: 'black' }} >
                        <div className="burgerButtonDiv">
                            Se connecter
                        </div>
                    </NavLink>
                )}
            </div> : null}
        </Nav>
    </>);
};
export default Navbar;