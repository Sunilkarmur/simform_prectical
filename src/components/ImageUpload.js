import React from 'react';
import ImageUploader from 'react-images-upload';
import ImageUploading from "react-images-uploading";

import image2base64 from 'image-to-base64';
import axios from 'axios';

const mode = "single";
const maxNumber = 10;

class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pictures: [], user: null};
    }

    handleChangeImage = (evt) => {
        var self = this;
        var reader = new FileReader();
        var file = evt.target.files[0];

        reader.onload = (upload) => {
            axios.post(process.env.REACT_APP_API_URL + '/gallery', {
                image: upload.target.result,
                user: this.props.user ? this.props.user.name : ''
            }).then(response => {
            }).catch(error => {
                console.log(error)
            })
            self.setState({
                image: upload.target.result
            });
        };
        reader.readAsDataURL(file);
    }


    render() {

        return (
            <input ref="file" type="file" name="file"
                   className="upload-file"
                   id="file"
                   onChange={this.handleChangeImage}
                   encType="multipart/form-data"
                   required/>
        )
    }
}

export default ImageUpload
