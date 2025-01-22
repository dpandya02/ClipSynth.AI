import React, { useState } from "react";

function CounterButton() {
  const [message, setMessage] = useState("");

  const handleIncrement = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/increment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to increment counter");
      }

      const data = await response.json();
      setMessage(`Counter value: ${data.counter}`); // Assumes the API returns the updated counter value
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while incrementing the counter.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Increment Counter</h1>
      <button onClick={handleIncrement} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Increment
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CounterButton;
