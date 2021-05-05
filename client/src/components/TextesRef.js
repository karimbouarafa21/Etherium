import React, { Component } from 'react';
import {countryColors} from "variables"
class TextesRef extends Component {
    state = {  }
    render() { 
        return (
            <div className="liste-actus">
                <div className="element-actu">
                    <h2 className="bold" style={{color:countryColors}}>TEXTES DE REFERENCE</h2>
                </div>
                    
                    <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Code des relations entre le public et l'administration : articles R113-5 à R113-9 </a>
                    
                    <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Circulaire du 25 octobre 2011 relative à la modification des modalités d'indication des doubles noms (PDF - 273.2 KB) </a>
                    
                    <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Circulaire du 28 octobre 2011 portant sur divers actes de l'état civil relatifs à la naissance et à la filiation (PDF - 1.0 MB) </a>
                    
                    <a className="lien-hypertexte ligne-menu" href="#" style={{textAlign:"left"}}>Circulaire du 23 juillet 2014 relative à l'état civil (PDF - 249.4 KB) </a>
                </div>
          );
    }
}
 
export default TextesRef;