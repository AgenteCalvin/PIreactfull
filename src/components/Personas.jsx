import React, { useEffect, useState } from "react";
import "../style.css";

const Personas = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error al cargar usuarios:", err));
    }, []);

    const filteredUsers = users.filter((user) =>
        `${user.nombre} ${user.apellidos} ${user.correo}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="datagrid-container-cliente">
            <label>Busqueda de personas</label>
            <br />
            <br />
            <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <br />
            <div className="table-wrapper">
                <table className="datagrid">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellidos}</td>
                                    <td>{user.correo}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "12px" }}>
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button>Consultar</button>
        </div>
    );
};

export default Personas;