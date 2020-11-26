import React, { FormEvent, useEffect, useState } from "react";

import "../../assets/styles/main-header.css";
import "../../assets/styles/table.css";
import "../../assets/styles/modal.css";
import "./styles.css";

import Modal from "react-modal";
import api from "../../services/api";
import Header from "../../components/Header";

Modal.setAppElement("#root");

interface Provider {
  id: number;
  name: string;
  document: string;
  uf: string;
}

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  provider_id: number;
}

const Providers: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [providers, setProviders] = useState([]);
  const [products, setProducts] = useState([]);

  const [qtdProducts, setQtdProducts] = useState([]);

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");

  useEffect(() => {
    getProviders();
    getProducts();

    // getProviderQtd(3);

    // providers.map((provider: Provider) => {
    //   products.map((product: Product) => {
    //     if (provider.id === product.provider_id) {
    //       setQtdProductsByProvider(provider.id);
    //     }
    //   });
    // });
  }, []);

  // async function getProviderQtd(id: number) {
  //   const response = await api.get(`/providers/${id}`);
  //   if (response.data.qtd === undefined) return 0;
  //   return response.data.qtd;
  // }

  // async function setQtdProductsByProvider(id: number) {
  //   const providerAtual = await getProvider(id);
  //   // console.log(providerAtual);
  //   let qtdAtual = await getProviderQtd(id);
  //   qtdAtual++;
  //   providerAtual.qtd = qtdAtual;

  //   console.log(providerAtual);
  //   const response = await api.put(`/providers/${id}`, providerAtual);
  // }

  async function getProvider(id: number) {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  }

  async function getProviders() {
    const response = await api.get("/providers");
    setProviders(response.data);
  }

  async function getProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function handleSubmit(e: FormEvent) {
    // e.preventDefault();

    await api.post("/providers", { name, document });
    alert("Cadastro realizado com sucesso!");
    // setModalIsOpen(false);
  }

  return (
    <div id="providers">
      <Modal
        id="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "#00000080",
          },
          content: {
            width: 697,
            height: 310,
            color: "#181818",
            margin: "auto",
          },
        }}
      >
        <h2>Cadastrar Fornecedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              placeholder="Insira o nome do fornecedor"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-block" id="double">
            <div>
              <label htmlFor="document">CNPJ</label>
              <input
                id="document"
                value={document}
                onChange={(event) => setDocument(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Categoria</label>
              <input />
            </div>
          </div>
          <div className="button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </Modal>
      <div className="wrapper">
        <Header />

        <main>
          <div className="main-header">
            <h2>Fornecedores</h2>
            <button className="btn" onClick={() => setModalIsOpen(true)}>
              Cadastrar Fornecedor
            </button>
          </div>
          <div className="list">
            <table>
              <thead>
                <tr>
                  <th id="th-1">Nome</th>
                  <th id="th-2">CNPJ</th>
                  <th id="th-2">Categoria</th>
                  <th id="th-2">Total de Produtos</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider: Provider) => {
                  return (
                    <tr key={provider.id}>
                      <td>{provider.name}</td>
                      <td>{provider.document}</td>
                      <td>Alimentos</td>
                      <td>85</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Providers;
