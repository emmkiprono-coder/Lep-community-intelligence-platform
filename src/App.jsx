// LEP Community Intelligence Platform v2.0
// Enterprise Analytics for Language Access & Health Equity

import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Globe, Users, Heart, Bell, ChevronRight, MapPin, Gavel, FileText, ExternalLink, Share2, ChevronDown, Target, Calendar, ArrowRight, Briefcase, Accessibility, EyeOff, Ear, Shield, Lightbulb, Activity, XCircle } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// DATA: State Risk Assessment
// ═══════════════════════════════════════════════════════════════════════════════

const stateRiskAssessment = {
  IL: {
    score: 82, risk: 'low', population: '1.15M LEP', trend: 'up',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'adequate', detail: '85 FTE Spanish interpreters serving 892K Spanish LEP population', impact: 'low' },
      { factor: 'Policy Environment', status: 'favorable', detail: 'IL Language Access Act provides strong protections', impact: 'low' },
      { factor: 'Refugee Resettlement', status: 'elevated', detail: 'Chicago designated for 4,200 Afghan SIV arrivals in 2026', impact: 'medium' },
      { factor: 'Healthcare Facility Coverage', status: 'good', detail: '92% of facilities have 24/7 language access', impact: 'low' }
    ],
    considerations: [
      'Monitor Chicago sanctuary city policies for potential federal funding implications',
      'Polish interpreter capacity stable but aging workforce - succession planning needed',
      'Ukrainian community growing 23% YoY - proactive hiring recommended'
    ],
    microLocations: [
      { area: 'Chicago Metro', lepPop: 812000, coverage: 'High', gaps: ['Haitian Creole', 'Ukrainian'] },
      { area: 'Aurora/Elgin', lepPop: 125000, coverage: 'Medium', gaps: ['Arabic', 'Urdu'] },
      { area: 'Rockford', lepPop: 45000, coverage: 'Medium', gaps: ['Burmese', 'Karen'] }
    ]
  },
  WI: {
    score: 78, risk: 'low', population: '265K LEP', trend: 'stable',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'adequate', detail: 'Strong Hmong interpreter network', impact: 'low' },
      { factor: 'Policy Environment', status: 'neutral', detail: 'No state language access mandate', impact: 'medium' },
      { factor: 'Refugee Resettlement', status: 'stable', detail: 'Madison/Milwaukee receiving steady arrivals', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'good', detail: '88% facility coverage', impact: 'low' }
    ],
    considerations: [
      'Hmong community well-established with strong interpreter pipeline',
      'Somali population growing in Milwaukee - prioritize recruitment'
    ],
    microLocations: [
      { area: 'Milwaukee Metro', lepPop: 142000, coverage: 'High', gaps: ['Somali', 'Burmese'] },
      { area: 'Madison', lepPop: 48000, coverage: 'High', gaps: ['Arabic'] }
    ]
  },
  NC: {
    score: 71, risk: 'medium', population: '626K LEP', trend: 'up',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'strained', detail: 'Spanish interpreter ratio 1:8,200 LEP vs target 1:6,000', impact: 'medium' },
      { factor: 'Policy Environment', status: 'uncertain', detail: 'HB 237 could change interpreter certification requirements', impact: 'high' },
      { factor: 'Refugee Resettlement', status: 'elevated', detail: 'Charlotte receiving Venezuelan asylum seekers', impact: 'medium' },
      { factor: 'Healthcare Facility Coverage', status: 'adequate', detail: '84% coverage but rapid growth outpacing capacity', impact: 'medium' }
    ],
    considerations: [
      'HB 237 monitoring critical - may require additional certifications',
      'Charlotte metro LEP growth rate 8.2% YoY - fastest in footprint'
    ],
    microLocations: [
      { area: 'Charlotte Metro', lepPop: 285000, coverage: 'Medium', gaps: ['Spanish capacity', 'Haitian Creole'] },
      { area: 'Raleigh-Durham', lepPop: 165000, coverage: 'Medium', gaps: ['Vietnamese', 'Chinese'] }
    ]
  },
  SC: {
    score: 65, risk: 'medium', population: '256K LEP', trend: 'watch',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'limited', detail: 'Heavy reliance on vendor services (42%)', impact: 'high' },
      { factor: 'Policy Environment', status: 'challenging', detail: 'No state language access protections', impact: 'medium' },
      { factor: 'Refugee Resettlement', status: 'moderate', detail: 'Growing Venezuelan population', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'limited', detail: '72% coverage; Upstate underserved', impact: 'high' }
    ],
    considerations: [
      'Internal interpreter hiring should be priority',
      'Greenville-Spartanburg manufacturing sector attracting diverse workforce'
    ],
    microLocations: [
      { area: 'Charleston Metro', lepPop: 85000, coverage: 'Medium', gaps: ['Spanish', 'Vietnamese'] },
      { area: 'Greenville-Spartanburg', lepPop: 78000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese'] }
    ]
  },
  GA: {
    score: 68, risk: 'medium', population: '750K LEP', trend: 'up',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'strained', detail: 'Korean and Vietnamese capacity gaps in Atlanta', impact: 'medium' },
      { factor: 'Policy Environment', status: 'supportive', detail: 'Senate resolution on healthcare equity under consideration', impact: 'low' },
      { factor: 'Refugee Resettlement', status: 'high', detail: 'Atlanta is top 10 resettlement city', impact: 'high' },
      { factor: 'Healthcare Facility Coverage', status: 'adequate', detail: '81% coverage but demand exceeds capacity', impact: 'medium' }
    ],
    considerations: [
      'Clarkston "most diverse square mile in America" - requires 50+ language capacity',
      'Ethiopian/Eritrean community growing 18% YoY'
    ],
    microLocations: [
      { area: 'Atlanta Metro', lepPop: 525000, coverage: 'Medium', gaps: ['Korean', 'Vietnamese', 'Amharic'] },
      { area: 'Clarkston/Decatur', lepPop: 45000, coverage: 'Low', gaps: ['50+ languages'] }
    ]
  },
  AL: {
    score: 62, risk: 'high', population: '202K LEP', trend: 'watch',
    source: 'US Census Bureau ACS 2023',
    sourceUrl: 'https://data.census.gov/table/ACSDT5Y2023.B16001',
    dataAge: 'Released Dec 2024',
    riskFactors: [
      { factor: 'Interpreter Capacity', status: 'critical', detail: 'Only 4 staff interpreters; 68% vendor dependency', impact: 'high' },
      { factor: 'Policy Environment', status: 'restrictive', detail: 'English-only legislation history', impact: 'high' },
      { factor: 'Refugee Resettlement', status: 'low', detail: 'Minimal resettlement', impact: 'low' },
      { factor: 'Healthcare Facility Coverage', status: 'poor', detail: '58% coverage; heavy VRI/OPI reliance', impact: 'high' }
    ],
    considerations: [
      'Workforce development should be top priority',
      'Poultry processing corridor has concentrated Spanish LEP population'
    ],
    microLocations: [
      { area: 'Birmingham Metro', lepPop: 72000, coverage: 'Low', gaps: ['Spanish', 'Vietnamese'] },
      { area: 'Albertville-Gadsden', lepPop: 28000, coverage: 'Critical', gaps: ['Spanish'] }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// DATA: Social Determinants with English, LEP, D/HH, Blind
// ═══════════════════════════════════════════════════════════════════════════════

const socialDeterminants = {
  ALL: {
    poverty: { englishRate: 10.5, lepRate: 22.8, dhhRate: 19.2, blindRate: 24.5, source: 'ACS 2023' },
    uninsured: { englishRate: 7.8, lepRate: 28.4, dhhRate: 12.1, blindRate: 14.8, source: 'ACS 2023' },
    housingBurden: { englishRate: 29.5, lepRate: 54.6, dhhRate: 38.2, blindRate: 42.1, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 9.2, lepRate: 17.8, dhhRate: 14.5, blindRate: 18.2, source: 'Feeding America 2024' },
    transportation: { englishRate: 11.2, lepRate: 30.3, dhhRate: 22.8, blindRate: 45.2, source: 'ACS 2023' },
    employmentGap: { englishRate: 3.8, lepRate: 8.2, dhhRate: 12.5, blindRate: 28.4, source: 'BLS 2024' }
  },
  IL: {
    poverty: { englishRate: 10.2, lepRate: 18.2, dhhRate: 17.5, blindRate: 22.1, source: 'ACS 2023' },
    uninsured: { englishRate: 6.8, lepRate: 22.1, dhhRate: 9.8, blindRate: 11.2, source: 'ACS 2023' },
    housingBurden: { englishRate: 28.5, lepRate: 52.3, dhhRate: 35.2, blindRate: 38.5, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 8.2, lepRate: 15.8, dhhRate: 12.8, blindRate: 16.2, source: 'Feeding America 2024' },
    transportation: { englishRate: 10.5, lepRate: 28.4, dhhRate: 20.5, blindRate: 42.1, source: 'ACS 2023' },
    employmentGap: { englishRate: 3.5, lepRate: 7.8, dhhRate: 11.2, blindRate: 26.5, source: 'BLS 2024' }
  },
  WI: {
    poverty: { englishRate: 9.5, lepRate: 21.5, dhhRate: 18.2, blindRate: 23.5, source: 'ACS 2023' },
    uninsured: { englishRate: 4.2, lepRate: 19.8, dhhRate: 7.5, blindRate: 9.8, source: 'ACS 2023' },
    housingBurden: { englishRate: 26.2, lepRate: 48.2, dhhRate: 32.5, blindRate: 36.8, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 7.8, lepRate: 14.2, dhhRate: 11.5, blindRate: 15.2, source: 'Feeding America 2024' },
    transportation: { englishRate: 7.2, lepRate: 22.1, dhhRate: 18.2, blindRate: 38.5, source: 'ACS 2023' },
    employmentGap: { englishRate: 3.2, lepRate: 7.5, dhhRate: 10.8, blindRate: 25.2, source: 'BLS 2024' }
  },
  NC: {
    poverty: { englishRate: 12.1, lepRate: 24.8, dhhRate: 20.5, blindRate: 26.2, source: 'ACS 2023' },
    uninsured: { englishRate: 9.8, lepRate: 32.5, dhhRate: 14.2, blindRate: 16.8, source: 'ACS 2023' },
    housingBurden: { englishRate: 30.5, lepRate: 55.1, dhhRate: 40.2, blindRate: 44.5, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 10.8, lepRate: 18.4, dhhRate: 15.8, blindRate: 19.5, source: 'Feeding America 2024' },
    transportation: { englishRate: 12.8, lepRate: 31.2, dhhRate: 24.5, blindRate: 46.8, source: 'ACS 2023' },
    employmentGap: { englishRate: 4.2, lepRate: 8.8, dhhRate: 13.2, blindRate: 29.5, source: 'BLS 2024' }
  },
  SC: {
    poverty: { englishRate: 12.8, lepRate: 26.2, dhhRate: 21.5, blindRate: 27.8, source: 'ACS 2023' },
    uninsured: { englishRate: 11.2, lepRate: 35.8, dhhRate: 15.8, blindRate: 18.2, source: 'ACS 2023' },
    housingBurden: { englishRate: 32.1, lepRate: 58.4, dhhRate: 42.5, blindRate: 46.8, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 12.2, lepRate: 19.8, dhhRate: 16.8, blindRate: 20.5, source: 'Feeding America 2024' },
    transportation: { englishRate: 13.5, lepRate: 34.5, dhhRate: 26.2, blindRate: 48.5, source: 'ACS 2023' },
    employmentGap: { englishRate: 4.5, lepRate: 9.2, dhhRate: 14.5, blindRate: 30.8, source: 'BLS 2024' }
  },
  GA: {
    poverty: { englishRate: 12.5, lepRate: 22.4, dhhRate: 19.8, blindRate: 25.5, source: 'ACS 2023' },
    uninsured: { englishRate: 10.8, lepRate: 28.9, dhhRate: 13.5, blindRate: 15.8, source: 'ACS 2023' },
    housingBurden: { englishRate: 31.2, lepRate: 54.2, dhhRate: 39.5, blindRate: 43.8, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 10.5, lepRate: 17.2, dhhRate: 14.8, blindRate: 18.5, source: 'Feeding America 2024' },
    transportation: { englishRate: 12.2, lepRate: 29.8, dhhRate: 23.5, blindRate: 45.2, source: 'ACS 2023' },
    employmentGap: { englishRate: 4.1, lepRate: 8.5, dhhRate: 12.8, blindRate: 28.5, source: 'BLS 2024' }
  },
  AL: {
    poverty: { englishRate: 14.2, lepRate: 28.5, dhhRate: 22.8, blindRate: 29.5, source: 'ACS 2023' },
    uninsured: { englishRate: 8.5, lepRate: 38.2, dhhRate: 12.8, blindRate: 15.2, source: 'ACS 2023' },
    housingBurden: { englishRate: 29.8, lepRate: 61.5, dhhRate: 38.8, blindRate: 42.5, source: 'HUD CHAS 2023' },
    foodInsecurity: { englishRate: 12.8, lepRate: 21.4, dhhRate: 17.5, blindRate: 21.8, source: 'Feeding America 2024' },
    transportation: { englishRate: 10.8, lepRate: 35.8, dhhRate: 24.8, blindRate: 48.2, source: 'ACS 2023' },
    employmentGap: { englishRate: 4.8, lepRate: 9.8, dhhRate: 15.2, blindRate: 32.5, source: 'BLS 2024' }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// DATA: Political & Regulatory Intelligence
// ═══════════════════════════════════════════════════════════════════════════════

const politicalIntelligence = [
  {
    id: 1, severity: 'critical', category: 'Federal Regulatory',
    title: 'Section 1557 Compliance Deadline - July 5, 2025',
    summary: 'Covered entities must adopt written policies for language assistance, train staff, and meet qualified interpreter standards.',
    source: 'HHS Office for Civil Rights',
    sourceUrl: 'https://www.hhs.gov/civil-rights/for-individuals/section-1557/',
    date: 'Deadline: July 5, 2025',
    states: ['All'],
    actions: [
      { action: 'Audit interpreter qualification documentation', owner: 'HR/Compliance', deadline: 'March 2025', status: 'not_started' },
      { action: 'Update written language access policies', owner: 'Policy Team', deadline: 'May 2025', status: 'in_progress' },
      { action: 'Complete staff training on language access', owner: 'Training', deadline: 'June 2025', status: 'not_started' },
      { action: 'Implement interpreter verification process', owner: 'Operations', deadline: 'April 2025', status: 'not_started' }
    ],
    riskIfIgnored: 'OCR enforcement action, fines up to $100K per violation, CMS reimbursement risk',
    resources: ['Section 1557 Final Rule', 'OCR Dear Colleague Letter', 'Language Access Plan Template']
  },
  {
    id: 2, severity: 'critical', category: 'Accreditation',
    title: 'Joint Commission 2026 NPSGs - Language Access Integration',
    summary: 'Communication and language access now embedded in Goals 4 and 7. Hospitals must stratify quality data by preferred language.',
    source: 'Joint Commission',
    sourceUrl: 'https://www.jointcommission.org/standards/national-patient-safety-goals/',
    date: 'Effective: Jan 2026',
    states: ['All'],
    actions: [
      { action: 'Review Goals 4 and 7 requirements', owner: 'Quality', deadline: 'Q1 2025', status: 'in_progress' },
      { action: 'Implement language-stratified quality tracking', owner: 'Analytics', deadline: 'Q3 2025', status: 'not_started' },
      { action: 'Update safety protocols for language access', owner: 'Patient Safety', deadline: 'Q4 2025', status: 'not_started' }
    ],
    riskIfIgnored: 'Accreditation findings, conditions of participation risk',
    resources: ['2026 NPSG Manual', 'Language Stratification Guide']
  },
  {
    id: 3, severity: 'warning', category: 'State Legislation',
    title: 'NC HB 237 - Interpreter Certification Requirements',
    summary: 'Proposed changes would require additional certifications for medical interpreters. May increase costs and limit pool.',
    source: 'NC General Assembly',
    sourceUrl: 'https://www.ncleg.gov/',
    date: 'Committee Vote: March 2025',
    states: ['NC'],
    actions: [
      { action: 'Monitor committee vote and amendments', owner: 'Government Affairs', deadline: 'Ongoing', status: 'in_progress' },
      { action: 'Assess current interpreter certification levels', owner: 'HR', deadline: 'Feb 2025', status: 'not_started' },
      { action: 'Develop contingency staffing plan', owner: 'Operations', deadline: 'April 2025', status: 'not_started' }
    ],
    riskIfIgnored: 'Sudden interpreter shortages, compliance gaps',
    resources: ['HB 237 Bill Text', 'Certification Comparison Chart']
  },
  {
    id: 4, severity: 'warning', category: 'Federal Policy',
    title: 'Executive Order 13166 Review',
    summary: 'HHS and OCR instructed to review language access guidance. Title VI and Section 1557 remain legally binding.',
    source: 'Federal Register',
    sourceUrl: 'https://www.federalregister.gov/',
    date: 'Review Period: 2025',
    states: ['All'],
    actions: [
      { action: 'Monitor official channels for updates', owner: 'Compliance', deadline: 'Ongoing', status: 'in_progress' },
      { action: 'Maintain current compliance programs', owner: 'All', deadline: 'Ongoing', status: 'in_progress' },
      { action: 'Brief leadership on potential scenarios', owner: 'Government Affairs', deadline: 'Q1 2025', status: 'completed' }
    ],
    riskIfIgnored: 'Unprepared for policy shifts',
    resources: ['EO 13166 Text', 'Title VI Requirements']
  },
  {
    id: 5, severity: 'info', category: 'State Opportunity',
    title: 'GA Senate Resolution - Healthcare Equity Funding',
    summary: 'Resolution supporting language access funding under consideration. Potential grant opportunities.',
    source: 'GA Senate',
    sourceUrl: 'https://www.legis.ga.gov/',
    date: 'Session: 2025',
    states: ['GA'],
    actions: [
      { action: 'Prepare testimony in support', owner: 'Leadership', deadline: 'Feb 2025', status: 'in_progress' },
      { action: 'Develop grant proposal framework', owner: 'Finance', deadline: 'March 2025', status: 'not_started' }
    ],
    riskIfIgnored: 'Missed funding opportunity',
    resources: ['Resolution Text', 'Grant Proposal Template']
  },
  {
    id: 6, severity: 'critical', category: 'Enforcement',
    title: 'OCR Right of Access - 54 Actions, Aggressive Enforcement',
    summary: 'December 2025 settlement marks 54th enforcement action. OCR continues aggressive enforcement of 30-day access requirements.',
    source: 'HHS OCR',
    sourceUrl: 'https://www.hhs.gov/ocr/',
    date: 'Ongoing',
    states: ['All'],
    actions: [
      { action: 'Audit medical records request response times', owner: 'HIM', deadline: 'Q1 2025', status: 'in_progress' },
      { action: 'Review and update ROI procedures', owner: 'Compliance', deadline: 'Q1 2025', status: 'not_started' },
      { action: 'Implement tracking dashboard', owner: 'IT', deadline: 'Q2 2025', status: 'not_started' }
    ],
    riskIfIgnored: 'OCR investigation, settlements averaging $50K-$200K',
    resources: ['OCR Enforcement Actions List', 'ROI Best Practices']
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DATA: Cultural Community Intelligence
// ═══════════════════════════════════════════════════════════════════════════════

const culturalIntelligence = {
  'Hispanic/Latino': {
    growth: '+12%', languages: ['Spanish', 'Portuguese'], facilities: 45, satisfaction: 87,
    needs: 'Extended hours interpretation',
    source: 'Census Bureau + Internal Surveys', dataAge: 'Q4 2024',
    population: { total: 2850000, lepSubset: 1420000 },
    healthConsiderations: [
      'Higher diabetes prevalence (12.5% vs 7.5%) - chronic care interpretation critical',
      'Lower health insurance rates (18% uninsured) - navigation assistance needed',
      'Cultural preference for family involvement in care decisions',
      'Curanderismo practices may coexist with Western medicine'
    ],
    serviceGaps: [
      { gap: 'After-hours coverage', severity: 'high', detail: 'Only 45% facilities have Spanish after 6pm' },
      { gap: 'Pediatric specialists', severity: 'medium', detail: 'Wait times 3x longer for interpreted visits' },
      { gap: 'Mental health services', severity: 'high', detail: 'Stigma + limited providers = significant gap' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Mexican and Puerto Rican communities have dialectal differences' },
      { region: 'NC - Charlotte', insight: 'Central American population growing - Guatemalan Maya languages emerging' },
      { region: 'GA - Atlanta', insight: 'Venezuelan asylum seekers bringing acute mental health needs' }
    ]
  },
  'Deaf/Hard of Hearing': {
    growth: '+3%', languages: ['ASL', 'Tactile ASL', 'ProTactile'], facilities: 52, satisfaction: 91,
    needs: 'VRI technology upgrades',
    source: 'Gallaudet Research Institute + HLAA', dataAge: 'Q4 2024',
    population: { total: 4540000, deafSigners: 285000, hardOfHearing: 4120000, deafBlind: 16000 },
    healthConsiderations: [
      'Visual access to interpreter REQUIRED - phone interpretation impossible',
      'Many Deaf individuals have limited English literacy',
      'DeafBlind patients require specialized tactile interpreters',
      'CDIs needed for complex concepts'
    ],
    serviceGaps: [
      { gap: 'VRI quality', severity: 'high', detail: '40% of encounters have technical issues' },
      { gap: 'CDI availability', severity: 'critical', detail: 'Only 2 CDIs in entire 6-state footprint' },
      { gap: 'DeafBlind services', severity: 'critical', detail: 'No internal DeafBlind interpreters' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Strong Deaf community near ISDF alumni networks' },
      { region: 'GA - Atlanta', insight: 'GSD in Cave Spring creates regional Deaf hub' },
      { region: 'NC', insight: 'NCSD + ENCSD create two distinct Deaf community centers' }
    ]
  },
  'Asian/Pacific Islander': {
    growth: '+8%', languages: ['Vietnamese', 'Mandarin', 'Cantonese', 'Tagalog', 'Korean', 'Hindi'], facilities: 38, satisfaction: 82,
    needs: 'Written translation materials',
    source: 'Census Bureau + Community Health Assessments', dataAge: 'Q4 2024',
    population: { total: 1250000, lepSubset: 485000 },
    healthConsiderations: [
      'Hepatitis B prevalence in Chinese/Vietnamese communities',
      'Thalassemia screening relevant for Southeast Asian populations',
      'Traditional medicine integration common',
      'Strong emphasis on family honor - mental health stigma'
    ],
    serviceGaps: [
      { gap: 'Written materials', severity: 'high', detail: 'Only 35% of education in top 5 Asian languages' },
      { gap: 'Interpreter diversity', severity: 'medium', detail: 'Cantonese, Fujianese dialects underserved' },
      { gap: 'Elder care', severity: 'high', detail: 'Aging immigrants need geriatric-specialized interpreters' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Chinatown prefers Cantonese; suburbs are Mandarin-dominant' },
      { region: 'GA - Atlanta', insight: 'Korean community in Duluth highly organized' },
      { region: 'NC - Raleigh', insight: 'Vietnamese nail salon workers have occupational health needs' }
    ]
  },
  'African Immigrant': {
    growth: '+15%', languages: ['Swahili', 'Amharic', 'Tigrinya', 'French', 'Arabic', 'Somali'], facilities: 28, satisfaction: 79,
    needs: 'Cultural competency training',
    source: 'ACS + Refugee Resettlement Data', dataAge: 'Q3 2024',
    population: { total: 420000, lepSubset: 285000 },
    healthConsiderations: [
      'Refugee trauma histories common - trauma-informed care essential',
      'Sickle cell screening important for West African populations',
      'FGM-related health needs in Somali/Ethiopian communities',
      'Infectious disease screening for recent arrivals'
    ],
    serviceGaps: [
      { gap: 'Interpreter availability', severity: 'critical', detail: 'Tigrinya and Oromo extremely scarce' },
      { gap: 'Cultural training', severity: 'high', detail: 'Staff unfamiliar with naming conventions' },
      { gap: 'Trust building', severity: 'high', detail: 'Historical medical trauma affects engagement' }
    ],
    microInsights: [
      { region: 'GA - Clarkston', insight: 'Highest concentration of African refugees in Southeast' },
      { region: 'IL - Chicago', insight: 'Ethiopian in Uptown; Congolese in Rogers Park' },
      { region: 'WI - Milwaukee', insight: 'Somali Bantu have distinct dialect needs' }
    ]
  },
  'Refugee Populations': {
    growth: '+22%', languages: ['Dari', 'Pashto', 'Ukrainian', 'Burmese', 'Karen', 'Chin'], facilities: 15, satisfaction: 74,
    needs: 'Trauma-informed interpretation',
    source: 'State Dept WRAPS + Resettlement Reports', dataAge: 'Q4 2024',
    population: { total: 125000, annualArrivals: 18500 },
    healthConsiderations: [
      'PTSD and trauma nearly universal - interpreters need training',
      'Torture survivors may have specific triggers',
      'Chronic conditions often untreated during displacement',
      'Immunization catch-up required'
    ],
    serviceGaps: [
      { gap: 'Trauma-informed interpreters', severity: 'critical', detail: 'Only 12% have trauma training' },
      { gap: 'Rare language coverage', severity: 'high', detail: 'Dari, Pashto, Karen have <5 interpreters each' },
      { gap: 'Navigation support', severity: 'high', detail: 'US healthcare system overwhelming' }
    ],
    microInsights: [
      { region: 'IL - Chicago', insight: 'Afghan SIV families in suburbs - transportation barriers' },
      { region: 'WI - Madison', insight: 'Bhutanese community can mentor newer arrivals' },
      { region: 'GA - Clarkston', insight: 'Highest per-capita resettlement in nation' }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// DATA: Other Data
// ═══════════════════════════════════════════════════════════════════════════════

const STATE_DATA = {
  IL: { name: 'Illinois', lepPop: 1153125, encounters: 485000 },
  WI: { name: 'Wisconsin', lepPop: 265217, encounters: 112000 },
  NC: { name: 'North Carolina', lepPop: 626363, encounters: 245000 },
  SC: { name: 'South Carolina', lepPop: 255921, encounters: 98000 },
  GA: { name: 'Georgia', lepPop: 749833, encounters: 312000 },
  AL: { name: 'Alabama', lepPop: 201771, encounters: 78000 }
};

const DISPLACEMENT_ALERTS = [
  { id: 1, country: 'Haiti', language: 'Haitian Creole', severity: 'critical', displaced: '5.5M', projectedArrivals: 12500, affectedStates: ['IL', 'NC', 'GA'], reason: 'Gang violence, humanitarian crisis' },
  { id: 2, country: 'Venezuela', language: 'Spanish', severity: 'critical', displaced: '7.7M', projectedArrivals: 45000, affectedStates: ['IL', 'NC', 'SC', 'GA', 'AL'], reason: 'Economic collapse' },
  { id: 3, country: 'Sudan', language: 'Arabic/Tigrinya', severity: 'critical', displaced: '10.7M', projectedArrivals: 9200, affectedStates: ['IL', 'NC', 'GA'], reason: 'Civil war, famine' },
  { id: 4, country: 'DR Congo', language: 'French/Swahili', severity: 'critical', displaced: '7.2M', projectedArrivals: 6800, affectedStates: ['IL', 'NC', 'GA'], reason: 'Armed conflict' },
  { id: 5, country: 'Afghanistan', language: 'Dari/Pashto', severity: 'high', displaced: '6.4M', projectedArrivals: 8200, affectedStates: ['IL', 'WI', 'NC', 'GA'], reason: 'Taliban, SIV backlog' },
  { id: 6, country: 'Ukraine', language: 'Ukrainian/Russian', severity: 'high', displaced: '6.5M', projectedArrivals: 18000, affectedStates: ['IL', 'WI', 'NC'], reason: 'Ongoing conflict' },
  { id: 7, country: 'Burma/Myanmar', language: 'Burmese/Karen', severity: 'elevated', displaced: '2.6M', projectedArrivals: 4500, affectedStates: ['IL', 'WI', 'NC'], reason: 'Military coup' },
  { id: 8, country: 'Ethiopia', language: 'Amharic/Tigrinya', severity: 'elevated', displaced: '4.4M', projectedArrivals: 3200, affectedStates: ['IL', 'GA'], reason: 'Post-conflict' }
];

const DISABILITY_POPULATIONS = {
  IL: { deaf: 48000, hardOfHearing: 1050000, deafBlind: 2800, blindLowVision: 142000 },
  WI: { deaf: 22000, hardOfHearing: 475000, deafBlind: 1200, blindLowVision: 58000 },
  NC: { deaf: 38000, hardOfHearing: 825000, deafBlind: 2100, blindLowVision: 98000 },
  SC: { deaf: 18000, hardOfHearing: 435000, deafBlind: 950, blindLowVision: 52000 },
  GA: { deaf: 42000, hardOfHearing: 925000, deafBlind: 2400, blindLowVision: 112000 },
  AL: { deaf: 19000, hardOfHearing: 450000, deafBlind: 1100, blindLowVision: 55000 }
};

const executiveActions = [
  { id: 1, priority: 'critical', category: 'Compliance', action: 'Complete Section 1557 policy updates', deadline: 'May 2025', owner: 'Compliance', source: 'HHS OCR', progress: 25 },
  { id: 2, priority: 'critical', category: 'Compliance', action: 'Implement qualified interpreter verification', deadline: 'April 2025', owner: 'HR', source: 'Section 1557', progress: 10 },
  { id: 3, priority: 'critical', category: 'Accreditation', action: 'Deploy language-stratified quality tracking', deadline: 'Q3 2025', owner: 'Analytics', source: 'Joint Commission', progress: 5 },
  { id: 4, priority: 'high', category: 'Workforce', action: 'Hire 12 additional Spanish interpreters (NC/GA)', deadline: 'Q2 2025', owner: 'Talent Acquisition', source: 'Capacity Analysis', progress: 15 },
  { id: 5, priority: 'high', category: 'Workforce', action: 'Recruit Haitian Creole interpreters (4 FTE)', deadline: 'Q1 2025', owner: 'Talent Acquisition', source: 'Displacement Alert', progress: 0 },
  { id: 6, priority: 'high', category: 'Technology', action: 'Upgrade VRI infrastructure (AL priority)', deadline: 'Q2 2025', owner: 'IT', source: 'Coverage Gap', progress: 30 },
  { id: 7, priority: 'medium', category: 'Training', action: 'Trauma-informed certification (50 staff)', deadline: 'Q3 2025', owner: 'Training', source: 'Refugee Population', progress: 0 },
  { id: 8, priority: 'medium', category: 'Legislative', action: 'Monitor NC HB 237', deadline: 'Ongoing', owner: 'Gov Affairs', source: 'State Legislation', progress: 50 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function LEPCommunityIntelligencePlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSdohState, setSelectedSdohState] = useState('ALL');
  const [expandedPolitical, setExpandedPolitical] = useState(null);
  const [expandedCommunity, setExpandedCommunity] = useState(null);
  const [expandedRiskState, setExpandedRiskState] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const totalLEP = Object.values(STATE_DATA).reduce((sum, s) => sum + s.lepPop, 0);
  const totalEncounters = Object.values(STATE_DATA).reduce((sum, s) => sum + s.encounters, 0);
  const criticalAlerts = DISPLACEMENT_ALERTS.filter(a => a.severity === 'critical').length;
  const criticalActions = executiveActions.filter(a => a.priority === 'critical').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'actions', label: 'Actions', icon: Target },
    { id: 'political', label: 'Political', icon: Gavel },
    { id: 'geographic', label: 'Geographic', icon: Globe },
    { id: 'social', label: 'Social', icon: Heart },
    { id: 'cultural', label: 'Cultural', icon: Users },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'elevated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY CARDS
  // ─────────────────────────────────────────────────────────────────────────────

  const SummaryCards = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-2">
          <Users className="w-6 h-6 opacity-80" />
          <span className="text-xs px-2 py-1 rounded-full bg-white/20">6 States</span>
        </div>
        <p className="text-3xl font-bold">{(totalLEP / 1000000).toFixed(2)}M</p>
        <p className="text-sm opacity-80">LEP Population Served</p>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-2">
          <Activity className="w-6 h-6 opacity-80" />
          <span className="text-xs px-2 py-1 rounded-full bg-white/20">+4.8% YoY</span>
        </div>
        <p className="text-3xl font-bold">{(totalEncounters / 1000000).toFixed(2)}M</p>
        <p className="text-sm opacity-80">Annual Encounters</p>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-2">
          <AlertTriangle className="w-6 h-6 opacity-80" />
          <span className="text-xs px-2 py-1 rounded-full bg-white/20 animate-pulse">Urgent</span>
        </div>
        <p className="text-3xl font-bold">{criticalAlerts}</p>
        <p className="text-sm opacity-80">Critical Displacement Alerts</p>
      </div>
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-2">
          <Target className="w-6 h-6 opacity-80" />
          <span className="text-xs px-2 py-1 rounded-full bg-white/20">Action Required</span>
        </div>
        <p className="text-3xl font-bold">{criticalActions}</p>
        <p className="text-sm opacity-80">Critical Actions Pending</p>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // ACTIONS TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const ActionsTab = () => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-lg">Executive Action Dashboard</h2>
            <p className="text-sm text-slate-500">Consolidated actions from all intelligence sources</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {executiveActions.map((action) => (
          <div key={action.id} className={`p-5 hover:bg-slate-50 ${action.priority === 'critical' ? 'bg-red-50/30' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                action.priority === 'critical' ? 'bg-red-100' : action.priority === 'high' ? 'bg-orange-100' : 'bg-amber-100'
              }`}>
                <span className="text-sm font-bold text-slate-700">{action.id}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(action.priority)}`}>
                    {action.priority.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">{action.category}</span>
                  <span className="text-xs text-slate-400">from {action.source}</span>
                </div>
                <h3 className="font-medium text-slate-900 mb-2">{action.action}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-slate-500"><Calendar className="w-4 h-4" />{action.deadline}</span>
                  <span className="flex items-center gap-1 text-slate-500"><Briefcase className="w-4 h-4" />{action.owner}</span>
                </div>
              </div>
              <div className="w-32">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium">{action.progress}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${action.progress >= 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${action.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // POLITICAL TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const PoliticalTab = () => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <Gavel className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-lg">Political & Regulatory Intelligence</h2>
            <p className="text-sm text-slate-500">Click any item for detailed actions and resources</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {politicalIntelligence.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => setExpandedPolitical(expandedPolitical === item.id ? null : item.id)}
              className={`p-5 cursor-pointer hover:bg-slate-50 border-l-4 ${
                item.severity === 'critical' ? 'border-l-red-500' : item.severity === 'warning' ? 'border-l-amber-500' : 'border-l-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                      {item.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">{item.category}</span>
                    <span className="text-xs text-slate-400">• {item.date}</span>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.summary}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{item.states.join(', ')}</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedPolitical === item.id ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {expandedPolitical === item.id && (
              <div className="bg-slate-50 border-t border-slate-200 p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" /> Required Actions
                    </h4>
                    <div className="space-y-2">
                      {item.actions.map((action, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-medium text-slate-800">{action.action}</p>
                            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(action.status)}`}>
                              {action.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>Owner: {action.owner}</span><span>•</span><span>Due: {action.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" /> Risk if Ignored
                    </h4>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-red-800">{item.riskIfIgnored}</p>
                    </div>
                    <h4 className="font-semibold text-slate-900 mt-4 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" /> Resources
                    </h4>
                    <div className="space-y-2">
                      {item.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                          <ExternalLink className="w-3 h-3" />{resource}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" /> Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" /> Add to Calendar
                      </button>
                      <button className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" /> Share with Team
                      </button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                        <ExternalLink className="w-4 h-4" /> View Source: {item.source}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // GEOGRAPHIC TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const GeographicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stateRiskAssessment).map(([code, state]) => (
          <div
            key={code}
            onClick={() => setExpandedRiskState(expandedRiskState === code ? null : code)}
            className={`bg-white rounded-xl border-2 p-4 cursor-pointer hover:shadow-lg transition-all ${
              expandedRiskState === code ? 'border-blue-500 ring-2 ring-blue-100' :
              state.risk === 'high' ? 'border-red-200' : state.risk === 'medium' ? 'border-amber-200' : 'border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                  state.risk === 'high' ? 'bg-red-100 text-red-700' : state.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>{code}</div>
                <div>
                  <p className="font-semibold text-slate-900">{STATE_DATA[code].name}</p>
                  <p className="text-xs text-slate-500">{state.population}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{state.score}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  state.risk === 'high' ? 'bg-red-100 text-red-700' : state.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>{state.risk} risk</span>
              </div>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${state.score >= 75 ? 'bg-emerald-500' : state.score >= 65 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${state.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {expandedRiskState && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-blue-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" /> {STATE_DATA[expandedRiskState].name} - Detailed Risk Assessment
            </h3>
            <button onClick={() => setExpandedRiskState(null)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-5 h-5" /></button>
          </div>
          <div className="p-6 grid lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Risk Factors</h4>
              <div className="space-y-2">
                {stateRiskAssessment[expandedRiskState].riskFactors.map((factor, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    factor.impact === 'high' ? 'bg-red-50 border-red-200' : factor.impact === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-slate-800">{factor.factor}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        factor.status === 'critical' || factor.status === 'poor' ? 'bg-red-200 text-red-800' :
                        factor.status === 'strained' || factor.status === 'limited' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
                      }`}>{factor.status}</span>
                    </div>
                    <p className="text-xs text-slate-600">{factor.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Micro-Location Analysis</h4>
              <div className="space-y-2">
                {stateRiskAssessment[expandedRiskState].microLocations.map((loc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-slate-800">{loc.area}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        loc.coverage === 'High' ? 'bg-emerald-100 text-emerald-700' : loc.coverage === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>{loc.coverage}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">LEP: {loc.lepPop.toLocaleString()}</p>
                    <div className="flex flex-wrap gap-1">
                      {loc.gaps.map((gap, i) => (
                        <span key={i} className="text-xs px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">{gap}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Key Considerations</h4>
              <div className="space-y-2">
                {stateRiskAssessment[expandedRiskState].considerations.map((c, idx) => (
                  <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">{c}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <a href={stateRiskAssessment[expandedRiskState].sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <ExternalLink className="w-4 h-4" /> Source: {stateRiskAssessment[expandedRiskState].source}
                </a>
                <p className="text-xs text-slate-400 mt-1">{stateRiskAssessment[expandedRiskState].dataAge}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Global Displacement Alerts</h2>
              <p className="text-sm text-slate-500">UNHCR data • Projected arrivals to service area</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {DISPLACEMENT_ALERTS.map((alert) => (
            <div key={alert.id} className={`rounded-xl p-4 border-2 ${
              alert.severity === 'critical' ? 'bg-red-50 border-red-200' : alert.severity === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900">{alert.country}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(alert.severity)}`}>{alert.severity}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">{alert.language}</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Displaced:</span><span className="font-medium">{alert.displaced}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Projected:</span><span className="font-medium">{alert.projectedArrivals.toLocaleString()}</span></div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {alert.affectedStates.map(state => (
                  <span key={state} className="text-xs px-1.5 py-0.5 bg-white/80 rounded border border-slate-200">{state}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // SOCIAL TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const SocialTab = () => {
    const sdohData = socialDeterminants[selectedSdohState];
    const labels = {
      poverty: 'Poverty Rate', uninsured: 'Uninsured', housingBurden: 'Housing Cost Burden',
      foodInsecurity: 'Food Insecurity', transportation: 'Transportation Barriers', employmentGap: 'Unemployment Gap'
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 text-lg">Social Determinants of Health Disparities</h2>
                  <p className="text-sm text-slate-500">Comparing English, LEP, Deaf/HH, and Blind populations</p>
                </div>
              </div>
              <select value={selectedSdohState} onChange={(e) => setSelectedSdohState(e.target.value)} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium">
                <option value="ALL">All States Combined</option>
                <option value="IL">Illinois</option>
                <option value="WI">Wisconsin</option>
                <option value="NC">North Carolina</option>
                <option value="SC">South Carolina</option>
                <option value="GA">Georgia</option>
                <option value="AL">Alabama</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-6 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-400" /><span className="text-sm text-slate-600">English Proficient</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500" /><span className="text-sm text-slate-600">LEP</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-500" /><span className="text-sm text-slate-600">Deaf/Hard of Hearing</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-purple-500" /><span className="text-sm text-slate-600">Blind/Low Vision</span></div>
            </div>
            <div className="space-y-6">
              {Object.entries(sdohData).map(([key, data]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{labels[key]}</span>
                    <span className="text-xs text-slate-400">{data.source}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs"><span className="text-slate-500">English</span><span className="font-medium">{data.englishRate}%</span></div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-400 rounded-full" style={{ width: `${data.englishRate}%` }} /></div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs"><span className="text-slate-500">LEP</span><span className="font-medium text-red-600">{data.lepRate}%</span></div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{ width: `${data.lepRate}%` }} /></div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs"><span className="text-slate-500">D/HH</span><span className="font-medium text-blue-600">{data.dhhRate}%</span></div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.dhhRate}%` }} /></div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs"><span className="text-slate-500">Blind/LV</span><span className="font-medium text-purple-600">{data.blindRate}%</span></div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.blindRate}%` }} /></div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700">LEP +{(data.lepRate - data.englishRate).toFixed(1)}%</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">D/HH +{(data.dhhRate - data.englishRate).toFixed(1)}%</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700">Blind +{(data.blindRate - data.englishRate).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Sources: US Census Bureau ACS 2023, HUD CHAS 2023, Feeding America 2024, Bureau of Labor Statistics 2024
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Accessibility className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Disability Population Overview</h2>
                <p className="text-sm text-slate-500">Deaf, Hard of Hearing, DeafBlind, and Blind/Low Vision by State</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <Ear className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.deaf, 0).toLocaleString()}</p>
                <p className="text-sm text-blue-600">Deaf (ASL Users)</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{(Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.hardOfHearing, 0) / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-purple-600">Hard of Hearing</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                <EyeOff className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-amber-700">{Object.values(DISABILITY_POPULATIONS).reduce((sum, d) => sum + d.blindLowVision, 0).toLocaleString()}</p>
                <p className="text-sm text-amber-600">Blind/Low Vision</p>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">State</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Deaf</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Hard of Hearing</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">DeafBlind</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Blind/Low Vision</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(DISABILITY_POPULATIONS).map(([state, data]) => (
                  <tr key={state} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{state}</td>
                    <td className="py-3 px-4 text-right text-blue-600">{data.deaf.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-purple-600">{data.hardOfHearing.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-red-600">{data.deafBlind.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-amber-600">{data.blindLowVision.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-xs text-slate-500">Source: Gallaudet Research Institute, HLAA, American Foundation for the Blind • Q4 2024</div>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CULTURAL TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const CulturalTab = () => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-lg">Cultural Community Intelligence</h2>
            <p className="text-sm text-slate-500">Click for health considerations, service gaps, and regional insights</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {Object.entries(culturalIntelligence).map(([name, community]) => (
          <div key={name}>
            <div onClick={() => setExpandedCommunity(expandedCommunity === name ? null : name)} className={`p-5 cursor-pointer hover:bg-slate-50 ${expandedCommunity === name ? 'bg-purple-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">{community.growth} growth</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {community.languages.slice(0, 5).map((lang, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{lang}</span>
                    ))}
                  </div>
                  <p className="text-sm text-amber-600">↳ Priority: {community.needs}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{community.satisfaction}%</p>
                    <p className="text-xs text-slate-500">satisfaction</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCommunity === name ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
            {expandedCommunity === name && (
              <div className="bg-purple-50 border-t border-purple-100 p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> Health Considerations</h4>
                    <div className="space-y-2">
                      {community.healthConsiderations.map((hc, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
                          <p className="text-sm text-slate-700">{hc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Service Gaps</h4>
                    <div className="space-y-2">
                      {community.serviceGaps.map((gap, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${gap.severity === 'critical' ? 'bg-red-50 border-red-200' : gap.severity === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-slate-800">{gap.gap}</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${getSeverityColor(gap.severity)}`}>{gap.severity}</span>
                          </div>
                          <p className="text-xs text-slate-600">{gap.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Regional Insights</h4>
                    <div className="space-y-2">
                      {community.microInsights.map((insight, idx) => (
                        <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs font-medium text-blue-800 mb-1">{insight.region}</p>
                          <p className="text-sm text-slate-700">{insight.insight}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-purple-200 text-xs text-slate-500">
                      Source: {community.source} • {community.dataAge}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // OVERVIEW TAB
  // ─────────────────────────────────────────────────────────────────────────────

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Critical Actions Requiring Attention
          </h3>
          <button onClick={() => setActiveTab('actions')} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {executiveActions.filter(a => a.priority === 'critical').map((action) => (
            <div key={action.id} className="bg-white rounded-lg p-4 border border-red-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{action.action}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span>{action.owner}</span><span>•</span><span>{action.deadline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Gavel className="w-5 h-5 text-red-500" /> Political & Regulatory</h3>
            <button onClick={() => setActiveTab('political')} className="text-xs text-blue-600 hover:underline">View</button>
          </div>
          <div className="space-y-2">
            {politicalIntelligence.slice(0, 3).map((item) => (
              <div key={item.id} className={`p-3 rounded-lg border-l-4 ${item.severity === 'critical' ? 'bg-red-50 border-l-red-500' : item.severity === 'warning' ? 'bg-amber-50 border-l-amber-500' : 'bg-blue-50 border-l-blue-500'}`}>
                <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.title}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-500" /> Geographic Risk</h3>
            <button onClick={() => setActiveTab('geographic')} className="text-xs text-blue-600 hover:underline">View</button>
          </div>
          <div className="space-y-2">
            {Object.entries(stateRiskAssessment).sort(([,a], [,b]) => a.score - b.score).slice(0, 3).map(([code, state]) => (
              <div key={code} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${state.risk === 'high' ? 'bg-red-100 text-red-700' : state.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{code}</span>
                  <span className="text-sm text-slate-700">{STATE_DATA[code].name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${state.risk === 'high' ? 'bg-red-100 text-red-700' : state.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{state.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Displacement Alerts</h3>
            <button onClick={() => setActiveTab('geographic')} className="text-xs text-blue-600 hover:underline">View</button>
          </div>
          <div className="space-y-2">
            {DISPLACEMENT_ALERTS.filter(a => a.severity === 'critical').slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">{alert.country}</p>
                  <p className="text-xs text-slate-500">{alert.language}</p>
                </div>
                <span className="text-sm font-bold text-red-600">{alert.projectedArrivals.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Heart className="w-5 h-5 text-purple-500" /> SDOH Disparity Snapshot</h3>
          <button onClick={() => setActiveTab('social')} className="text-xs text-blue-600 hover:underline">View Full Analysis</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Uninsured', english: socialDeterminants.ALL.uninsured.englishRate, lep: socialDeterminants.ALL.uninsured.lepRate },
            { label: 'Poverty', english: socialDeterminants.ALL.poverty.englishRate, lep: socialDeterminants.ALL.poverty.lepRate },
            { label: 'Housing Burden', english: socialDeterminants.ALL.housingBurden.englishRate, lep: socialDeterminants.ALL.housingBurden.lepRate },
            { label: 'Transportation', english: socialDeterminants.ALL.transportation.englishRate, lep: socialDeterminants.ALL.transportation.lepRate },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-4 bg-gradient-to-b from-purple-50 to-white rounded-lg border border-purple-100">
              <p className="text-xs text-slate-500 mb-2">{item.label}</p>
              <div className="flex items-end justify-center gap-2">
                <div><p className="text-xl font-bold text-slate-400">{item.english}%</p><p className="text-xs text-slate-400">English</p></div>
                <ArrowRight className="w-4 h-4 text-slate-300 mb-2" />
                <div><p className="text-xl font-bold text-red-600">{item.lep}%</p><p className="text-xs text-red-600">LEP</p></div>
              </div>
              <p className="text-xs text-red-500 mt-2 font-medium">+{(item.lep - item.english).toFixed(1)}% gap</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">LEP Community Intelligence Platform</h1>
                <p className="text-sm text-slate-500">Enterprise Analytics for Language Access & Health Equity</p>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">4</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50">
                  <div className="p-4 border-b border-slate-100"><h3 className="font-semibold text-slate-900">Notifications</h3></div>
                  <div className="divide-y divide-slate-100">
                    <div className="p-3 hover:bg-slate-50"><p className="text-sm font-medium text-slate-800">Section 1557 deadline approaching</p><p className="text-xs text-slate-500">5 months remaining</p></div>
                    <div className="p-3 hover:bg-slate-50"><p className="text-sm font-medium text-slate-800">Sudan displacement alert elevated</p><p className="text-xs text-slate-500">2 hours ago</p></div>
                    <div className="p-3 hover:bg-slate-50"><p className="text-sm font-medium text-slate-800">AL coverage gap critical</p><p className="text-xs text-slate-500">1 day ago</p></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <nav className="flex gap-1 mt-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <SummaryCards />
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'actions' && <ActionsTab />}
        {activeTab === 'political' && <PoliticalTab />}
        {activeTab === 'geographic' && <GeographicTab />}
        {activeTab === 'social' && <SocialTab />}
        {activeTab === 'cultural' && <CulturalTab />}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8 py-4 px-6">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-xs text-slate-500">
          <p>LEP Community Intelligence Platform v2.0 | Advocate Health Enterprise Language Services</p>
          <p>Data Sources: Census ACS 2023, UNHCR, HHS OCR, Joint Commission, Gallaudet, HLAA</p>
        </div>
      </footer>
    </div>
  );
}
