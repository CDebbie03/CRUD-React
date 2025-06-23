import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProveedorForm = ({ proveedores, setProveedores, editar, setEditar }) => {
  const [form, setForm] = useState({ nombre: '', empresa: '', correo: '', telefono: '' });

  useEffect(() => {
    if (editar) setForm(editar);
  }, [editar]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { nombre, empresa, correo, telefono } = form;

    if (!nombre || !empresa || !correo || !telefono) {
      return Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    }

    if (editar) {
      const actualizados = proveedores.map(p =>
        p.id === editar.id ? { ...form, id: editar.id } : p
      );
      setProveedores(actualizados);
      localStorage.setItem('proveedores', JSON.stringify(actualizados));
      Swal.fire('Actualizado', 'Proveedor actualizado correctamente', 'success');
      setEditar(null);
    } else {
      const nuevo = { ...form, id: Date.now() };
      const nuevosProveedores = [...proveedores, nuevo];
      setProveedores(nuevosProveedores);
      localStorage.setItem('proveedores', JSON.stringify(nuevosProveedores));
      Swal.fire('Agregado', 'Proveedor creado correctamente', 'success');
    }

    setForm({ nombre: '', empresa: '', correo: '', telefono: '' });
  };

  return (
    <div className="card p-4 mt-4">
      <h4>{editar ? 'Editar Proveedor' : 'Agregar Proveedor'}</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input className="form-control mb-2" name="empresa" placeholder="Empresa" value={form.empresa} onChange={handleChange} />
        <input className="form-control mb-2" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
        <input className="form-control mb-2" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">
          {editar ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default ProveedorForm;