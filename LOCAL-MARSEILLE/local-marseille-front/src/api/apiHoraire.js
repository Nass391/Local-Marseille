import axios from 'axios';

// 1 - CREATE HORAIRE
export async function createHoraire(data) {
    const url = "http://127.0.0.1:8000/api/horaire/create";

    const config = {
            method: "post",
            url,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": localStorage.getItem("producteur_access_token"),
            },
            data : data
          };
     try{
        const response = await axios(config);
        const result = response.data;
        console.log("RESPONSE AXIOS CREATE HORAIRE", result)
        return result;
     }catch (error){
         console.log(error)
        return error;
     }           
}