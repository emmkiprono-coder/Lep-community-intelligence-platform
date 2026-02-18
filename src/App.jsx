// LEP Community Intelligence Platform
// Enterprise Analytics for Language Access & Health Equity
// Tracks: Political, Geographic, Social, Cultural, Economic dimensions
// Real-time monitoring of legislation, regulations, and best practices

import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Globe, Users, Building2, Scale, Heart, Brain, Zap, RefreshCw, Search, Bell, Filter, ChevronRight, MapPin, DollarSign, Vote, BookOpen, Shield, Activity, Eye, Clock, CheckCircle, XCircle, AlertCircle, Newspaper, Lightbulb, Gavel, FileText, Radio, ExternalLink, Bookmark, Share2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

// Simulated real-time data feeds
const generateTimeSeriesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    workforce: 65 + Math.random() * 20 + i * 0.5,
    leadership: 45 + Math.random() * 15 + i * 0.8,
    suppliers: 30 + Math.random() * 25 + i * 0.3,
    community: 70 + Math.random() * 15 + i * 0.4,
  }));
};

// Enhanced State Risk Assessment Data with drill-down intelligence
const stateRiskAssessment = {
  IL: {
    score: 82, risk: 'low', population: '1.15M LEP (9%)', trend: 'up',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'adequate', detail: '85 FTE Spanish interpreters serving 892K Spanish LEP population', impact: 'low' },
      { factor: 'Policy Environment', status: 'favorable', detail: 'IL Language Access Act provides strong protections; no adverse legislation pending', impact: 'low' },
      { factor: 'Refugee Resettlement', status: 'elevated', detail: 'Chicago designated for 4,200 Afghan SIV arrivals in 2026; Haitian TPS holders increasing', impact: 'medium' },
      { factor: 'Healthcare Facility Coverage', status: 'good', detail: '92% of facilities have 24/7 language access; rural gaps in Polish/Ukrainian', impact: 'low' }
    ],
    considerations: [
      'Monitor Chicago sanctuary city policies for potential federal funding implications',
      'Polish interpreter capacity stable but aging workforce - succession planning needed',
      'Ukrainian community growing 23% YoY - proactive hiring recommended'
    ],
    microLocations: [
      { area: 'Chicago Metro', lepPop: 812000, coverage: 'High', gaps: ['Haitian Creole', 'Ukrainian'] },
      { area: 'Aurora/Elgin', lepPop: 125000, coverage: 'Medium', gaps: ['Arabic', 'Urdu'] },
      { area: 'Rockford', lepPop: 45000, coverage: 'Medium', gaps: ['Burmese', 'Karen'] },
      { area: 'Champaign-Urbana', lepPop: 28000, coverage: 'Low', gaps: ['Chinese', 'Korean'] }
    ]
  },
  WI: {
    score: 78, risk: 'low', population: '265K LEP (4.5%)', trend: 'stable',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'adequate', detail: 'Strong Hmong interpreter network; Somali capacity building', impact: 'low' },
      { factor: 'Policy Environment', status: 'neutral', detail: 'No state language access mandate; relies on federal requirements', impact: 'medium' },
      { factor: 'Refugee Resettlement', status: 'stable', detail: 'Madison and Milwaukee receiving steady Afghan/Congolese arrivals', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'good', detail: '88% facility coverage; rural western WI has gaps', impact: 'low' }
    ],
    considerations: [
      'Hmong community well-established with strong interpreter pipeline',
      'Somali population growing in Milwaukee - prioritize recruitment',
      'Rural health systems rely heavily on VRI - technology upgrades needed'
    ],
    microLocations: [
      { area: 'Milwaukee Metro', lepPop: 142000, coverage: 'High', gaps: ['Somali', 'Burmese'] },
      { area: 'Madison', lepPop: 48000, coverage: 'High', gaps: ['Arabic'] },
      { area: 'Green Bay', lepPop: 32000, coverage: 'Medium', gaps: ['Hmong', 'Spanish'] },
      { area: 'Wausau', lepPop: 18000, coverage: 'Low', gaps: ['Hmong', 'Somali'] }
    ]
  },
  NC: {
    score: 71, risk: 'medium', population: '626K LEP (6%)', trend: 'up',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'strained', detail: 'Spanish interpreter ratio 1:8,200 LEP vs target 1:6,000', impact: 'medium' },
      { factor: 'Policy Environment', status: 'uncertain', detail: 'HB 237 could change interpreter certification requirements', impact: 'high' },
      { factor: 'Refugee Resettlement', status: 'elevated', detail: 'Charlotte receiving Venezuelan asylum seekers; Burmese community growing in Greensboro', impact: 'medium' },
      { factor: 'Healthcare Facility Coverage', status: 'adequate', detail: '84% coverage but rapid population growth outpacing capacity', impact: 'medium' }
    ],
    considerations: [
      'HB 237 monitoring critical - may require additional certifications for medical interpreters',
      'Charlotte metro LEP growth rate 8.2% YoY - fastest in footprint',
      'Vietnamese community concentrated in Raleigh-Durham - stable but underserved'
    ],
    microLocations: [
      { area: 'Charlotte Metro', lepPop: 285000, coverage: 'Medium', gaps: ['Spanish capacity', 'Haitian Creole'] },
      { area: 'Raleigh-Durham', lepPop: 165000, coverage: 'Medium', gaps: ['Vietnamese', 'Chinese'] },
      { area: 'Greensboro-Winston', lepPop: 98000, coverage: 'Low', gaps: ['Burmese', 'Karen', 'Arabic'] },
      { area: 'Fayetteville', lepPop: 42000, coverage: 'Low', gaps: ['Spanish', 'Korean'] }
    ]
  },
  SC: {
    score: 65, risk: 'medium', population: '256K LEP (5%)', trend: 'watch',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'limited', detail: 'Heavy reliance on vendor services (42% of encounters)', impact: 'high' },
      { factor: 'Policy Environment', status: 'challenging', detail: 'No state language access protections; federal compliance only', impact: 'medium' },
      { factor: 'Refugee Resettlement', status: 'moderate', detail: 'Smaller resettlement volumes but growing Venezuelan population', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'limited', detail: '72% coverage; Upstate SC significantly underserved', impact: 'high' }
    ],
    considerations: [
      'Internal interpreter hiring should be priority to reduce vendor dependency',
      'Coastal tourism areas have seasonal demand spikes - capacity planning needed',
      'Greenville-Spartanburg manufacturing sector attracting diverse workforce'
    ],
    microLocations: [
      { area: 'Charleston Metro', lepPop: 85000, coverage: 'Medium', gaps: ['Spanish', 'Vietnamese'] },
      { area: 'Columbia', lepPop: 62000, coverage: 'Medium', gaps: ['Spanish', 'Chinese'] },
      { area: 'Greenville-Spartanburg', lepPop: 78000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese', 'French'] },
      { area: 'Myrtle Beach', lepPop: 24000, coverage: 'Low', gaps: ['Spanish', 'Russian'] }
    ]
  },
  GA: {
    score: 68, risk: 'medium', population: '750K LEP (7%)', trend: 'up',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'strained', detail: 'Korean and Vietnamese capacity gaps in metro Atlanta', impact: 'medium' },
      { factor: 'Policy Environment', status: 'supportive', detail: 'Senate resolution on healthcare equity under consideration - potential funding', impact: 'low' },
      { factor: 'Refugee Resettlement', status: 'high', detail: 'Atlanta is top 10 resettlement city; Afghan, Congolese, and Ethiopian arrivals increasing', impact: 'high' },
      { factor: 'Healthcare Facility Coverage', status: 'adequate', detail: '81% coverage but Atlanta metro demand exceeds capacity', impact: 'medium' }
    ],
    considerations: [
      'Clarkston "most diverse square mile in America" - requires 50+ language capacity',
      'Korean community well-established but interpreter workforce aging',
      'Ethiopian/Eritrean community growing 18% YoY - Amharic/Tigrinya priority'
    ],
    microLocations: [
      { area: 'Atlanta Metro', lepPop: 525000, coverage: 'Medium', gaps: ['Korean', 'Vietnamese', 'Amharic'] },
      { area: 'Clarkston/Decatur', lepPop: 45000, coverage: 'Low', gaps: ['50+ languages - critical diversity hub'] },
      { area: 'Savannah', lepPop: 38000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese'] },
      { area: 'Augusta', lepPop: 28000, coverage: 'Low', gaps: ['Spanish', 'Korean'] }
    ]
  },
  AL: {
    score: 62, risk: 'high', population: '202K LEP (4%)', trend: 'watch',
    source: 'US Census Bureau ACS 2023 5-Year Estimates',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    confidence: 'High',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'critical', detail: 'Only 4 staff interpreters; 68% vendor dependency', impact: 'high' },
      { factor: 'Policy Environment', status: 'restrictive', detail: 'English-only legislation history; limited state support', impact: 'high' },
      { factor: 'Refugee Resettlement', status: 'low', detail: 'Minimal resettlement but agricultural sector attracting migrant workers', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'poor', detail: '58% coverage; heavy VRI/OPI reliance across all markets', impact: 'high' }
    ],
    considerations: [
      'Workforce development should be top priority - internal hiring critical',
      'HB 56 legacy creates community trust challenges - outreach needed',
      'Poultry processing corridor (Albertville-Gadsden) has concentrated Spanish LEP population'
    ],
    microLocations: [
      { area: 'Birmingham Metro', lepPop: 72000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese', 'Chinese'] },
      { area: 'Huntsville', lepPop: 45000, coverage: 'Low', gaps: ['Spanish', 'Korean', 'Arabic'] },
      { area: 'Mobile', lepPop: 32000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese'] },
      { area: 'Albertville-Gadsden', lepPop: 28000, coverage: 'Critical', gaps: ['Spanish - primary need'] }
    ]
  }
};

// Enhanced Cultural Community Intelligence with drill-down
const culturalIntelligence = {
  'Hispanic/Latino': {
    growth: '+12%', languages: ['Spanish', 'Portuguese'], facilities: 45, satisfaction: 87, 
    needs: 'Extended hours interpretation',
    source: 'Census Bureau Hispanic Origin Data + Internal Patient Surveys',
    dataAge: 'Q4 2024',
    population: { total: 2850000, lepSubset: 1420000 },
    demographics: {
      ageBreakdown: { under18: '28%', '18-44': '45%', '45-64': '18%', '65plus': '9%' },
      primaryOrigins: ['Mexico (62%)', 'Puerto Rico (12%)', 'Guatemala (8%)', 'El Salvador (6%)', 'Honduras (5%)']
    },
    healthConsiderations: [
      'Higher diabetes prevalence (12.5% vs 7.5% general) - chronic care interpretation critical',
      'Lower health insurance rates (18% uninsured) - navigation assistance needed',
      'Cultural preference for family involvement in care decisions',
      'Curanderismo practices may coexist with Western medicine'
    ],
    serviceGaps: [
      { gap: 'After-hours coverage', severity: 'high', detail: 'Only 45% of facilities have Spanish interpreters after 6pm' },
      { gap: 'Pediatric specialists', severity: 'medium', detail: 'Wait times for interpreted pediatric visits 3x longer' },
      { gap: 'Mental health services', severity: 'high', detail: 'Stigma + limited Spanish-speaking providers = significant gap' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Mexican and Puerto Rican communities have different dialectal preferences' },
      { region: 'NC - Charlotte', insight: 'Central American population growing faster than Mexican - Guatemalan Maya languages emerging' },
      { region: 'GA - Atlanta', insight: 'Venezuelan asylum seekers bringing acute mental health needs' }
    ]
  },
  'Asian/Pacific Islander': {
    growth: '+8%', languages: ['Vietnamese', 'Mandarin', 'Cantonese', 'Tagalog', 'Korean', 'Hindi'], facilities: 38, satisfaction: 82,
    needs: 'Written translation materials',
    source: 'Census Bureau Asian Population Data + Community Health Assessments',
    dataAge: 'Q4 2024',
    population: { total: 1250000, lepSubset: 485000 },
    demographics: {
      ageBreakdown: { under18: '22%', '18-44': '42%', '45-64': '24%', '65plus': '12%' },
      primaryOrigins: ['Chinese (28%)', 'Vietnamese (22%)', 'Indian (18%)', 'Korean (12%)', 'Filipino (10%)']
    },
    healthConsiderations: [
      'Hepatitis B prevalence in Chinese/Vietnamese communities - screening important',
      'Thalassemia screening relevant for Southeast Asian populations',
      'Traditional medicine integration common - herbalist/acupuncture alongside Western care',
      'Strong emphasis on family honor - mental health stigma significant'
    ],
    serviceGaps: [
      { gap: 'Written materials', severity: 'high', detail: 'Only 35% of patient education available in top 5 Asian languages' },
      { gap: 'Interpreter diversity', severity: 'medium', detail: 'Mandarin well-covered but Cantonese, Fujianese dialects underserved' },
      { gap: 'Elder care', severity: 'high', detail: 'Aging first-generation immigrants need geriatric-specialized interpreters' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Chinatown community prefers Cantonese; suburban communities are Mandarin-dominant' },
      { region: 'GA - Atlanta', insight: 'Korean community in Duluth/Gwinnett highly organized - leverage community health workers' },
      { region: 'NC - Raleigh', insight: 'Vietnamese nail salon workers have unique occupational health needs' }
    ]
  },
  'African Immigrant': {
    growth: '+15%', languages: ['Swahili', 'Amharic', 'Tigrinya', 'French', 'Arabic', 'Somali', 'Oromo'], facilities: 28, satisfaction: 79,
    needs: 'Cultural competency training',
    source: 'American Community Survey + Refugee Resettlement Agency Data',
    dataAge: 'Q3 2024',
    population: { total: 420000, lepSubset: 285000 },
    demographics: {
      ageBreakdown: { under18: '32%', '18-44': '48%', '45-64': '15%', '65plus': '5%' },
      primaryOrigins: ['Ethiopia (25%)', 'Nigeria (18%)', 'Somalia (15%)', 'DR Congo (12%)', 'Eritrea (10%)']
    },
    healthConsiderations: [
      'Refugee trauma histories common - trauma-informed care essential',
      'Sickle cell screening important for West African populations',
      'FGM-related health needs in Somali/Ethiopian communities',
      'Infectious disease screening for recent arrivals (TB, parasites)'
    ],
    serviceGaps: [
      { gap: 'Interpreter availability', severity: 'critical', detail: 'Tigrinya and Oromo interpreters extremely scarce' },
      { gap: 'Cultural training', severity: 'high', detail: 'Staff unfamiliar with naming conventions, religious practices, gender norms' },
      { gap: 'Trust building', severity: 'high', detail: 'Historical medical trauma (Tuskegee legacy) affects healthcare engagement' }
    ],
    microInsights: [
      { region: 'GA - Clarkston', insight: 'Highest concentration of African refugees in Southeast - needs dedicated team' },
      { region: 'IL - Chicago', insight: 'Ethiopian community in Uptown; Congolese in Rogers Park - different languages' },
      { region: 'WI - Milwaukee', insight: 'Somali Bantu community has unique dialect needs distinct from standard Somali' }
    ]
  },
  'Deaf/Hard of Hearing': {
    growth: '+3%', languages: ['ASL', 'Tactile ASL', 'ProTactile'], facilities: 52, satisfaction: 91,
    needs: 'VRI technology upgrades',
    source: 'Gallaudet Research Institute + HLAA National Data',
    dataAge: 'Q4 2024',
    population: { total: 4540000, deafSigners: 285000, hardOfHearing: 4120000, deafBlind: 16000 },
    demographics: {
      ageBreakdown: { under18: '8%', '18-44': '22%', '45-64': '28%', '65plus': '42%' },
      communicationModes: ['ASL primary (45%)', 'Oral/Lipreading (35%)', 'Mixed methods (15%)', 'DeafBlind tactile (5%)']
    },
    healthConsiderations: [
      'Visual access to interpreter REQUIRED - phone interpretation impossible',
      'Many Deaf individuals have limited English literacy - simplified written materials needed',
      'DeafBlind patients require specialized tactile interpreters with extended appointment times',
      'CDIs (Certified Deaf Interpreters) needed for complex concepts or Deaf individuals with additional disabilities'
    ],
    serviceGaps: [
      { gap: 'VRI quality', severity: 'high', detail: '40% of VRI encounters have technical issues (bandwidth, positioning, lighting)' },
      { gap: 'CDI availability', severity: 'critical', detail: 'Only 2 CDIs in entire 6-state footprint' },
      { gap: 'DeafBlind services', severity: 'critical', detail: 'No internal DeafBlind interpreters - all contracted' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Strong Deaf community near Illinois School for the Deaf alumni networks' },
      { region: 'GA - Atlanta', insight: 'Georgia School for the Deaf in Cave Spring creates regional Deaf community hub' },
      { region: 'NC - all', insight: 'NCSD in Morganton + ENCSD in Wilson create two distinct Deaf community centers' }
    ]
  },
  'Refugee Populations': {
    growth: '+22%', languages: ['Dari', 'Pashto', 'Ukrainian', 'Russian', 'Burmese', 'Karen', 'Chin', 'Swahili', 'Kinyarwanda'], facilities: 15, satisfaction: 74,
    needs: 'Trauma-informed interpretation',
    source: 'State Dept WRAPS + Local Resettlement Agency Reports',
    dataAge: 'Q4 2024',
    population: { total: 125000, annualArrivals: 18500 },
    demographics: {
      ageBreakdown: { under18: '38%', '18-44': '45%', '45-64': '12%', '65plus': '5%' },
      primaryOrigins: ['Afghanistan (32%)', 'Ukraine (25%)', 'DR Congo (15%)', 'Burma/Myanmar (12%)', 'Syria (6%)']
    },
    healthConsiderations: [
      'PTSD and trauma histories nearly universal - interpreters need trauma-informed training',
      'Torture survivors may have specific triggers - confidentiality paramount',
      'Chronic conditions often untreated during displacement - comprehensive screenings needed',
      'Immunization catch-up required for most arrivals'
    ],
    serviceGaps: [
      { gap: 'Trauma-informed interpreters', severity: 'critical', detail: 'Only 12% of interpreters have trauma-informed care training' },
      { gap: 'Rare language coverage', severity: 'high', detail: 'Dari, Pashto, Karen, Chin have <5 interpreters each' },
      { gap: 'Navigation support', severity: 'high', detail: 'Complex US healthcare system overwhelming - need bilingual navigators' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Afghan SIV families concentrated in suburbs (Skokie, Des Plaines) - transportation barriers' },
      { region: 'WI - Madison', insight: 'Bhutanese/Nepali community well-established - can mentor newer arrivals' },
      { region: 'GA - Clarkston', insight: 'Receives highest per-capita refugee resettlement in nation - dedicated infrastructure needed' }
    ]
  }
};

// Social Determinants of Health Data
const socialDeterminants = {
  IL: {
    poverty: { lepRate: 18.2, generalRate: 11.5, source: 'ACS 2023' },
    uninsured: { lepRate: 22.1, generalRate: 8.2, source: 'ACS 2023' },
    housingBurden: { lepRate: 52.3, generalRate: 31.2, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 15.8, generalRate: 9.4, source: 'Feeding America 2024' },
    transportation: { lepRate: 28.4, generalRate: 12.1, source: 'ACS 2023 Commuting' }
  },
  WI: {
    poverty: { lepRate: 21.5, generalRate: 10.8, source: 'ACS 2023' },
    uninsured: { lepRate: 19.8, generalRate: 5.4, source: 'ACS 2023' },
    housingBurden: { lepRate: 48.2, generalRate: 28.5, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 14.2, generalRate: 8.8, source: 'Feeding America 2024' },
    transportation: { lepRate: 22.1, generalRate: 8.5, source: 'ACS 2023 Commuting' }
  },
  NC: {
    poverty: { lepRate: 24.8, generalRate: 13.4, source: 'ACS 2023' },
    uninsured: { lepRate: 32.5, generalRate: 11.2, source: 'ACS 2023' },
    housingBurden: { lepRate: 55.1, generalRate: 32.8, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 18.4, generalRate: 12.1, source: 'Feeding America 2024' },
    transportation: { lepRate: 31.2, generalRate: 14.5, source: 'ACS 2023 Commuting' }
  },
  SC: {
    poverty: { lepRate: 26.2, generalRate: 14.1, source: 'ACS 2023' },
    uninsured: { lepRate: 35.8, generalRate: 12.8, source: 'ACS 2023' },
    housingBurden: { lepRate: 58.4, generalRate: 34.2, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 19.8, generalRate: 13.5, source: 'Feeding America 2024' },
    transportation: { lepRate: 34.5, generalRate: 15.2, source: 'ACS 2023 Commuting' }
  },
  GA: {
    poverty: { lepRate: 22.4, generalRate: 13.9, source: 'ACS 2023' },
    uninsured: { lepRate: 28.9, generalRate: 12.4, source: 'ACS 2023' },
    housingBurden: { lepRate: 54.2, generalRate: 33.5, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 17.2, generalRate: 11.8, source: 'Feeding America 2024' },
    transportation: { lepRate: 29.8, generalRate: 13.8, source: 'ACS 2023 Commuting' }
  },
  AL: {
    poverty: { lepRate: 28.5, generalRate: 15.5, source: 'ACS 2023' },
    uninsured: { lepRate: 38.2, generalRate: 10.1, source: 'ACS 2023' },
    housingBurden: { lepRate: 61.5, generalRate: 32.1, source: 'HUD CHAS 2023' },
    foodInsecurity: { lepRate: 21.4, generalRate: 14.2, source: 'Feeding America 2024' },
    transportation: { lepRate: 35.8, generalRate: 12.4, source: 'ACS 2023 Commuting' }
  }
};

// Simple Political Alerts for sidebar display
const politicalAlerts = [
  { id: 1, severity: 'critical', category: 'Legislative', title: 'Federal Workforce Equity Executive Order Review', description: 'New guidance expected on federal contractor workforce requirements. Impact assessment needed for grant-funded programs.', date: '2 hours ago', states: ['All'], action: 'Review compliance posture' },
  { id: 2, severity: 'warning', category: 'State Policy', title: 'NC HB 237 - Language Access Amendment', description: 'Proposed changes to interpreter certification requirements in healthcare settings.', date: '1 day ago', states: ['NC'], action: 'Monitor committee vote' },
  { id: 3, severity: 'info', category: 'Regulatory', title: 'CMS Language Access Update', description: 'Section 1557 enforcement guidance clarification published.', date: '3 days ago', states: ['All'], action: 'Update training materials' },
  { id: 4, severity: 'warning', category: 'State Policy', title: 'GA Senate Resolution on Healthcare Equity', description: 'Resolution supporting language access funding under consideration.', date: '5 days ago', states: ['GA'], action: 'Prepare testimony' },
];

// Global Intelligence Feed - comprehensive feed for main display
const globalIntelligenceFeed = [
  {
    id: 1,
    type: 'regulatory',
    region: 'US Federal',
    title: 'HHS Section 1557 Language Access Requirements - July 2025 Deadline',
    summary: 'By July 5, 2025, covered entities must adopt written policies and procedures for language assistance services and train staff. The December 2024 Dear Colleague letter reiterates that self-identification as bilingual is insufficient - qualified interpreter standards must be met.',
    source: 'HHS Office for Civil Rights',
    sourceUrl: 'https://www.hhs.gov/sites/default/files/ocr-dcl-section-1557-language-access.pdf',
    date: 'Ongoing',
    impact: 'high',
    tags: ['Section 1557', 'ACA', 'Compliance Deadline', 'Language Access'],
    actionItems: ['Review interpreter qualification documentation', 'Update written policies by July 5, 2025', 'Train staff on language access procedures']
  },
  {
    id: 2,
    type: 'legislation',
    region: 'US Federal',
    title: 'Executive Order Review: Federal Language Access Guidance Under Evaluation',
    summary: 'HHS and OCR have been instructed to review guidance issued under Executive Order 13166. Healthcare organizations should continue compliance with Title VI and Section 1557, which remain legally binding regardless of executive order status.',
    source: 'Federal Register',
    sourceUrl: 'https://www.federalregister.gov/executive-orders',
    date: '2 days ago',
    impact: 'high',
    tags: ['Executive Order 13166', 'Title VI', 'Federal Policy'],
    actionItems: ['Monitor official channels for updates', 'Maintain current compliance programs', 'Document all language access activities']
  },
  {
    id: 3,
    type: 'regulatory',
    region: 'US - Joint Commission',
    title: 'Joint Commission 2026 National Patient Safety Goals: Language Access Integration',
    summary: 'Communication and language access are now formally embedded in accreditation under Goals 4 and 7. Hospitals expected to stratify quality data by preferred language and address disparities. Language services transitioning from patient experience to patient safety requirement.',
    source: 'Joint Commission',
    sourceUrl: 'https://www.jointcommission.org/standards/national-patient-safety-goals/',
    date: '1 week ago',
    impact: 'high',
    tags: ['Accreditation', 'Patient Safety', 'Quality Metrics', '2026 Goals'],
    actionItems: ['Review Goals 4 and 7 requirements', 'Implement language-stratified quality tracking', 'Update safety protocols to include language access']
  },
  {
    id: 4,
    type: 'news',
    region: 'US Federal',
    title: 'OCR Right of Access Enforcement: 54 Actions, $112,500 Concentra Settlement',
    summary: 'December 2025 settlement with Concentra marks OCRs 54th Right of Access enforcement action. Patient made six requests over one year before receiving records. OCR continues aggressive enforcement of 30-day access requirements.',
    source: 'HHS OCR',
    sourceUrl: 'https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html',
    date: 'Dec 16, 2025',
    impact: 'medium',
    tags: ['HIPAA', 'Right of Access', 'Enforcement', 'Settlement'],
    actionItems: ['Audit patient record request procedures', 'Ensure 30-day compliance', 'Implement tracking systems']
  },
  {
    id: 5,
    type: 'research',
    region: 'US National',
    title: 'LEP Population Data: 25.2 Million Individuals, 9% of US Population',
    summary: 'Census Bureau American Community Survey data shows 25.2 million LEP individuals age 5+ in the US (9% of population), up from 14 million (6%) in 1990. Spanish speakers represent largest group. Nearly 1 in 10 working-age adults (19.2 million) are LEP.',
    source: 'US Census Bureau / Migration Policy Institute',
    sourceUrl: 'https://www.migrationpolicy.org/programs/data-hub/charts/limited-english-proficient-population-united-states',
    date: 'Current',
    impact: 'medium',
    tags: ['Demographics', 'Census Data', 'Population Trends', 'LEP Statistics'],
    actionItems: ['Update service area demographic analysis', 'Align interpreter capacity with population data', 'Brief leadership on growth trends']
  },
  {
    id: 6,
    type: 'best_practice',
    region: 'US - Florida',
    title: 'Lee Health: Language Services Integration Shows Measurable Outcomes',
    summary: 'Lee Health embedded qualified interpreters directly into clinical workflows, combining bilingual staff with on-demand VRI. System stratified operational scorecard by language, tracking readmissions and discharge comprehension. Reported positive improvements in length of stay and readmissions.',
    source: 'Martti / Healthcare Industry Report',
    sourceUrl: 'https://www.martti.io/articles/language-access-will-define-hospital-compliance-in-2026',
    date: '2 weeks ago',
    impact: 'medium',
    tags: ['Best Practice', 'Outcomes', 'VRI Integration', 'Quality Metrics'],
    actionItems: ['Evaluate VRI integration opportunities', 'Implement language-stratified outcome tracking', 'Benchmark against Lee Health model']
  },
  {
    id: 7,
    type: 'regulatory',
    region: 'US Federal',
    title: 'Section 1557 Machine Translation Guidance: Human Review Required',
    summary: 'OCR December 2024 guidance clarifies that AI/machine translations for critical documents must be reviewed by qualified human translators. Non-critical translations should include warning about potential errors. Relying solely on self-identified bilingual staff is insufficient.',
    source: 'HHS OCR Dear Colleague Letter',
    sourceUrl: 'https://www.hhs.gov/civil-rights/for-individuals/section-1557/index.html',
    date: 'Dec 5, 2024',
    impact: 'high',
    tags: ['AI Translation', 'Machine Translation', 'Qualified Translator', 'Guidance'],
    actionItems: ['Audit machine translation usage', 'Implement human review process', 'Add error warnings to automated translations']
  },
  {
    id: 8,
    type: 'news',
    region: 'US National',
    title: 'DOJ Healthcare False Claims: $1.7 Billion in FY2024 Settlements',
    summary: 'Department of Justice recovered $1.7 billion in healthcare-related False Claims Act settlements during fiscal year 2024. Record 979 whistleblower cases filed. Compliance documentation and program integrity remain enforcement priorities.',
    source: 'Department of Justice',
    sourceUrl: 'https://www.justice.gov/opa/pr/false-claims-act-settlements-and-judgments-exceed-29-billion-fiscal-year-2024',
    date: 'Jan 2025',
    impact: 'medium',
    tags: ['False Claims', 'DOJ', 'Compliance', 'Settlements'],
    actionItems: ['Review compliance documentation', 'Strengthen program integrity controls', 'Update whistleblower policies']
  },
  {
    id: 9,
    type: 'regulatory',
    region: 'US Federal',
    title: 'Section 1557 Coordinator Requirement: November 2024 Deadline Passed',
    summary: 'Entities with 15+ employees were required to designate a Section 1557 coordinator by November 2, 2024. Coordinators responsible for receiving, reviewing, and investigating grievances related to noncompliance. Annual Notice of Nondiscrimination also required.',
    source: 'HHS Final Rule 45 CFR 92',
    sourceUrl: 'https://www.federalregister.gov/documents/2024/05/06/2024-08711/nondiscrimination-in-health-programs-and-activities',
    date: 'Effective',
    impact: 'high',
    tags: ['Section 1557', 'Coordinator', 'Compliance', 'Grievance Process'],
    actionItems: ['Verify coordinator designation', 'Publish Notice of Nondiscrimination', 'Establish grievance investigation process']
  },
  {
    id: 10,
    type: 'best_practice',
    region: 'Global',
    title: 'WHO Evidence: Professional Interpreters Reduce Readmissions',
    summary: 'Systematic reviews demonstrate that professional medical interpreter use significantly reduces hospital readmissions and improves patient comprehension. Language concordance between providers and patients associated with better outcomes across multiple quality metrics.',
    source: 'Journal of General Internal Medicine / WHO',
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6667611/',
    date: 'Current Research',
    impact: 'medium',
    tags: ['Research', 'Outcomes', 'ROI', 'Evidence Base'],
    actionItems: ['Incorporate into leadership business case', 'Update training materials with evidence', 'Track readmission rates by language']
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DEMAND INTELLIGENCE DATA
// ═══════════════════════════════════════════════════════════════════════════════

const STATE_DATA = {
  IL: { name: 'Illinois', lepPop: 1153125, encounters: 485000, growth: 3.2, topLanguages: ['Spanish', 'Polish', 'Chinese', 'Arabic', 'Tagalog'] },
  WI: { name: 'Wisconsin', lepPop: 265217, encounters: 112000, growth: 4.1, topLanguages: ['Spanish', 'Hmong', 'Chinese', 'Somali', 'Arabic'] },
  NC: { name: 'North Carolina', lepPop: 626363, encounters: 245000, growth: 5.8, topLanguages: ['Spanish', 'Chinese', 'Vietnamese', 'Arabic', 'French'] },
  SC: { name: 'South Carolina', lepPop: 255921, encounters: 98000, growth: 6.2, topLanguages: ['Spanish', 'Chinese', 'Vietnamese', 'Korean', 'German'] },
  GA: { name: 'Georgia', lepPop: 749833, encounters: 312000, growth: 4.9, topLanguages: ['Spanish', 'Chinese', 'Vietnamese', 'Korean', 'French'] },
  AL: { name: 'Alabama', lepPop: 201771, encounters: 78000, growth: 3.8, topLanguages: ['Spanish', 'Chinese', 'Vietnamese', 'Korean', 'German'] }
};

const DISPLACEMENT_ALERTS = [
  { id: 1, country: 'Haiti', language: 'Haitian Creole', severity: 'critical', displaced: '5.5M', projectedArrivals: 12500, timeline: 'Q1-Q2 2026', affectedStates: ['IL', 'NC', 'GA'], trend: 'increasing', reason: 'Gang violence, political instability, humanitarian crisis' },
  { id: 2, country: 'Afghanistan', language: 'Dari/Pashto', severity: 'high', displaced: '6.4M', projectedArrivals: 8200, timeline: 'Ongoing', affectedStates: ['IL', 'WI', 'NC', 'GA'], trend: 'stable', reason: 'Taliban control, humanitarian crisis, SIV processing backlog' },
  { id: 3, country: 'Venezuela', language: 'Spanish', severity: 'critical', displaced: '7.7M', projectedArrivals: 45000, timeline: '2025-2026', affectedStates: ['IL', 'NC', 'SC', 'GA', 'AL'], trend: 'increasing', reason: 'Economic collapse, political persecution, regional migration' },
  { id: 4, country: 'Ukraine', language: 'Ukrainian/Russian', severity: 'high', displaced: '6.5M', projectedArrivals: 18000, timeline: 'Ongoing', affectedStates: ['IL', 'WI', 'NC'], trend: 'stable', reason: 'Ongoing conflict, TPS extensions, U4U program' },
  { id: 5, country: 'Burma/Myanmar', language: 'Burmese/Karen/Chin', severity: 'elevated', displaced: '2.6M', projectedArrivals: 4500, timeline: 'Q2-Q4 2026', affectedStates: ['IL', 'WI', 'NC'], trend: 'increasing', reason: 'Military coup, ethnic persecution, refugee camp conditions' },
  { id: 6, country: 'DR Congo', language: 'French/Swahili', severity: 'critical', displaced: '7.2M', projectedArrivals: 6800, timeline: '2025-2026', affectedStates: ['IL', 'NC', 'GA'], trend: 'increasing', reason: 'Armed conflict, M23 violence, humanitarian emergency' },
  { id: 7, country: 'Sudan', language: 'Arabic/Tigrinya', severity: 'critical', displaced: '10.7M', projectedArrivals: 9200, timeline: 'Ongoing', affectedStates: ['IL', 'NC', 'GA'], trend: 'increasing', reason: 'Civil war, ethnic violence, famine conditions' },
  { id: 8, country: 'Ethiopia', language: 'Amharic/Tigrinya/Oromo', severity: 'elevated', displaced: '4.4M', projectedArrivals: 3200, timeline: '2025-2026', affectedStates: ['IL', 'GA'], trend: 'stable', reason: 'Post-conflict recovery, regional instability, drought' }
];

const DEMAND_FORECAST = [
  { month: 'Feb 2026', inPerson: 42500, vri: 28400, opi: 18200, total: 89100 },
  { month: 'Mar 2026', inPerson: 44200, vri: 29800, opi: 19100, total: 93100 },
  { month: 'Apr 2026', inPerson: 45800, vri: 31200, opi: 19800, total: 96800 },
  { month: 'May 2026', inPerson: 47100, vri: 32500, opi: 20400, total: 100000 },
  { month: 'Jun 2026', inPerson: 48500, vri: 33800, opi: 21100, total: 103400 },
  { month: 'Jul 2026', inPerson: 49200, vri: 34200, opi: 21500, total: 104900 }
];

const LANGUAGE_DEMAND = [
  { language: 'Spanish', current: 68500, projected: 74200, growth: 8.3, interpreters: 85, gap: -12 },
  { language: 'Mandarin', current: 8200, projected: 9100, growth: 11.0, interpreters: 12, gap: -3 },
  { language: 'Vietnamese', current: 4800, projected: 5400, growth: 12.5, interpreters: 8, gap: -2 },
  { language: 'Arabic', current: 3900, projected: 4600, growth: 17.9, interpreters: 6, gap: -3 },
  { language: 'Korean', current: 2800, projected: 3100, growth: 10.7, interpreters: 5, gap: -1 },
  { language: 'Haitian Creole', current: 2200, projected: 3400, growth: 54.5, interpreters: 3, gap: -4 },
  { language: 'Russian', current: 1900, projected: 2100, growth: 10.5, interpreters: 4, gap: 0 },
  { language: 'Polish', current: 1800, projected: 1850, growth: 2.8, interpreters: 4, gap: 1 },
  { language: 'ASL', current: 1500, projected: 1650, growth: 10.0, interpreters: 6, gap: -1 },
  { language: 'Somali', current: 1200, projected: 1500, growth: 25.0, interpreters: 2, gap: -2 }
];

const DISABILITY_POPULATIONS = {
  IL: { deaf: 245000, hardOfHearing: 892000, deafBlind: 4200, total: 1141200 },
  WI: { deaf: 98000, hardOfHearing: 412000, deafBlind: 1800, total: 511800 },
  NC: { deaf: 178000, hardOfHearing: 725000, deafBlind: 3100, total: 906100 },
  SC: { deaf: 89000, hardOfHearing: 385000, deafBlind: 1600, total: 475600 },
  GA: { deaf: 198000, hardOfHearing: 812000, deafBlind: 3500, total: 1013500 },
  AL: { deaf: 92000, hardOfHearing: 398000, deafBlind: 1700, total: 491700 }
};

const radarData = [
  { dimension: 'Political Compliance', current: 85, target: 95 },
  { dimension: 'Geographic Coverage', current: 78, target: 90 },
  { dimension: 'Social Engagement', current: 82, target: 88 },
  { dimension: 'Cultural Competency', current: 76, target: 92 },
  { dimension: 'Economic Impact', current: 91, target: 95 },
];

const agentTasks = [
  { id: 1, name: 'Political Monitor', status: 'active', lastRun: '5 min ago', findings: 3, type: 'political' },
  { id: 2, name: 'Demographic Scanner', status: 'active', lastRun: '1 hr ago', findings: 7, type: 'geographic' },
  { id: 3, name: 'Social Sentiment Analyzer', status: 'active', lastRun: '30 min ago', findings: 12, type: 'social' },
  { id: 4, name: 'Cultural Trend Tracker', status: 'processing', lastRun: '2 hr ago', findings: 5, type: 'cultural' },
  { id: 5, name: 'Economic Impact Calculator', status: 'active', lastRun: '15 min ago', findings: 2, type: 'economic' },
  { id: 6, name: 'Compliance Risk Assessor', status: 'active', lastRun: '45 min ago', findings: 4, type: 'political' },
];

// Main Component
function LEPCommunityIntelligencePlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedState, setSelectedState] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const [notifications, setNotifications] = useState(4);
  const [showNotifications, setShowNotifications] = useState(false);
  const [intelligenceFilter, setIntelligenceFilter] = useState('all');
  const [expandedIntelligence, setExpandedIntelligence] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedRiskState, setExpandedRiskState] = useState(null);
  const [expandedCommunity, setExpandedCommunity] = useState(null);
  const [expandedDisplacement, setExpandedDisplacement] = useState(null);
  const [showSdohPanel, setShowSdohPanel] = useState(false);
  const [selectedSdohState, setSelectedSdohState] = useState('IL');
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTimeSeriesData(generateTimeSeriesData());
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(generateTimeSeriesData());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500 text-red-300';
      case 'warning': return 'bg-amber-500/20 border-amber-500 text-amber-300';
      case 'info': return 'bg-blue-500/20 border-blue-500 text-blue-300';
      default: return 'bg-slate-500/20 border-slate-500 text-slate-300';
    }
  };

  const getSeverityColorLight = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-300 text-red-700';
      case 'warning': return 'bg-amber-100 border-amber-300 text-amber-700';
      case 'info': return 'bg-blue-100 border-blue-300 text-blue-700';
      default: return 'bg-slate-100 border-slate-300 text-slate-600';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getRiskColorLight = (risk) => {
    switch (risk) {
      case 'low': return 'text-emerald-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusIconLight = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getIntelligenceTypeIcon = (type) => {
    switch (type) {
      case 'legislation': return <Gavel className="w-4 h-4" />;
      case 'regulatory': return <FileText className="w-4 h-4" />;
      case 'best_practice': return <Lightbulb className="w-4 h-4" />;
      case 'news': return <Newspaper className="w-4 h-4" />;
      case 'research': return <BookOpen className="w-4 h-4" />;
      case 'rumor': return <Radio className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getIntelligenceTypeStyle = (type) => {
    switch (type) {
      case 'legislation': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'regulatory': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'best_practice': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'news': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'research': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'rumor': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getImpactStyle = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const filteredIntelligence = intelligenceFilter === 'all' 
    ? globalIntelligenceFeed 
    : globalIntelligenceFeed.filter(item => item.type === intelligenceFilter);

  const toggleSaveItem = (id) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateTask = (item, actionItem) => {
    const newTask = {
      id: Date.now(),
      intelligenceId: item.id,
      title: actionItem,
      source: item.title,
      priority: item.impact,
      status: 'pending',
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, newTask]);
    setCurrentItem({ ...item, selectedAction: actionItem });
    setShowTaskModal(true);
  };

  const handleAddToReport = (item) => {
    const reportItem = {
      id: Date.now(),
      intelligenceId: item.id,
      title: item.title,
      type: item.type,
      impact: item.impact,
      summary: item.summary,
      source: item.source,
      sourceUrl: item.sourceUrl,
      addedAt: new Date().toISOString()
    };
    setReports(prev => [...prev, reportItem]);
    setCurrentItem(item);
    setShowReportModal(true);
  };

  const handleAssignTeam = (item) => {
    setCurrentItem(item);
    setShowAssignModal(true);
  };

  const confirmAssignment = (team, members) => {
    const assignment = {
      id: Date.now(),
      intelligenceId: currentItem.id,
      title: currentItem.title,
      team,
      members,
      actionItems: currentItem.actionItems,
      assignedAt: new Date().toISOString(),
      status: 'assigned'
    };
    setAssignments(prev => [...prev, assignment]);
    setShowAssignModal(false);
    setCurrentItem(null);
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setShowAnalysisPanel(true);
    
    // Simulate AI analysis processing
    setTimeout(() => {
      const analysis = {
        generatedAt: new Date().toISOString(),
        summary: "Based on analysis of 10 intelligence items, there are 3 critical compliance deadlines approaching and 4 high-impact regulatory changes requiring immediate attention.",
        prioritizedActions: [
          {
            priority: 1,
            category: 'Compliance Deadline',
            action: 'Complete Section 1557 written policies and procedures',
            deadline: 'July 5, 2025',
            impact: 'Critical - Federal requirement',
            relatedItems: [1, 7, 9],
            effort: 'High',
            owner: 'Compliance Team'
          },
          {
            priority: 2,
            category: 'Accreditation',
            action: 'Implement language-stratified quality tracking for Joint Commission Goals 4 & 7',
            deadline: 'January 2026',
            impact: 'High - Accreditation requirement',
            relatedItems: [3],
            effort: 'Medium',
            owner: 'Quality Team'
          },
          {
            priority: 3,
            category: 'Process Improvement',
            action: 'Audit and update machine translation processes with human review workflow',
            deadline: 'Q1 2025',
            impact: 'High - Regulatory guidance',
            relatedItems: [7],
            effort: 'Medium',
            owner: 'Translation Services'
          },
          {
            priority: 4,
            category: 'Documentation',
            action: 'Verify Section 1557 coordinator designation and grievance process',
            deadline: 'Immediate',
            impact: 'High - Past deadline',
            relatedItems: [9],
            effort: 'Low',
            owner: 'HR/Compliance'
          },
          {
            priority: 5,
            category: 'Strategic Planning',
            action: 'Develop VRI integration roadmap based on Lee Health best practices',
            deadline: 'Q2 2025',
            impact: 'Medium - Operational improvement',
            relatedItems: [6],
            effort: 'High',
            owner: 'Operations'
          }
        ],
        riskAssessment: {
          high: 4,
          medium: 4,
          low: 2,
          overallRisk: 'Elevated'
        },
        keyInsights: [
          'July 2025 represents a critical compliance milestone with multiple overlapping requirements',
          'Language access is transitioning from patient experience to patient safety domain',
          'AI/machine translation use requires new human review processes',
          'OCR enforcement activity remains aggressive - 54 Right of Access actions to date'
        ]
      };
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'political', label: 'Political', icon: Vote },
    { id: 'geographic', label: 'Geographic', icon: Globe },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'cultural', label: 'Cultural', icon: BookOpen },
    { id: 'economic', label: 'Economic', icon: DollarSign },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['IBM_Plex_Sans',sans-serif]">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200 backdrop-blur-xl bg-white/80">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">LEP Community Intelligence Platform</h1>
                <p className="text-xs text-slate-500">Language Access & Health Equity Analytics • Enterprise Edition</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search insights, policies, communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                />
              </div>
              
              <button
                onClick={refreshData}
                className={`p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-500" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-medium text-white">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-96 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                        <button 
                          onClick={() => setNotifications(0)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                      <div className="p-4 bg-red-50 hover:bg-red-100 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">Critical: Sudan displacement alert elevated</p>
                            <p className="text-xs text-slate-500 mt-1">10.7M displaced - projected 9,200 arrivals</p>
                            <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">Section 1557 deadline reminder</p>
                            <p className="text-xs text-slate-500 mt-1">July 5, 2025 compliance deadline approaching</p>
                            <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">Haitian Creole demand spike detected</p>
                            <p className="text-xs text-slate-500 mt-1">+54% growth projected - interpreter shortage</p>
                            <p className="text-xs text-slate-400 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">AL coverage gap identified</p>
                            <p className="text-xs text-slate-500 mt-1">Albertville-Gadsden region at critical coverage</p>
                            <p className="text-xs text-slate-400 mt-1">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                      <button className="w-full text-center text-sm text-blue-600 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAgentPanel(!showAgentPanel)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${showAgentPanel ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              >
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI Agents</span>
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">6</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white shadow-sm text-slate-900 border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1800px] mx-auto px-6 py-6">
        <div className={`grid gap-6 ${showAgentPanel ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
          {/* Main Dashboard Area */}
          <div className="space-y-6">
            
            {/* Demand Intelligence Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Globe className="w-5 h-5 text-blue-200" />
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 font-medium">6 States</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">3.25M</p>
                  <p className="text-sm text-blue-100">LEP Population</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-5 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Activity className="w-5 h-5 text-purple-200" />
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 font-medium">+4.8%</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">1.33M</p>
                  <p className="text-sm text-purple-100">Annual Encounters</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-5 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-200" />
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 font-medium animate-pulse">Active</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">{DISPLACEMENT_ALERTS.filter(a => a.severity === 'critical').length}</p>
                  <p className="text-sm text-red-100">Critical Displacement Alerts</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-5 h-5 text-amber-200" />
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 font-medium">Gap</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">-27</p>
                  <p className="text-sm text-amber-100">Interpreter FTE Shortage</p>
                </div>
              </div>
            </div>

            {/* Displacement Alerts Section with Drill-down */}
            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Global Displacement Alerts</h2>
                    <p className="text-xs text-slate-500">UNHCR data • Click alert for impact analysis & micro-location intelligence</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">{DISPLACEMENT_ALERTS.filter(a => a.severity === 'critical').length} Critical</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">{DISPLACEMENT_ALERTS.filter(a => a.severity === 'high').length} High</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">{DISPLACEMENT_ALERTS.filter(a => a.severity === 'elevated').length} Elevated</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
                {DISPLACEMENT_ALERTS.map((alert) => (
                  <div 
                    key={alert.id} 
                    onClick={() => setExpandedDisplacement(expandedDisplacement === alert.id ? null : alert.id)}
                    className={`rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                      alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                      alert.severity === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
                    } ${expandedDisplacement === alert.id ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{alert.country}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        alert.severity === 'critical' ? 'bg-red-200 text-red-800' :
                        alert.severity === 'high' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'
                      }`}>{alert.severity}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{alert.language}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Displaced:</span>
                        <span className="font-medium text-slate-700">{alert.displaced}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Projected Arrivals:</span>
                        <span className="font-medium text-slate-700">{alert.projectedArrivals.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Timeline:</span>
                        <span className="font-medium text-slate-700">{alert.timeline}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Trend:</span>
                        <span className={`font-medium flex items-center gap-1 ${
                          alert.trend === 'increasing' ? 'text-red-600' : 'text-slate-600'
                        }`}>
                          {alert.trend === 'increasing' ? <TrendingUp className="w-3 h-3" /> : null}
                          {alert.trend}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {alert.affectedStates.map(state => (
                        <span key={state} className="text-xs px-1.5 py-0.5 rounded bg-white/80 text-slate-600 border border-slate-200">{state}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Expanded Displacement Alert Details */}
              {expandedDisplacement && (
                <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6">
                  {DISPLACEMENT_ALERTS.filter(a => a.id === expandedDisplacement).map(alert => (
                    <div key={alert.id}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-red-500" />
                          {alert.country} Displacement Impact Analysis
                        </h3>
                        <button onClick={() => setExpandedDisplacement(null)} className="text-slate-400 hover:text-slate-600">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Situation Overview */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-700">Situation Overview</h4>
                          <div className="p-3 rounded-lg bg-white border border-slate-200">
                            <p className="text-sm text-slate-700">{alert.reason}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-center">
                              <p className="text-xl font-bold text-red-700">{alert.displaced}</p>
                              <p className="text-xs text-red-600">Total Displaced</p>
                            </div>
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-center">
                              <p className="text-xl font-bold text-amber-700">{alert.projectedArrivals.toLocaleString()}</p>
                              <p className="text-xs text-amber-600">Projected US Arrivals</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Micro-Location Impact */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-700">Micro-Location Impact</h4>
                          {alert.affectedStates.map(stateCode => (
                            <div key={stateCode} className="p-3 rounded-lg bg-white border border-slate-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-slate-800">{STATE_DATA[stateCode]?.name || stateCode}</span>
                                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{stateCode}</span>
                              </div>
                              {stateRiskAssessment[stateCode]?.microLocations.slice(0, 2).map((loc, i) => (
                                <div key={i} className="flex items-center justify-between text-xs py-1 border-t border-slate-100">
                                  <span className="text-slate-600">{loc.area}</span>
                                  <span className={`px-1.5 py-0.5 rounded font-medium ${
                                    loc.coverage === 'High' ? 'bg-emerald-100 text-emerald-700' :
                                    loc.coverage === 'Low' || loc.coverage === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                  }`}>{loc.coverage}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        
                        {/* Actionable Intelligence */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-700">Actionable Intelligence</h4>
                          <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                              <div className="flex items-start gap-2">
                                <Users className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-blue-800">Interpreter Capacity</p>
                                  <p className="text-xs text-blue-700">Begin recruitment for {alert.language} interpreters. Current capacity likely insufficient for projected arrivals.</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                              <div className="flex items-start gap-2">
                                <Heart className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-purple-800">Health Considerations</p>
                                  <p className="text-xs text-purple-700">Prepare for trauma-informed care needs. Refugee health screenings and immunization catch-up protocols.</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <div className="flex items-start gap-2">
                                <BookOpen className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-amber-800">Cultural Training</p>
                                  <p className="text-xs text-amber-700">Schedule staff cultural competency training for {alert.country} populations before anticipated arrival timeline.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200 text-xs text-slate-400">
                            Source: UNHCR Global Trends, State Dept WRAPS • Data refreshed weekly
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Determinants & Deaf/Disability Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Social Determinants of Health */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-slate-900">Social Determinants of Health</h2>
                        <p className="text-xs text-slate-500">LEP vs General Population disparities</p>
                      </div>
                    </div>
                    <select 
                      value={selectedSdohState}
                      onChange={(e) => setSelectedSdohState(e.target.value)}
                      className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm"
                    >
                      {Object.keys(socialDeterminants).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {Object.entries(socialDeterminants[selectedSdohState]).map(([key, data]) => {
                    const labels = { poverty: 'Poverty Rate', uninsured: 'Uninsured', housingBurden: 'Housing Burden', foodInsecurity: 'Food Insecurity', transportation: 'Transportation Barriers' };
                    const gap = data.lepRate - data.generalRate;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 font-medium">{labels[key]}</span>
                          <span className="text-xs text-slate-400">{data.source}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden relative">
                              <div className="absolute inset-y-0 left-0 bg-slate-300 rounded-full" style={{ width: `${data.generalRate}%` }} />
                              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full" style={{ width: `${data.lepRate}%` }} />
                            </div>
                          </div>
                          <div className="w-32 text-right flex items-center gap-2 justify-end">
                            <span className="text-xs text-slate-500">{data.generalRate}%</span>
                            <span className="text-xs text-slate-400">→</span>
                            <span className="text-xs font-semibold text-red-600">{data.lepRate}%</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700">+{gap.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-300" /><span className="text-slate-500">General Pop</span></div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-400" /><span className="text-slate-500">LEP Pop</span></div>
                    </div>
                    <span className="text-slate-400">Source: ACS 2023, HUD, Feeding America</span>
                  </div>
                </div>
              </div>

              {/* Deaf & Disability Populations */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">Deaf & Hard of Hearing Populations</h2>
                      <p className="text-xs text-slate-500">ASL & accessibility service demand</p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                      <p className="text-2xl font-bold text-blue-700">{Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.deaf, 0).toLocaleString()}</p>
                      <p className="text-xs text-blue-600">Deaf (Sign Language Users)</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                      <p className="text-2xl font-bold text-purple-700">{(Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.hardOfHearing, 0) / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-purple-600">Hard of Hearing</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
                      <p className="text-2xl font-bold text-amber-700">{Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.deafBlind, 0).toLocaleString()}</p>
                      <p className="text-xs text-amber-600">DeafBlind</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(DISABILITY_POPULATIONS).map(([state, data]) => (
                      <div key={state} className="flex items-center gap-3">
                        <span className="w-8 text-sm font-medium text-slate-700">{state}</span>
                        <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="bg-blue-500 h-full" style={{ width: `${(data.deaf / data.total) * 100}%` }} title={`Deaf: ${data.deaf.toLocaleString()}`} />
                          <div className="bg-purple-400 h-full" style={{ width: `${(data.hardOfHearing / data.total) * 100}%` }} title={`HH: ${data.hardOfHearing.toLocaleString()}`} />
                          <div className="bg-amber-400 h-full" style={{ width: `${(data.deafBlind / data.total) * 100 * 10}%` }} title={`DeafBlind: ${data.deafBlind.toLocaleString()}`} />
                        </div>
                        <span className="w-16 text-right text-xs text-slate-500">{(data.total / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-400">
                    Source: Gallaudet Research Institute, HLAA • Data: Q4 2024
                  </div>
                </div>
              </div>
            </div>

            {/* State Overview Grid */}
            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">Regional Population Intelligence</h2>
                      <p className="text-xs text-slate-500">LEP & Disability populations by state • Click state for drill-down</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-emerald-700 font-medium">High Confidence</span>
                    </div>
                    <a 
                      href="https://data.census.gov/table/ACSDT5Y2023.B16001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Census ACS 2023
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 divide-x divide-slate-100">
                {Object.entries(STATE_DATA).map(([code, data]) => (
                  <div 
                    key={code} 
                    onClick={() => setExpandedRiskState(expandedRiskState === code ? null : code)}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${expandedRiskState === code ? 'bg-blue-50' : ''}`}
                  >
                    <div className="text-center mb-3">
                      <span className="text-lg font-bold text-slate-900">{code}</span>
                      <p className="text-xs text-slate-500">{data.name}</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">LEP Pop:</span>
                        <span className="font-medium text-slate-700">{(data.lepPop / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Encounters:</span>
                        <span className="font-medium text-slate-700">{(data.encounters / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Growth:</span>
                        <span className="font-medium text-emerald-600">+{data.growth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">D/HH Pop:</span>
                        <span className="font-medium text-slate-700">{(DISABILITY_POPULATIONS[code].total / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-slate-400">Risk Level</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                          stateRiskAssessment[code].risk === 'high' ? 'bg-red-100 text-red-700' :
                          stateRiskAssessment[code].risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>{stateRiskAssessment[code].risk}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {data.topLanguages.slice(0, 3).map(lang => (
                          <span key={lang} className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{lang.slice(0, 3)}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span>Source: US Census Bureau ACS 5-Year Estimates (2019-2023)</span>
                  <span>•</span>
                  <span>Released: December 2024</span>
                  <span>•</span>
                  <span>Margin of Error: ±2-5%</span>
                </div>
                <span className="text-slate-400">Next update: December 2025</span>
              </div>

              {/* Expanded State Risk Assessment */}
              {expandedRiskState && stateRiskAssessment[expandedRiskState] && (
                <div className="border-t border-slate-200 bg-gradient-to-b from-blue-50 to-white">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        {STATE_DATA[expandedRiskState].name} Risk Assessment Drill-Down
                      </h3>
                      <button onClick={() => setExpandedRiskState(null)} className="text-slate-400 hover:text-slate-600">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Risk Factors */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-700">Risk Factors</h4>
                        {stateRiskAssessment[expandedRiskState].riskFactors.map((factor, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border ${
                            factor.impact === 'high' ? 'bg-red-50 border-red-200' :
                            factor.impact === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-slate-900">{factor.factor}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                factor.status === 'critical' ? 'bg-red-200 text-red-800' :
                                factor.status === 'strained' || factor.status === 'limited' ? 'bg-amber-200 text-amber-800' :
                                factor.status === 'elevated' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
                              }`}>{factor.status}</span>
                            </div>
                            <p className="text-xs text-slate-600">{factor.detail}</p>
                          </div>
                        ))}
                      </div>

                      {/* Micro Locations */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-700">Micro-Location Analysis</h4>
                        {stateRiskAssessment[expandedRiskState].microLocations.map((loc, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-slate-900">{loc.area}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                loc.coverage === 'High' ? 'bg-emerald-100 text-emerald-700' :
                                loc.coverage === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                loc.coverage === 'Low' ? 'bg-red-100 text-red-700' : 'bg-red-200 text-red-800'
                              }`}>{loc.coverage} Coverage</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">LEP Population: {loc.lepPop.toLocaleString()}</p>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs text-slate-400">Gaps:</span>
                              {loc.gaps.map((gap, i) => (
                                <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">{gap}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Considerations & Actions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-700">Actionable Considerations</h4>
                        {stateRiskAssessment[expandedRiskState].considerations.map((consideration, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-slate-700">{consideration}</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-3 border-t border-slate-200">
                          <a 
                            href={stateRiskAssessment[expandedRiskState].sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View source data: {stateRiskAssessment[expandedRiskState].source}
                          </a>
                          <p className="text-xs text-slate-400 mt-1">Data Age: {stateRiskAssessment[expandedRiskState].dataAge} • Confidence: {stateRiskAssessment[expandedRiskState].confidence}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Political Alerts Section */}
            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <Gavel className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Political & Regulatory Intelligence</h2>
                    <p className="text-xs text-slate-500">Real-time policy monitoring across 6 states</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {politicalAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-5 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 ${
                      alert.severity === 'critical' ? 'border-l-red-500' :
                      alert.severity === 'warning' ? 'border-l-amber-500' : 'border-l-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColorLight(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-400">{alert.category}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">{alert.date}</span>
                        </div>
                        <h3 className="font-medium mb-1 text-slate-900">{alert.title}</h3>
                        <p className="text-sm text-slate-500 mb-3">{alert.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">{alert.states.join(', ')}</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-medium">
                            {alert.action}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic & Cultural Intelligence with Drill-downs */}
            <div className="grid grid-cols-2 gap-6">
              {/* Geographic Risk Assessment with Drill-down */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Geographic Risk Assessment</h3>
                        <p className="text-xs text-slate-500">Click state for risk factor drill-down</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {Object.entries(stateRiskAssessment).map(([code, state]) => (
                    <div key={code}>
                      <div
                        onClick={() => setExpandedRiskState(expandedRiskState === code ? null : code)}
                        className={`p-4 hover:bg-slate-50 cursor-pointer transition-all ${expandedRiskState === code ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-semibold text-sm text-slate-700">
                              {code}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900">Score: {state.score}</span>
                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                  state.risk === 'high' ? 'bg-red-100 text-red-700' :
                                  state.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                }`}>{state.risk} risk</span>
                              </div>
                              <p className="text-xs text-slate-500">{state.population}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  state.score >= 75 ? 'bg-emerald-500' :
                                  state.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${state.score}%` }}
                              />
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedRiskState === code ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Risk Factors */}
                      {expandedRiskState === code && (
                        <div className="bg-blue-50 border-t border-blue-100 p-4">
                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Risk Factors</h4>
                            {state.riskFactors.map((factor, idx) => (
                              <div key={idx} className={`p-3 rounded-lg border ${
                                factor.impact === 'high' ? 'bg-red-50 border-red-200' :
                                factor.impact === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
                              }`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-slate-800">{factor.factor}</span>
                                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                    factor.status === 'critical' || factor.status === 'poor' ? 'bg-red-200 text-red-800' :
                                    factor.status === 'strained' || factor.status === 'limited' || factor.status === 'elevated' || factor.status === 'uncertain' || factor.status === 'challenging' || factor.status === 'restrictive' ? 'bg-amber-200 text-amber-800' :
                                    'bg-emerald-200 text-emerald-800'
                                  }`}>{factor.status}</span>
                                </div>
                                <p className="text-xs text-slate-600">{factor.detail}</p>
                              </div>
                            ))}
                            <div className="pt-2 border-t border-blue-200">
                              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Key Considerations</h4>
                              {state.considerations.map((c, i) => (
                                <div key={i} className="flex items-start gap-2 mb-2">
                                  <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-slate-700">{c}</p>
                                </div>
                              ))}
                            </div>
                            <a href={state.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                              <ExternalLink className="w-3 h-3" /> Source: {state.source}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Community Intelligence with Drill-down */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Cultural Community Intelligence</h3>
                      <p className="text-xs text-slate-500">Click community for health considerations & service gaps</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                  {Object.entries(culturalIntelligence).map(([name, community]) => (
                    <div key={name}>
                      <div 
                        onClick={() => setExpandedCommunity(expandedCommunity === name ? null : name)}
                        className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${expandedCommunity === name ? 'bg-purple-50' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-sm text-slate-900">{name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                                {community.growth} growth
                              </span>
                              <span className="text-xs text-slate-500">{community.facilities} facilities</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-lg font-semibold text-emerald-600">{community.satisfaction}%</p>
                              <p className="text-xs text-slate-500">satisfaction</p>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedCommunity === name ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {community.languages.map((lang, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {lang}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-amber-600 font-medium">↳ {community.needs}</p>
                      </div>

                      {/* Expanded Community Details */}
                      {expandedCommunity === name && (
                        <div className="bg-purple-50 border-t border-purple-100 p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Demographics & Health Considerations */}
                            <div>
                              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Health Considerations</h4>
                              <div className="space-y-2">
                                {community.healthConsiderations.map((hc, idx) => (
                                  <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded border border-purple-100">
                                    <Heart className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-700">{hc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Service Gaps */}
                            <div>
                              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Service Gaps</h4>
                              <div className="space-y-2">
                                {community.serviceGaps.map((gap, idx) => (
                                  <div key={idx} className={`p-2 rounded border ${
                                    gap.severity === 'critical' ? 'bg-red-50 border-red-200' :
                                    gap.severity === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
                                  }`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-medium text-slate-800">{gap.gap}</span>
                                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                        gap.severity === 'critical' ? 'bg-red-200 text-red-800' :
                                        gap.severity === 'high' ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700'
                                      }`}>{gap.severity}</span>
                                    </div>
                                    <p className="text-xs text-slate-600">{gap.detail}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Regional Insights */}
                          <div className="mt-4 pt-3 border-t border-purple-200">
                            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Regional Micro-Insights</h4>
                            <div className="space-y-2">
                              {community.microInsights.map((insight, idx) => (
                                <div key={idx} className="flex items-start gap-2 p-2 bg-blue-50 rounded border border-blue-100">
                                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <span className="text-xs font-medium text-slate-800">{insight.region}:</span>
                                    <span className="text-xs text-slate-600 ml-1">{insight.insight}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-3 text-xs text-slate-400">
                            Source: {community.source} • Data: {community.dataAge}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Intelligence Feed */}
            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900 text-lg">Global Intelligence Feed</h2>
                      <p className="text-xs text-slate-500">AI-curated news, legislation, best practices & regulatory updates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={runAIAnalysis}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                    >
                      <Brain className="w-4 h-4" />
                      AI Analysis
                    </button>
                    <div className="flex items-center gap-1 px-1 py-1 bg-slate-100 rounded-lg">
                      {[
                        { key: 'all', label: 'All' },
                        { key: 'legislation', label: 'Legislative' },
                        { key: 'regulatory', label: 'Regulatory' },
                        { key: 'best_practice', label: 'Best Practices' },
                        { key: 'news', label: 'News' },
                        { key: 'research', label: 'Research' },
                      ].map((filter) => (
                        <button
                          key={filter.key}
                          onClick={() => setIntelligenceFilter(filter.key)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            intelligenceFilter === filter.key
                              ? 'bg-white shadow-sm text-slate-900'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                      <RefreshCw className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Intelligence Items */}
              <div className="divide-y divide-slate-100">
                {filteredIntelligence.map((item) => (
                  <div
                    key={item.id}
                    className={`transition-all ${expandedIntelligence === item.id ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                  >
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedIntelligence(expandedIntelligence === item.id ? null : item.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Type Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIntelligenceTypeStyle(item.type)}`}>
                          {getIntelligenceTypeIcon(item.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getIntelligenceTypeStyle(item.type)}`}>
                              {item.type.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.region}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.date}
                            </span>
                            <span className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${getImpactStyle(item.impact)}`}>
                              {item.impact.toUpperCase()} IMPACT
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                          
                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            {item.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                {tag}
                              </span>
                            ))}
                            <span className="text-xs text-slate-400 ml-auto">Source: {item.source}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleSaveItem(item.id); }}
                            className={`p-2 rounded-lg transition-colors ${savedItems.includes(item.id) ? 'bg-amber-100 text-amber-600' : 'hover:bg-slate-100 text-slate-400'}`}
                          >
                            <Bookmark className={`w-4 h-4 ${savedItems.includes(item.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          {expandedIntelligence === item.id ? (
                            <ChevronUp className="w-5 h-5 text-slate-400 ml-2" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 ml-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Action Items */}
                    {expandedIntelligence === item.id && (
                      <div className="px-5 pb-5 pt-0">
                        <div className="ml-14 space-y-4">
                          {/* Source Link */}
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">Source: {item.source}</span>
                              </div>
                              <a 
                                href={item.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Source
                              </a>
                            </div>
                          </div>

                          {/* Action Items */}
                          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                              <h4 className="font-semibold text-sm text-slate-900">Recommended Actions</h4>
                            </div>
                            <ul className="space-y-2">
                              {item.actionItems.map((action, idx) => (
                                <li key={idx} className="flex items-center gap-3 group">
                                  <span className="w-5 h-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center flex-shrink-0 text-xs font-medium text-emerald-700">
                                    {idx + 1}
                                  </span>
                                  <span className="text-sm text-slate-700 flex-1">{action}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleCreateTask(item, action); }}
                                    className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded hover:bg-emerald-200 transition-all"
                                  >
                                    + Task
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-emerald-100">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleCreateTask(item, item.actionItems[0]); }}
                                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Create Task
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAddToReport(item); }}
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                              >
                                <FileText className="w-4 h-4" />
                                Add to Report
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAssignTeam(item); }}
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                              >
                                <Users className="w-4 h-4" />
                                Assign to Team
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Feed Footer */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      AI-powered curation
                    </span>
                    <span>•</span>
                    <span>147 sources monitored</span>
                    <span>•</span>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors flex items-center gap-1">
                    View All Intelligence
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Agent Panel */}
          {showAgentPanel && (
            <div className="space-y-4">
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden sticky top-6 shadow-sm">
                <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold text-sm text-slate-900">AI Intelligence Agents</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Autonomous monitoring & analysis</p>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {agentTasks.map((agent) => (
                    <div key={agent.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIconLight(agent.status)}
                          <span className="text-sm font-medium text-slate-800">{agent.name}</span>
                        </div>
                        {agent.findings > 0 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                            {agent.findings} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {agent.lastRun}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          agent.type === 'political' ? 'bg-red-100 text-red-700' :
                          agent.type === 'geographic' ? 'bg-blue-100 text-blue-700' :
                          agent.type === 'social' ? 'bg-purple-100 text-purple-700' :
                          agent.type === 'cultural' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {agent.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-slate-100">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                    <Zap className="w-4 h-4" />
                    Run All Agents
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
                <h4 className="text-sm font-medium mb-3 text-slate-900">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm transition-colors flex items-center gap-2 text-slate-700">
                    <Search className="w-4 h-4 text-slate-500" />
                    Search legislation
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm transition-colors flex items-center gap-2 text-slate-700">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    Facility analysis
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm transition-colors flex items-center gap-2 text-slate-700">
                    <Shield className="w-4 h-4 text-slate-500" />
                    Compliance report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Task Creation Modal */}
      {showTaskModal && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-blue-50">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Task Created Successfully
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Task</label>
                  <p className="text-sm text-slate-900 mt-1">{currentItem.selectedAction}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Source Intelligence</label>
                  <p className="text-sm text-slate-700 mt-1">{currentItem.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Priority</label>
                    <p className={`text-sm mt-1 font-medium ${currentItem.impact === 'high' ? 'text-red-600' : currentItem.impact === 'medium' ? 'text-amber-600' : 'text-slate-600'}`}>
                      {currentItem.impact.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Due Date</label>
                    <p className="text-sm text-slate-900 mt-1">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <p className="text-sm text-emerald-800">
                    ✓ Task added to your task queue ({tasks.length} total tasks)
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => { setShowTaskModal(false); setCurrentItem(null); }}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => { setShowTaskModal(false); setCurrentItem(null); }}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                View All Tasks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Added to Report
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Intelligence Item</label>
                  <p className="text-sm text-slate-900 mt-1">{currentItem.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</label>
                    <p className="text-sm text-slate-700 mt-1 capitalize">{currentItem.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Impact</label>
                    <p className={`text-sm mt-1 font-medium ${currentItem.impact === 'high' ? 'text-red-600' : currentItem.impact === 'medium' ? 'text-amber-600' : 'text-slate-600'}`}>
                      {currentItem.impact.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-blue-800">
                    ✓ Added to compliance report ({reports.length} items in report)
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => { setShowReportModal(false); setCurrentItem(null); }}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => { setShowReportModal(false); setCurrentItem(null); }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Assign to Team
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Intelligence Item</label>
                  <p className="text-sm text-slate-900 mt-1">{currentItem.title}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">Select Team</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Compliance', 'Operations', 'Quality', 'Training', 'Legal', 'Leadership'].map(team => (
                      <button
                        key={team}
                        onClick={() => confirmAssignment(team, ['Team Lead'])}
                        className="px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-purple-50 hover:border-purple-300 transition-colors text-left"
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => { setShowAssignModal(false); setCurrentItem(null); }}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Panel */}
      {showAnalysisPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Intelligence Analysis
                </h3>
                <button
                  onClick={() => setShowAnalysisPanel(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <p className="text-indigo-100 text-sm mt-1">Comprehensive analysis of all intelligence items with prioritized actions</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                  <p className="text-slate-600 font-medium">Analyzing intelligence feed...</p>
                  <p className="text-slate-400 text-sm mt-1">Processing 10 items across 6 categories</p>
                </div>
              ) : aiAnalysis ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Executive Summary</h4>
                    <p className="text-slate-700">{aiAnalysis.summary}</p>
                  </div>

                  {/* Risk Assessment */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100 text-center">
                      <p className="text-2xl font-bold text-red-600">{aiAnalysis.riskAssessment.high}</p>
                      <p className="text-xs text-red-700">High Impact</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 text-center">
                      <p className="text-2xl font-bold text-amber-600">{aiAnalysis.riskAssessment.medium}</p>
                      <p className="text-xs text-amber-700">Medium Impact</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                      <p className="text-2xl font-bold text-slate-600">{aiAnalysis.riskAssessment.low}</p>
                      <p className="text-xs text-slate-600">Low Impact</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 text-center">
                      <p className="text-2xl font-bold text-indigo-600">{aiAnalysis.riskAssessment.overallRisk}</p>
                      <p className="text-xs text-indigo-700">Overall Risk</p>
                    </div>
                  </div>

                  {/* Prioritized Actions */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Prioritized Action Plan
                    </h4>
                    <div className="space-y-3">
                      {aiAnalysis.prioritizedActions.map((action, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white ${
                              action.priority === 1 ? 'bg-red-500' :
                              action.priority === 2 ? 'bg-orange-500' :
                              action.priority === 3 ? 'bg-amber-500' :
                              action.priority === 4 ? 'bg-blue-500' : 'bg-slate-500'
                            }`}>
                              {action.priority}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{action.category}</span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs text-slate-500">Due: {action.deadline}</span>
                              </div>
                              <p className="font-medium text-slate-900">{action.action}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs">
                                <span className="text-slate-500">Owner: <span className="text-slate-700">{action.owner}</span></span>
                                <span className="text-slate-500">Effort: <span className="text-slate-700">{action.effort}</span></span>
                                <span className={`font-medium ${
                                  action.impact.includes('Critical') ? 'text-red-600' :
                                  action.impact.includes('High') ? 'text-amber-600' : 'text-slate-600'
                                }`}>{action.impact}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const item = globalIntelligenceFeed.find(i => action.relatedItems.includes(i.id));
                                if (item) handleCreateTask(item, action.action);
                              }}
                              className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              Create Task
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {aiAnalysis.keyInsights.map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-amber-50 rounded-lg p-3 border border-amber-100">
                          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50">
              <p className="text-xs text-slate-500">
                {aiAnalysis ? `Analysis generated: ${new Date(aiAnalysis.generatedAt).toLocaleString()}` : ''}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAnalysisPanel(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={runAIAnalysis}
                  disabled={isAnalyzing}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  Refresh Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 backdrop-blur-xl bg-white/90">
        <div className="max-w-[1800px] mx-auto px-6 py-2 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span>Last sync: {new Date().toLocaleTimeString()}</span>
            <span>6 AI agents active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>LEP Population: 3.25M across service area</span>
            <span>Coverage: IL • WI • NC • SC • GA • AL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LEPCommunityIntelligencePlatform;
