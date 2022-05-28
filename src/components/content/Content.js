import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Usuario from "../Usuario";
import Login from "../login";
import Register from "../Register";
import Topbar from "./Topbar";
import Tablero from "../Tablero";
import Home from "../Home";
import UserProvider from "../../context/UserProvider";
import RequireAuth from "../ RequireAuth";
import Proveedor from "../Proveedor";
import Producto from "../Producto";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Tablero" element={<Tablero />} />
        <Route exact path="/about" element={() => "About"} />
        <Route exact path="/Registrar" element={<Register />} />
        <Route exact path="/contact" element={() => "Contact"} />
        <Route
          exact
          path="/Usuario"
          element={
            <RequireAuth>
              <Usuario />
            </RequireAuth>
          }
        />
        <Route exact path="/Login" element={<Login />} />
        <Route
          exact
          path="/Producto"
          element={
            <RequireAuth>
              <Producto />
            </RequireAuth>
          }
        />
        <Route exact path="/Proveedor" element={<Proveedor />} />
      </Routes>
    </UserProvider>
  </Container>
);

export default Content;
