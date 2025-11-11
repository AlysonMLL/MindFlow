// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* dados iniciais (podem vir da API depois) */
const mockTrilhas = [
  { id: 1, title: "Fundamentos do Autocuidado", progress: 0, color: "#64b5f6" },
  { id: 2, title: "Meditação e Atenção Plena (Mindfulness)", progress: 0, color: "#81c784" },
  { id: 3, title: "Gestão de Estresse e Ansiedade", progress: 0, color: "#ba68c8" },
  { id: 4, title: "Saúde Física, Sono e Nutrição", progress: 0, color: "#ffb74d" },
  { id: 5, title: "Comunicação Não-Violenta e Relações", progress: 0, color: "#4db6ac" }
];

/* componente de barra de progresso simples */
function ProgressBar({ value = 0, color = "#3cffa1" }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div style={{ height: 10, background: "#e6e6e6", borderRadius: 6, overflow: "hidden" }} aria-hidden>
      <div
        style={{
          width: `${safe}%`,
          height: "100%",
          background: color,
          transition: "width 0.4s ease"
        }}
      />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  /* trilhas com persistência local */
  const [trilhas, setTrilhas] = useState(() => {
    try {
      const saved = localStorage.getItem("mf_trilhas_v1");
      return saved ? JSON.parse(saved) : mockTrilhas;
    } catch (e) {
      return mockTrilhas;
    }
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (!savedUser) {
      // se não estiver logado manda pro login
      navigate("/login", { replace: true });
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  /* salvar trilhas sempre que mudarem */
  useEffect(() => {
    localStorage.setItem("mf_trilhas_v1", JSON.stringify(trilhas));
  }, [trilhas]);

  /* helpers */
  function atualizarProgresso(id, delta) {
    setTrilhas(prev =>
      prev.map(t => (t.id === id ? { ...t, progress: Math.max(0, Math.min(100, t.progress + delta)) } : t))
    );
  }

  function abrirTrilha(id) {
  navigate(`/trilha/${id}`);
}

  function acaoRapida(kind) {
    // ações simuladas para o dashboard
    switch (kind) {
      case "meditacao":
        alert("Iniciando meditação guiada de 5 min (simulação) — em breve terá áudio real.");
        break;
      case "audios":
        alert("Abrindo biblioteca de áudios (simulação).");
        break;
      case "dormir":
        alert("Sessão Noturna iniciada (simulação) — boa noite!");
        break;
      case "relaxar":
        alert("Exercício de relaxamento rápido (simulação).");
        break;
      case "concentracao":
        alert("Trilha de concentração iniciada (simulação).");
        break;
      default:
        alert("Ação rápida: " + kind);
    }
  }

  /* estatísticas simples */
  const stats = useMemo(() => {
    const total = trilhas.length;
    const avg = Math.round(trilhas.reduce((s, t) => s + t.progress, 0) / (total || 1));
    const completed = trilhas.filter(t => t.progress >= 100).length;
    return { total, avg, completed };
  }, [trilhas]);

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        {/* COLUNA ESQUERDA - Trilhas */}
        <main style={styles.left}>
          <div style={styles.card}>
            <h1 style={styles.title}>Sua Trilha 🚀</h1>
            <p style={styles.subtitle}>
              Continue de onde parou, <strong>{user ? user.email : "Usuário"}</strong>.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {trilhas.map(trilha => (
                <div
                  key={trilha.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => abrirTrilha(trilha.id)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") abrirTrilha(trilha.id);
                  }}
                  className="trilhaItem"
                  style={styles.trilhaItem}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 700, color: "#333" }}>{`Trilha ${trilha.id}: ${trilha.title}`}</div>
                    <div style={{ fontSize: 13, color: "#777" }}>{trilha.progress}% completo</div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <ProgressBar value={trilha.progress} color={trilha.color} />
                  </div>

                  <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                    
                    
                    
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setTrilhas(prev => prev.map(t => (t.id === trilha.id ? { ...t, progress: 100 } : t)));
                      }}
                      style={styles.smallPrimary}
                      aria-label={`Marcar ${trilha.title} como concluída`}
                    >
                      Marcar concluída
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* COLUNA DIREITA - Dashboard / Quick actions */}
        <aside style={styles.right}>
          <div style={styles.card}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Painel Rápido</h3>

            {/* quick actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button style={styles.actionBtn} onClick={() => acaoRapida("meditacao")}>🧘‍♀️ Meditações</button>
              <button style={styles.actionBtn} onClick={() => acaoRapida("audios")}>🎧 Áudios</button>
              <button style={styles.actionBtn} onClick={() => acaoRapida("dormir")}>🌙 Dormir</button>
              <button style={styles.actionBtn} onClick={() => acaoRapida("relaxar")}>💤 Relaxar</button>
            </div>

            <hr style={{ margin: "18px 0", border: "none", borderTop: "1px solid #eee" }} />

            {/* recomendações */}
            <h4 style={{ margin: "0 0 8px 0" }}>Recomendações</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={styles.recItem}><strong>Foco Rápido</strong> — 5 min para retomar a atenção</li>
              <li style={styles.recItem}><strong>Relaxar antes de dormir</strong> — 10 min de visualização</li>
              <li style={styles.recItem}><strong>Técnica Pomodoro</strong> — sessão de estudo + pausa</li>
            </ul>

            <hr style={{ margin: "18px 0", border: "none", borderTop: "1px solid #eee" }} />

            {/* estatísticas */}
            <h4 style={{ margin: "0 0 8px 0" }}>Estatísticas</h4>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#666" }}>Progresso médio</div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{stats.avg}%</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#666" }}>Concluídas</div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{stats.completed}/{stats.total}</div>
              </div>
            </div>

            <hr style={{ margin: "18px 0", border: "none", borderTop: "1px solid #eee" }} />

            

            {/* perfil rápido */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#fff,#e6ffe9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {user ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{user ? user.email : "Usuário"}</div>
                <div style={{ fontSize: 13, color: "#666" }}>Plano: Freemium</div>
              </div>
            </div>
          </div>

          {/* sugestão: card menor com atalhos */}
          <div style={{ height: 18 }} />
          <div style={styles.cardSmall}>
            <div style={{ fontSize: 13, color: "#444", marginBottom: 8, fontWeight: 700 }}>Atalhos</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={styles.chip} onClick={() => acaoRapida("concentracao")}>Concentração</button>
              <button style={styles.chip} onClick={() => acaoRapida("respirar")}>Respiração</button>
              <button style={styles.chip} onClick={() => acaoRapida("alongar")}>Alongar</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* estilos inline organizados (você pode mover para styles.css se preferir) */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgba(60,255,161,0.12), rgba(141,245,255,0.08))",
    padding: "36px 20px",
    fontFamily: "Poppins, Inter, sans-serif",
  },
  wrapper: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: 28,
    alignItems: "start",
  },
  left: {
    width: "100%",
  },
  right: {
    width: "100%",
    position: "sticky",
    top: 90, // mantém o painel visível ao rolar
    alignSelf: "start",
  },
  card: {
    background: "#fff",
    padding: 28,
    borderRadius: 14,
    boxShadow: "0 10px 40px rgba(0,0,0,0.06)"
  },
  cardSmall: {
    background: "#fff",
    padding: 14,
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
  },
  title: { margin: 0, marginBottom: 6, fontSize: 28, color: "#333" },
  subtitle: { marginTop: 0, color: "#555", marginBottom: 18 },
  trilhaItem: {
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#fff",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
  },
  smallBtn: {
    background: "#3cffa1",
    color: "#163a34",
    border: "none",
    padding: "8px 10px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer"
  },
  smallPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer"
  },
  smallGhost: {
    background: "transparent",
    color: "#374151",
    border: "1px solid #e6e9ee",
    padding: "8px 10px",
    borderRadius: 10,
    cursor: "pointer"
  },
  actionBtn: {
    background: "#f7f7f7",
    border: "1px solid #eee",
    padding: "12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700
  },
  recItem: {
    background: "#fcfcfc",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #f0f0f0",
    fontSize: 14
  },
  chip: {
    background: "#f1fff7",
    border: "1px solid rgba(60,255,161,0.18)",
    color: "#2b7a63",
    padding: "6px 10px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13
  }
};

/* responsividade simples */
const mq = window.matchMedia && window.matchMedia("(max-width: 980px)");
if (mq && mq.matches) {
  styles.wrapper.gridTemplateColumns = "1fr";
  styles.right.position = "relative";
  styles.right.top = 0;
}
