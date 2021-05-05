import React, { Component } from 'react';
import Connexion from 'components/Connexion'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import { ThemeProvider } from 'react-bootstrap';

class PortailAdministration extends Component {
    /*state = {
        windowWidth:0,
      }*/
    constructor(props){
        super(props)
        this.HandleConnexion = this.HandleConnexion.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.state = {
            windowWidth:0,
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
        this.setState({ windowWidth: windowWidth });
    }

    HandleConnexion(param){
        console.log(param)
        switch (param[0]){
            case 'membreHopital' :
                this.props.history.push({
                    pathname:'home-hopital'
                }) 
              
            break;
            case 'officierEtatCivil' :
                this.props.history.push({
                    pathname:'home-prefecture'
                }) 
            break;
            case 'membreMairie' :
                this.props.history.push({
                    pathname:'home-mairie'
                }) 
            break;
            default:
        }
    }

    render() { 
        return (
            <Container className="body-container">
                {this.state.windowWidth <= 1200 ?
                <>
                    <Row style={{paddingTop:"60px"}} />
                    <Connexion ClickHandler={this.HandleConnexion}/>
                </>
                :
                <>
                    <Row style={{paddingTop:"80px"}} />
                    <Row style={{height:"100px"}} className="text-center">
                        <h1 className="ml-4" style={{color:"gray"}}>PORTAIL ADMINISTRATION</h1>
                    </Row>
                    <Connexion ClickHandler={this.HandleConnexion}/>
                </>
                }
                
            </Container>
          );
    }
}
 
export default PortailAdministration;