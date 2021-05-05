import React, { Component } from 'react';
import { Container } from "reactstrap";
import "assets/css/paper-kit.css"

//logos
import logoCoteIvoire from 'assets/img/logo_cote_ivoire.png'
import logoGabon from 'assets/img/logo_gabon.png'
import logoCameroun from 'assets/img/logo_cameroun.png'
import logoQuestion from 'assets/img/question.png'

//Layout
import {countryLayout} from "variables"
import {countryColors} from "variables"

class HomepageHeader extends Component {
    state = {
        URLCible:""
    }

    constructor(props) {
        super(props);
        this.state = {
          windowWidth: 0,
          windowHeight: 0,
          countryLayout:countryLayout,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
      }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        this.setState({ windowWidth, windowHeight });
    }

    HandleClick(){
        
        if(this.props.location.pathname.includes("valider-identite")){
            this.props.history.push({
                pathname:"home-prefecture"
            })
        }
        if(this.props.location.pathname.includes("declarer-mariage")){
            this.props.history.push({
                pathname:"home-mairie"
            })
        }
        if(this.props.location.pathname.includes("verification-id")){
            this.props.history.push({
                pathname:"home"
            })
        }
        if(this.props.location.pathname.includes("hopital-naissance")){
            this.props.history.push({
                pathname:"home-hopital"
            })
        }
        if(this.props.location.pathname.includes("naissance-validee")){
            this.props.history.push({
                pathname:"home-hopital"
            })
        }
        if(this.props.location.pathname.includes("identite-verifiee")){
            this.props.history.push({
                pathname:"home-prefecture"
            })
        }
        if(this.props.location.pathname.includes("home-citoyen")){
            this.props.history.push({
                pathname:"home"
            })
        }
        
    }

    render() { 
        return (
            <>
            <div className="page-header">
                <Container>
                    <div className="container-logo-header">
                        
                            {/* COTE D'IVOIRE */}
                            {this.state.countryLayout === "CI"  && 
                            <>
                            <img className=" element-logo-header img-header" alt="..." src={logoCoteIvoire} onClick={() => this.HandleClick()} />
                            <div className="element-logo-header">
                                <div className="text-bold" style={{color: countryColors}}>WWW.GOUV.CI/ETATSCIVILS <br/></div>
                                <div style={{color:"#66615b"}}>LE PORTAIL DES ACTES D’ÉTATS CIVILS <br/></div>
                                <div style={{color:"#66615b"}}>DE LA CÔTE D’IVOIRE <br/></div>
                            </div>
                            </>
                            }

                            {/* GABON */}
                            {this.state.countryLayout === "GB"  && 
                            <>
                            <img className="element-logo-header img-header" alt="..." src={logoGabon} onClick={() => this.HandleClick()} />
                            <div className="element-logo-header">
                                <div className="text-bold" style={{color: countryColors}}>WWW.SGG.GOUV.GA/ETATSCIVILS <br/></div>
                                <div style={{color:"#66615b"}}>LE PORTAIL DES ACTES D’ÉTATS CIVILS <br/></div>
                                <div style={{color:"#66615b"}}>DE LA REPUBLIQUE GABONAISE  <br/></div>
                            </div>
                            </>
                            }
                            {/* CAMEROUN */}
                            {this.state.countryLayout === "CA"  && 
                            <>
                            <img className="element-logo-header img-header" alt="..." src={logoCameroun} onClick={() => this.HandleClick()} />
                            <div className="element-logo-header">
                                <div className="text-bold" style={{color: countryColors}}>WWW.SPM.GOV.CM/ETATSCIVILS <br/></div>
                                <div style={{color:"#66615b"}}>LE PORTAIL DES ACTES D’ÉTATS CIVILS <br/></div>
                                <div style={{color:"#66615b"}}>DE LA REPUBLIQUE DU CAMEROUN  <br/></div>
                            </div>
                            </>
                            }
                          
                        

                        {this.state.windowWidth > 1200 &&
                            <div className="element-logo-header"> 
                                <span >
                                    <img style={{width:"50px"}} alt="..." src={logoQuestion} />
                                    <div>Une question ?</div>
                                </span>
                            </div>
                        }
                    </div>
                    
                </Container>
            </div>
            </>
          );
    }
}
 
export default HomepageHeader;