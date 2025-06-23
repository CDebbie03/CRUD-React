import React from 'react';
import Swal from 'sweetalert2';

const ProveedorList = ({ proveedores, setProveedores, setEditar }) => {
  const eliminarProveedor = id => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(result => {
      if (result.isConfirmed) {
        const nuevos = proveedores.filter(p => p.id !== id);
        setProveedores(nuevos);
        localStorage.setItem('proveedores', JSON.stringify(nuevos));
        Swal.fire('Eliminado', 'Proveedor eliminado correctamente', 'success');
      }
    });
  };

  return (
    <div className="mt-4">
      <h4>Lista de Proveedores</h4>
      {proveedores.length === 0 ? (
        <p>No hay proveedores</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.empresa}</td>
                <td>{p.correo}</td>
                <td>{p.telefono}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setEditar(p)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProveedor(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProveedorList;
