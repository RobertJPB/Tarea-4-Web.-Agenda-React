import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ListaContactos from "./components/ListaContactos";

const URL = "http://www.raydelto.org/agenda.php";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarContactos = async () => {
    try {
      setCargando(true);
      const response = await fetch(URL);
      const data = await response.json();
      setContactos(data);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarContactos(); }, []);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      backgroundColor: "#eef2ff",
      minHeight: "100vh", padding: "40px 20px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#6366f1", borderRadius: "30px",
            padding: "5px 16px", marginBottom: "14px",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "white", display: "inline-block",
            }}/>
            <span style={{ color: "white", fontSize: "12px", fontWeight: "600", letterSpacing: "0.05em" }}>
              Construido con React &nbsp;|&nbsp; Robert Plaza 2024-2174
            </span>
          </div>
          <h1 style={{
            color: "#1e1b4b", fontSize: "2.4rem", fontWeight: "800",
            margin: 0, letterSpacing: "-1px",
          }}>
            Agenda de <span style={{ color: "#6366f1" }}>Contactos</span>
          </h1>
          <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "14px" }}>
            {cargando ? "Cargando..." : `${contactos.length} contactos registrados`}
          </p>
        </div>

        <FormularioContacto onGuardar={cargarContactos} />
        <ListaContactos contactos={contactos} cargando={cargando} />

        {/* Firma */}
        <p style={{
          textAlign: "center", marginTop: "50px",
          color: "#a5b4fc", fontSize: "12px", fontStyle: "italic",
        }}>
          Construido en React &nbsp;|&nbsp; Robert Plaza 2024-2174
        </p>

      </div>
    </div>
  );
}