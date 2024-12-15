import React, { useState } from "react";

const OtherData = ({ user }) => {
  const [showMore, setShowMore] = useState(false);

  const handleMouseEnter = () => setShowMore(true);
  const handleMouseLeave = () => setShowMore(false);

  return (
    <div
      className="other-data"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "300px",
        cursor: "pointer",
      }}
    >
      {" "}
      <h4>Other Data</h4>
      {showMore && (
        <div style={{ marginTop: "10px", color: "#555" }}>
          <p>
            <strong>Street:</strong>{" "}
            <input placeholder={user?.address?.street || "N/A"} type="text" />
          </p>
          <p>
            <strong>city:</strong>{" "}
            <input placeholder={user?.address?.city || "N/A"} type="text" />
          </p>
          <p>
            <strong>zip Code:</strong>{" "}
            <input placeholder={user?.address?.zipcode || "N/A"} type="text" />
          </p>
        </div>
      )}
    </div>
  );
};

export default OtherData;
