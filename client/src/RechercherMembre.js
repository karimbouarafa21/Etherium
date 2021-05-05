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

class RechercherMembre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Civilite: "",
      Nom: "",
      Prenom: "",
      DateDeNaissance: "",
      TypeMembre: "",
      EtablissementMembre: "",
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
        "\nNom :" +
        this.state.Nom +
        "\n Prénom :" +
        this.state.Prenom +
        "\n Date de naissance:" +
        this.state.DateDeNaissance +
        "\n Type membre:" +
        this.state.TypeMembre +
        "\n Etablissement du membre:" +
        this.state.EtablissementMembre
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Rechercher un membre</h1>

          <IMG />
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
                placeholder="Nom"
                name="Nom"
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
                placeholder="Type membre"
                name="TypeMembre"
                value={this.state.TypeMembre}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Etablissement du membre"
                name="EtablissementMembre"
                value={this.state.EtablissementMembre}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Filtrer
            </Button>
          </Form>
          <nav aria-label="Page navigation example">
            <nav class="" aria-label="pagination">
              <ul class="pagination">
                <li class="page-item">
                  <a aria-label="Previous" href="#pablo" class="page-link">
                    <i aria-hidden="true" class="fa fa-angle-left"></i>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item">
                  <a href="#pablo" class="page-link">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a href="#pablo" class="page-link">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a href="#pablo" class="page-link">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a href="#pablo" class="page-link">
                    4
                  </a>
                </li>
                <li class="page-item">
                  <a href="#pablo" class="page-link">
                    5
                  </a>
                </li>
                <li class="page-item">
                  <a aria-label="Next" href="#pablo" class="page-link">
                    <i aria-hidden="true" class="fa fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </nav>
        </Container>
      </div>
    );
  }
}

const IMG = () => {
  return (
    <img
      src="http://127.0.0.1:8887/rechercherMembre.PNG"
      height="300"
      width="300"
    ></img>
  );
};
export default RechercherMembre;
