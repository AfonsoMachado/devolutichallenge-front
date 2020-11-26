import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";

import Modal from "react-modal";

import "../../assets/styles/main-header.css";
import "../../assets/styles/table.css";
import "../../assets/styles/modal.css";
import "./styles.css";

import api from "../../services/api";

import filter from "../../assets/images/filter.svg";

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  provider_id: number;
}

interface Provider {
  id: number;
  name: string;
  document: string;
  uf: string;
}

const Products: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalFilterIsOpen, setModalFilterIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);

  const [provider, setProvider] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  // const [provider_id, setProviderId] = useState(0);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");

  const providersName = providers.map(({ name }) => name);

  useEffect(() => {
    getProviders();
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function getProviders() {
    const response = await api.get("/providers");
    console.log(response.data);

    setProviders(response.data);
  }

  async function handleSubmit(e: FormEvent) {
    // e.preventDefault();
    const aux = provider;
    let provider_id;

    providers.filter((provider: Provider) => {
      if (provider.name === aux) {
        provider_id = provider.id;
        return true;
      }
      return false;
    });

    console.log(provider_id);

    await api.post("/products", { name, code, category, provider_id });
    alert("Cadastro realizado com sucesso!");
  }

  return (
    <div id="products">
      <Modal
        id="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "#00000080",
          },
          content: {
            width: 627,
            height: 394,
            color: "#181818",
            margin: "auto",
          },
        }}
      >
        <h2>Cadastrar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="name">Nome do produto</label>
            <input
              placeholder="Insira o nome do produto"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="provider">Fornecedor</label>
            <input
              placeholder="Selecione o fornecedor"
              // capturar os fornecedores do backend
              id="provider"
              list="providersSuggestions"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
            />
            <datalist id="providersSuggestions">
              {providersName.map((providerSuggestion) => (
                <option
                  value={providerSuggestion}
                  key={`suggestionFor__option${providerSuggestion}`}
                >
                  {providerSuggestion}
                </option>
              ))}
            </datalist>
          </div>
          <div className="input-block" id="double">
            <div>
              <label htmlFor="code">Código do produto</label>
              <input
                id="code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Categoria</label>
              <input
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
          </div>
          <div className="button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </Modal>

      <Modal
        id="modal"
        isOpen={modalFilterIsOpen}
        onRequestClose={() => setModalFilterIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "#00000080",
          },
          content: {
            width: 627,
            height: 224,
            color: "#181818",
            margin: "auto",
          },
        }}
      >
        <h2>Filtrar por fornecedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="name">Fornecedor</label>
            <input
              placeholder="Selecione o fornecedor"
              id="provider"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
            />
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
            <h2>Produtos</h2>
            <div>
              <button
                className="filter"
                onClick={() => setModalFilterIsOpen(true)}
              >
                <img src={filter} alt="filter" />
              </button>
              <button className="btn" onClick={() => setModalIsOpen(true)}>
                Cadastrar Produtos
              </button>
            </div>
          </div>

          <div className="list">
            <table>
              <thead>
                <tr>
                  <th id="th-1">Nome</th>
                  <th id="th-2">Código</th>
                  <th id="th-2">Categoria</th>
                  <th id="th-2">Fornecedor</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.code}</td>
                      <td>{product.category}</td>
                      <td>{product.provider_id}</td>
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

export default Products;
