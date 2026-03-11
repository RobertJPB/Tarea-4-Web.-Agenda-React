import { useState } from "react";

const URL = "http://www.raydelto.org/agenda.php";

export default function FormularioContacto({ onGuardar }) {
  const [nombre, setNombre]       = useState("");
  const [apellido, setApellido]   = useState("");
  const [telefono, setTelefono]   = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      alert("Debe completar todos los campos.");
      return;
    }
    try {
      setGuardando(true);
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, telefono }),
      });
      setNombre(""); setApellido(""); setTelefono("");
      onGuardar();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Ocurrio un error al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  const inputStyle = {
    flex: 1, border: "2px solid #e0e7ff", padding: "13px 16px",
    fontSize: "14px", outline: "none", minWidth: "140px",
    fontFamily: "'Inter', -apple-system, sans-serif",
    background: "white", color: "#1e1b4b",
    borderRadius: "10px", transition: "border 0.2s",
  };

  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "20px",
      marginBottom: "32px", boxShadow: "0 4px 20px rgba(99,102,241,0.1)",
      border: "1px solid #e0e7ff",
    }}>
      <p style={{
        color: "#6366f1", fontSize: "11px", fontWeight: "700",
        textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 14px 0",
      }}>
        Nuevo Contacto
      </p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input type="text" placeholder="Nombre" value={nombre}
          onChange={e => setNombre(e.target.value)} style={inputStyle}
          onFocus={e => e.target.style.borderColor = "#6366f1"}
          onBlur={e => e.target.style.borderColor = "#e0e7ff"}
        />
        <input type="text" placeholder="Apellido" value={apellido}
          onChange={e => setApellido(e.target.value)} style={inputStyle}
          onFocus={e => e.target.style.borderColor = "#6366f1"}
          onBlur={e => e.target.style.borderColor = "#e0e7ff"}
        />
        <input type="text" placeholder="Telefono" value={telefono}
          onChange={e => setTelefono(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleGuardar()}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "#6366f1"}
          onBlur={e => e.target.style.borderColor = "#e0e7ff"}
        />
        <button onClick={handleGuardar} disabled={guardando}
          style={{
            background: guardando ? "#a5b4fc" : "#6366f1", color: "white",
            border: "none", padding: "13px 28px", borderRadius: "10px",
            fontWeight: "700", cursor: guardando ? "not-allowed" : "pointer",
            fontSize: "14px", fontFamily: "'Inter', -apple-system, sans-serif",
            transition: "background 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { if (!guardando) e.currentTarget.style.background = "#4f46e5"; }}
          onMouseLeave={e => { if (!guardando) e.currentTarget.style.background = "#6366f1"; }}
        >
          {guardando ? "Guardando..." : "+ Guardar"}
        </button>
      </div>
    </div>
  );
}