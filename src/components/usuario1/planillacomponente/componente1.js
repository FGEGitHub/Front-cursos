import React from "react";

const productos = [
  { codigo: 1, producto: "Marca Copas", categoria: "Marca Copas de Silicona", costo: 42.35, precioVenta: 221.95 },
  { codigo: 2, producto: "Identificadores de vasos", categoria: "Identificadores para vasos", costo: 268.62, precioVenta: 787.62 },
  { codigo: 3, producto: "Macetas", categoria: "Maceta Facetada dorada", costo: 251.68, precioVenta: 745.27 },
];

const movimientos = [
  { fecha: "2020-08-11", tipo: "Compra", producto: "Marca Copas", cantidad: 100, precio: 35 },
  { fecha: "2020-08-11", tipo: "Compra", producto: "Identificadores de vasos", cantidad: 50, precio: 222 },
  { fecha: "2020-08-11", tipo: "Compra", producto: "Macetas", cantidad: 30, precio: 288 },
];

const stock = [
  { producto: "Identificadores de vasos", saldo: 25 },
  { producto: "Macetas", saldo: 20 },
  { producto: "Marca Copas", saldo: 88 },
];

const Productos = () => (
  <div>
    <h2>Productos</h2>
    <ul>
      {productos.map((p) => (
        <li key={p.codigo}>{p.producto} - {p.categoria} - Costo: ${p.costo} - Precio Venta: ${p.precioVenta}</li>
      ))}
    </ul>
  </div>
);

const Movimientos = () => (
  <div>
    <h2>Movimientos</h2>
    <ul>
      {movimientos.map((m, index) => (
        <li key={index}>{m.fecha} - {m.tipo} - {m.producto} - Cantidad: {m.cantidad} - Precio: ${m.precio}</li>
      ))}
    </ul>
  </div>
);

const Stock = () => (
  <div>
    <h2>Stock</h2>
    <ul>
      {stock.map((s, index) => (
        <li key={index}>{s.producto} - Stock Disponible: {s.saldo}</li>
      ))}
    </ul>
  </div>
);

const App = () => (
  <div>
    <Productos />
    <Movimientos />
    <Stock />
  </div>
);

export default App;
