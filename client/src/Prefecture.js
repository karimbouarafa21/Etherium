import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import { Component } from "react";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

class Prefecture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Civilite: "",
      NomDeFamille: "",
      Prenom: "",
      DateDeNaissance: "",
      FontionDansEtablissement: "",
      NomEtablissement: "",
      Adresse: "",
      CodePostal: "",
      Commune: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  handleSubmit(event) {
    console.log("submit");
    alert(
      "Civilité : " +
        this.state.Civilite +
        "\nNom de famille :" +
        this.state.NomDeFamille +
        "\n Prénom :" +
        this.state.Prenom +
        "\n Date de naissance:" +
        this.state.DateDeNaissance +
        "\n Fonction dans l'établissement:" +
        this.state.FontionDansEtablissement +
        "\n Nom de l'établissement:" +
        this.state.NomEtablissement +
        "\n Adresse:" +
        this.state.Adresse +
        "\n Code postal:" +
        this.state.CodePostal +
        "\n Commune:" +
        this.state.Commune
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Ajouter un membre prefecture</h1>

          <IMG />
          <h2>Données d'identification</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="Civilité"
                name="Civilite"
                value={this.state.Civilite}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Nom de famille"
                name="NomDeFamille"
                value={this.state.NomDeFamille}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Prénom"
                name="Prenom"
                value={this.state.Prenom}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Date de naissance"
                name="DateDeNaissance"
                value={this.state.DateDeNaissance}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Fonction dans l'établissement"
                name="FontionDansEtablissement"
                value={this.state.FontionDansEtablissement}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>

            <h2>Etablissement</h2>

            <Form.Group>
              <Form.Control
                placeholder="Nom de l'établissement"
                name="NomEtablissement"
                value={this.state.NomEtablissement}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Adresse"
                name="Adresse"
                value={this.state.Adresse}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Code postal"
                name="CodePostal"
                value={this.state.CodePostal}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Commune"
                name="Commune"
                value={this.state.Commune}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Créer un membre
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const IMG = () => {
  return (
    <img
      src="http://127.0.0.1:8887/prefecture.PNG"
      height="300"
      width="300"
    ></img>
  );
};
export default Prefecture;
