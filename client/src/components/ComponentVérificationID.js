import React, { Component } from 'react';
import {
    Button,
    FormGroup,
    Input,
    Form,
  } from "reactstrap";
import getPerson from 'services/getPerson';
import ErrorMessage from './ErrorMessage';
import InfoPersonne from './InfoPersonne';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";
import { provider } from "../variables";

async function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

class ComponentVérificationID extends Component {

    constructor(props) {
        super(props)
        
        this.updateState = this.updateState.bind(this);
        this.setState = this.setState.bind(this);
        this.handleCloseErrorSnackBar = this.handleCloseErrorSnackBar.bind(this);
        this.handleCloseSuccessSnackBar = this.handleCloseSuccessSnackBar.bind(this);
        this.checkHash = this.checkHash.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.defineInputValue = this.defineInputValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // verifyHash
        this.verifyHash = this.verifyHash.bind(this);


        this.state = {
            hashSent: false,
            hashIsOk: false,
            stateComponent: "init", 
            /**
             * hashSent | hashIsOk | stateComponent
             *  false   |   false  | "init"
             *  false   |   true   | ----
             *  true    |   false  | "HaskKO"
             *  true    |   true   | "HashOK"
             */
            fieldValue:this.props.defaultHash, //Valeur tapée dans le champs input, mise à jour on change
            sentHash:"", //Valeur envoyée dans au back (hash complet), mise à jour on submit
            userData : "", //Données utilisateur retournées. TODO : format à définir
            CivilStateInstance: undefined,
            account: null,
            web3: null,
            login: '',
            infosCitoyen: [],
            hashFieldHasChanged:false,
            loading:false,
            snackBarErrorOpen:false,
            snackBarSuccessOpen:false,
          }
    }

    handleCloseErrorSnackBar(event, reason){
        if (reason === 'clickaway') {
        return;
        }
        this.setState({snackBarErrorOpen:false})
    }

    handleCloseSuccessSnackBar(event, reason){
        if (reason === 'clickaway') {
        return;
        }
        this.setState({snackBarSuccessOpen:false})
    }

    checkHash(hash){
        console.log("=== checkHash ===")
        let hashVerified;
        let _infosCitoyen = []
        let login = ""

        this.verifyHash().then(
            (result) => {
                console.log("** verifyHash done, promesse tenue : " + result + " **")
                if (result){  
                    _infosCitoyen = localStorage.getItem('infoCitoyenLocal');
                    login = localStorage.getItem('LoginLocal');
                    this.setState({hashIsOk: true, hashSent:true, snackBarSuccessOpen: true}, function () {this.setState({loading:false}); this.updateState()})
                    timeout(3000).then((result) => {
                        this.setState({snackBarSuccessOpen: false})
                    })
                    
                } else {
                    this.setState({hashIsOk: false, hashSent:true}, 
                        function (){
                            this.setState({loading:false}); 
                            this.updateState()
                        }
                    )
                }
            }
        )
    }

    updateState(){
        console.log("=== updateSate ===")      
        if (this.state.hashSent) {
            if (this.state.hashIsOk) {
                this.setState(() => ({stateComponent:"HashOK"}))
            } else {
                this.setState(() => ({stateComponent:"HashKO"}))
            }
        }    
    }
    
    handleSubmit(e){
        e.preventDefault()
        console.log("=== handleSubmit ===")
        console.log(this.state)

        if(this.state.fieldValue && this.state.hashFieldHasChanged===false){
            this.setState({fieldValue: this.props.defaultHash}, function(){console.log(this.state.fieldValue);})
            this.setState({loading:true})
        }

        if (this.state.fieldValue){
            //Recopie dans sentHash la valeur de fieldValue (qui est mise à jour on change) 
            //Lorsque c'est fait, appel de la fonction de check du hash contenu dans sentHash dans la BC
            this.setState({sentHash: this.state.fieldValue}, function() {this.checkHash(this.state.sentHash)})
            this.setState({loading:true})
        }
    }

    handleInputChange(e){
        console.log("=== handleInputChange ===")
        this.setState({fieldValue: e.target.value})
        this.setState({hashFieldHasChanged:true})
    }

    defineInputValue(){

        if(this.state.hashFieldHasChanged){
            //return e.target.value
        } else {
            if (this.props.defaultHash!=="loaded"){
                return this.props.defaultHash
            }
        }
    }

    handleClick(e){
        console.log("=== handleClick ===")
        this.setState({hashSent:false, hashIsOk:false, stateComponent:"init"}, function(){
            this.props.RedirectionHandler()
        })
    }

    // Back 
    getPerson(e){ 
       return getPerson(e);
    }

    async verifyHash (){
        console.log("=== verifyHash ===");
        try {
            // Récupération du hash pour affichage
            console.log("-- verifyHash => Try");
            const responseLogin = await this.state.CivilStateInstance.methods.verifyCertification(this.state.sentHash).call({from : this.state.account});
            localStorage.setItem('LoginLocal', responseLogin);
            this.setState({login: responseLogin});

            // Récupérer l'ID à partir du login
            const _id = await this.state.CivilStateInstance.methods.getIdFromLogin(responseLogin).call({from : this.state.account});

            // Donnees identification citoyen
            const responseInfoIdentificationCitoyen = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(responseLogin).call({from : this.state.account});
            const _sexe =  responseInfoIdentificationCitoyen[0];
            const _nomFamille = responseInfoIdentificationCitoyen[1];
            const _nomUsage = responseInfoIdentificationCitoyen[2];
            const _premierPrenom = responseInfoIdentificationCitoyen[3];
            const _autresPrenoms = responseInfoIdentificationCitoyen[4];
            const _etatCivil = responseInfoIdentificationCitoyen[5];
            this.setState({sexe : _sexe, nomFamille : _nomFamille, nomUsage : _nomUsage, premierPrenom : _premierPrenom, autresPrenoms : _autresPrenoms, etatCivil : _etatCivil});

            // Donnees naissance citoyen
            const responseInfoNaissanceCitoyen = await this.state.CivilStateInstance.methods.getInfoNaissanceCitoyen(responseLogin).call({from : this.state.account});
            const _dateNaissance = responseInfoNaissanceCitoyen[0];
            const _communeNaissance = responseInfoNaissanceCitoyen[1];
            const _departementNaissance = responseInfoNaissanceCitoyen[2];
            this.setState({dateNaissance : _dateNaissance, communeNaissance : _communeNaissance, departementNaissance : _departementNaissance});

            // Donnees parents citoyen
            const responseInfoParentsCitoyen = await this.state.CivilStateInstance.methods.getInfoParentsCitoyen(responseLogin).call({from : this.state.account});
            const _nomFamilleMere = responseInfoParentsCitoyen[0];
            const _prenomMere = responseInfoParentsCitoyen[1];
            const _nomFamillePere = responseInfoParentsCitoyen[2];
            const _prenomPere = responseInfoParentsCitoyen[3];
            this.setState({nomFamilleMere : _nomFamilleMere, prenomMere : _prenomMere, nomFamillePere : _nomFamillePere, prenomPere : _prenomPere});
            
            // Alimentation de la liste "infosCitoyen" pour appel de "getPerson" et affichage
            const _infosCitoyen = [_sexe, _nomFamille, _nomUsage, _premierPrenom, _autresPrenoms, _etatCivil, 
                            _dateNaissance, _communeNaissance, _departementNaissance,
                            _nomFamilleMere, _prenomMere, _nomFamillePere, _prenomPere, _id];
            
            this.setState({infosCitoyen : _infosCitoyen});     
            localStorage.setItem('infoCitoyenLocal', _infosCitoyen);
            
            if (responseLogin){
                return (true)
            } else {
                return(false)
            }
           
            
        } catch (error) {
            console.log("-- verifyHash => Catch");
            this.setState({hashIsOk: false})
            this.setState({hashSent: true},
                function(){
                    this.updateState();
                }
            )
            console.error(error);  
        }
    }    

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
            <div>
                <Snackbar open={this.state.snackBarErrorOpen} autoHideDuration={3000} onClose={this.handleCloseErrorSnackBar}>
                    <MuiAlert elevation={6}  severity="error">
                        Erreur de communication avec la blockchain. Rechargement de la page.
                    </MuiAlert>
                </Snackbar>
            </div>
            <div>
                <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                    <MuiAlert elevation={6}  severity="success">
                        Cette identité a été validée par les services d'état civil.
                    </MuiAlert>
                </Snackbar>
            </div>
            <div style={{width:"100%"}}>
                <Form style={{marginBottom:"70px"}} onSubmit={e=> {this.handleSubmit(e)}}>
                    <FormGroup className="container-input-hash">
                        {this.state.stateComponent==="init" && 
                        <>
                            <Input className="element-input-hash large-input" placeholder="Clé de sécurité" value={this.defineInputValue()} type="text" onChange={e=> {this.handleInputChange(e)}}/>
                            <Button className="element-input-hash" color="info" type="submit" onClickVerifier={()=>{this.handleClickVerifier()}}>
                                Vérifier
                            </Button>
                        </>
                        }
                        {this.state.stateComponent!=="init" &&
                        <>
                            <Input value={this.state.sentHash} className="element-input-hash" ></Input>
                            <Button onClick={(e)=>{this.handleClick(e)}} type="button" className="btn-link ml-5 element-input-hash" color="info">
                                Nouvelle recherche
                            </Button>
                        </>
                        }
                    </FormGroup>
                </Form>
                {this.state.stateComponent==="HashOK" &&
                <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>}
                {this.state.stateComponent==="HashKO" &&
                    <div style={{margin:"60px"}}>
                    <ErrorMessage 
                        message="La clé de sécurité que vous avez saisi  ne correspond à aucune identité validée."
                        sousMessage="Assurez-vous de l'avoir saisi correctement.">
                    </ErrorMessage>
                    </div>
                }
                {this.state.loading && <CircularProgress />}
            </div>
            </>
         );
    }
}
 
export default ComponentVérificationID;