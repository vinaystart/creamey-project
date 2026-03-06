import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });

      const data = await res.json();

      const aiMessage = {
        text: data.answer || data.error || "No response",
        sender: "ai"
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { text: "Server error ❌", sender: "ai" }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const suggestions = [
    "Business summary",
    "How many products are there?",
    "Total revenue",
    "About Dairy Daily"
  ];

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "linear-gradient(135deg, #007bff, #00c6ff)",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          zIndex: 9999
        }}
      >
        🤖
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "360px",
            height: "500px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "15px",
              background: "linear-gradient(135deg, #007bff, #00c6ff)",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Dairy Daily AI Assistant
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              background: "#f8f9fa"
            }}
          >
            {messages.length === 0 && (
              <div style={{ fontSize: "14px", color: "#666" }}>
                👋 Welcome to Dairy Daily!  
                <br />
                Ask me about business insights.
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px"
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user"
                        ? "#007bff"
                        : "#e9ecef",
                    color:
                      msg.sender === "user"
                        ? "#fff"
                        : "#000",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                    maxWidth: "80%",
                    fontSize: "14px"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <div style={{ fontSize: "13px", color: "#888" }}>
                AI is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div style={{ padding: "10px" }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                style={{
                  fontSize: "12px",
                  margin: "3px",
                  padding: "5px 8px",
                  borderRadius: "12px",
                  border: "1px solid #007bff",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #eee"
            }}
          >
            <input
              type="text"
              placeholder="Ask Dairy Daily AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                borderRadius: "20px",
                border: "1px solid #ccc",
                padding: "8px 12px",
                outline: "none"
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginLeft: "8px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "8px 15px",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
