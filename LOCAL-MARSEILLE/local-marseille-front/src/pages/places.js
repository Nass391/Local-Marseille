import React from 'react';
import Place from "../components/Place";

const Places = () => {
    return (
        <><div
            style={{
                fontFamily: "Barlow Semi Condensed, sans-serif",
                fontstyle: "ExtraBold",
                fontSize: "40px",
                fontWeight: "900",
                letterSpacing: "0.15em",
                WebkitTextStroke: "1px grey",
                color: "white",
                textAlign: "center",
                marginTop: "50px",
            }}
        >
            Les points de vente à Marseille
        </div>
            <Place />
        </>
    );
}
export default Places;