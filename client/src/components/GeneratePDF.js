import React from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import GenerateQRCode from "components/GenerateQRCode"
import {countryLayout} from "variables"

// Create styles
/*const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignContent: 'center',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    titre: {
        fontWeight: 300,
        fontSize: 30,
    },
    body: {
        justifySelf:'flex-start',
        margin: 10,
}

});*/

function RandomNumber () {
    return Math.floor(Math.random() * Math.floor(9999));
}

const date = new Date()
const aujourdhui = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+(date.getDate())).slice(-2)

const ActeDeNaissance = param => (
    <Document>
    <Page size="A4" style={{flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignContent: 'center'
        }}>
        <View style={{margin: 10, padding: 10, flexGrow: 1, alignContent: 'center', alignItems: 'center'}}>
            {countryLayout==="CI" && 
            <>
            <Image style={{width:100}} src="/Côte_d'Ivoire_Logo.jpg" />
            <Text style={{fontWeight: 800, fontSize: 15}}>REPUBLIQUE DE COTE D'IVOIRE</Text>
            </>
            }
            {countryLayout==="GB" && 
            <>
            <Image style={{width:100}} src="/Gabon_Logo.jpg" />
            <Text style={{fontWeight: 800, fontSize: 15}}>REPUBLIQUE GABONAISE</Text>
            </>
            }
            {countryLayout==="CA" && 
            <>
            <Image style={{width:100}} src="/Cameroun_Logo.jpg" />
            <Text style={{fontWeight: 800, fontSize: 15}}>REPUBLIQUE DU CAMEROUN</Text>
            </>
            }
        </View>

        <View style={{margin: 5, padding: 5, flexGrow: 1, alignContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 300, fontSize: 20}}>EXTRAIT D'ACTE DE NAISSANCE</Text>
            <Text style={{fontWeight: 300, fontSize: 13}}>Du registre des actes de l'Etat Civil</Text>
            <Text style={{fontWeight: 300, fontSize: 13, marginBottom: 20}}>Pour l'année 2021</Text>
            <Text style={{fontWeight: "bold", fontSize: 15}}>DEPARTEMENT {param[7]}</Text>
            <Text style={{fontWeight: "bold", fontSize: 14}}>Commune {param[0]}</Text>
        </View>


        <View style={{margin: 0, padding: 5, flex: 1}}>
        <Text style={{justifySelf:'flex-start', marginBottom: 12, fontSize: 15}}>ANNEE {param[1].split('-')[0]} Acte n° {RandomNumber()}</Text>
            <Text style={{justifySelf:'flex-start', marginBottom: 10,fontSize: 14}}>Naissance de {param[2]} {param[3]} {param[4]}</Text>
            <Text style={{justifySelf:'flex-start',fontSize: 14}}>Le {param[1]} est né en notre commune à {param[0]}</Text>
            <Text style={{justifySelf:'flex-start', marginBottom: 5, fontSize: 14}}>{param[2]} {param[3]} {param[4]} </Text>
            <Text style={{justifySelf:'flex-start', marginBottom: 5,fontSize: 14}}>Du sexe {param[5]}</Text>
            <Text style={{justifySelf:'flex-start', fontSize: 14}}>Né de {param[11]} {param[10]} </Text>
            <Text style={{justifySelf:'flex-start', fontSize: 14, marginBottom: 20}}>Et de {param[9]} {param[8]}</Text>

            <Text style={{justifySelf:'flex-start', fontSize: 11}}>Certifié le présent extrait conforme aux indications portées au registre</Text>             
        </View>


        <View style={{flex: 0.5, alignContent: 'center', alignItems: 'center', marginBottom: 20}}>
            <Image style={{width:100}} src={GenerateQRCode(param[6])} />
        </View>

        <View style={{margin: 0, padding: 0, flex: 1, alignContent: 'right', alignItems: 'right', layout: 'bottom'}}>
            <Text style={{justifySelf:'flex-start',marginBottom: 10,fontSize: 12}}>Délivré au {param[0]} le {aujourdhui}</Text>
            <Text style={{justifySelf:'flex-start',marginBottom: 10,fontSize: 12}}>L'Officier de l'Etat Civil</Text>
        </View>  
    </Page>
  </Document>
);
export default ActeDeNaissance;

