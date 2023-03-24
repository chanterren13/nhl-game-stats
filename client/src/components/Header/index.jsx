import React, { useState, useContext } from "react";
import { SortMethodContext } from "../../contexts/SortMethodContext";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const sortMethod = useContext(SortMethodContext);
  const [key, setKey] = useState("0");

  const sortOptions = [
    {
      method: "goals",
      order: "DESC",
    },
    {
      method: "goals",
      order: "ASC",
    },
    {
      method: "name",
      order: "ASC",
    },
  ];

  const selectSort = (eventKey) => {
    sortMethod.setMethod(sortOptions[eventKey]);
    setKey(eventKey);
    console.log(sortOptions[eventKey]);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="fs-1">NHL Game Stats</Navbar.Brand>
          <Nav onSelect={selectSort} activeKey={key}>
            <NavDropdown title="Sort By">
              <NavDropdown.Item eventKey="0">Goals, DESC</NavDropdown.Item>
              <NavDropdown.Item eventKey="1">Goals, ASC</NavDropdown.Item>
              <NavDropdown.Item eventKey="2">Name, ASC</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
