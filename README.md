# SentinelAI — Intelligent Detection of Fraudulent E-Commerce Websites

## Overview

SentinelAI is a project that aims to identify potentially fraudulent e-commerce websites by analyzing website URLs and basic technical indicators. It provides a preliminary risk score and explains which indicators contributed to that score.

The current prototype includes a FastAPI backend and a React-based web dashboard.

## Problem Statement

Fraudulent e-commerce websites and brand-impersonation pages can mislead users into sharing personal information or making payments to untrustworthy sellers. Users may have difficulty identifying suspicious websites before interacting with them.

SentinelAI aims to help users assess potential website risks through an accessible interface that presents a risk score and supporting indicators.

## Objectives

* Analyze website URLs and basic technical indicators.
* Check whether a website uses HTTPS.
* Identify unusually long URLs and selected suspicious keywords.
* Check whether a website is reachable.
* Calculate a preliminary risk score.
* Display the analysis results and warning reasons through a web dashboard.
* Provide a foundation for future multi-agent fraud detection capabilities.

## Technology Stack

**Backend**

* Python
* FastAPI
* Uvicorn
* Requests

**Frontend**

* React
* JavaScript
* Vite
* CSS

## Current Features

* Website URL input through a web dashboard.
* HTTPS indicator check.
* URL length analysis.
* Detection of selected suspicious URL keywords.
* Website reachability check.
* Risk score ranging from 0 to 100.
* Display of risk indicators and reasons.
* Preliminary risk-level classification.

## Project Structure

```text
SentinelAI/
├── backend/
│   ├── agents/
│   │   └── website_agent.py
│   ├── main.py
│   ├── requirements.txt
│   └── test_agent.py
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── index.html
├── browser-extension/
├── data/
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

* Python 3
* Node.js and npm
* Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd SentinelAI
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of your GitHub repository.

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend should be available at:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 3. Set up the frontend

Open a second Terminal window and navigate to the project directory:

```bash
cd /Users/alangeorge/SentinelAI/frontend
npm install
npm run dev
```

Open the local address displayed by Vite in the Terminal.

## API Endpoints

| Method | Endpoint   | Purpose                           |
| ------ | ---------- | --------------------------------- |
| GET    | `/`        | Check the backend welcome message |
| GET    | `/health`  | Check backend health              |
| POST   | `/analyze` | Analyze a website URL             |

The analysis endpoint accepts a URL and returns information such as the domain, HTTPS status, reachability, URL length, suspicious URL indicators, risk score, and reasons.

## Limitations

The current prototype uses rule-based checks. It does not yet establish whether a website is genuinely fraudulent, and HTTPS alone does not guarantee that a website is trustworthy. A low risk score must not be interpreted as proof that a website is safe.

## Future Enhancements

* Independent agents for URL analysis, domain intelligence, and brand impersonation detection.
* Improved domain and website reputation checks.
* Detection of suspicious e-commerce page content.
* Integration of machine-learning-based risk assessment.
* Browser-extension integration and user warnings.
* Evaluation using verified legitimate and fraudulent website datasets.

## Disclaimer

SentinelAI is an educational project and provides preliminary website risk indicators. It is not a guarantee of website legitimacy or security.

## Project Status

The backend API and basic web dashboard have been implemented. Additional detection capabilities and planned multi-agent features will be developed incrementally.
