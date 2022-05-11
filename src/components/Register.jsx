import { useState } from "react";
import React from "react";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const Register = (props) => {
  let { id } = useParams();

  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const [dataErr, setDataErr] = useState({});
  let [err, setErr] = useState([]);

  const handleOnChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    InsertarDatos(datos);
  };

  //Insertar en base de datos
  let dat1;
  const InsertarDatos = async () => {
    const cookies = new Cookies();

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(datos), // data can be `string` or {object}!

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log(response.status);
        //  setDataErr(response.json())
        return response.json();
      })
      .then((data) => {
        setDataErr(data);
      })
      .catch((error) => setDataErr("Credenciales no validas"));

    let errorArray = [];
    for (const property in dataErr) {
      errorArray.push(`${dataErr[property]}`);
    }

    setErr(errorArray);
    console.log(err);
    // console.log(cookies.get("token"))
  };

  return (
    <>
      <div className="container">
        <div className="bg card card-shadow col-lg-4 mx-auto my-6 mt-4">
          <div className="text-center">
            <h1>Registro</h1>
            <h2>{id}</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleOnsubmit}>
              <div className="col-lg-12">
                <input
                  type="email"
                  placeholder="Introduzca el email"
                  name="email"
                  className="form-control my-2"
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  onChange={handleOnChange}
                  autoFocus="autofocus"
                  required
                />

                <input
                  type="password"
                  placeholder="Introduzca el password"
                  name="password"
                  className="form-control my-2"
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  placeholder="Introduzca el nombre"
                  name="name"
                  className="form-control my-2"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
          </div>

          <div className="px-2 py-1">
            {err.map((e, i) => (
              <div>
                <h7 key={i}>{e}</h7>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
