import React, { useState, useEffect } from 'react';
import ProveedorForm from './components/ProveedorForm';
import ProveedorList from './components/ProveedorList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [proveedores, setProveedores] = useState([]);
  const [editar, setEditar] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('proveedores')) || [];
    setProveedores(datos);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">CRUD de Proveedores</h2>
      <ProveedorForm
        proveedores={proveedores}
        setProveedores={setProveedores}
        editar={editar}
        setEditar={setEditar}
      />
      <ProveedorList
        proveedores={proveedores}
        setProveedores={setProveedores}
        setEditar={setEditar}
      />
    </div>
  );
}

export default App;
