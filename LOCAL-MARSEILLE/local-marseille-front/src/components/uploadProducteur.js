import axios from 'axios';
import "../App.css";
import React, { Component } from 'react';

class Upload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "",
      responseMsg: {
        status: "",
        message: "",
        error: "",
      },
    };
  }

  // image onchange hander
  handleChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  updateProducteur = async (data) => {
    const url = `http://127.0.0.1:8000/api/producteur/upload/${this.props.producteur.id}`;
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
      console.log("RESPONSE AXIOS UPDATE IMAGE PRODUCTEUR", result)
      // setProducteurs([...result])
      this.setState({
        responseMsg: {
          status: result.status,
          message: result.message,
        },
      });
      setTimeout(() => {
        this.setState({
          image: "",
          responseMsg: "",
        });
      }, 2000);
      document.querySelector("#imageForm").reset();
      // getting uploaded images
      this.refs.child.getImages();

    } catch (error) {
      return error;
    }
  };

  // submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('file', this.state.image)
    console.log(data);
    this.updateProducteur(data);
    window.alert("Votre photo a bien été ajouté à votre profil");
  }

  render() {
    return (
      <div className="uploadProdDiv">

        {this.state.responseMsg.status === "successs" ? (
          <div className="alert alert-success">
            {this.state.responseMsg.message}
          </div>
        ) : this.state.responseMsg.status === "failed" ? (
          <div className="alert alert-danger">
            {this.state.responseMsg.message}
          </div>
        ) : (
          ""
        )}
        <input
          type="file"
          name="image"
          onChange={this.handleChange}
          className="form-control"
        />
        <span className="text-danger">
          {this.state.responseMsg.error}
        </span>


        <button class="btn btn-success" onClick={this.submitHandler}>

          Ajouter

        </button>




      </div>
    );
  }
}
export default Upload;
