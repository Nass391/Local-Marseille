import axios from 'axios';
import React, { Component } from 'react';

class UploadPlace extends Component {

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

  updateImagePlace = async (data) => {
    const url = `http://127.0.0.1:8000/api/place/upload/${this.props.result.id}`;
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
      console.log("je rentre dans la fonction update image Place")
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
    console.log("DATA to send", data);
    this.updateImagePlace(data);
    window.alert("Votre photo a bien été ajouté à votre point de vente");
  }

  render() {
    return (
      <div className="card-shadow">

        {this.state.responseMsg.status === "successs" ? (
          <div className="alert alert-success">
            {this.state.responseMsg.message}
          </div>
        ) : this.state.responseMsg.status === "failed" && (
          <div className="alert alert-danger">
            {this.state.responseMsg.message}
          </div>
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
        <button onClick={this.submitHandler} class="btn btn-success">
          Charger
        </button>
      </div>
    );
  }
}
export default UploadPlace;
