import React, { Component } from "react";
import axios from "axios";

export default class Image extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    axios
      .get(`http://127.0.0.1:8000/api/producteur/image/${this.props.producteur.id}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            images: response.data.data,
          });
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="card-title fw-bold"> Mon image  </h4>
              </div>
              <div className="card-body">
                <div className="row">

                {
                    this.state.images.length > 0 ? (
                        this.state.images.map((image) => (
                        <div className="col-xl-6 col-lg-8 col-sm-12 col-12 mt-3" key={image.image}>
                            <img src={ "http://127.0.0.1:8000/file/" + image.image } className="img-fluid img-bordered" width="300px" alt= "Mhello"
                            />
                        </div>
                        ))
                    ) : (
                        <h6 className="text-danger text-center">No Image Found </h6>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
