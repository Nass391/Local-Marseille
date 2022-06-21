import React from "react";
import { NavLink } from "./Navbar/NavbarElements";

const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: 70 }}>
            <div>
                <h3 style={{ color: "black", width: "100%", textAlign: "center" }}>
                    Coding-Academy 2022
                </h3></div>
            {/* <div>
        <NavLink to="/contact" activeStyle={{ color: 'black' }} >
                    Contact
        </NavLink></div> */}
        </footer>
    );
};
export default Footer;
