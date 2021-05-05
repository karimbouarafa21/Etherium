import * as React from 'react';
import  { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Helmet } from 'react-helmet'
import imageValider from 'assets/img/IconesAccueils/Valider.png'
import CircularProgress from '@material-ui/core/CircularProgress';
// Back 
import CivilStateContract from "../../contracts/CivilState.json";
import getWeb3 from "../../getWeb3";
import { provider } from "../../variables";

import {
    Container,
    Row,
  } from "reactstrap";

const TITLE = 'Valider une identité'

const columns = [
  { field: 'ID', headerName: <div style={{fontWeight:"bold"}}>N° d’identification unique</div>, width: 240 },
  { field: 'nom', headerName: <div style={{fontWeight:"bold"}}>Nom</div>, width: 140 },
  { field: 'prenom', headerName: <div style={{fontWeight:"bold"}}>Prénom</div>, width: 140 },
  { field: 'sexe', headerName: <div style={{fontWeight:"bold"}}>Sexe</div>, width: 130,},
  { field: 'dateDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Date de naissance</div>, width: 200,},
  { field: 'communeDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Commune de naissance</div>, width: 220,},
];

  
class ValiderIdentité extends Component {
    
    constructor(props){
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.setState = this.setState.bind(this);
      this.handleClick = this.handleClick.bind(this);

      window.addEventListener("resize", this.updateDimensions);

      this.state = {
        nom:"",
        prenom:"",
        sexe:"",
        dateDeNaissance:"",
        communeDeNaissance:"",
        statut:"",
        URL:"valider-identite",
        rows: [],
        tableHeight : "",
        ID : "",
        loading:true,
        windowWidth: 0,
        windowHeight: 0
      }      

      console.log(this.state.windowWidth);

    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
      let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
      this.setState((prevState) => ({...prevState,["windowWidth"] :windowWidth}));
      console.log(this.state.windowWidth);
    }

    handleClick(e){
      const ID = e.row.ID;
      this.setState((prevState) => ({...prevState,["ID"] :ID}));
      this.props.history.push({
          pathname:'fiche-personne',
          state: {
            // setState dans "handleClick" ne fonctionne pas sur la machine BE
            // solution --> utiliser directement "ID"
            //ID : this.state.ID,
            ID : ID,  
            URL : this.state.URL,
          }
      });
    }

    contructNaissanceList = async () => {
       
        const citoyenCount = await this.state.CivilStateInstance.methods.getCitoyensCount().call({from : this.state.account});
        console.log(citoyenCount);
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
                   
            let _statut = '';
            if (!_isVerified) {
              // eslint-disable-next-line
              _statut = 'A vérifier';
              const _i = i + 1;
              const naissanceAVerifier = {id: _i, ID : _id, nom: _nomFamille, prenom: _premierPrenom, sexe: _sexe, dateDeNaissance: _dateNaissance, communeDeNaissance: _communeNaissance}
              this.setState({rows : [...this.state.rows, naissanceAVerifier]});
              console.log(naissanceAVerifier);
            }
      
        }

        const defTableHeight = 56+52+10+Object.keys(this.state.rows).length*52;
        this.setState({tableHeight : defTableHeight});
        console.log(this.state.rows);
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
        
          this.contructNaissanceList();
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
        console.log(this.state.rows)
        console.log(this.state.tableHeight)
        const rows = this.state.rows;
        const tableHeight = this.state.tableHeight+10;
        
        return ( 
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container className="body-container">
              {this.state.windowWidth <= 1024 ?
              <>
                <Row style={{paddingTop:"30px"}}>
                  <div className="flex-container-left-center">
                      <img className="mg-10" style={{width:"60px"}} alt="..." src={imageValider}/>
                      <h4 className="ml-4" style={{color:"gray"}}>Valider une identité</h4>
                  </div>
                </Row>
                <div style={{height:"80px"}}></div>
                {this.state.loading ? <CircularProgress/> :
                  <div style={{ height: tableHeight, width: '100%' }}>
                    {Object.keys(rows).length !== 0 ? 
                      <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={(e) => this.handleClick(e)}></DataGrid> :
                      <CircularProgress/>
                    }
                  </div>
                }
              </>
              :
              <>
                <Row style={{paddingTop:"100px"}}>
                  <div className="flex-container-left-center">
                      <img style={{width:"80px"}} alt="..." src={imageValider}/>
                      <h1 className="ml-4" style={{color:"gray"}}>Valider une identité</h1>
                  </div>
                </Row>
                <div style={{height:"80px"}}></div>
                {this.state.loading ? <CircularProgress/> :
                  <div style={{ height: tableHeight, width: '100%' }}>
                    {Object.keys(rows).length !== 0 ? 
                      <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={(e) => this.handleClick(e)}></DataGrid> :
                      <CircularProgress/>
                    }
                  </div>
                }
              </>
              }
              
            </Container>
            </>
         );
    }
}
 
export default ValiderIdentité;
