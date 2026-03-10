import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",     // ✅ ONLY CHANGE (now sticky)
        top: "12px",
        left: "50%",
        marginTop: "40px",
        marginLeft: "100px",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "500px",
        padding: "12px 20px",
        borderRadius: "8px",
        background: type === "error" ? "#dc3545" : "#198754",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
