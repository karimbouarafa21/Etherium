import React, { Component } from 'react';

class ErrorMessage extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div>
                {/* <i class="fa fa-times-circle ct-red fa-3x" style={{marginBottom:"30px"}}></i> */}
                <h4 className="ct-info">{this.props.message}</h4>
                <h5>{this.props.sousMessage}</h5>

            </div>
            </>
         );
    }
}

export default ErrorMessage;