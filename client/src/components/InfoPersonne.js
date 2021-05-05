import React, { Component } from 'react';
import SimpleTable from 'components/SimpleTable';
import {
    Container,
    Row,
    Col,
  } from "reactstrap";


class InfoPersonne extends Component {
    
    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.setState = this.setState.bind(this);

        this.state = {
            windowWidth: 0,
            windowHeight: 0
        }
    }
    
    /*state = {
        windowWidth: 0,
        windowHeight: 0
    }*/
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        this.setState({windowWidth:windowWidth});
    }

    render() { 
        return (
            <>
            {this.state.windowWidth <= 1200 ?
                <div className="container-info-personne">
                    <Row>
                        <h6 style={{color:"gray"}}>Données d’identification</h6>
                    </Row>
                    <Row style={{marginLeft:"10px"}}>
                        <SimpleTable data={this.props.data.slice(0,7)}/>                  
                    </Row>
                    <Row style={{paddingTop:"30px"}}>
                        <h6 style={{color:"gray"}}>Données de naissance</h6>
                    </Row>
                    <Row style={{marginLeft:"10px"}}>
                        <SimpleTable data={this.props.data.slice(7,10)}/>
                    </Row>
                    <Row style={{paddingTop:"30px"}}>
                        <h6 style={{color:"gray"}}>Parents</h6>
                    </Row>
                    <Row style={{marginLeft:"10px"}}> 
                        <SimpleTable data={this.props.data.slice(10,14)}/>
                    </Row>
                </div>
            :
                <div className="container-info-personne">
                    <Row>
                        <h2 style={{color:"gray"}}>Données d’identification</h2>
                    </Row>
                    <Row style={{marginLeft:"30px"}}>
                        <SimpleTable data={this.props.data.slice(0,7)}/>                  
                    </Row>
                    <Row style={{paddingTop:"30px"}}>
                        <h2 style={{color:"gray"}}>Données de naissance</h2>
                    </Row>
                    <Row style={{marginLeft:"30px"}}>
                        <SimpleTable data={this.props.data.slice(7,10)}/>
                    </Row>
                    <Row style={{paddingTop:"30px"}}>
                        <h2 style={{color:"gray"}}>Parents</h2>
                    </Row>
                    <Row style={{marginLeft:"30px"}}> 
                        <SimpleTable data={this.props.data.slice(10,14)}/>
                    </Row>
                </div>
            }
            
            </>
          );
    }
}
 
export default InfoPersonne;