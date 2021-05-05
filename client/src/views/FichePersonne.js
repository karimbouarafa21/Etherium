import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import { Helmet } from 'react-helmet'
import {
    Container,
    Row,
    Col,
    Button,
    Input,
  } from "reactstrap";
import getPerson from 'services/getPerson';

// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";
import { provider } from "../variables";

import Base64Downloader from 'react-base64-downloader';
import { triggerBase64Download } from 'react-base64-downloader';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const TITLE = 'Fiche personne'

class FichePersonne extends Component {
    
    constructor(props) {
        console.log("=== FichePersonne ===")
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getPerson = this.getPerson.bind(this);
        this.getInfosCitoyens = this.getInfosCitoyen.bind(this);
        this.setState = this.setState.bind(this);
        
        if(!window.location.hash){
        const ID = this.props.location.state.ID;
	    localStorage.setItem('IDLocal', ID);
            const _ID = localStorage.getItem('IDLocal');
            const URL = this.props.location.state.URL;
            localStorage.setItem('URLLocal', URL);
        }        

        this.state = {
            ID : '',
            URL : '',
            CivilStateInstance: undefined,
            account: null,
            web3: null,
            login : '',
            sexe : '',
            nomFamille : '',
            premierPrenom : '',
            autresPrenoms : '',
            etatCivil : '',
            dateNaissance : '',
            communeNaissance : '',
            departementNaissance : '',
            nomFamilleMere : '',
            prenomMere : '',
            nomFamillePere : '',
            prenomPere : '',
            infosCitoyen : [],   
            stateTableRow : ["init", "init", "init", "init", "init", "init", "init", "init", "init", "init", "init", "init", "init"],
            modifiedFieldValue :"",
            windowWidth: 0,
            windowHeight: 0
        }
        this.refInputChange = React.createRef();
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
    
    getPerson(e){
        return getPerson(e)
    }

    handleClickBack(e){
        console.log("=== handleClickBack ===")

        this.props.history.push({
            pathname:this.state.URL,
            state : 
             { URL : this.state.URL,
                source : "clickBack"
            }
        })
    }

    handleClickMariage(){
        console.log("=== handleClickMariage ===")
        this.props.history.push({
            pathname:this.state.URL,
            state : 
             {
                source : "conjointOK"
            }
        })
        
    }

    handleClickValiderIdentite = async () => {

        try {  
            await this.state.CivilStateInstance.methods.verifyIdentite(this.state.login)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
                  
          } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
         }
         

         this.props.history.push({
            pathname:'identite-verifiee',
            state : this.state.ID
             
        })
    }

    HandleEditClick(e){
        let changeLog = this.state.stateTableRow
        changeLog[e]="edit"
        this.setState({stateTableRow:changeLog})
        
        let infosCitoyen = this.state.infosCitoyen
        const previousValue = infosCitoyen[e]
        infosCitoyen[e]=<div className="text-table"><Input onChange={(e) => this.HandleChangeInput(e)} style={{width:"50%"}}></Input><i onClick={() => this.HandleConfirmChange(e)} style={{marginLeft:"6px"}} class="fa fa-check"></i><i onClick={() => this.HandleCancelChange(previousValue, e)} style={{marginLeft:"6px"}} class="fa fa-times"></i></div>
        
        this.setState({infosCitoyen:infosCitoyen})
    }

    HandleChangeInput(e){
        this.setState({modifiedFieldValue:e.target.value})
    }

    HandleConfirmChange(e){
        let infosCitoyen = this.state.infosCitoyen

        infosCitoyen[e]=<div className="text-table"><div style={{width:"50%"}}>{this.state.modifiedFieldValue}</div> <i onClick={() => this.HandleEditClick(e)} class="fa fa-edit"></i></div>
        
        let stateTableRow = this.state.stateTableRow
        stateTableRow[e] = "changed"
        this.setState({stateTableRow:stateTableRow})
    }

    HandleCancelChange(previousValue, e){
        let infosCitoyen = this.state.infosCitoyen
        infosCitoyen[e]=previousValue

        let stateTableRow = this.state.stateTableRow
        stateTableRow[e] = "init"

        this.setState({infosCitoyen:infosCitoyen})
        this.setState({stateTableRow:stateTableRow})
    }

    // Back
    getInfosCitoyen = async () => {
        // Récupérer le login avec l'ID
        const responseLogin = await this.state.CivilStateInstance.methods.getLoginFromId(this.state.ID).call({from : this.state.account});
                const _login = responseLogin;
        this.setState({ login: _login });


        // Donnees identification citoyen
        const responseInfoIdentificationCitoyen = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(this.state.login).call({from : this.state.account});
        const _sexe =  responseInfoIdentificationCitoyen[0];
        const _nomFamille = responseInfoIdentificationCitoyen[1];
        const _nomUsage = responseInfoIdentificationCitoyen[2];
        const _premierPrenom = responseInfoIdentificationCitoyen[3];
        const _autresPrenoms = responseInfoIdentificationCitoyen[4];
        const _etatCivil = responseInfoIdentificationCitoyen[5];
        this.setState({sexe : _sexe, nomFamille : _nomFamille, nomUsage : _nomUsage, premierPrenom : _premierPrenom, autresPrenoms : _autresPrenoms, etatCivil : _etatCivil});

        // Donnees naissance citoyen
        const responseInfoNaissanceCitoyen = await this.state.CivilStateInstance.methods.getInfoNaissanceCitoyen(this.state.login).call({from : this.state.account});
        const _dateNaissance = responseInfoNaissanceCitoyen[0];
        const _communeNaissance = responseInfoNaissanceCitoyen[1];
        const _departementNaissance = responseInfoNaissanceCitoyen[2];
        this.setState({dateNaissance : _dateNaissance, communeNaissance : _communeNaissance, departementNaissance : _departementNaissance});

        // Donnees parents citoyen
        const responseInfoParentsCitoyen = await this.state.CivilStateInstance.methods.getInfoParentsCitoyen(this.state.login).call({from : this.state.account});
        const _nomFamilleMere = responseInfoParentsCitoyen[0];
        const _prenomMere = responseInfoParentsCitoyen[1];
        const _nomFamillePere = responseInfoParentsCitoyen[2];
        const _prenomPere = responseInfoParentsCitoyen[3];
        this.setState({nomFamilleMere : _nomFamilleMere, prenomMere : _prenomMere, nomFamillePere : _nomFamillePere, prenomPere : _prenomPere});
        
        // Alimentation de la liste "infosCitoyen" pour appel de "getPerson" et affichage
        let _infosCitoyen =[]
        if(this.state.URL==="valider-identite"){
            _infosCitoyen = [
                <div className="text-table"><div style={{width:"50%"}}>{this.state.sexe}</div> <i onClick={() => this.HandleEditClick(0)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.nomFamille}</div> <i onClick={() => this.HandleEditClick(1)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.nomUsage}</div> <i onClick={() => this.HandleEditClick(2)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.premierPrenom}</div> <i onClick={() => this.HandleEditClick(3)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.autresPrenoms}</div> <i onClick={() => this.HandleEditClick(4)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.etatCivil}</div> <i onClick={() => this.HandleEditClick(5)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.dateNaissance}</div> <i onClick={() => this.HandleEditClick(6)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.communeNaissance}</div> <i onClick={() => this.HandleEditClick(7)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.departementNaissance}</div> <i onClick={() => this.HandleEditClick(8)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.nomFamilleMere}</div> <i onClick={() => this.HandleEditClick(9)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.prenomMere}</div> <i onClick={() => this.HandleEditClick(10)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.nomFamillePere}</div> <i onClick={() => this.HandleEditClick(11)} class="fa fa-edit"></i></div>, 
                <div className="text-table"><div style={{width:"50%"}}>{this.state.prenomPere}</div> <i onClick={() => this.HandleEditClick(12)} class="fa fa-edit"></i></div>,
                <div className="text-table"><div style={{width:"50%"}}>{this.state.ID}</div> <i onClick={() => this.HandleEditClick(13)} class="fa fa-edit"></i></div>, 
                ]
        } else {
            _infosCitoyen = [
                this.state.sexe,
                this.state.nomFamille,
                this.state.nomUsage,
                this.state.premierPrenom,
                this.state.autresPrenoms,
                this.state.etatCivil,
                this.state.dateNaissance,
                this.state.communeNaissance,
                this.state.departementNaissance,
                this.state.nomFamilleMere,
                this.state.prenomMere,
                this.state.nomFamillePere,
                this.state.prenomPere,
                this.state.ID,
                ]
        }
        
        this.setState({infosCitoyen : _infosCitoyen});

    }
    // Back
    


    componentDidMount = async () => {
        const _URL = localStorage.getItem('URLLocal');
        const _ID = localStorage.getItem('IDLocal');
        this.setState({ ID: _ID, URL: _URL});

        
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
        
          // Récupérations des informations du citoyen
          this.getInfosCitoyen();          
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }

    };
    
    MakeTableDoc(){
        
        
        const result = [
            {name : "Preuve de naissance", price : this.state.ID},
          ]

        return (result);
    }
    
    // Back
    
    render() {
        
        const base64 = localStorage.getItem('base64Local')
        console.log(base64)

        let afficherDownloadButton;
        if (this.state.URL==="valider-identite" && base64) {
            afficherDownloadButton = true;
        } else {
            afficherDownloadButton = false;
        }
        

        return (
        <>  
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            
            <Container className="body-container">
                {this.state.windowWidth <= 1200 ?
                    <Row style={{paddingTop:"20px"}}>
                        <div className="flex-container-left-center">
                            <i onClick={(e) => this.handleClickBack(e)} class="fa fa-arrow-left mr-10 fa-3x mg-10" style={{}}></i>                         
                            <h4 className="ml-4 mb-0" style={{color:"gray"}}>FICHE PERSONNE</h4>
                        </div>
                    </Row>
                :
                    <Row style={{paddingTop:"100px"}}>
                        <div className="flex-container-left-center">
                            <i onClick={(e) => this.handleClickBack(e)} class="fa fa-arrow-left mr-10 fa-3x" style={{}}></i>                         
                            <h1 className="ml-4" style={{color:"gray"}}>FICHE PERSONNE</h1>
                        </div>
                    </Row>
                }
                <Col style={{marginLeft:"10px"}}>
                    {this.state.windowWidth <= 1200 ?
                    <Row style={{paddingTop:"20px"}}>     
                        <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>
                    </Row>
                    :
                    <Row style={{paddingTop:"100px"}}>     
                        <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>
                    </Row>
                    }
                    {/** TELECHARGEMENT DOCUMENT */}
                    {!afficherDownloadButton ? null : 
                            <Row style={{paddingTop:"30px"}}>
                                {this.state.windowWidth <= 1200 ? 
                                <h4 style={{color:"gray"}}>Documents justificatifs</h4> :
                                <h2 style={{color:"gray"}}>Documents justificatifs</h2>
                                }
                                
                            </Row>
                    }                 
                    <Row style={{paddingTop:"30px"}} >
                    
                        <Col >
                        <div className="flex-container-left-center">
                        {!afficherDownloadButton ? null : (
                                            <h6 className="ml-4" style={{color:"gray", fontWeight:"bold"}}>{this.state.ID}</h6>
                                            
                                        )}
                        <Col className="col-3">
                        {!afficherDownloadButton ? null : (                          
                            <VisibilityIcon className="link" style={{ color: "#51bcda" }}
                                onClick={() => triggerBase64Download(base64, this.state.ID)}>
                            </VisibilityIcon>                                                             
                                                            
                        )}
                        </Col>                     
                        </div>
                        </Col>
                    
                    </Row>                        
                    {/**TELECHARGEMENT DOCUMENT */}
                    <Row style={{paddingTop:"50px"}}>
                        <Col className="col-sm-auto offset-sm-7">
                            {this.state.URL==="valider-identite" && 
                                <Button onClick={() => this.handleClickValiderIdentite()} color="info">
                                    Valider cette identité
                                </Button>
                            }
                                                
                            {this.state.URL==="declarer-mariage" && 
                                <Button onClick={() => this.handleClickMariage()} color="info">
                                    Valider ce conjoint
                                </Button>
                            }
                        </Col>
                    </Row>  
                </Col>
                

            </Container>
        </>
        );
    }
}
 
export default FichePersonne;
