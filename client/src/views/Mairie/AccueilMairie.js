import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom";
import imageMariage from 'assets/img/IconesAccueils/Mariage.png';
import imageDeces from 'assets/img/IconesAccueils/Deces.png';
import imageDivorce from 'assets/img/IconesAccueils/Divorce.png';
import DecisionJustice from "assets/img/IconesAccueils/DecisionJustice.png"

import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Input,
    UncontrolledTooltip,
  } from "reactstrap";


  const TITLE = 'Accueil Mairie'

class AccueilMairie extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal:false,
        }
        console.log(this.state);
        //this.state = this.state.bind(this)
    }

    toggleModal(){
        if (this.state.modal===false){
            console.log("false");
            this.setState((prevState) => ({...prevState,modal :true}));
        }else{
            console.log("false");
            this.setState((prevState) => ({...prevState,modal :false}));
        }        
    }

    render() { 
        return ( 
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container className="body-container">
                <Row style={{paddingTop:"100px"}}>
                    <Col className="mr-auto ml-auto" md="2" sm="3">
                        <Link to={{
                        pathname: '/declarer-mariage', 
                        }}>
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={imageMariage}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Déclarer un mariage</p>
                        </Link>
                    </Col>
                    <Col className="mr-auto ml-auto" md="2" sm="3">
                        <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={imageDivorce}
                        />
                        <p style ={{fontWeight:"bold"}} className="text-center ct-green">Déclarer un divorce</p>
                    </Col>
                    <Col className="mr-auto ml-auto" md="2" sm="3">
                        <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={imageDeces}
                        />
                        <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Déclarer un décès</p>
                    </Col>
                </Row>
                <Row style={{paddingTop:""}}>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                                <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={DecisionJustice}
                                onClick={this.toggleModal.bind(this)}
                                />
                                <p style ={{fontWeight:"bold"}} className="text-center ct-green">Enregistrer une décision de justice</p>
                        </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={() => this.toggleModal.bind(this)}>
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => this.toggleModal()}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Enregistrer une décision de justice
                  </h5>
                </div>
                <div className="modal-body">
                    <Row className="decision-justice"
                        id="tooltip392938669"
                    >
                        <Input
                            defaultValue="option1"
                            id="exampleRadios1"
                            name="exampleRadios"
                            type="radio"
                        />
                        Reconnaissance de paternité
                    </Row>
                    <UncontrolledTooltip
                        delay={0}
                        placement="left"
                        target="tooltip392938669"
                    >
                        Fonctionnalité à venir
                    </UncontrolledTooltip>
                    <Row className="decision-justice"
                        id="tooltip392938669"
                    >
                        <Input
                                defaultValue="option1"
                                id="exampleRadios1"
                                name="exampleRadios"
                                type="radio"
                            />
                        Adoption
                    </Row>
                </div>
                <div className="modal-footer">

                  <div className="divider" />
                  <div className="right-side">
                    <Button onClick={() => this.toggleModal()} className="btn-link" color="danger" type="button">
                      Annuler
                    </Button>
                  </div>
                </div>
              </Modal>
            </Container>
            </>
         );
    }
}
 
export default AccueilMairie;