import React, { useEffect, useState } from "react";
import "../style.css";

const Regiones = () => {
    const [regions, setRegions] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState("");
    const [selectedCiudad, setSelectedCiudad] = useState("");
    const [selectedFecha, setSelectedFecha] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/regiones")
            .then((res) => res.json())
            .then((data) => setRegions(data))
            .catch((err) => console.error("Error al cargar regiones:", err));
    }, []);

    const parseSpanishDate = (dateString) => {
        if (!dateString) return null;

        const months = {
            enero: "01",
            febrero: "02",
            marzo: "03",
            abril: "04",
            mayo: "05",
            junio: "06",
            julio: "07",
            agosto: "08",
            septiembre: "09",
            octubre: "10",
            noviembre: "11",
            diciembre: "12"
        };

        const regex = /(\d{1,2}) de (\w+) de (\d{4})/i;
        const match = dateString.match(regex);

        if (match) {
            const day = match[1].padStart(2, '0');
            const month = months[match[2].toLowerCase()];
            const year = match[3];
            return new Date(`${year}-${month}-${day}`);
        } else {
            return null;
        }
    };

    const departamentos = [...new Set(regions.map((region) => region.Departamento))];
    const ciudades = [...new Set(
        regions
            .filter((region) => selectedDepartamento === "" || region.Departamento === selectedDepartamento)
            .map((region) => region.Ciudad_o_municipio)
    )];

    const filteredRegions = regions.filter((region) => {
        const matchDepartamento = selectedDepartamento === "" || region.Departamento === selectedDepartamento;
        const matchCiudad = selectedCiudad === "" || region.Ciudad_o_municipio === selectedCiudad;

        let matchFecha = true;
        if (selectedFecha) {
            const fechaRegion = parseSpanishDate(region.Fecha)?.toISOString().slice(0, 10);
            matchFecha = fechaRegion === selectedFecha;
        }

        return matchDepartamento && matchCiudad && matchFecha;
    });

    return (
        <div className="datagrid-container-cliente">
            <h2>Consulta de Regiones</h2>

            <div className="filters">
                <select value={selectedDepartamento} onChange={(e) => {
                    setSelectedDepartamento(e.target.value);
                    setSelectedCiudad(""); 
                }} className="search-input">
                    <option value="">Todos los departamentos</option>
                    {departamentos.map((dep, index) => (
                        <option key={index} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
                <br />
                <select value={selectedCiudad} onChange={(e) => setSelectedCiudad(e.target.value)} className="search-input">
                    <option value="">Todas las ciudades</option>
                    {ciudades.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                <br />
                <input
                    type="date"
                    value={selectedFecha}
                    onChange={(e) => setSelectedFecha(e.target.value)}
                    className="search-input"
                />
                <br />
            </div>

            <div className="table-wrapper">
                <table className="datagrid">
                    <thead>
                        <tr>
                            <th>Departamento</th>
                            <th>Ciudad/Municipio</th>
                            <th>Predio</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRegions.length > 0 ? (
                            filteredRegions.map((region) => (
                                <tr key={region._id}>
                                    <td>{region.Departamento}</td>
                                    <td>{region.Ciudad_o_municipio}</td>
                                    <td>{region.Predio}</td>
                                    <td>{region.Fecha || "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Regiones;
