import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import imageAjouter from 'assets/img/IconesAccueils/Ajouter.png';
//import Snackbar from '@material-ui/core/Snackbar';
//import MuiAlert from '@material-ui/lab/Alert';
//import { makeStyles } from '@material-ui/core/styles';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

// Back 
import CivilStateContract from "../../contracts/CivilState.json";
import getWeb3 from "../../getWeb3";
import { provider } from "../../variables";

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Input,
    FormGroup,
    Label,
  } from "reactstrap";
  
  import TextField from "@material-ui/core/TextField";
  import _isEmpty from "lodash/isEmpty";
  import SimpleTable from 'components/SimpleTable';
import { ThreeSixty } from '@material-ui/icons';

const TITLE = 'Enregistrer une naissance'

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

class EnregistrerNaissance extends Component {
    constructor(props){
        super(props);
        console.log("ENREGISTRER NAISSANCE");
        const fieldsValues = new Map();
        fieldsValues.set("Sexe","Feminin")
        fieldsValues.set("Nom de famille","")
        fieldsValues.set("Nom d'usage","")
        fieldsValues.set("Premier prénom","")
        fieldsValues.set("Autres prénoms","")
        fieldsValues.set("Date de naissance","")
        fieldsValues.set("Commune de naissance","")
        fieldsValues.set("Département de naissance","")
        fieldsValues.set("Nom de famille de la mère","")
        fieldsValues.set("Prénom de la mère","")
        fieldsValues.set("Nom de famille du père","")
        fieldsValues.set("Prenom du père","")
        
        const fieldsStates = new Map();
        fieldsStates.set("Sexe", "valid")
        fieldsStates.set("Nom de famille","valid")
        fieldsStates.set("Nom d'usage","valid")
        fieldsStates.set("Premier prénom","valid")
        fieldsStates.set("Autres prénoms","valid")
        fieldsStates.set("Date de naissance","valid")
        fieldsStates.set("Commune de naissance","valid")
        fieldsStates.set("Département de naissance","valid")
        fieldsStates.set("Nom de famille de la mère","valid")
        fieldsStates.set("Prénom de la mère","valid")
        fieldsStates.set("Nom de famille du père","valid")
        fieldsStates.set("Prenom du père","valid")

        this.state = {
            CivilStateInstance: undefined,
            account: null,
            web3: null,
            fieldsStates: fieldsStates,
            fieldsValues: fieldsValues,
            formIsOK: true,
            id: "0x",
            name: "",
            windowWidth: 0,
            windowHeight: 0
        }

        if (localStorage.getItem('wkfStateLocal') < 1) {
            localStorage.setItem('wkfStateLocal',1)
            console.log("Initialiser wkfStateLocal si undefined")
        }
        this.updateDimensions = this.updateDimensions.bind(this);   
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

    handleCloseErrorSnackBar(event, reason){
        if (reason === 'clickaway') {
        return;
        }
        this.setState({snackBarErrorOpen:false})
    }

    handleChange(field, e){         
        let fieldsValues = this.state.fieldsValues
        fieldsValues.set(field,e.target.value)

        let fieldsStates = this.state.fieldsStates
        fieldsStates.set(field,false)

        this.setState({fieldsValues});
    }

    handleSubmit(e) {
        this.setState({formIsOK:true})
        let fieldsStates = this.state.fieldsStates
        let fieldsValues = this.state.fieldsValues
        e.preventDefault()
        for (const element of fieldsStates){
            switch (element[0]) {
                case 'Sexe':
                    if (!fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }
                break
                case 'Nom de famille':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case "Nom d'usage":
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Premier prénom':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Autres prénoms':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Date de naissance':
                    const date = new Date()
                    const aujourdhui = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+(date.getDate())).slice(-2)
                    if (!this.state.fieldsValues.get(element[0]) || this.state.fieldsValues.get(element[0])>aujourdhui){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Commune de naissance':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Département de naissance':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Nom de famille de la mère':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Prénom de la mère':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Nom de famille du père':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Prenom du père':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        this.setState({formIsOK:false})
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                default:
            }
        }     
        
        this.setState({fieldsStates:fieldsStates}, 
            function(){
                if(this.state.formIsOK){
                    //this.addNaissance()
                    this.addNaissance().then(
                        (result) => {
                            console.log("** addNaissance done, promesse tenue : " + result + " **")
                            
                            if (result){
                                console.log("Redirection page de validation")
                                this.props.history.push({
                                    pathname:'naissance-validee',
                                    state: this.state.id
                                })
                            } else {
                                console.log("Redirection page de validation")
                            }
                        }
                    )                    
                }
            }
        );
    }

    async addNaissance (){
    
        console.log(this.state.fieldsValues);
        let fieldsStates = this.state.fieldsStates
        let fieldsValues = this.state.fieldsValues
        let _sexe;
        let _nomFamille;
        let _nomUsage;
        let _premierPrenom;
        let _autresPrenoms;
        let _dateNaissance;
        let _communeNaissance;
        let _departementNaissance;
        let _nomFamilleMere;
        let _prenomMere;
        let _nomFamillePere;
        let _prenomPere;
        let _login;
        let _id;

        for (const element of fieldsStates){
            switch (element[0]) {
                case 'Sexe':
                    _sexe = this.state.fieldsValues.get(element[0]);
                break
                case 'Nom de famille':
                _nomFamille = this.state.fieldsValues.get(element[0]);
                break
                case "Nom d'usage":
                    _nomUsage = this.state.fieldsValues.get(element[0]);
                break
                case 'Premier prénom':
                   _premierPrenom = this.state.fieldsValues.get(element[0]);
                break
                case 'Autres prénoms':
                    _autresPrenoms = this.state.fieldsValues.get(element[0]);
                break
                case 'Date de naissance':
                    _dateNaissance = this.state.fieldsValues.get(element[0]);
                break
                case 'Commune de naissance':
                    _communeNaissance = this.state.fieldsValues.get(element[0]);
                break
                case 'Département de naissance':
                    _departementNaissance = this.state.fieldsValues.get(element[0]);
                break
                case 'Nom de famille de la mère':
                    _nomFamilleMere = this.state.fieldsValues.get(element[0]);
                break
                case 'Prénom de la mère':
                    _prenomMere = this.state.fieldsValues.get(element[0]);
                break
                case 'Nom de famille du père':
                   _nomFamillePere = this.state.fieldsValues.get(element[0]);
                break
                case 'Prenom du père':
                    _prenomPere = this.state.fieldsValues.get(element[0]);
                break
                default:
            }
        }

        try {  
            await this.state.CivilStateInstance.methods.addNaissance(_sexe, _nomFamille, _nomUsage, _premierPrenom, _autresPrenoms)
                .send({
                    from : this.state.account,
                    gas: 1000000
                })
            const citoyenCount = await this.state.CivilStateInstance.methods.getCitoyensCount().call({from : this.state.account});      
            let idNaissance;
            if (citoyenCount == 0) {
                idNaissance = citoyenCount;
            } else {
                idNaissance = citoyenCount - 1;
            }
            
            // Récupérer le login, l'id et le statut
            const response = await this.state.CivilStateInstance.methods.getLoginIdStatut(idNaissance).call({from : this.state.account});
            _login = response[0];
            _id = response[1];
            
        } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);            
        }
        
        try {  
            await this.state.CivilStateInstance.methods.addDonneesNaissance(_login, _dateNaissance, _communeNaissance, _departementNaissance)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
    
            //alert('Données de naissance ajoutées');
        } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
        } 

        try {  
                const response = await this.state.CivilStateInstance.methods.addDonneesParents(_login, _nomFamilleMere, _prenomMere, _nomFamillePere, _prenomPere)
                      .send({
                          from : this.state.account,
                          gas: 1000000
                      })  

                if (response){
                    this.setState({id: _id});
                    console.log(this.state.id)
                    return (true)
                } else {
                    return(false)
                }
        } catch (error) {
                  // Catch any errors for any of the above operations.
                  alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                  );
                  console.error(error);
                  return(false)
        }

    }



    //Back
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
            this.setState({snackBarErrorOpen:true})
            console.log("** Connexion web3 ** => Failed to load web3, accounts, or contract. Check console for details.");
            await timeout(2000);
            this.props.history.push({
                pathname:'hopital-naissance'
            })
        }
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };
    // Back

    MakeTableDoc(){
        console.log(this.state.name)
        const result = [
            {name : "Document chargé", price : this.state.name},
          ]

        return (result);
    }    
    render() {
        let file; 
        return ( 
            <>
            <Container>
                <Row style={{paddingTop:"100px"}}>
                    
                        {this.state.windowWidth <= 1200 ?
                            <>
                            <Col style={{maxWidth:"520px"}} className="flex-container-spread-center">
                                <img style={{width:"40px"}} alt="..." src={imageAjouter}/>
                                <h4 style={{color:"gray"}}>Enregistrer une naissance</h4>
                            </Col>
                            </>
                        : 
                            <>
                            <div className="flex-container-left-center">
                                <img style={{width:"80px"}} alt="..." src={imageAjouter}/>
                                <h1 className="ml-4" style={{color:"gray"}}>Enregistrer une naissance</h1>
                            </div>
                            </>
                        }

                </Row>
                <div style={{height:"80px"}}></div>
                <Col className="text-left col-sm-12 col-md-6 offset-md-3">
                    <Form onSubmit={e=> {this.handleSubmit(e)}}>
                        <Row>
                            <h2 style={{color:"gray"}}>Données d’identification</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Sexe")==="notValid" && "has-danger"}>
                            <Label for="oui">Sexe</Label>
                            <Input onChange={this.handleChange.bind(this, "Sexe")} type="select" placeholder="Sexe">
                                <option>Feminin</option>
                                <option>Masculin</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille")==="notValid" && "has-danger"}>
                            <Label>Nom de famille</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille")} type="text" placeholder="Nom de famille" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom d'usage")==="notValid" && "has-danger"}>
                            <Label>Nom d'usage</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom d'usage")} type="text" placeholder="Nom d'usage" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Premier prénom")==="notValid" && "has-danger"}>
                            <Label>Premier prénom</Label>
                            <Input onChange={this.handleChange.bind(this, "Premier prénom")} type="text" placeholder="Premier prénom" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Autres prénoms")==="notValid" && "has-danger"}>
                            <Label>Autres prénoms</Label>
                            <Input onChange={this.handleChange.bind(this, "Autres prénoms")} type="text" placeholder="Autres prénoms" />
                        </FormGroup>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Données de naissance</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Date de naissance")==="notValid" && "has-danger"}>
                            <Label>Date de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Date de naissance")} type="date" placeholder="Date de naissance" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Commune de naissance")==="notValid" && "has-danger"}>
                            <Label>Commune de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Commune de naissance")} type="text" placeholder="Commune de naissance" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Département de naissance")==="notValid" && "has-danger"}>
                            <Label>Département de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Département de naissance")} type="text" placeholder="Département de naissance" />
                        </FormGroup>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Parents</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille de la mère")==="notValid" && "has-danger"}>
                            <Label>Nom de famille de la mère</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille de la mère")} type="text" placeholder="Nom de famille de la mère" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Prénom de la mère")==="notValid" && "has-danger"}>
                            <Label>Prénom de la mère</Label>
                            <Input onChange={this.handleChange.bind(this, "Prénom de la mère")} type="text" placeholder="Prénom de la mère" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille du père")==="notValid" && "has-danger"}>
                            <Label>Nom de famille du père</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille du père")} type="text" placeholder="Nom de famille du père" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Prenom du père")==="notValid" && "has-danger"}>
                            <Label>Prénom du père</Label>
                            <Input onChange={this.handleChange.bind(this, "Prenom du père")} type="text" placeholder="Prénom du père" />
                        </FormGroup>
                        {/** CHARGEMENT DOCUMENT */}
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Documents justificatifs</h2>
                        </Row>                                               
                        <Row style={{paddingTop:"30px"}} >                        
                            <Col >
                            <div className="flex-container-left-center">
                            <Button className="btn-link" color="info" outline>
                                    
                                    <i><AddToPhotosIcon style={{ color: "#17A2B8" }}/></i>
                                    {(
                                    <input
                                        id="docupload"
                                        type="file"
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            width: "100%",
                                            opacity: 0
                                          }}
                                        onChange={event => {
                                        if (event.target.files) {
                                            file = event.target.files[0];
                                            const reader = new FileReader();
                                            reader.onloadend = e => {
                                            if (e.target.result !== undefined) {
                                                const dataUrl = e.target.result.split(";base64,")[1];
                                                console.log(e.target.result)
                                                //console.log(dataUrl)
                                                this.setState({ name: file.name });
                                                localStorage.setItem('dataUrlLocal',dataUrl)
                                                localStorage.setItem('base64Local',e.target.result)

                                            }

                                            };
                                            reader.readAsDataURL(file);
                                        }
                                        }}
                                    />
                                    
                                    )}
                                </Button>
                                <h6 className="ml-4" style={{color:"gray"}}>Ajouter un document</h6>                                 
                            </div>                                                                                   
                            </Col>                                             
                        </Row>
                        <div style={{height:"10px"}}></div>                       
                        <Row>

                        <div className="flex-container-left-center">
                        {/*_isEmpty(this.state.name) ? null : (
                                        <div className="flex-container-left-center">
                                        <SimpleTable bold={true} data={this.MakeTableDoc().slice(0,1)}/>
                                        </div>
                                    )*/}                            
                        {_isEmpty(this.state.name) ? null : (
                            <h8 className="ml-4" style={{color:"gray", fontWeight:"bold"}}>{this.state.name}</h8>
                                                        
                        )}    
                        </div>
                        </Row>                        
                        {/**CHARGEMENT DOCUMENT */}
                        <Row style={{paddingTop:"30px"}} >
                            <Col className="offset-sm-8">
                                <Button className="btn-round btn ml-8 btn-info" color="info">Enregistrer</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Container>
            

            </>
         );
    }
}
 
export default EnregistrerNaissance;