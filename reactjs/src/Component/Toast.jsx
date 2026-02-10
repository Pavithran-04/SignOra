import { useEffect } from "react";

export default function Toast({ message, onClose, duration = 3000 }) {
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
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "500px",
        padding: "12px 20px",
        borderRadius: "8px",
        background: "#198754", // bootstrap success green
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        fontWeight: "600",
        textAlign: "center",
        animation: "slideDown 0.4s ease",
      }}
    >
      {message}
    </div>
  );
}
