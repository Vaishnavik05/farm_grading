import React from "react";
import "./StatusBadge.css";
export default function StatusBadge({ status }) {
  const color = {
    GRADED: "green",
    APPROVED: "blue",
    REJECTED: "red",
    SUBMITTED: "orange",
    UNDER_INSPECTION: "purple",
    CREATED: "gray",
    COMPLETED: "teal",
    CANCELLED: "black",
    AVAILABLE: "green",
    LOW_STOCK: "orange",
    OUT_OF_STOCK: "red",
  }[status] || "gray";
  return (
    <span style={{ background: color, color: "#fff", padding: "2px 8px", borderRadius: 4 }}>
      {status}
    </span>
  );
}