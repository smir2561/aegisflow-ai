import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("Awaiting Research");
  const [result, setResult] = useState("");

  function runResearch() {
    if (!question.trim()) {
      setStatus("Enter a research question");
      setResult("Please enter a US stock or ETF research question.");
      return;
    }

    setStatus("Research Request Received");
    setResult(
      "AegisFlow received your research question. Live Bitget market retrieval is currently unavailable (Bitget MCP returned HTTP 503), so no market data is being fabricated."
    );
  }

  return (
    <div className="app">
      <header>
        <div>
          <h1>AegisFlow AI</h1>
          <p>Bitget-Powered US Stock & ETF AI Research Desk</p>
        </div>
        <div className="status">● PAPER MODE</div>
      </header>

      <main>
        <section className="hero">
          <div>
            <span className="label">AI TRADING DESK</span>
            <h2>Turn market questions into actionable research.</h2>
            <p>
              Ask a question → retrieve market data → generate signal →
              assess risk → make the final decision.
            </p>
          </div>

          <div className="query">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about a US stock or ETF..."
            />
            <button onClick={runResearch}>Run Research</button>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <span>MARKET DATA</span>
            <h3>Bitget MCP</h3>
            <p className="muted">US Stocks & ETFs</p>
            <div className="pill">CONNECTED</div>
          </div>

          <div className="card">
            <span>AI SIGNAL</span>
            <h3>{status}</h3>
            <p className="muted">
              {result || "Run a research question to generate a signal."}
            </p>
          </div>

          <div className="card">
            <span>RISK</span>
            <h3>Human Decision</h3>
            <p className="muted">
              AI assists. Trader makes the final decision.
            </p>
          </div>
        </section>

        {result && (
          <section className="result">
            <h3>Research Status</h3>
            <p>{result}</p>
          </section>
        )}

        <section className="workflow">
          <h2>Research Workflow</h2>
          <div className="steps">
            <div>01<br /><b>Question</b></div>
            <div>02<br /><b>Bitget Data</b></div>
            <div>03<br /><b>Context</b></div>
            <div>04<br /><b>Signal</b></div>
            <div>05<br /><b>Risk</b></div>
            <div>06<br /><b>Insight</b></div>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
