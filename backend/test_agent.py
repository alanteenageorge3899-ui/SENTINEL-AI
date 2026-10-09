from agents.website_agent import analyze_website


url = "https://example.com"

result = analyze_website(url)

print("\n===== SENTINELAI WEBSITE ANALYSIS =====")
print("URL:", result["url"])
print("Domain:", result["domain"])
print("HTTPS:", result["https"])
print("Reachable:", result["reachable"])
print("URL Length:", result["url_length"])
print("Suspicious URL:", result["suspicious_url"])
print("Risk Score:", result["risk_score"])

print("\nReasons:")

if result["reasons"]:
    for reason in result["reasons"]:
        print("-", reason)
else:
    print("- No technical risk indicators detected.")