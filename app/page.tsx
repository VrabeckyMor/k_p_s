"use client"
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("https://10.0.0.68:5000", {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false, // pro self-signed certifikát
    });
    setSocket(s);

    s.on("new_message", (data) => {
      setMessages((prev) => [data.message, ...prev].slice(0, 5));
    });

    return () => s.disconnect();
  }, []);

  const handleSend = () => {
    if (socket && input.trim() !== "") {
      socket.emit("send_message", { message: input });
      setInput("");
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Zadej text"
      />
      <button onClick={handleSend}>Odeslat</button>
      {messages.map((msg, idx) => (
        <p key={idx}>- {msg}</p>
      ))}
    </div>
  );
}