import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
    Button,
    Form,
    Input,
    FormGroup,
    Row,
} from 'reactstrap';
import {countryColors} from "variables"


class Connexion extends Component {
    /*state = {
        login: "",
        pwd: "",
        authentificationState:"init",
        loading: false,
    };*/

    constructor(props) {
        console.log("=== Constructeur connexion ===")
        super(props)

        this.state = {
            login: "",
            pwd: "",
            authentificationState:"init",
            loading: false,
        };
    }

    HandleSubmit(e){
        console.log("=== HandleSubmit ===");
        e.preventDefault()
        this.setState({loading:false})
        const param = [this.state.login, this.state.pwd];
        this.props.ClickHandler(param)
        this.updateState()
    }

    updateLogin = event => {
        this.setState({ login : event.target.value});
        this.setState({authentificationState:"init"})
    }
    
    updatePwd = event => {
        this.setState({ pwd : event.target.value});
        this.setState({authentificationState:"init"})

    }

    render() { 
        return ( 
            <>
            <div className="container-block-connexion">
                <div className="element-block-connexion">
                    <h2 className="bold" style={{color:countryColors}}>SE CONNECTER</h2>
                </div>
                <div className="element-block-connexion">
                        <Form onSubmit={(e) => this.HandleSubmit(e)}>
                            <FormGroup className={this.props.status==='KO' ? "has-danger container-form-connexion" : "container-form-connexion"}>
                                <Input onChange={(e) => this.updateLogin(e)} placeholder="Identifiant" type="text" className="form-control element-form-connexion "></Input>
                                <div className="element-form-connexion">
                                    <Input onChange={(e) => this.updatePwd(e)} placeholder="Mot de passe" type="password" className="form-control"></Input>
                                    {this.props.status==='KO' && <div className="error-message-form" >Combinaison identifiant / mot de passe incorrecte.</div>}
                                </div>
                                <Row className="flex-container-right-center">
                                    {this.state.loading && <CircularProgress />}
                                    <Button type="submit" className="btn-round btn btn-info element-form-connexion ml-4">
                                        Se connecter
                                    </Button>
                                </Row>
                            </FormGroup>
                            
                            
                        </Form>                                      
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;