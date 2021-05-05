import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import imageValider from 'assets/img/IconesAccueils/Valider.png'
import SimpleTable from 'components/SimpleTable';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
  } from "reactstrap";
import { createTrue } from 'typescript';

const TITLE = 'Naissance enregistrée'

class NaissanceValidee extends Component {


    constructor(props){
        super(props);
        this.state = {
            ID : this.props.location.state,
            windowWidth: 0,
            windowHeight: 0
        }
   
    }

    componentDidMount() {
        console.log("=== componentDidMount ===");
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
        console.log("--- updateDimensions ---");
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        this.setState({ windowWidth, windowHeight });
    }

    handleClick(e){
        console.log("=== handleClick ===")
        console.log("Redirection homepage hopital")
        this.props.history.push({
            pathname:'home-hopital'
        })
    }

    MakeTableRecap(){
        const result = [
            {name : "Numéro d’identification unique", price : this.state.ID},
          ]

        return (result);
    }

    render() { 
        return ( 
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
            
            <Container className="body-container">
                <Row style={{paddingTop:"50px"}}/>
                <Col className="col-sm-14 col-md-10 " >
                    {/* <Row className="text-center"> */}
                        <Row>
                        <div className="container-tile-validation">
                            <img className="img-tile-valider mg-10" alt="..." src={imageValider}/>
                            <div>
                                {this.state.windowWidth <= 1024 ?  <><div style={{height:"30px"}}></div><h3 style={{color:"gray"}}>Naissance saisie</h3></> : <h1 style={{color:"gray"}}>Naissance saisie</h1> }
                                <SimpleTable bold={true} data={this.MakeTableRecap().slice(0,1)}/>
                                <div style={{paddingTop:"30px"}}>Cette naissance va maintenant être soumise à validation au service des états civils.</div>
                            </div >
                        </div>
                        </Row>
                        <Row className="flex-container-end-center" style={{paddingTop:"30px"}}>
                                <Button onClick={(e)=>{this.handleClick(e)}} className="btn-round btn ml-8 btn-info" color="info">
                                    Terminer
                                </Button>
                        </Row>
                    {/* </Row> */}
                </Col>
                
                {/* {this.state.windowWidth <= 1024 ?
                    <>
                    <Row style={{paddingTop:"50px"}} />
                    <Col style={{marginRight:"60px"}}>
                    <Row className="text-center">
                        <div className="container-tile-validation">
                            <img className="img-tile-valider" alt="..." src={imageValider}/>
                            <div>
                                {this.state.windowWidth <= 1024 ?  <><div style={{height:"30px"}}></div><h3 style={{color:"gray"}}>Naissance saisie</h3></> : <h1 style={{color:"gray"}}>Naissance saisie</h1> }
                                <SimpleTable bold={true} data={this.MakeTableRecap().slice(0,1)}/>
                                <div style={{paddingTop:"30px"}}>Cette naissance va maintenant être soumise à validation au service des états civils.</div>
                            </div >
                        </div>
                        <Row style={{paddingTop:"30px"}}>
                                <Col className="offset-md-13">
                                    <Button onClick={(e)=>{this.handleClick(e)}} className="btn-round btn ml-8 btn-info" color="info">
                                        Terminer
                                    </Button>
                                </Col>
                        </Row>
                        </Row>
                    </Col>
                </>
                :
                    <><Row style={{paddingTop:"180px"}} />
                    <Row style={{height:"300px"}} className="text-center">
                    <Col className="col-sm-12 col-md-12 offset-md-2">
                        <div className="container-tile-validation">
                            <img className="img-tile-valider" alt="..." src={imageValider}/>
                            <div>
                                {this.state.windowWidth <= 1200 ?  <><div style={{height:"30px"}}></div><h3 style={{color:"gray"}}>Naissance saisie</h3></> : <h1 style={{color:"gray"}}>Naissance saisie</h1> }
                                <SimpleTable bold={true} data={this.MakeTableRecap().slice(0,1)}/>
                                <div style={{paddingTop:"30px"}}>Cette naissance va maintenant être soumise à validation au service des états civils.</div>
                            </div >
                        </div>
                        <Row style={{paddingTop:"30px"}}>
                            
                                <Col className="offset-md-13">
                                    <Button onClick={(e)=>{this.handleClick(e)}} className="btn-round btn ml-8 btn-info" color="info">
                                        Terminer
                                    </Button>
                                </Col>
                        </Row>
                    </Col>
                </Row></>    
                } */}
                
                
            </Container>             
            
            
            </>
         );
    }
}
 
export default NaissanceValidee;