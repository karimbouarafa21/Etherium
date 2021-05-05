import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          windowWidth: 0,
          windowHeight: 0
        };
        this.updateDimensions = this.updateDimensions.bind(this);
      }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        this.setState({ windowWidth, windowHeight });
    }

    render() { 
        return (
            <>
            
            <div className="navbar-perso">
            
                <Container>
                    <div className="container-navbar">
                        {this.state.windowWidth >= 1200 ? 
                        <ul className="menu-navbar">
                            <li className="element-menu-navbar">Etat civils</li>
                            <li className="element-menu-navbar">Elections</li>
                            <li className="element-menu-navbar">Papiers</li>
                            <li className="element-menu-navbar">Famille</li>
                        </ul>
                        :
                        <div>
                            <ul className="menu-navbar">
                                <li className="element-menu-navbar"><i class="fa fa-book"></i></li>
                                <li className="element-menu-navbar"><i class="fa fa-archive"></i></li>
                                <li className="element-menu-navbar"><i class="fa fa-id-card"></i></li>
                                <li className="element-menu-navbar"><i class="fa fa-users"></i></li>
                            </ul>
                        </div>
                        }
                        {/* <div className="connexion-navbar">
                            <span style={{textAlign:"center"}}>
                                <i style={{paddingRight:"30px"}}class="fa fa-user"></i>
                                Se connecter
                            </span>
                            
                        </div> */}
                    </div>
                </Container>
            </div>
            </>
          );
    }
}
 
export default Navbar;