import React, { Component } from 'react';

const checkHash = (hash) => {

// A supprimmer --> pas utilisé    
//TODO : implémenter l'appel à la BC pour tester le hash passé en argument. 
//Renvoyer true si hash ok, false sinon
//Si besoin, renvoyer des informations supplémentaires pour appel à la fonction getPerson (login?)

//IF implémenté avec "1234" pour tests, à modifier lors de l'implémentation
    if (hash==="1234"){
        return (true);
    } else {
        return (false);
    }
}

export default checkHash;