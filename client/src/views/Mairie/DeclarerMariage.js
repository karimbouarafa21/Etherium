import * as React from 'react';
import  { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Helmet } from 'react-helmet';
import ErrorMessage from 'components/ErrorMessage';
import SimpleTable from 'components/SimpleTable';
import image from 'assets/img/IconesAccueils/Mariage.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// Back 
import CivilStateContract from "../../contracts/CivilState.json";
import getWeb3 from "../../getWeb3";
import { provider } from "../../variables";

import {
    Container,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Progress,
    
  } from "reactstrap";

async function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
    
}
const TITLE = 'Déclarer un mariage'

const columns = [
    { field: 'ID', headerName: <div style={{fontWeight:"bold"}}>N° d’identification unique</div>, width: 240 },
    { field: 'nom', headerName: <div style={{fontWeight:"bold"}}>Nom</div>, width: 140 },
    { field: 'prenom', headerName: <div style={{fontWeight:"bold"}}>Prénom</div>, width: 140 },
    { field: 'sexe', headerName: <div style={{fontWeight:"bold"}}>Sexe</div>, width: 130,},
    { field: 'dateDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Date de naissance</div>, width: 200,},
    { field: 'communeDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Commune de naissance</div>, width: 220,},
  ];
  

class DeclarerMariage extends Component {
    constructor(props){
        super(props);

        // Maps pour le formulaire détails du mariage
        const fieldsValues = new Map();
        fieldsValues.set("Date du mariage","")
        fieldsValues.set("Commune de mariage","")
        fieldsValues.set("Régime matrimonial","Communauté réduite aux acquêts")
        fieldsValues.set("Prénom témoin 1","")
        fieldsValues.set("Nom témoin 1","")
        fieldsValues.set("Prénom témoin 2","")
        fieldsValues.set("Nom témoin 2","")
        
        const fieldsStates = new Map();
        fieldsStates.set("Date du mariage","valid")
        fieldsStates.set("Commune de mariage","valid")
        fieldsStates.set("Régime matrimonial","valid")
        fieldsStates.set("Prénom du témoin 1","valid")
        fieldsStates.set("Nom du témoin 1","valid")
        fieldsStates.set("Prénom du témoin 2","valid")
        fieldsStates.set("Nom du témoin 2","valid")

        this.state = {
            nom:"",
            prenom:"",
            sexe:"",
            dateDeNaissance:"",
            communeDeNaissance:"",
            statut:"",
            URL:"declarer-mariage",
            wkfState:1,
            retourFichePersonne:"",
            premierConjoint:"",
            secondConjoint:"",
            activeTab:"1",
            fieldsStates: fieldsStates,
            fieldsValues: fieldsValues,
            IDSearch:"",
            IDSearchFieldValue:"",
            stateSearchComponent:"init",
            rows: [],
            tableHeight : "",
            loading:true,
            snackBarSuccessOpen:true,
            filteredList:[],
            searchLaunched:false,
            windowWidth: 0,
            windowHeight: 0
        }
        
        timeout(3000).then((result) => {
            this.setState({snackBarSuccessOpen: false})
        })

        this.HandleClick = this.HandleClick.bind(this);
        this.HandleClickSuivant = this.HandleClickSuivant.bind(this);
        this.HandleSubmitMariage = this.HandleSubmitMariage.bind(this);
        this.setState = this.setState.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        if (localStorage.getItem('wkfStateLocal') < 1) {
            localStorage.setItem('wkfStateLocal',1)
            console.log("wkf : 1");
        }

        if(this.props.location.state){
            switch (this.props.location.state.source){
                case "clickBack" :
                    switch (localStorage.getItem('wkfStateLocal')){
                        case "1" :
                            localStorage.setItem('premierConjoint', "")
                        break;
                        case "2" :                    
                            localStorage.setItem('secondConjoint', "")
                        break;
                        default:
                    }    
                break;
                case "conjointOK" :            
                    if (props.history.action==="PUSH") {
                        localStorage.setItem('wkfStateLocal', (parseInt(localStorage.getItem('wkfStateLocal'), 10)+1).toString())
                        console.log("wkf + 1");
                    }
                break;
                default:
            }
        }
        // this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
        console.log("=== updateDimensions ===");
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        this.setState({windowWidth:windowWidth}, function(){console.log(this.state.windowWidth);})       
    }

    //Gestionnaire des changement de champs du formulaire pour les informations complémentaires sur le mariage
    HandleChange(field, e){         
        let fieldsValues = this.state.fieldsValues
        fieldsValues.set(field,e.target.value)
        this.setState({fieldsValues});
    }

    //Gestionnaire du clic pour la validation des informations complémentaires sur le mariage
    HandleSubmitMariage(e){
        e.preventDefault()

        this.setState({snackBarSuccessOpen: true})

        timeout(3000).then((result) => {
            console.log("timeout");
            this.setState({snackBarSuccessOpen: false})
        })

        let fieldsStates = this.state.fieldsStates
        let fieldsValues = this.state.fieldsValues
        let formIsValid = true
        for (const element of fieldsStates){
            switch (element[0]) {
                case 'Commune de mariage':
                    if (!fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageCommune',fieldsValues.get(element[0]))
                    }
                break
                case 'Régime matrimonial':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageRégime',fieldsValues.get(element[0]))
                    }
                break
                case "Prénom du témoin 1":
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariagePrénomTémoin1',fieldsValues.get(element[0]))
                    }
                break
                case 'Nom du témoin 1':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageNomTémoin1',fieldsValues.get(element[0]))
                    }
                break
                case 'Prénom du témoin 2':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariagePrénomTémoin2',fieldsValues.get(element[0]))
                    }
                break
                case 'Nom du témoin 2':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageNomTémoin2',fieldsValues.get(element[0]))
                    }
                break
                case 'Date du mariage':
                    const date = new Date()
                    const aujourdhui = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+(date.getDate())).slice(-2)
                    if (!this.state.fieldsValues.get(element[0]) || this.state.fieldsValues.get(element[0])>aujourdhui){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageDate',fieldsValues.get(element[0]))
                    }
                break
                default :
                }
            }
        this.setState({fieldsStates:fieldsStates}, function(){console.log(this.state.fieldsStates)});
        //Réinitialisation du compteur workflow
        if (formIsValid){
            localStorage.setItem('wkfStateLocal', (parseInt(localStorage.getItem('wkfStateLocal'), 10)+1).toString())
            console.log("wkf : 3");
            this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
        }
    }

    HandleClickSuivant(){
        localStorage.setItem('wkfStateLocal', (parseInt(localStorage.getItem('wkfStateLocal'), 10)+1).toString())
        this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
    }

    HandleClickValidation(e){
        this.setState({snackBarSuccessOpen: true})

        localStorage.setItem('wkfStateLocal', 5)
        console.log("wkf : 5");
        this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
        this.handleClickValiderMariage(); // Après : Reset compteur wkf & Retour page d'accueil
        
        timeout(3000).then((result) => {

            localStorage.setItem('wkfStateLocal', 1);
            this.props.history.push({

                pathname:'home-mairie'
            }) 
        })
        
               
    }

    HandleClick(e){
        console.log("=== HandleClick ===")

        const ID = e.row.ID
        const nom = e.row.nom;
        const prenom = e.row.prenom;
        const sexe = e.row.sexe;
        const dateDeNaissance = e.row.dateDeNaissance;
        const communeDeNaissance = e.row.communeDeNaissance;
        const personne = {
            nom:nom,
            prenom:prenom,
            sexe:sexe,
            dateDeNaissance:dateDeNaissance,
            communeDeNaissance:communeDeNaissance,
        }


        this.setState((prevState) => ({...prevState,["personne"] :personne}));
        
        if (localStorage.getItem('wkfStateLocal')==='1'){
            localStorage.setItem('premierConjoint', personne)
            localStorage.setItem('ID1', ID)
            localStorage.setItem('nom1', nom)
            localStorage.setItem('prenom1', prenom)
            localStorage.setItem('sexe1', sexe)
            localStorage.setItem('dateDeNaissance1', dateDeNaissance)
            localStorage.setItem('communeDeNaissance1', communeDeNaissance)

        }
        if (localStorage.getItem('wkfStateLocal')==='2'){
            localStorage.setItem('secondConjoint', personne)
            localStorage.setItem('ID2', ID)
            localStorage.setItem('nom2', nom)
            localStorage.setItem('prenom2', prenom)
            localStorage.setItem('sexe2', sexe)
            localStorage.setItem('dateDeNaissance2', dateDeNaissance)
            localStorage.setItem('communeDeNaissance2', communeDeNaissance)
        }

        this.props.history.push({
            pathname:'fiche-personne',
            state: {
                ID : ID, 
                URL : this.state.URL,
              }
        });
    }  
    
    MakeTablePersons(){
        const result = [
            {name : "Numéro d’identification unique", price : localStorage.getItem('ID1')},
            {name : "Nom de famille", price : localStorage.getItem('nom1')},
            {name : "Prénom", price : localStorage.getItem('prenom1')},
            {name : "Sexe", price : localStorage.getItem('sexe1')},
            {name : "Date de naissance", price : localStorage.getItem('dateDeNaissance1')},
            {name : "Commune de naissance", price : localStorage.getItem('communeDeNaissance1')},

            {name : "Numéro d’identification unique", price : localStorage.getItem('ID2')},
            {name : "Nom de famille", price : localStorage.getItem('nom2')},
            {name : "Prénom", price : localStorage.getItem('prenom2')},
            {name : "Sexe", price : localStorage.getItem('sexe2')},
            {name : "Date de naissance", price : localStorage.getItem('dateDeNaissance2')},
            {name : "Commune de naissance", price : localStorage.getItem('communeDeNaissance2')},
          ]

        return (result);
    }

    MakeTableMariage(){
        const result = [
            { name: "Date de mariage", price: localStorage.getItem('mariageDate')},
            { name: "Commune de mariage", price: localStorage.getItem("mariageCommune")},
            { name: "Régime matrimonial", price: localStorage.getItem("mariageRégime")},
            { name: "Prénom du premier témoin", price: localStorage.getItem("mariagePrénomTémoin1")},
            { name: "Nom du premier témoin", price: localStorage.getItem("mariageNomTémoin1")},
            { name: "Prénom du second témoin", price: localStorage.getItem("mariagePrénomTémoin2")},
            { name: "Nom du second témoin", price: localStorage.getItem("mariageNomTémoin2")},
          ]

        return (result);
    }
    
    HandleIDInputChange(e){
        this.setState({IDSearchFieldValue:e.target.value}, function(){
            if (this.state.IDSearchFieldValue){
                this.setState({searchLaunched:true})
                
                    this.setState({IDSearch: this.state.fieldValue}, 
                        function(){
                            this.setState({stateSearchComponent:"search"})
                        }
                    )
                
                const fullList = this.state.rows
                let filteredList =[]
                let i = 0
                for (const element of fullList){
                    
                    if (element["ID"].includes(this.state.IDSearchFieldValue)){
                        i+=1
                        filteredList.push(element)
                    }
                }
                const defTableHeight = 56+52+10+i*52+10;
                console.log(defTableHeight)            
                this.setState({tableHeight : defTableHeight, filteredList:filteredList})
                this.forceUpdate()
            }else{
                this.setState({searchLaunched:false})
                this.forceUpdate()
            }
        })
        
    }

    HandleClickNvlleRecherche(e){
        this.setState({stateSearchComponent:"init"})
    }

    handleClickValiderMariage = async () => {
        const idConjoint1 = localStorage.getItem('ID1');
        const idConjoint2 = localStorage.getItem('ID2');

        // Marié le JJ/MM/AAAA à
        const dateMariage = localStorage.getItem('mariageDate');
        const nom1 = localStorage.getItem('nom1');
        const nom2 = localStorage.getItem('nom2');
        const prenom1 = localStorage.getItem('prenom1');
        const prenom2 = localStorage.getItem('prenom2');        
        const etatCivilConjoint2 = "MARIE LE " + dateMariage + " " + "A" + " " + prenom1 + " " + nom1;
        const etatCivilConjoint1 = "MARIE LE " + dateMariage + " " + "A" + " " + prenom2 + " " + nom2;
 
        try {  
            // Récupérer le login avec l'ID
            console.log("handleClickValiderMariage => try")
            const responseLogin1 = await this.state.CivilStateInstance.methods.getLoginFromId(idConjoint1).call({from : this.state.account});
            const responseLogin2 = await this.state.CivilStateInstance.methods.getLoginFromId(idConjoint2).call({from : this.state.account});

            // Appel pour marier premier conjoint
            await this.state.CivilStateInstance.methods.declareMariage(responseLogin1, etatCivilConjoint1)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })               
            //alert('Premier conjoint mariée');

            // Appel pour marier deuxième conjoint
            await this.state.CivilStateInstance.methods.declareMariage(responseLogin2, etatCivilConjoint2)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })               
            //alert('Mariage validé');
            


          } catch (error) {
              // Catch any errors for any of the above operations.
              console.log("handleClickValiderMariage => catch")
              console.error(error);
          }
    }    

    contructIdentiteList = async () => {
        const citoyenCount = await this.state.CivilStateInstance.methods.getCitoyensCount().call({from : this.state.account});
        for (let i = 0; i < citoyenCount; i++) {
      
            // Récupérer le login, l'id et le statut
            const response = await this.state.CivilStateInstance.methods.getLoginIdStatut(i).call({from : this.state.account});
            const _login = response[0];
            const _id = response[1];
            const _isVerified = response[2];

            const responseIdent = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(_login).call({from : this.state.account});
            const _sexe = responseIdent[0];
            const _nomFamille = responseIdent[1];
            const _premierPrenom = responseIdent[3];

            const responseNaissance = await this.state.CivilStateInstance.methods.getInfoNaissanceCitoyen(_login).call({from : this.state.account});           
            const _dateNaissance = responseNaissance[0];
            const _communeNaissance = responseNaissance[1];
                   
            
            if (_isVerified) {
              // eslint-disable-next-line
              const _i = i + 1;
              const identiteVerifie = {id: _i, ID : _id, nom: _nomFamille, prenom: _premierPrenom, sexe: _sexe, dateDeNaissance: _dateNaissance, communeDeNaissance: _communeNaissance}
              this.setState({rows : [...this.state.rows, identiteVerifie]});
            }
      
        }

        
      }

    //Back
    componentDidMount = async () => {
        console.log("=== componentDidMount ===");
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
        
          this.contructIdentiteList();
          this.setState({loading:false})
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
        this.updateDimensions();
    };
    // Back       
    
    render() {     
        console.log("render");
        console.log(localStorage.getItem('wkfStateLocal'))
        return (
            <>
            {/* MOBILE */}
            {this.state.windowWidth < 1024 &&
            <>
                {this.state.loading ?
                    <Container className="body-container">
                        <Helmet>
                            <title>{ TITLE }</title>
                        </Helmet>
                        <Row style={{paddingTop:"100px"}}>
                            <div className="flex-container-left-center">
                                <img className="mg-10" style={{width:"60px"}} alt="..." src={image}/>
                                <h4 className="ml-4" style={{color:"gray"}}>Déclarer un mariage</h4>
                            </div>
                        </Row>
                        <div style={{height:"80px"}}></div>
                        <CircularProgress/>
                    </Container> 
                :
                    <>
                    <Helmet>
                        <title>{ TITLE }</title>
                    </Helmet>
                    <Container className="body-container">
                        <Row className="mg-10" style={{paddingTop:"20px"}}>
                            <div className="flex-container-left-center">
                                <img className="mg-10" style={{width:"60px"}} alt="..." src={image}/>
                                <h4 className="ml-4" style={{color:"gray"}}>Déclarer un mariage</h4>
                            </div>
                        </Row>
                        <div style={{height:"80px"}}></div>
                        <Row>
                            <Col className="">
                                {localStorage.getItem('wkfStateLocal') == 1 && 
                                    <div className="progress-active">1/4 - Premier conjoint</div>}
                                {localStorage.getItem('wkfStateLocal') == 2 && 
                                    <div className="progress-active">2/4 - Second conjoint</div>} 
                                {localStorage.getItem('wkfStateLocal') == 3 && 
                                    <div className="progress-active">3/4 - Mariage</div>}
                                {localStorage.getItem('wkfStateLocal') == 4 && 
                                    <div className="progress-active">4/4 - Validation</div>}
                            </Col>
                        </Row>
                        <br/>
                        <Progress
                            max="4"
                            value={Number(parseInt(localStorage.getItem('wkfStateLocal'),10)-1)}
                            barClassName="progress-bar-success"
                            style={{backgroundColor: "6bd098"}}
                        />
                        <br/>
                        {localStorage.getItem('wkfStateLocal')==1 && 
                            <div>
                                {this.state.loading ? <CircularProgress></CircularProgress> :
                                <div style={{width:"70%"}}>
                                
                                    <Form style={{marginBottom:"30px"}}>
                                        <FormGroup className="container-input-hash">
                                            <Input className="element-input-hash" placeholder="Numéro d’identification unique" type="text" onChange={e=> {this.HandleIDInputChange(e)}}/>
                                        </FormGroup>
                                    </Form>
                                
                                </div>
                                }
                                <div style={{ height: this.state.tableHeight, width: '100%' }}>
    
                                {Object.keys(this.state.filteredList).length === 0 ?
                                    <> {this.state.searchLaunched ? <ErrorMessage message="Aucune personne ne correspond à cet identifiant unique"></ErrorMessage> 
                                :<div></div>}</>
                                : <DataGrid rows={this.state.filteredList} columns={columns} pageSize={Object.keys(this.state.rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid>
                                }
                                </div> 
                            </div>
                        }
                        {localStorage.getItem('wkfStateLocal')==2 && 
                        <div style={{ height: this.state.tableHeight, width: '100%' }}>
                            <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" severity="success">
                                        Premier conjoint validé.
                                    </MuiAlert>
                            </Snackbar>
                            {this.state.loading ? <CircularProgress></CircularProgress> :
                                <div style={{width:"70%"}}>
                                
                                    <Form style={{marginBottom:"30px"}}>
                                        <FormGroup className="container-input-hash">
                                            <Input className="element-input-hash" placeholder="Numéro d’identification unique" type="text" onChange={e=> {this.HandleIDInputChange(e)}}/>
                                        </FormGroup>
                                    </Form>
                                
                                </div>
                                }
                            {Object.keys(this.state.filteredList).length === 0 ?
                                    <> {this.state.searchLaunched ? <ErrorMessage message="Aucune personne ne correspond à cet identifiant unique"></ErrorMessage> 
                                :<div></div>}</>
                                : <DataGrid rows={this.state.filteredList} columns={columns} pageSize={Object.keys(this.state.rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid>
                            }
                        </div>}
                        
                        {localStorage.getItem('wkfStateLocal')==3 &&
                            <div>
                                <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" severity="success">
                                        Second conjoint validé.
                                    </MuiAlert>
                                </Snackbar>
                                <Row style={{paddingTop:"30px"}}></Row>
                                <Row>
                                    <Col className="text-left mg-10">
                                        <Form>
                                            <Row>
                                                <h2 style={{color:"gray"}}>Mariage</h2>
                                            </Row>
                                            <FormGroup className={this.state.fieldsStates.get("Date du mariage")==="notValid" && "has-danger"}>
                                                <Label> Date du mariage</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Date du mariage")} placeHolder="Date du mariage" type="Date"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Commune de mariage")==="notValid" && "has-danger"}>
                                                <Label>Commune de mariage</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Commune de mariage")} placeHolder="Commune de mariage" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Régime matrimonial")==="notValid" && "has-danger"}>
                                                <Label>Régime matrimonial</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Régime matrimonial")} placeHolder="Régime matrimonial" type="select">
                                                    <option>Communauté réduite aux acquêts</option>
                                                    <option>Communauté universelle</option>
                                                    <option>Séparation de biens</option>
                                                    <option>Participation aux acquêts</option>
                                                </Input>
                                            </FormGroup>
                                            <Row style={{paddingTop:"30px"}}>
                                                <h2 style={{color:"gray"}}>Témoins</h2>
                                            </Row>
                                            <FormGroup className={this.state.fieldsStates.get("Nom du témoin 1")==="notValid" && "has-danger"}>
                                                <Label>Nom du témoin 1</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Nom du témoin 1")} placeHolder="Nom du témoin 1" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 1")==="notValid" && "has-danger"}>
                                                <Label>Prénom du témoin 1</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 1")} placeHolder="Prénom du témoin 1" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Nom du témoin 2")==="notValid" && "has-danger"}>
                                                <Label>Nom du témoin 2</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Nom du témoin 2")} placeHolder="Nom du témoin 2" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 2")==="notValid" && "has-danger"}>
                                                <Label>Prénom du témoin 2</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 2")} placeHolder="Prénom du témoin 2" type="text"></Input>
                                            </FormGroup>
                                            
                                            <Button onClick={this.HandleSubmitMariage} type="submit" color="info">
                                                    Suivant
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {localStorage.getItem('wkfStateLocal')>=4 &&
                        <>
                        {localStorage.getItem('wkfStateLocal')==4 &&
                        <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                <MuiAlert elevation={6} variant="filled" severity="success">
                                    Données complémentaires validées.
                                </MuiAlert>
                        </Snackbar>
                        }
                        {localStorage.getItem('wkfStateLocal')==5 &&
                                <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" severity="success">
                                        Mariage validé. Redirection.
                                    </MuiAlert>
                                </Snackbar>
                        }      
                        <Row >
                            <Col className="offset-sm-2  mg-10">
                                <Row style={{paddingTop:"30px"}}>
                                    <h4 style={{color:"gray"}}>Premier conjoint</h4>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTablePersons().slice(0,6)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <h4 style={{color:"gray"}}>Second conjoint</h4>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTablePersons().slice(6,11)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <h4 style={{color:"gray"}}>Mariage</h4>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTableMariage().slice(0,7)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <Col className="offset-sm-5">
                                        <Button color="info" onClick={(e)=>this.HandleClickValidation(e)}>Valider le mariage</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </>
                    }
                        
                    </Container>
                    </>
                    }
            </>
            }

            {/* DESKTOP */}
            {this.state.windowWidth >= 1024 && <>
                {this.state.loading ? 
                    <Container className="body-container">
                        <Helmet>
                            <title>{ TITLE }</title>
                        </Helmet>
                        <Row style={{paddingTop:"100px"}}>
                            <div className="flex-container-left-center">
                                <img style={{width:"80px"}} alt="..." src={image}/>
                                <h1 className="ml-4" style={{color:"gray"}}>Déclarer un mariage</h1>
                            </div>
                        </Row>
                        <div style={{height:"80px"}}></div>
                        <CircularProgress/>
                    </Container> 
                :
                    <>
                    <Helmet>
                        <title>{ TITLE }</title>
                    </Helmet>
                    <Container className="body-container">
                        <Row style={{paddingTop:"100px"}}>
                            <div className="flex-container-left-center">
                                <img style={{width:"80px"}} alt="..." src={image}/>
                                <h1 className="ml-4" style={{color:"gray"}}>Déclarer un mariage</h1>
                            </div>
                        </Row>
                        <div style={{height:"80px"}}></div>
                        <Row>
                            <Col className="col-6 col-sm-3">
                                <div 
                                className={localStorage.getItem('wkfStateLocal') > 1 ? "progress-active" : "progress-inactive" }
                                >
                                Premier conjoint
                                </div>
                            </Col>
                            <Col className="col-6 col-sm-3 ">
                                <div 
                                className={localStorage.getItem('wkfStateLocal') > 2 ? "progress-active" : "progress-inactive" }
                                >
                                Second conjoint
                                </div>
                            </Col>
                            <Col className="col-6 col-sm-3">
                                <div 
                                className={localStorage.getItem('wkfStateLocal') > 3 ? "progress-active" : "progress-inactive" }
                                >
                                Mariage
                                </div>
                            </Col>
                            <Col className="col-sm-3">
                                <div 
                                className={localStorage.getItem('wkfStateLocal') > 4 ? "progress-active" : "progress-inactive" }
                                >
                                Validation
                                </div>
                            </Col>
    
                        </Row>
                        <br/>
                        <Progress
                            max="4"
                            value={Number(parseInt(localStorage.getItem('wkfStateLocal'),10)-1)}
                            barClassName="progress-bar-success"
                            style={{backgroundColor: "6bd098"}}
                        />
                        <br/>
                        {localStorage.getItem('wkfStateLocal')==1 && 
                            <div>
                                {this.state.loading ? <CircularProgress></CircularProgress> :
                                <div style={{width:"70%"}}>
                                
                                    <Form style={{marginBottom:"30px"}}>
                                        <FormGroup className="container-input-hash">
                                            <Input className="element-input-hash" placeholder="Numéro d’identification unique" type="text" onChange={e=> {this.HandleIDInputChange(e)}}/>
                                        </FormGroup>
                                    </Form>
                                
                                </div>
                                }
                                <div style={{ height: this.state.tableHeight, width: '100%' }}>
    
                                {Object.keys(this.state.filteredList).length === 0 ?
                                    <> {this.state.searchLaunched ? <ErrorMessage message="Aucune personne ne correspond à cet identifiant unique"></ErrorMessage> 
                                :<div></div>}</>
                                : <DataGrid rows={this.state.filteredList} columns={columns} pageSize={Object.keys(this.state.rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid>
                                }
                                </div> 
                            </div>
                        }
                        {localStorage.getItem('wkfStateLocal')==2 && 
                        <div style={{ height: this.state.tableHeight, width: '100%' }}>
                            <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" severity="success">
                                        Premier conjoint validé.
                                    </MuiAlert>
                            </Snackbar>
                            {this.state.loading ? <CircularProgress></CircularProgress> :
                                <div style={{width:"70%"}}>
                                
                                    <Form style={{marginBottom:"30px"}}>
                                        <FormGroup className="container-input-hash">
                                            <Input className="element-input-hash" placeholder="Numéro d’identification unique" type="text" onChange={e=> {this.HandleIDInputChange(e)}}/>
                                        </FormGroup>
                                    </Form>
                                
                                </div>
                                }
                            {Object.keys(this.state.filteredList).length === 0 ?
                                    <> {this.state.searchLaunched ? <ErrorMessage message="Aucune personne ne correspond à cet identifiant unique"></ErrorMessage> 
                                :<div></div>}</>
                                : <DataGrid rows={this.state.filteredList} columns={columns} pageSize={Object.keys(this.state.rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid>
                            }
                        </div>}
                        
                        {localStorage.getItem('wkfStateLocal')==3 &&
                            <div>
                                <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" severity="success">
                                        Second conjoint validé.
                                    </MuiAlert>
                                </Snackbar>
                                <Row style={{paddingTop:"30px"}}></Row>
                                <Row>
                                    <Col className="col-4 ">
                                        <Row className="recap-maries">
                                            <Col className="offset-sm-1">
                                                <Row style={{paddingTop:"30px"}}>
                                                    <h2 style={{color:"gray"}}>Conjoint 1</h2>
                                                </Row>
                                                <Row>
                                                    <div>N° d’identification unique :  {localStorage.getItem('ID1')}</div>
                                                </Row>
                                                <Row>
                                                    <div>{localStorage.getItem('prenom1')} {localStorage.getItem('nom1')}</div>
                                                </Row>
                                                <Row>  
                                                    <div>Né le {localStorage.getItem('dateDeNaissance1')} à {localStorage.getItem('communeDeNaissance1')}</div>
                                                </Row>
                                                <Row style={{paddingTop:"30px"}}>
                                                    <h2 style={{color:"gray"}}>Conjoint 2</h2>
                                                </Row>
                                                <Row>
                                                    <div>N° d’identification unique :  {localStorage.getItem('ID2')}</div>
                                                </Row>
                                                <Row>
                                                    <div>{localStorage.getItem('prenom2')} {localStorage.getItem('nom2')}</div>
                                                </Row>
                                                <Row style={{paddingBottom:"30px"}}>  
                                                    <div>Né le {localStorage.getItem('dateDeNaissance2')} à {localStorage.getItem('communeDeNaissance2')}</div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-7 offset-sm-1 text-left">
                                        <Form>
                                            <Row>
                                                <h2 style={{color:"gray"}}>Mariage</h2>
                                            </Row>
                                            <FormGroup className={this.state.fieldsStates.get("Date du mariage")==="notValid" && "has-danger"}>
                                                <Label> Date du mariage</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Date du mariage")} placeHolder="Date du mariage" type="Date"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Commune de mariage")==="notValid" && "has-danger"}>
                                                <Label>Commune de mariage</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Commune de mariage")} placeHolder="Commune de mariage" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Régime matrimonial")==="notValid" && "has-danger"}>
                                                <Label>Régime matrimonial</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Régime matrimonial")} placeHolder="Régime matrimonial" type="select">
                                                    <option>Communauté réduite aux acquêts</option>
                                                    <option>Communauté universelle</option>
                                                    <option>Séparation de biens</option>
                                                    <option>Participation aux acquêts</option>
                                                </Input>
                                            </FormGroup>
                                            <Row style={{paddingTop:"30px"}}>
                                                <h2 style={{color:"gray"}}>Témoins</h2>
                                            </Row>
                                            <FormGroup className={this.state.fieldsStates.get("Nom du témoin 1")==="notValid" && "has-danger"}>
                                                <Label>Nom du témoin 1</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Nom du témoin 1")} placeHolder="Nom du témoin 1" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 1")==="notValid" && "has-danger"}>
                                                <Label>Prénom du témoin 1</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 1")} placeHolder="Prénom du témoin 1" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Nom du témoin 2")==="notValid" && "has-danger"}>
                                                <Label>Nom du témoin 2</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Nom du témoin 2")} placeHolder="Nom du témoin 2" type="text"></Input>
                                            </FormGroup>
                                            <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 2")==="notValid" && "has-danger"}>
                                                <Label>Prénom du témoin 2</Label>
                                                <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 2")} placeHolder="Prénom du témoin 2" type="text"></Input>
                                            </FormGroup>
                                            
                                            <Button onClick={this.HandleSubmitMariage} type="submit" color="info">
                                                    Suivant
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {localStorage.getItem('wkfStateLocal')>=4 &&
                            <>
                            {localStorage.getItem('wkfStateLocal')==4 &&
                                <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                        <MuiAlert elevation={6} variant="filled" severity="success">
                                            Données complémentaires validées.
                                        </MuiAlert>
                                </Snackbar>
                            }
                            {localStorage.getItem('wkfStateLocal')==5 &&
                                    <Snackbar open={this.state.snackBarSuccessOpen} autoHideDuration={3000} onClose={this.handleCloseSuccessSnackBar}>
                                        <MuiAlert elevation={6} variant="filled" severity="success">
                                            Mariage validé. Redirection.
                                        </MuiAlert>
                                    </Snackbar>
                            }      
                        <Row >
                            <Col className="offset-sm-2">
                                <Row style={{paddingTop:"30px"}}>
                                    <h2 style={{color:"gray"}}>Premier conjoint</h2>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTablePersons().slice(0,6)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <h2 style={{color:"gray"}}>Second conjoint</h2>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTablePersons().slice(6,11)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <h2 style={{color:"gray"}}>Mariage</h2>
                                </Row>
                                <Row style={{marginLeft:"30px"}}> 
                                    <SimpleTable data={this.MakeTableMariage().slice(0,7)}/>
                                </Row>
                                <Row style={{paddingTop:"30px"}}>
                                    <Col className="offset-sm-5">
                                        <Button color="info" onClick={(e)=>this.HandleClickValidation(e)}>Valider le mariage</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </>
                    }
                        
                    </Container>
                    </>
                    }
                    </>
            }

            
            </>
         );
    }
}
 
export default DeclarerMariage;