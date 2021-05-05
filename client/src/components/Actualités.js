import React, { Component } from 'react';
import Actualité from 'components/Actualité'
import {countryColors} from "variables"
class Actualités extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="liste-actus">
                <div className="element-actu">
                    <h2 className="bold" style={{color:countryColors}}>ACTUALITES</h2>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>

            </div>

         );
    }
}
 
export default Actualités;