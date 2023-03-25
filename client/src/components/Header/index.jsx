import React, { useState, useContext } from "react";
import { SortMethodContext } from "../../contexts/SortMethodContext";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TriangleDownIcon, TriangleUpIcon } from "@primer/octicons-react";

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
    {
        method: "gStrk",
        order: "DESC"
    },
  ];

  const selectSort = (eventKey) => {
    sortMethod.setMethod(sortOptions[eventKey]);
    setKey(eventKey);
    // console.log(sortOptions[eventKey]);
  };

  return (
    <>
      <Navbar bg="black" variant="dark">
        <Container fluid className="px-sm-5">
          <Navbar.Brand className="fs-1">NHL Game Stats</Navbar.Brand>
          <Nav onSelect={selectSort} activeKey={key}>
            <NavDropdown title="Sort By" align="end">
              <NavDropdown.Item eventKey="0">
                Goals <TriangleDownIcon size={24}></TriangleDownIcon>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="1">
                Goals <TriangleUpIcon size={24}></TriangleUpIcon>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="2">
                Name <TriangleUpIcon size={24}></TriangleUpIcon>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="3">
                Hottest
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
