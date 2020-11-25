import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import "../../assets/styles/main-header.css";
import "../../assets/styles/table.css";
import "./styles.css";
import api from "../../services/api";

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  provider_id: number;
}

const Products: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProviders();
  }, []);

  async function getProviders() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  return (
    <div id="products">
      <div className="wrapper">
        <Header />

        <main>
          <div className="main-header">
            <h2>Produtos</h2>
            <button>Cadastrar Produtos</button>
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

export default Products;
