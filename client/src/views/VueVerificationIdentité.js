import React, { Component } from 'react';
import ComponentVérificationID from "components/ComponentVérificationID";
import image1 from "assets/img/ImagesHomeCitoyen/Image1.png";
import image2 from "assets/img/ImagesHomeCitoyen/Image2.png";
import image3 from "assets/img/ImagesHomeCitoyen/Image3.png";
import image4 from "assets/img/ImagesHomeCitoyen/Image4.png";
import secure from "assets/img/ImagesHomeCitoyen/secure.png";
import rapide from "assets/img/ImagesHomeCitoyen/rapide.png";
import simple from "assets/img/ImagesHomeCitoyen/simple.png";

import {
    Container,
    Row,
    Col,
  } from "reactstrap";

class VueVérificationIdentité extends Component {

    constructor(props) {
        super(props)
        this.HandleClickNvlleRecherche = this.HandleClickNvlleRecherche.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.setState = this.setState.bind(this);

        this.state = {
            paramHash : this.props.history.location.search.slice(1,this.props.history.location.search.length),
            windowWidth: 0,
            windowHeight: 0,
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
        //this.setState((prevState) => ({...prevState,["windowWidth"] :windowWidth}));
    }

    HandleClickNvlleRecherche(){
        this.props.history.push({
            pathname:"verification-id"
        })
        this.setState({paramHash:""})
    }

    render() { 
        return (
            <Container style={{minHeight:"100vh"}}>
                {this.state.windowWidth <= 1200 ?
                <>
                    <Row style={{height:"100%"}}>
                        <Col style={{margin:"20px"}}>
                            <Row  className="text-center" style={{paddingTop:"50px"}, {marginBottom:"30px"}}>
                                <h3 className="bold" style={{color:"#FBC658"}}>Vérifier une identité</h3>
                            </Row>
                            <Row  style={{paddingBottom:"50px"}}>
                                <div style={{color:"#66615B"}}>Pour vérifier l’identité d’un citoyen, saisissez la clé de sécurité indiquée sur son extrait d’acte de naissance.</div>
                            </Row>
                            <Row style={{marginTop:"20px"}}>
                                <ComponentVérificationID RedirectionHandler={this.HandleClickNvlleRecherche} defaultHash={this.state.paramHash && this.state.paramHash}></ComponentVérificationID>
                            </Row>
                            
                            {/* <Row className="section-how-to-mobile">
                                <div className="flex-container-col-center">
                                    <div className="flex-container-left-center">
                                        <img className="mg-10" alt="..." style={{width:"70px"}} src={secure}/>
                                        <div className="flex-container-col-left text-left">
                                            <div className="text-how-to bold element-col-center">Sécurisé</div>
                                            <div className="text-how-to element-col-center">
                                                Grâce à la technologie blockchain, les faits d'état civil sont certifiés conformes
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="flex-container-left-center">
                                        <img className="mg-10" alt="..." style={{width:"70px"}} src={rapide}/>
                                        <div style={{height:"60px"}} className="flex-container-col-left text-left">
                                            <div className="text-how-to bold text-left">Instantané</div>
                                            <div className="text-how-to element-col-center">
                                                Les preuves de conformité sont fournies instantanément
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="flex-container-left-center">
                                        <img className="mg-10" alt="..." style={{width:"70px"}} src={simple}/>
                                        <div style={{height:"60px"}} className="flex-container-col-left text-left">
                                            <div className="text-how-to bold element-col-center">Simple</div>
                                            <div className="text-how-to element-col-center">
                                                La conformité des informations est vérifiable en quelques clics
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </Row> */}
                        </Col>
                    </Row>
                </>
                :
                <>
                <Row className="flex-container-spread-center" style={{height:"370px"}}>
                    <div className="flex-container-col-center">
                        <img alt="..." style={{width:"70px"}} src={secure}/>
                        <div className="text-how-to bold element-col-center">Sécurisé</div>
                        <div className="text-how-to element-col-center">
                            Grâce à la technologie blockchain, les faits d'état civil sont certifiés conformes
                        </div>
                    </div>
                    <div className="flex-container-col-center">
                    <img alt="..." style={{width:"80px"}} src={rapide}/>
                        <div className="text-how-to bold">Instantané</div>
                        <div className="text-how-to element-col-center">
                            Les preuves de conformité sont fournies instantanément 
                        </div>
                    </div>
                    <div className="flex-container-col-center">
                        <img alt="..." style={{width:"70px"}} src={simple}/>
                        <div className="text-how-to bold">Simple</div>
                        <div className="text-how-to element-col-center">
                            La conformité des informations est vérifiable en quelques clics
                        </div>
                    </div>
                </Row>
                <Row style={{height:"100%"}}>
                    <Col md={{ size: 7, offset: 0 }}>
                        <Row  className="text-center" style={{paddingTop:"50px"}, {marginBottom:"30px"}}>
                            <h3 className="bold" style={{color:"#FBC658"}}>Vérifier une identité</h3>
                        </Row>
                        <Row  style={{paddingBottom:"50px"}}>
                            <div style={{color:"#66615B"}}>Pour vérifier l’identité d’un citoyen, saisissez la clé de sécurité indiquée sur son extrait d’acte de naissance.</div>
                        </Row>
                        <Row style={{marginTop:"20px"}}>
                            <ComponentVérificationID RedirectionHandler={this.HandleClickNvlleRecherche} defaultHash={this.state.paramHash && this.state.paramHash}></ComponentVérificationID>
                        </Row>
                    </Col>
                    <Col md={{ size: 1, offset: 0 }}></Col>
                    <Col md={{ size: 3, offset: 0 }} className="flex-container-col-left bloc-how-to" style={{marginLeft:"20px"}}>
                        <h5>Comment ça marche ? </h5>
                        <Row className="flex-container-left-center" > 
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>1</div></p>
                            <div className="text-how-to">Je saisis la clé de sécurité</div>  
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"200px"}} src={image1}/>
                        <Row className="flex-container-left-center" >
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>2</div></p>
                            <div className="text-how-to">Je lance la recherche</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"200px"}} src={image2}/>
                        <Row className="flex-container-left-center" >
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>3</div></p>
                            <div className="text-how-to">Les données sont certifiées</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"200px"}} src={image3}/>
                        <Row className="flex-container-left-center" >
                            <div style={{marginLeft:"50px"}} className="text-how-to">Sinon je suis averti.e</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"200px"}} src={image4}/>
                    </Col>
                </Row>
                </>
                }
                    
            </Container>
          );
    }
}
 
export default VueVérificationIdentité;