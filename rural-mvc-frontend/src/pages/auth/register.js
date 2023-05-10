import React, { useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";
import { customerApi, producerApi } from "@/services/api";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [loginType, setLoginType] = useState("customer");

  const navigation = useRouter();

  const sendData = () => {
    if (loginType === "customer") {
      customerApi
        .post("/createCustomer", {
          first_name: name,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
        })
        .then((response) => {
          window.alert(response.data);
          navigation.push("/auth/login");
        });
    } else if (loginType === "producer") {
      producerApi
        .post("/createProducer", {
          first_name: name,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
        })
        .then((response) => {
          window.alert(response.data);
          navigation.push("/auth/login");
        });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Primeiro Nome
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      onChange={(value) => {
                        setName(value.target.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Último Nome
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      onChange={(value) => {
                        setLastName(value.target.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(value) => {
                        setEmail(value.target.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Celular
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone"
                      onChange={(value) => {
                        setPhone(value.target.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(value) => {
                        setPassword(value.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tipo de usuário
                    </label>
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      <select
                        name="type"
                        id="loginType"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={(value) => {
                          setLoginType(value.target.value);
                        }}
                      >
                        <option value="customer">Cliente</option>
                        <option value="producer">Produtor</option>
                      </select>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={sendData}
                    >
                      Criar Conta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
