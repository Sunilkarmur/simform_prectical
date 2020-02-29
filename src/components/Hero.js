import React, {useEffect} from "react";
import {useAuth0} from "../react-auth0-spa";
import ImageUploader from './ImageUpload';
import axios from 'axios';
import {Col, Container, Row} from "reactstrap";

const Hero = () => {
    const {loading, user} = useAuth0();
    const [galleryList, setGalleryList] = React.useState([])
    useEffect(() => {
        const fn = async () => {
            await axios.get(process.env.REACT_APP_API_URL + '/gallery')
                .then(response => {
                    setGalleryList(response.data);
                }).catch(error => {

                })
        };
        fn();
    })
    return (
        <Container className="mb-5">
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                <ImageUploader user={user}/>
            </Row>
            <Row>
                {
                    galleryList.map((value, key) => {

                        return (
                            <div className="gallery">
                                <a target="_blank" href="img_5terre.jpg">
                                    <img src={value.image} alt={value.user} width={100}
                                         height={100}/>
                                </a>
                                <div className="desc">{value.user}</div>
                            </div>
                        )
                    })
                }
            </Row>

        </Container>
    );
}

export default Hero;
