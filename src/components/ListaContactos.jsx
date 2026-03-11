export default function ListaContactos({ contactos, cargando }) {
  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{
          width: "40px", height: "40px",
          border: "3px solid #e0e7ff", borderTop: "3px solid #6366f1",
          borderRadius: "50%", margin: "0 auto 16px",
          animation: "spin 0.8s linear infinite",
        }}/>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Cargando contactos...</p>
      </div>
    );
  }

  if (contactos.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#6b7280", marginTop: "40px" }}>
        No hay contactos aun.
      </p>
    );
  }

  const colores = [
    "#6366f1","#8b5cf6","#ec4899","#f59e0b",
    "#10b981","#3b82f6","#ef4444","#14b8a6",
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "16px",
    }}>
      {contactos.map((c, index) => {
        const color = colores[index % colores.length];
        const iniciales = `${c.nombre?.[0] ?? ""}${c.apellido?.[0] ?? ""}`.toUpperCase();

        return (
          <div key={index} style={{
            background: "white", borderRadius: "14px", padding: "18px",
            border: "1px solid #e0e7ff",
            boxShadow: "0 2px 8px rgba(99,102,241,0.07)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${color}33`;
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.07)";
              e.currentTarget.style.borderColor = "#e0e7ff";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "46px", height: "46px", borderRadius: "12px",
                background: `${color}18`, border: `1.5px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "15px", fontWeight: "700", color: color, flexShrink: 0,
              }}>
                {iniciales}
              </div>
              <div>
                <div style={{ color: "#1e1b4b", fontWeight: "700", fontSize: "15px", marginBottom: "4px" }}>
                  {c.nombre} {c.apellido}
                </div>
                <div style={{ color: "#6b7280", fontSize: "13px" }}>
                  {c.telefono}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}