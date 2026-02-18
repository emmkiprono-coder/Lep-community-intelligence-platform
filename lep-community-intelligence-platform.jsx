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

const stateData = [
  { state: 'IL', score: 82, risk: 'low', population: '1.15M LEP (9%)', trend: 'up' },
  { state: 'WI', score: 78, risk: 'low', population: '265K LEP (4.5%)', trend: 'stable' },
  { state: 'NC', score: 71, risk: 'medium', population: '626K LEP (6%)', trend: 'up' },
  { state: 'SC', score: 65, risk: 'medium', population: '256K LEP (5%)', trend: 'watch' },
  { state: 'GA', score: 68, risk: 'medium', population: '750K LEP (7%)', trend: 'up' },
  { state: 'AL', score: 62, risk: 'high', population: '202K LEP (4%)', trend: 'watch' },
];

const politicalAlerts = [
  { id: 1, severity: 'critical', category: 'Legislative', title: 'Federal Workforce Equity Executive Order Review', description: 'New guidance expected on federal contractor workforce requirements. Impact assessment needed for grant-funded programs.', date: '2 hours ago', states: ['All'], action: 'Review compliance posture' },
  { id: 2, severity: 'warning', category: 'State Policy', title: 'NC HB 237 - Language Access Amendment', description: 'Proposed changes to interpreter certification requirements in healthcare settings.', date: '1 day ago', states: ['NC'], action: 'Monitor committee vote' },
  { id: 3, severity: 'info', category: 'Regulatory', title: 'CMS Language Access Update', description: 'Section 1557 enforcement guidance clarification published.', date: '3 days ago', states: ['All'], action: 'Update training materials' },
  { id: 4, severity: 'warning', category: 'State Policy', title: 'GA Senate Resolution on Healthcare Equity', description: 'Resolution supporting language access funding under consideration.', date: '5 days ago', states: ['GA'], action: 'Prepare testimony' },
];

const culturalIntelligence = [
  { community: 'Hispanic/Latino', growth: '+12%', languages: ['Spanish', 'Portuguese'], facilities: 45, satisfaction: 87, needs: 'Extended hours interpretation' },
  { community: 'Asian/Pacific Islander', growth: '+8%', languages: ['Vietnamese', 'Mandarin', 'Tagalog', 'Korean'], facilities: 38, satisfaction: 82, needs: 'Written translation materials' },
  { community: 'African Immigrant', growth: '+15%', languages: ['Swahili', 'Amharic', 'French', 'Arabic'], facilities: 28, satisfaction: 79, needs: 'Cultural competency training' },
  { community: 'Deaf/Hard of Hearing', growth: '+3%', languages: ['ASL', 'Tactile ASL'], facilities: 52, satisfaction: 91, needs: 'VRI technology upgrades' },
  { community: 'Refugee Populations', growth: '+22%', languages: ['Dari', 'Pashto', 'Ukrainian', 'Burmese'], facilities: 15, satisfaction: 74, needs: 'Trauma-informed interpretation' },
];

const globalIntelligenceFeed = [
  {
    id: 1,
    type: 'regulatory',
    region: 'US Federal',
    title: 'HHS Section 1557 Language Access Requirements - July 2025 Deadline',
    summary: 'By July 5, 2025, covered entities must adopt written policies and procedures for language assistance services and train staff. The December 2024 Dear Colleague letter reiterates that self-identification as bilingual is insufficient - qualified interpreter standards must be met.',
    source: 'HHS Office for Civil Rights',
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
    date: 'Current Research',
    impact: 'medium',
    tags: ['Research', 'Outcomes', 'ROI', 'Evidence Base'],
    actionItems: ['Incorporate into leadership business case', 'Update training materials with evidence', 'Track readmission rates by language']
  }
];

const economicMetrics = [
  { metric: 'Cost Avoidance (YTD)', value: '$17.59M', change: '+23%', icon: DollarSign },
  { metric: 'Vendor Consolidation Savings', value: '$4.2M', change: '+18%', icon: TrendingUp },
  { metric: 'LEP Patient Revenue Protected', value: '$89M', change: '+12%', icon: Shield },
  { metric: 'Compliance Fine Avoidance', value: '$2.1M', change: 'N/A', icon: Scale },
];

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

export default function LEPCommunityIntelligencePlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedState, setSelectedState] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const [notifications, setNotifications] = useState(4);
  const [intelligenceFilter, setIntelligenceFilter] = useState('all');
  const [expandedIntelligence, setExpandedIntelligence] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

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

              <button className="relative p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors">
                <Bell className="w-5 h-5 text-slate-500" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-medium text-white">
                    {notifications}
                  </span>
                )}
              </button>

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
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              {economicMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <metric.icon className="w-5 h-5 text-emerald-600" />
                      {metric.change !== 'N/A' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                          {metric.change}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-semibold mb-1 text-slate-900">{metric.value}</p>
                    <p className="text-sm text-slate-500">{metric.metric}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Political Alerts Section */}
            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
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

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Trend Chart */}
              <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">Workforce & Access Program Performance</h3>
                    <p className="text-xs text-slate-500">12-month rolling metrics</p>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Workforce</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Leadership</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />Suppliers</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" />Community</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorWorkforce" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="colorLeadership" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#334155' }}
                    />
                    <Area type="monotone" dataKey="workforce" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorWorkforce)" />
                    <Area type="monotone" dataKey="leadership" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeadership)" />
                    <Line type="monotone" dataKey="suppliers" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="community" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">Multi-Dimensional Analysis</h3>
                    <p className="text-xs text-slate-500">Current vs Target Performance</p>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Current</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" />Target</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="Current" dataKey="current" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                    <Radar name="Target" dataKey="target" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Geographic & Cultural Intelligence */}
            <div className="grid grid-cols-2 gap-6">
              {/* State Analysis */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Geographic Risk Assessment</h3>
                      <p className="text-xs text-slate-500">State-by-state compliance scores</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {stateData.map((state) => (
                    <div
                      key={state.state}
                      onClick={() => setSelectedState(state.state === selectedState ? null : state.state)}
                      className={`p-4 hover:bg-slate-50 cursor-pointer transition-all ${selectedState === state.state ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-semibold text-sm text-slate-700">
                            {state.state}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">Score: {state.score}</span>
                              <span className={`text-xs font-medium ${getRiskColorLight(state.risk)}`}>● {state.risk} risk</span>
                            </div>
                            <p className="text-xs text-slate-500">{state.population}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {state.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                          {state.trend === 'stable' && <span className="text-slate-400">—</span>}
                          {state.trend === 'watch' && <Eye className="w-4 h-4 text-amber-500" />}
                          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                state.score >= 75 ? 'bg-emerald-500' :
                                state.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${state.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Intelligence */}
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Cultural Community Intelligence</h3>
                      <p className="text-xs text-slate-500">Population trends & service needs</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {culturalIntelligence.map((community, idx) => (
                    <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-sm text-slate-900">{community.community}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                              {community.growth} growth
                            </span>
                            <span className="text-xs text-slate-500">{community.facilities} facilities</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-emerald-600">{community.satisfaction}%</p>
                          <p className="text-xs text-slate-500">satisfaction</p>
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
                    <div className="flex items-center gap-1 px-1 py-1 bg-slate-100 rounded-lg">
                      {[
                        { key: 'all', label: 'All' },
                        { key: 'legislation', label: 'Legislative' },
                        { key: 'regulatory', label: 'Regulatory' },
                        { key: 'best_practice', label: 'Best Practices' },
                        { key: 'news', label: 'News' },
                        { key: 'research', label: 'Research' },
                        { key: 'rumor', label: 'Rumors' },
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
                        <div className="ml-14 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <h4 className="font-semibold text-sm text-slate-900">Recommended Actions</h4>
                          </div>
                          <ul className="space-y-2">
                            {item.actionItems.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-5 h-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center flex-shrink-0 text-xs font-medium text-emerald-700">
                                  {idx + 1}
                                </span>
                                <span className="text-sm text-slate-700">{action}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-2 mt-4">
                            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                              Create Task
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                              Add to Report
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                              Assign to Team
                            </button>
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
