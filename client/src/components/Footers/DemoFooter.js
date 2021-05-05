/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import logoBearingPoint from 'assets/img/bearingpoint.png'

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className=" footer-nav-perso">
      <Container>
        <Row className="container-footer">
          <div>FAQ</div> 
          <div>2021</div>
          <img style={{height:"15px"}} alt="..." src={logoBearingPoint}/> 
        </Row>
      </Container>
    </footer>

  );
}

export default DemoFooter;
