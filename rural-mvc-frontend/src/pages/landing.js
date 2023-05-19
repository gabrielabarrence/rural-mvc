import { React, useEffect, useState } from "react";
import Link from "next/link";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { stockApi, productApi, customerApi } from "../services/api";

export default function Landing() {
  const manageStock = (numberId) => {
    stockApi.post(`/manageStock/${numberId}`);
  };

  const [productData, setProductData] = useState();
  const [inStock, setInStock] = useState([]);

  //retake findAllProducts
  useEffect(() => {
    const productFunction = async () => {
      await productApi.get("/findAllProducts").then((response) => {
        setProductData(response.data);
        console.log(response.data);

        const productsInStock = response.data.map(
          (product) => product.stock.in_stock
        );
        console.log(productsInStock);
        setInStock(productsInStock);
      });
    };
    productFunction();
  }, []);

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Hortifruti do Álvaro
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Prezamos pelo frescor e pela qualidade de nossos produtos,
                    além da excelência em atendimento aos nossos clientes!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Suco de Maçã
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      R$ 08,00 / litro
                    </p>
                    {inStock[0] === true ? (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          manageStock(1);
                        }}
                      >
                        Reservar
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Ativar Notificaçōes
                      </button>
                    )}
                  </blockquote>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1471771327165-aa841af98748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">Aipim </h4>
                    <p className="text-md font-light mt-2 text-white">
                      R$ 09,00 / kg
                    </p>
                    {inStock[1] === true ? (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          manageStock(2);
                        }}
                      >
                        Reservar
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Ativar Notificaçōes
                      </button>
                    )}
                  </blockquote>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">Uva </h4>
                    <p className="text-md font-light mt-2 text-white">
                      R$ 12,00/ kg
                    </p>
                    {inStock[2] === true ? (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          manageStock(3);
                        }}
                      >
                        Reservar
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-100 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Ativar Notificaçōes
                      </button>
                    )}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
