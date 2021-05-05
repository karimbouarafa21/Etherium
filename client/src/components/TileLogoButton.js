import React, { Component } from 'react';
import logoConnexion from 'assets/img/icone_connexion.jpg'
import logoVerification from 'assets/img/icone_verification.jpg'

class TileLogoButton extends Component {
    state = {  }

    render() { 
        return (
            <div className="container-tile" style={this.props.type==="connexion" ? {borderColor:"#51bcda"} : {borderColor:"#6bd098"}}>
                <div>
                    <img className="img-tile" alt="..." src={this.props.type==="connexion" ? logoConnexion : logoVerification} />
                </div>
                <div className="container-content-tile">
                        <h3 className={this.props.type==="connexion" ? "ct-azure" : "ct-green"}>{this.props.titre}</h3>
                        <div className={this.props.type==="connexion" ? "ct-azure" : "ct-green"}>{this.props.contenu}</div>
                        <button onClick={this.props.action} className={this.props.type==="connexion" ? "btn-round mr-1 btn btn-info" : "btn-round mr-1 btn btn-success"}>
                            {this.props.type==="connexion" ? "Se connecter" : "Accéder au service"}
                        </button>
                </div>
            </div>
        );
    }
}
 
export default TileLogoButton;

