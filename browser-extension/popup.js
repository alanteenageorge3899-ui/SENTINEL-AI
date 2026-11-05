const websiteElement = document.getElementById("website");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultElement = document.getElementById("result");

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tabs[0];
}

async function loadWebsite() {
  try {
    const tab = await getCurrentTab();
    websiteElement.textContent = tab?.url || "Website URL unavailable";
  } catch (error) {
    websiteElement.textContent = "Unable to read website URL";
    console.error(error);
  }
}

analyzeBtn.addEventListener("click", async () => {
  analyzeBtn.disabled = true;
  resultElement.textContent = "Analyzing website... Please wait.";

  try {
    const tab = await getCurrentTab();

    if (!tab?.url) {
      throw new Error("Could not get the current website URL.");
    }

    const parsedUrl = new URL(tab.url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Please open a normal HTTP or HTTPS website.");
    }

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: tab.url })
    });

    if (!response.ok) {
      throw new Error("Backend returned status " + response.status);
    }

    const data = await response.json();

    resultElement.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = "Risk Score: " + data.risk_score + "/100";
    resultElement.appendChild(heading);

    const status = document.createElement("p");

    if (data.risk_score >= 50) {
      status.textContent = "⚠️ High risk: Be careful with this website.";
    } else if (data.risk_score >= 20) {
      status.textContent = "⚠️ Caution: Suspicious indicators detected.";
    } else {
      status.textContent = "✅ Low detected risk: No major indicators found.";
    }

    resultElement.appendChild(status);

    const reasons = document.createElement("p");
    reasons.textContent =
      Array.isArray(data.reasons) && data.reasons.length > 0
        ? "Reasons: " + data.reasons.join(", ")
        : "Reasons: No technical risk indicators detected.";

    resultElement.appendChild(reasons);

  } catch (error) {
    resultElement.textContent = "Analysis failed: " + error.message;
    console.error("SentinelAI analysis error:", error);
  } finally {
    analyzeBtn.disabled = false;
  }
});

loadWebsite();
