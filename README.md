# LEP Community Intelligence Platform

Enterprise Analytics for Language Access & Health Equity

## Overview

A comprehensive intelligence platform for monitoring and analyzing Limited English Proficiency (LEP) population health, language access compliance, and community health equity across a multi-state healthcare system (IL, WI, NC, SC, GA, AL).

## Features

### 🌍 Demand Intelligence
- **Global Displacement Alerts** - UNHCR-sourced data on refugee movements affecting service areas
- **Regional Population Intelligence** - Census-verified LEP population data with drill-down capabilities
- **Social Determinants of Health** - LEP vs general population disparity tracking
- **Deaf & Hard of Hearing Analytics** - Accessibility service demand monitoring

### 📊 Risk Assessment
- **Geographic Risk Assessment** - State-by-state compliance scoring with micro-location analysis
- **Cultural Community Intelligence** - Population-specific health considerations and service gaps
- **Political & Regulatory Monitoring** - Real-time tracking of legislation and regulatory changes

### 🤖 AI-Powered Analysis
- **6 Specialized AI Agents** - Political Monitor, Demographic Scanner, Social Sentiment Analyzer, Cultural Trend Tracker, Economic Impact Calculator, Compliance Risk Assessor
- **Global Intelligence Feed** - Curated news, legislation, best practices, and regulatory updates
- **Automated Action Planning** - Prioritized recommendations with risk assessment

### 🔔 Notifications & Alerts
- Real-time notification system for critical alerts
- Severity-coded intelligence items
- Task and assignment management

## Data Sources

- **US Census Bureau** - American Community Survey 5-Year Estimates (2019-2023)
- **UNHCR** - Global displacement and refugee data
- **HHS Office for Civil Rights** - Section 1557 compliance guidance
- **Joint Commission** - National Patient Safety Goals
- **Gallaudet Research Institute** - Deaf population data
- **HLAA** - Hearing Loss Association of America statistics
- **State Dept WRAPS** - Refugee resettlement projections

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lep-community-intelligence-platform.git

# Navigate to project directory
cd lep-community-intelligence-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
# Deploy contents of `dist` folder to your hosting provider
```

## Project Structure

```
lep-community-intelligence-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## License

Proprietary - Advocate Health Enterprise Language Services

## Contact

Enterprise Language Services  
Advocate Health  
IL • WI • NC • SC • GA • AL
