import React, { Component } from "react";
import NavBar from "./Components/Navigationbar/NavBar";

import logo from "./Components/Navigationbar/logo12.png";

class App extends Component {
  render() {
    let links = [
      { label: "Home", link: "#home", active: true },
      { label: "About", link: "#about" },
      { label: "Portfolio", link: "#portfolio" },
      { label: "Location", link: "#location" },
      { label: "History", link: "#history" }
    ];

    return (
      <div className="container center">
        <NavBar links={links} logo={logo} />
      </div>
    );
  }
}

export default App;
