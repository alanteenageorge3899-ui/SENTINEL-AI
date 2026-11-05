import requests
from urllib.parse import urlparse


def analyze_website(url: str):
    result = {
        "url": url,
        "https": False,
        "reachable": False,
        "url_length": len(url),
        "suspicious_url": False,
        "risk_score": 0,
        "reasons": []
    }

    # Check HTTPS
    if url.startswith("https://"):
        result["https"] = True
    else:
        result["risk_score"] += 20
        result["reasons"].append(
            "Website does not use HTTPS."
        )

    # Check URL length
    if len(url) > 75:
        result["risk_score"] += 10
        result["suspicious_url"] = True
        result["reasons"].append(
            "URL is unusually long."
        )

    # Check suspicious words
    suspicious_words = [
        "login",
        "verify",
        "secure",
        "account",
        "update",
        "payment",
        "free",
        "offer",
        "discount"
    ]

    url_lower = url.lower()

    found_words = [
        word for word in suspicious_words
        if word in url_lower
    ]

    if found_words:
        result["risk_score"] += 10
        result["suspicious_url"] = True
        result["reasons"].append(
            "Suspicious keywords found in URL: "
            + ", ".join(found_words)
        )

    # Check whether website is reachable
    try:
        response = requests.get(
            url,
            timeout=10,
            allow_redirects=True
        )

        if response.status_code < 400:
            result["reachable"] = True
        else:
            result["risk_score"] += 20
            result["reasons"].append(
                f"Website returned HTTP status {response.status_code}."
            )

    except requests.RequestException:
        result["risk_score"] += 25
        result["reasons"].append(
            "Website could not be reached."
        )

    # Extract domain
    parsed_url = urlparse(url)
    result["domain"] = parsed_url.netloc

    # Keep score within 0–100
    result["risk_score"] = min(
        result["risk_score"],
        100
    )

    return result