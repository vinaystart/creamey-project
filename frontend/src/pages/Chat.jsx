import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { text: input, sender: "user" }];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: input })
    });

    const data = await res.json();

    let aiResponse = "No response";

    if (data.success && data.answer) {
      aiResponse = data.answer;
    } else if (data.error) {
      aiResponse = data.error;
    }

    setMessages([
      ...newMessages,
      { text: aiResponse, sender: "ai" }
    ]);

  } catch (error) {
    setMessages([
      ...newMessages,
      { text: "Server error", sender: "ai" }
    ]);
  }

  setLoading(false);
};


  // Press Enter to Send
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">
        Creamery AI Intelligence
      </h2>

      <div
        className="border rounded p-3 mb-3"
        style={{
          minHeight: "350px",
          background: "#f8f9fa",
          overflowY: "auto"
        }}
      >
        {messages.length === 0 && (
          <p className="text-muted">
            Ask about products, revenue, orders, customers...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0"
            }}
          >
            <span
              style={{
                background:
                  msg.sender === "user" ? "#007bff" : "#e9ecef",
                color:
                  msg.sender === "user" ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                display: "inline-block",
                maxWidth: "75%"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-muted">AI is thinking...</p>
        )}
      </div>

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
