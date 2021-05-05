import React from "react";
import Mairie from "./Mairie";
import Hopital from "./Hopital";
import Prefecture from "./Prefecture";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

function PageAdmin() {
  return (
    <div>
      <Link to="/hopital">
        <Ajouthopital />
      </Link>
      <Link to="/mairie">
        <Ajoutmairie />
      </Link>
      <Link to="/prefecture">
        <Ajoutprefecture />
      </Link>
      <Link to="/rechercherMembre">
        <RechercherMembre />
      </Link>
    </div>
  );
}

const Ajouthopital = () => {
  return (
    <img
      src="http://127.0.0.1:8887/ajoutHopital.PNG"
      height="150"
      width="150"
    ></img>
  );
};
const Ajoutmairie = () => {
  return (
    <img
      src="http://127.0.0.1:8887/ajoutMairie.PNG"
      height="150"
      width="150"
    ></img>
  );
};
const Ajoutprefecture = () => {
  return (
    <img
      src="http://127.0.0.1:8887/ajoutPrefecture.PNG"
      height="150"
      width="150"
    ></img>
  );
};
const RechercherMembre = () => {
  return (
    <img
      src="http://127.0.0.1:8887/rechercherMembre.PNG"
      height="150"
      width="150"
    ></img>
  );
};
export default PageAdmin;
