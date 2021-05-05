import React, { Component } from 'react';

const getPerson = param => {    

    const result = [
        { name: "Numéro d’identification unique", price: param[13]},
        { name: "Sexe", price: param[0]},
        { name: "Nom de famille", price: param[1]},
        { name: "Nom d’usage", price: param[2]},
        { name: "Premier prénom", price: param[3]},
        { name: "Autres prénoms", price: param[4]},
        { name: "Etat civil", price: param[5]},
        { name: "Date de naissance", price: param[6]},
        { name: "Commune de naissance", price: param[7]},
        { name: "Département de naissance", price: param[8]},
        { name: "Nom de famille de la mère", price: param[9]},
        { name: "Prénom de la mère", price: param[10]},
        { name: "Nom de famille du père", price: param[11]},
        { name: "Prénom du père", price: param[12]},
      ]

    return (result);
}
 
export default getPerson;
