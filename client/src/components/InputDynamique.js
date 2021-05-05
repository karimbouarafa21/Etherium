import React, { Component } from 'react';
import {
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  } from "reactstrap";

class InputDynamique extends Component {
    state = {
      }

    render() { 
        return (
            <>
            {/**SI props est success*/}
            {this.props.etat==="success" ? 
            /** ALORS */
                <FormGroup className="has-success">
                    <Input
                    className="form-control-success"
                    defaultValue="Success"
                    id="inputSuccess1"
                    type="text"
                    />
                </FormGroup> : 
            /*SINON SI props est error*/
            this.props.etat==="error" ? 
            /**ALORS */
                <FormGroup className="has-danger">
                    <Input
                    className="form-control-danger"
                    defaultValue="Error"
                    id="inputDanger1"
                    type="text"
                    />
                    <div className="form-control-feedback">
                        {this.props.messageErreur}
                    </div>
            </FormGroup> : 
            /** ELSE*/
                <FormGroup>
                    <Input placeholder="Default" type="text" />
                </FormGroup>
            }
            </>
            );
    }
}
 
export default InputDynamique;