"use client"
import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [message1, setMessage1] = useState<number | null>(null);
  const [message2, setMessage2] = useState<number | null>(null);
  const [message3, setMessage3] = useState<number | null>(null);
  const [message4, setMessage4] = useState<number | null>(null);
  const [message5, setMessage5] = useState<number | null>(null);

  const handleSend = async () => {
    const res = await fetch("https://10.0.0.68:5000/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setMessage5(message4);
    setMessage4(message3);
    setMessage3(message2);
    setMessage2(message1);
    setMessage1(data.message);
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Zadej text"
      />
      <button onClick={handleSend}>Odeslat</button>
      {message5 !== null && <p>- {message5}</p>}
      {message4 !== null && <p>- {message4}</p>}
      {message3 !== null && <p>- {message3}</p>}
      {message2 !== null && <p>- {message2}</p>}
      {message1 !== null && <p>- {message1}</p>}
    </div>
  );
}
