import React from "react";
import Background from "../assets/marseille.jpeg";

function Contact() {
  return (
    <div className="imageContainer">
      <img
        className="img"
        src={Background}
        width="100%"
        height={600}
        alt="producteur"
      />
    
      
      <div className="center">
        <h1> Contactez-Nous </h1>
      </div>
    </div>
    
    
  );
  
}

export default Contact;
