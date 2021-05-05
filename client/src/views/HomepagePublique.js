import React, { Component } from 'react';
import countryColors from "variables"
import countryLayout from "variables"
import { Link, useHistory } from "react-router-dom";
import Actualités from "components/Actualités"
import CarouselComponent from "components/Carroussels/CarouselComponent"
import HomepageHeader from "components/Headers/HomepageHeader"
import QuestionsRéponses from "components/QuestionsRéponses"
import TextesRef from "components/TextesRef"
import Connexion from 'components/Connexion'

import {
    Container,
    Row,
    Col,
  } from "reactstrap";
import TileLogoButton from 'components/TileLogoButton';

// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";
import { provider } from "../variables";


class HomepagePublique extends Component {
    /*state = {
        isTileState: true,
        isConnexionState: false,
        redirect:false,
        login: '',
        pwd: '',
        auth: '',
        CivilStateInstance: undefined,
        account: null,
        web3: null,
        authentificationState:"init",
        windowWidth: 0,
        windowHeight: 0,
    }*/

    constructor(props) {
        super(props)
        this.HandleClick = this.HandleClick.bind(this);
        this.setState = this.setState.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this);
        
        this.state = {
            isTileState: true,
            isConnexionState: false,
            redirect:false,
            login: '',
            pwd: '',
            auth: '',
            CivilStateInstance: undefined,
            account: null,
            web3: null,
            authentificationState:"init",
            windowWidth: 0,
            windowHeight: 0,
        }
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

    HandleClick(param){
        
        console.log("=== handleClick ===")
        const identifiant = param[0];
        const mdp = param[1];
        localStorage.setItem('IdentifiantLocal', identifiant);
        localStorage.setItem('MdpLocal', mdp);

        // Vérification authentification blockchain

        this.getAuthentification().then(result => 
            {
                console.log('** getAuthentification done. Exited with status : ' + result + ' **');
                if (result){
                    this.setState({authentificationState:"OK"})
                    console.log("identification OK");
                    this.props.history.push({
                        pathname:'home-citoyen',
                        state: identifiant
                    });
                }else {
                    this.setState({authentificationState:"KO"})
                    console.log("identification KO");
                }
                
            }
        );
    }
      
      /*Fonction pour changer l'état du composant affiché en bas à gauche : tuiles ou formualire
      de connexion */
    triggerClickConnexion = (e) => {
        console.log("=== triggerClickConnexion ===")
        this.setState({isTileState: false})
        this.setState({ isConnexionState: true })
    }

    /*Fonction pour rédiriger vers 'verification-id'*/
      triggerClickHash = (e) => {
        console.log("=== triggerClickHash ===")
        this.setState({isTileState: false})
        this.props.history.push({
            pathname:'verification-id'
        });
    }

    // Back
    async getAuthentification  () {
        console.log("=== getAuthentification ===");
        
        // Vérifier authentification
        const _identifiant = localStorage.getItem('IdentifiantLocal');
        const _pwd = localStorage.getItem('MdpLocal');
        
        const responseAuth = await this.state.CivilStateInstance.methods.verifyAuthentification(_identifiant, _pwd).call({from : this.state.account});
        const _auth = responseAuth[0];
        
        this.setState({ auth: _auth});
        localStorage.setItem('AuthLocal', _auth);
        
        if (_auth==="ko"){
            return (false)
        } else {
            return (true)
        }
    }
    // Back       
    
    // Back
    componentDidMount = async () => {
      
        // FOR REFRESHING PAGE ONLY ONCE -
        if(!window.location.hash){
          window.location = window.location + '#loaded';
          window.location.reload();
        }
    
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();

          // Set provider for signature
          web3.setProvider(provider);          
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = CivilStateContract.networks[networkId];
          const instance = new web3.eth.Contract(
              CivilStateContract.abi, 
              deployedNetwork && deployedNetwork.address,
          );

          // account[0] = default account used by metamask
          this.setState({ CivilStateInstance: instance, web3: web3, account: accounts[0] });          
 
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };
    // Back

    render() { 
        return (
            <>
            {/*<HomepageHeader/>*/}
            <Container className="body-container"> 
            
                <div style={{height:"60px"}}/>
                <Row>
                    <Col  md={{ size: 7, offset: 0 }}>
                        <Row>
                            <CarouselComponent/>
                        </Row>
                    </Col>
                    <Col style={{marginLeft:"20px"}}>
                        <Row>
                            <Actualités style={{height:"445px"}} className="ml-auto"/>
                        </Row>
                    </Col>
                </Row>
                <div style={{height:"20px"}}/>
                <Row>
                    <Col md={{ size: 7, offset: 0 }}>
                        {/*Le composant affiché par défaut est celui composé des deux tuiles connexion et vérification d'identité.
                        Au clic sur le bouton "Se connecter", ce composant est remplacé par le composant formulaire 
                        de connexin */}
                        <div>{this.state.isTileState}{this.state.isTileState && 
                            <><Row>
                                <TileLogoButton action={this.triggerClickConnexion} titre="PARTICULIERS" type="connexion" contenu="Connectez-vous à votre espace personnel pour consulter votre état civil et accéder à vos démarches."/>
                            </Row>
                            <Row>
                                <TileLogoButton
                                    action={this.triggerClickHash}
                                    titre="VERIFIEZ UNE IDENTITE" contenu="Le service de vérification d’identité vous permet de confirmer les déclarations d’identité."
                                /> 
                            </Row></>}
                        </div>
                        <div>{this.state.isConnexionState}{this.state.isConnexionState && 
                            
                            <Connexion status={this.state.authentificationState} ClickHandler={(e) => this.HandleClick(e)}/> }
                        </div>
                    </Col>
                    
                    <Col style={{marginLeft:"20px"}}>
                    {this.state.windowWidth < 1200 && 
                        <Row style={{height:"40px"}}></Row>
                    }
                        <Row>
                            <QuestionsRéponses/>
                            {this.state.windowWidth > 1200 &&
                                <div style={{height:"50px"}}/>
                            }
                            
                            <TextesRef />
                        </Row>
                    </Col>
                </Row>
            </Container>
            </>
          );
    }
}

export default HomepagePublique;