import React, { Component } from "react";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          alt="ImagePreview"
          width="100px"
          height="100px"
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText">
          <i className="fas fa-user fa-7x"></i>
        </div>
      );
    }

    return (
      <div className="previewComponent">
        <div className="imgPreview">{$imagePreview}</div>
        <div className="image">
          <form onSubmit={e => this._handleSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={e => this._handleImageChange(e)}
            />

            <button
              className="submitButton"
              type="submit"
              onClick={e => this._handleSubmit(e)}
            >
              Upload Image
            </button>
          </form>
        </div>
      </div>
    );
  }
}
