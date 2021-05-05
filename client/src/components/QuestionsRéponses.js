import React, { Component } from 'react';
import {countryColors} from "variables"

class QuestionsRéponses extends Component {
    state = {  }
    render() { 
        return (
            <div className="liste-actus" style={{marginBottom:"50px"}}>
                <div className="element-actu">
                    <h2 className="bold" style={{color:countryColors}}>QUESTIONS / REPONSES</h2>
                </div >
               
                <a className="lien-hypertexte ligne-menu" href="" style={{textAlign:"left"}}>Comment contester un refus de la mairie en matière d'état civil ?</a>
                
                <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Quelle est la durée de validité d'un acte d'état civil ?</a>
                
                <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Qu'est-ce qu'une mention marginale sur un acte d'état civil ?</a>
                
                <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Comment utiliser un acte d'état civil français à l'étranger ?</a>
               
            </div>

          );
    }
}
 
export default QuestionsRéponses;