import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom";
import imageValider from 'assets/img/IconesAccueils/Valider.png'
import imageRechercher from 'assets/img/IconesAccueils/Rechercher.png'
import {
    Container,
    Row,
    Col,
  } from "reactstrap";

const TITLE = 'Accueil Préfecture'

class AccueilPrefecture extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container className="body-container">
                {/* <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <h1 className="ml-4" style={{color:"gray"}}>ACCUEIL</h1>
                    </div>
                </Row> */}
                <Row style={{paddingTop:"100px"}}>

                        <Col className="mr-1 ml-auto" md="2" sm="3">
                            <Link to={{
                                pathname: '/valider-identite',
                            }}>
                                <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={imageValider}
                                />
                                <p style ={{fontWeight:"bold"}} className="text-center ct-blue">Valider une identité</p>
                            </Link>
                        </Col>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={imageRechercher}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Rechercher une identité</p>
                        </Col>
                </Row>
            </Container>
            </>
         );
    }
}
 
export default AccueilPrefecture;