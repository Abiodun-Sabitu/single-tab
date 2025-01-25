import React from "react";

interface SingleTabModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  style?: React.CSSProperties; // Optional custom styles
}

const SingleTabModal: React.FC<SingleTabModalProps> = ({
  isOpen,
  content,
  style,
}) => {
  if (!isOpen) return null; // Modal won't render if not open

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        ...style,
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault(); // Block escape key functionality
        }
      }}
      tabIndex={-1} // Make it focusable for key events
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "90%", // Responsive width for smaller screens
          textAlign: "center",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default SingleTabModal;
