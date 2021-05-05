import React from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal } from "reactstrap";

function Example() {
  const [liveDemo, setLiveDemo] = React.useState(false);
  
  return(
    <>
      <Button color="primary" type="button" onClick={() => setLiveDemo(true)}>
        Launch demo modal
      </Button>
      <Modal isOpen={liveDemo} toggle={() => setLiveDemo(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Modal title
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setLiveDemo(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Woohoo, you're reading this text in a modal!</p>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={() => setLiveDemo(false)}
            >
              Never mind
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={() => setLiveDemo(false)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Example;