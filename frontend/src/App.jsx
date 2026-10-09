
import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      alert("Please enter a website URL.");
      return;
    }

    let websiteUrl = url.trim();

    if (!/^https?:\/\//i.test(websiteUrl)) {
      websiteUrl = "https://" + websiteUrl;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url: websiteUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail
            ? JSON.stringify(data.detail)
            : "Website analysis failed."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to SentinelAI backend. Make sure it is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const score = result?.risk_score ?? 0;

  const riskLevel =
    score >= 60 ? "High Risk" :
    score >= 30 ? "Medium Risk" :
    "Low Risk";

  return (
    <div className="app">
      <header className="header">
        <h1>🛡️ SentinelAI</h1>
        <p>AI-Powered E-Commerce Website Risk Analysis</p>
      </header>

      <main className="dashboard">
        <section className="analyzer">
          <h2>Analyze a Website</h2>
          <p>Enter a website URL to check its basic technical indicators.</p>

          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") analyzeWebsite();
              }}
              placeholder="https://example.com"
            />

            <button onClick={analyzeWebsite} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Website"}
            </button>
          </div>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </section>

        {loading && <p>Checking website indicators...</p>}

        {result && (
          <>
            <section className="risk-card">
              <h2>Analysis Results</h2>
              <p className="website-url">{result.url}</p>

              <div className="score">
                {result.risk_score}
                <span> / 100</span>
              </div>

              <h3>{riskLevel}</h3>
              <p>
                This score reflects the basic technical checks currently
                implemented in SentinelAI.
              </p>
            </section>

            <section className="details">
              <h2>Website Details</h2>

              <p>
                <strong>Domain:</strong> {result.domain}
              </p>
              <p>
                <strong>HTTPS:</strong>{" "}
                {result.https ? "Enabled" : "Not detected"}
              </p>
              <p>
                <strong>Reachable:</strong>{" "}
                {result.reachable ? "Yes" : "No"}
              </p>
              <p>
                <strong>URL length:</strong> {result.url_length}
              </p>
              <p>
                <strong>Suspicious URL indicators:</strong>{" "}
                {result.suspicious_url ? "Detected" : "Not detected"}
              </p>
            </section>

            <section className="details">
              <h2>Reasons</h2>

              {result.reasons.length > 0 ? (
                <ul>
                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              ) : (
                <p>No warning indicators were found by these basic checks.</p>
              )}
            </section>

            <p className="disclaimer">
              SentinelAI's current analysis is preliminary. A low score does
              not guarantee that a website is legitimate or safe.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
