// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

/* 
* Libraries needed in the contract 'Civil State' contract
*/
/** @title LibConcatenateStrings. */
/// @dev Library with a function for concatenating strings
import {LibConcatenateStrings} from './LibConcatenateStrings.sol';
/** @title LibTransformUintString. */
/// @dev Library with a function to transform an 'uint' in a 'string
import {LibTransformUintString} from './LibTransformUintString.sol';
/** @title SafeMath. */
/** 
 * @dev Library with functions to realize arithmetic operations with overflow checks
 *
 * Contract collection retrieved from : https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol
 *
*/
import {SafeMath} from './SafeMath.sol';

/** @title CivilState. */
contract CivilState {
    /// @dev Include libraries codes and initialize its use in the contract
    using LibConcatenateStrings for string;
    using LibTransformUintString for *;
    using SafeMath for uint; 

    /// @dev Owner address
    address payable public owner;
    
    /// @dev Compteur du nombre d'utilisateurs registrés 
    uint utilisateursCount = 0;
    
    /// @dev Compteur du nombre d'utilisateurs hopital
    uint utilisateursHopital = 0;

    /// @dev Compteur du nombre d'utilisateurs prefecture
    uint utilisateursPrefecture = 0;

    /// @dev Compteur du nombre d'utilisateurs mairie
    uint utilisateursMairie = 0;

    /// @dev Compteur du nombre de citoyens
    uint citoyensCount = 0;

    DonneesIdentification public _donneesIdentTemp;
    DonneesEtablissement public _donneesEtabTemp;

    /**
    * Informations d'authentifications des utilisateurs
    * typ : pour définir si citoyen, admin, membre hôpital, membre prefecture, membre mairie
    * valeurs possibles typ : citoyen, admin, hopital, prefecture, mairie
    */
    struct Authentification {
        bytes32 mdp;
        string typ;
    }

    /**
    * Données d'identification des membres
    * de l'hopital, de la prefecture, de la mairie
    *
    */
    struct DonneesIdentification {
        string civilite;
        string nom;
        string prenom;
        string dateNaissance;
        string role;
    }

    /**
    * Données de l'établissement des membres
    * de l'hopital, de la prefecture, de la mairie
    *
    */
    struct DonneesEtablissement {
        string nom;
        string adresse;
        string codePostale;
        string ville;
    }

    struct DonneesMembres {
        string login;
        Authentification auth;
        DonneesIdentification donneesIdent;
        DonneesEtablissement donneesEtablissement;
    }

    /**
    * Données d'identification des citoyens
    */
    struct DonneesIdentificationCitoyen {
        string sexe;
        string nomFamille;
        string nomUsage;
        string premierPrenom;
        string autresPrenoms;
        string etatCivil;
    }

    /**
    * Données de naissance des citoyens
    */
    struct DonneesNaissanceCitoyen {
        string dateNaissance;
        string communeNaissance;
        string departementNaissance;
    }

    /**
    * Données des parents des citoyens
    */
    struct DonneesParentsCitoyen {
        string nomFamilleMere;
        string prenomMere;
        string nomFamillePere;
        string prenomPere;
    }

    struct DonneesCitoyen {
        string login;
        bool identite;
        bytes4 id;
        bytes32 hashCertification;
        Authentification auth;
        DonneesIdentificationCitoyen donneesIdentCitoyen;
        DonneesNaissanceCitoyen donneesNaissanceCitoyen;
        DonneesParentsCitoyen donneesParentsCitoyen;
    }            

    /*
    * Mapping pour le suivi des utilisateurs
    * clé : string login
    */
    mapping (string => Authentification) utilisateurs;

    /** @dev
    * Mappings pour suivi des membres de l'hopital, de la prefecture et de la mairie
    *
    */
    mapping(string => DonneesMembres) membresHopital;

    mapping(string => DonneesMembres) membresPrefecture;

    mapping(string => DonneesMembres) membresMairie;

    /** @dev
    * Mappings pour suivi des citoyens
    *
    */
    mapping(string => DonneesCitoyen) citoyens;

    // CitoyenCount --> login
    mapping(uint => string) ids;

    // ID --> login
    mapping(bytes4 => string) idLogins;

    /// @dev Mapping des hash
    mapping(bytes32 => string) hashCertifications;    

    /// @dev Contract constructor sets the owner
    constructor () public {
        owner = msg.sender;
    }   
    

    /**
    * Read functions 
    */

    function getTypeUtilisateur(string memory _login) public view returns(string memory _typ) {
        _typ = utilisateurs[_login].typ;
    }


    /// @dev Gets the citoyens members count.
    /// @return citoyenCount Citoyens count.
    function getCitoyensCount() public view returns(uint){
        return citoyensCount;
    }

    function getLoginIdStatut(uint _count) public view returns(string memory _login, bytes4 _id, bool _statut) {
        _login = ids[_count];
        _id = citoyens[_login].id;
        _statut = citoyens[_login].identite;
    }

    function getLoginFromId(bytes4 _id) public view returns(string memory _login) {
        _login = idLogins[_id];
    }

    function getIdFromLogin(string memory _login) public view returns (bytes4 _id) {
        _id = citoyens[_login].id;
    }

    /// @dev Gets the hospital members count.
    /// @return utilisateursHopital Membres hopital count.
    function getUtilisateursHopitalCount() public view returns(uint){
        return utilisateursHopital;
    }

    /*function getInfoIdentMembreHopital(string memory _login) public returns(string memory _civilite, string memory _nom, string memory _prenom, string memory _dateNaissance, string memory _role){
     
        _donneesIdentTemp = membresHopital[_login].donneesIdent;
        _civilite = _donneesIdentTemp.civilite;
        _nom = _donneesIdentTemp.nom;
        _prenom = _donneesIdentTemp.prenom;
        _dateNaissance = _donneesIdentTemp.dateNaissance;
        _role = _donneesIdentTemp.role;
    }*/

    function getInfoEtabMembreHopital(string memory _login) public returns(string memory _nomEtab, string memory _adresseEtab, string memory _codePostaleEtab, string memory _villeEtab){
     
        _donneesEtabTemp = membresHopital[_login].donneesEtablissement;
        _nomEtab = _donneesEtabTemp.nom;
        _adresseEtab = _donneesEtabTemp.adresse;
        _codePostaleEtab = _donneesEtabTemp.codePostale;
        _villeEtab = _donneesEtabTemp.ville;

    }

    function getInfoIdentificationCitoyen (string memory _login) public view returns(string memory _sexe, 
    string memory _nomFamille, string memory _nomUsage, string memory _premierPrenom, 
    string memory _autresPrenoms, string memory _etatCivil) {
       DonneesIdentificationCitoyen memory _donneesIdentificationCitoyen;
        _donneesIdentificationCitoyen = citoyens[_login].donneesIdentCitoyen;

        _sexe = _donneesIdentificationCitoyen.sexe;
        _nomFamille = _donneesIdentificationCitoyen.nomFamille;
        _nomUsage = _donneesIdentificationCitoyen.nomUsage;
        _premierPrenom = _donneesIdentificationCitoyen.premierPrenom;
        _autresPrenoms = _donneesIdentificationCitoyen.autresPrenoms;
        _etatCivil = _donneesIdentificationCitoyen.etatCivil;

    }

    function getInfoNaissanceCitoyen (string memory _login) public view returns(string memory _dateNaissance, 
    string memory _communeNaissance, string memory _departementNaissance) {
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;
        _donneesNaissanceCitoyen = citoyens[_login].donneesNaissanceCitoyen;

        _dateNaissance = _donneesNaissanceCitoyen.dateNaissance;
        _communeNaissance = _donneesNaissanceCitoyen.communeNaissance;
        _departementNaissance = _donneesNaissanceCitoyen.departementNaissance;

    }

    function getInfoParentsCitoyen (string memory _login) public view returns(string memory _nomFamilleMere,
    string memory _prenomMere, string memory _nomFamillePere, string memory _prenomPere) {
        DonneesParentsCitoyen memory _donneesParentsCitoyen;
        _donneesParentsCitoyen = citoyens[_login].donneesParentsCitoyen;

        _nomFamilleMere = _donneesParentsCitoyen.nomFamilleMere;
        _prenomMere = _donneesParentsCitoyen.prenomMere;
        _nomFamillePere = _donneesParentsCitoyen.nomFamillePere;
        _prenomPere = _donneesParentsCitoyen.prenomPere;        
    }

    /**
    * Write functions 
    */    
    /*
    /// @dev Function pour ajouter un nouveau utilisateur 
    function addMembreHopital(string memory _civilite, string memory _nom, string memory _prenom, string memory _dateNaissance, string memory _role,
    string memory _nomEtab, string memory _adresseEtab, string memory _codePostaleEtab, string memory _villeEtab) public {
        DonneesIdentification memory _donneesIdent;
        DonneesEtablissement memory _donneesEtab;
        string memory _login = _nom;
        _login = _login.concatenate(_prenom);
        _login = _login.concatenate(_dateNaissance);
        string memory _mdp = _login;
        bytes32 _mdpHash = keccak256(bytes(_mdp));

        Authentification memory _auth;   

        _donneesIdent = DonneesIdentification({
            civilite: _civilite,
            nom: _nom,
            prenom : _prenom,
            dateNaissance : _dateNaissance,
            role : _role
        });
        
        _donneesEtab = DonneesEtablissement({
            nom : _nomEtab,
            adresse : _adresseEtab,
            codePostale : _codePostaleEtab,
            ville : _villeEtab
        });

        _auth = Authentification({
            mdp : _mdpHash,
            typ : "hopital"
        });
        
    
        membresHopital[_login] = DonneesMembres({
            login : _login,
            auth : _auth,
            donneesIdent : _donneesIdent,
            donneesEtablissement : _donneesEtab
        });

        utilisateurs[_login] = Authentification({
            mdp : _mdpHash,
            typ : "hopital"
        });

        utilisateursHopital++;
        utilisateursCount++;
    }*/

    function toHexDigit(uint8 d) pure internal returns (byte) {                                                                                      
    if (0 <= d && d <= 9) {                                                                                                                      
        return byte(uint8(byte('0')) + d);                                                                                                       
    } else if (10 <= uint8(d) && uint8(d) <= 15) {                                                                                               
        return byte(uint8(byte('a')) + d - 10);                                                                                                  
    }                                                                                                                                            
    revert();                                                                                                                                    
    }                                                                                                                                                

    function fromCode(bytes4 code) public pure returns (string memory) {                                                                                    
        bytes memory result = new bytes(10);                                                                                                         
        result[0] = byte('0');
        result[1] = byte('x');
        for (uint i=0; i<4; ++i) {
            result[2*i+2] = toHexDigit(uint8(code[i])/16);
            result[2*i+3] = toHexDigit(uint8(code[i])%16);
        }
        return string(result);
    }

    /// @dev Function pour ajouter un nouveau citoyen 
    function addNaissance(string memory _sexe, string memory _nomFamille, string memory _nomUsage, string memory _premierPrenom, string memory _autresPrenoms) public {
        
        DonneesIdentificationCitoyen memory _donneesIdentificationCitoyen;
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;
        DonneesParentsCitoyen memory _donneesParentsCitoyen;

        string memory _login = _nomFamille;
        _login = _login.concatenate(_premierPrenom);
        //string memory _mdp = _login;
        string memory _mdp = "password";
        bytes32 _mdpHash = keccak256(bytes(_mdp));
        Authentification memory _auth;
        bytes32 lambdaCertification = keccak256(bytes("naissance"));

        bytes4 _id = bytes4(keccak256(bytes(_login)));
        _login = fromCode(_id);

        _auth = Authentification({
            mdp : _mdpHash,
            typ : "citoyen"
        });

        _donneesIdentificationCitoyen = DonneesIdentificationCitoyen({
            sexe : _sexe,
            nomFamille : _nomFamille,
            nomUsage : _nomUsage,
            premierPrenom : _premierPrenom,
            autresPrenoms : _autresPrenoms,
            etatCivil : "CELIBATAIRE"
        });

        citoyens[_login] = DonneesCitoyen({
            login : _login,
            identite : false,
            id : _id,
            hashCertification : lambdaCertification,
            auth : _auth,
            donneesIdentCitoyen : _donneesIdentificationCitoyen,
            donneesNaissanceCitoyen : _donneesNaissanceCitoyen,
            donneesParentsCitoyen : _donneesParentsCitoyen
        });

        ids[citoyensCount] = _login;
        idLogins[_id] = _login;

        citoyensCount++; 

    }

    
    /// @dev Function pour ajouter les données de naissance
    function addDonneesNaissance(string memory _login, string memory _dateNaissance, string memory _communeNaissance, string memory _departementNaissance) public {
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;

        _donneesNaissanceCitoyen = DonneesNaissanceCitoyen({
            dateNaissance : _dateNaissance,
            communeNaissance : _communeNaissance,
            departementNaissance : _departementNaissance
        });

        citoyens[_login].donneesNaissanceCitoyen = _donneesNaissanceCitoyen;         
    }


    /// @dev Function pour ajouter un nouveau citoyen 
    function addDonneesParents(string memory _login, string memory _nomFamilleMere, string memory _prenomMere, string memory _nomFamillePere,string memory _prenomPere) public {
        DonneesParentsCitoyen memory _donneesParentsCitoyen;

        _donneesParentsCitoyen = DonneesParentsCitoyen({
            nomFamilleMere : _nomFamilleMere,
            prenomMere : _prenomMere,
            nomFamillePere : _nomFamillePere,
            prenomPere : _prenomPere
        });

        citoyens[_login].donneesParentsCitoyen = _donneesParentsCitoyen;        
    }

    /// @dev Function pour vérifier identité
    function verifyIdentite(string memory _login) public {
        DonneesIdentificationCitoyen memory _donneesIdent;
        citoyens[_login].identite = true;

        Authentification memory _auth = citoyens[_login].auth;
        bytes32 _mdpHash = _auth.mdp;
        
        /**
         * Génération du hash
         */
        _donneesIdent = citoyens[_login].donneesIdentCitoyen;

        string memory _nom = _donneesIdent.nomFamille;
        string memory _prenom = _donneesIdent.premierPrenom;
        string memory _conc = _nom.concatenate(_prenom);
        bytes32 certification_hash = keccak256(bytes(_conc));

        citoyens[_login].hashCertification = certification_hash;
        hashCertifications[certification_hash] = _login;

        utilisateurs[_login] = Authentification({
            mdp : _mdpHash,
            typ : "citoyen"
        });

        utilisateursCount++;

    }

    /// @dev Récupérer un hash
    function getHash (string memory _login) public view returns (bytes32 _hash) {
        _hash = citoyens[_login].hashCertification;
    }

    /// @dev Vérifier l'authentification et renvoie le type d'utilisateur.
    function verifyAuthentification (string memory _login, string memory _pwd) public view returns (string memory _verify, string memory _typ){
        //Verify that the user used the good password
        
        if (utilisateurs[_login].mdp == keccak256(bytes(_pwd))) {
           _verify = "ok";
            _typ = utilisateurs[_login].typ;
        } else {
           _verify = "ko";
            _typ = "NULL";
        }

    }

    /// @dev Vérifier un hash
    function verifyCertification (bytes32 id_hash) public view returns (string memory _login) {
        _login =  hashCertifications[id_hash];
    }

    /// @dev Déclarer mariage
    function declareMariage(string memory _login, string memory _etatCivil) public {
        DonneesIdentificationCitoyen memory _donneesIdentCitoyen;
        _donneesIdentCitoyen = citoyens[_login].donneesIdentCitoyen;
        _donneesIdentCitoyen.etatCivil = _etatCivil;
        citoyens[_login].donneesIdentCitoyen = _donneesIdentCitoyen;
    }

}