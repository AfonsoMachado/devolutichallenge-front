import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Products from "./pages/Products";
import Providers from "./pages/Providers";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Providers} />
      <Route path="/providers" component={Providers} />
      <Route path="/products" component={Products} />
    </BrowserRouter>
  );
}

export default Routes;
