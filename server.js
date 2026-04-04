const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── DATA ───────────────────────────────────────────────
const ADMIN_USERS = [
  { username: 'kavin', password: 'kavin123', name: 'Kavin (Admin)' },
  { username: 'admin', password: 'admin123', name: 'Admin User' },
];

const RIDERS = {
  'SW-0011': { name: 'Arjun Sharma', platform: 'Swiggy', zone: 'Andheri West', claims: 3, premium: 282, risk: 'High', status: 'active', weeklyPremium: 47 },
  'ZM-0142': { name: 'Priya Nair', platform: 'Zomato', zone: 'Bandra East', claims: 1, premium: 188, risk: 'Low', status: 'active', weeklyPremium: 44 },
  'BL-0233': { name: 'Mohan Das', platform: 'Blinkit', zone: 'Kurla', claims: 2, premium: 235, risk: 'Medium', status: 'active', weeklyPremium: 47 },
  'SW-0044': { name: 'Keerthi R', platform: 'Swiggy', zone: 'Dadar', claims: 0, premium: 94, risk: 'Low', status: 'active', weeklyPremium: 44 },
  'ZM-9921': { name: 'Vijay Kumar', platform: 'Zomato', zone: 'Malad West', claims: 5, premium: 470, risk: 'Critical', status: 'flagged', weeklyPremium: 54 },
  'SW-1022': { name: 'Roshni Mehta', platform: 'Swiggy', zone: 'Thane', claims: 2, premium: 188, risk: 'High', status: 'flagged', weeklyPremium: 51 },
  'BL-0511': { name: 'Anand Pillai', platform: 'Blinkit', zone: 'Andheri West', claims: 1, premium: 141, risk: 'Medium', status: 'active', weeklyPremium: 47 },
  'ZM-0602': { name: 'Sunita Rao', platform: 'Zomato', zone: 'Kurla', claims: 4, premium: 376, risk: 'Medium', status: 'active', weeklyPremium: 47 },
  'SW-0713': { name: 'Deepak Singh', platform: 'Swiggy', zone: 'Bandra East', claims: 0, premium: 47, risk: 'Low', status: 'inactive', weeklyPremium: 44 },
  'BL-3341': { name: 'Farhan Qureshi', platform: 'Blinkit', zone: 'Dadar', claims: 8, premium: 752, risk: 'Critical', status: 'flagged', weeklyPremium: 54 },
  'ZM-0814': { name: 'Lakshmi Devi', platform: 'Zomato', zone: 'Malad West', claims: 2, premium: 188, risk: 'Low', status: 'active', weeklyPremium: 47 },
  'SW-0915': { name: 'Ravi Patil', platform: 'Swiggy', zone: 'Thane', claims: 1, premium: 94, risk: 'Low', status: 'active', weeklyPremium: 44 },
};

const ZONE_DATA = {
  Mumbai: [
    { name: 'Andheri West', rain: 24, aqi: 142, wind: 18, riders: 412, status: 'critical', swarm: 'CLUSTER' },
    { name: 'Bandra East',  rain: 2,  aqi: 120, wind: 8,  riders: 285, status: 'normal',   swarm: '—' },
    { name: 'Kurla',        rain: 15, aqi: 198, wind: 22, riders: 337, status: 'warning',  swarm: 'SLOW' },
    { name: 'Dadar',        rain: 8,  aqi: 155, wind: 12, riders: 201, status: 'normal',   swarm: '—' },
    { name: 'Malad West',   rain: 22, aqi: 245, wind: 30, riders: 178, status: 'critical', swarm: 'CLUSTER' },
    { name: 'Thane',        rain: 0,  aqi: 88,  wind: 6,  riders: 156, status: 'normal',   swarm: '—' },
  ],
  Bengaluru: [
    { name: 'Koramangala', rain: 18, aqi: 160, wind: 25, riders: 510, status: 'warning',  swarm: 'SLOW' },
    { name: 'Whitefield',  rain: 3,  aqi: 95,  wind: 10, riders: 320, status: 'normal',   swarm: '—' },
    { name: 'HSR Layout',  rain: 26, aqi: 210, wind: 35, riders: 290, status: 'critical', swarm: 'CLUSTER' },
    { name: 'Indiranagar', rain: 5,  aqi: 108, wind: 12, riders: 380, status: 'normal',   swarm: '—' },
  ],
  Delhi: [
    { name: 'Connaught Place', rain: 0, aqi: 310, wind: 8,  riders: 450, status: 'critical', swarm: '—' },
    { name: 'Lajpat Nagar',   rain: 1, aqi: 285, wind: 10, riders: 360, status: 'warning',  swarm: 'SLOW' },
    { name: 'Noida Sec 62',   rain: 0, aqi: 195, wind: 6,  riders: 280, status: 'normal',   swarm: '—' },
  ],
  Hyderabad: [
    { name: 'Hitech City', rain: 12, aqi: 130, wind: 20, riders: 340, status: 'warning', swarm: 'SLOW' },
    { name: 'Ameerpet',    rain: 4,  aqi: 100, wind: 8,  riders: 270, status: 'normal',  swarm: '—' },
  ],
  Chennai: [
    { name: 'T Nagar',   rain: 30, aqi: 110, wind: 40, riders: 290, status: 'critical', swarm: 'CLUSTER' },
    { name: 'Anna Nagar',rain: 6,  aqi: 88,  wind: 15, riders: 210, status: 'normal',   swarm: '—' },
  ],
  Pune: [
    { name: 'Kothrud', rain: 14, aqi: 140, wind: 22, riders: 180, status: 'warning', swarm: 'SLOW' },
    { name: 'Wakad',   rain: 2,  aqi: 95,  wind: 9,  riders: 145, status: 'normal',  swarm: '—' },
  ],
};

const PAYOUTS = [
  { ref: 'TXN-8821', rider: 'SW-0011', name: 'Arjun Sharma',  platform: 'Swiggy',  trigger: 'Rain ≥20mm',   amt: 500,  time: '14:32:05', status: 'success' },
  { ref: 'TXN-8820', rider: 'BL-0511', name: 'Anand Pillai',  platform: 'Blinkit', trigger: 'Rain ≥20mm',   amt: 500,  time: '14:31:58', status: 'success' },
  { ref: 'TXN-8819', rider: 'ZM-0142', name: 'Priya Nair',    platform: 'Zomato',  trigger: 'Rain ≥12mm',   amt: 150,  time: '13:10:22', status: 'success' },
  { ref: 'TXN-8818', rider: 'BL-0233', name: 'Mohan Das',     platform: 'Blinkit', trigger: 'AQI ≥300',     amt: 500,  time: '12:45:11', status: 'success' },
  { ref: 'TXN-8817', rider: 'ZM-0602', name: 'Sunita Rao',    platform: 'Zomato',  trigger: 'Rain ≥12mm',   amt: 150,  time: '11:20:03', status: 'success' },
  { ref: 'TXN-8816', rider: 'SW-0915', name: 'Ravi Patil',    platform: 'Swiggy',  trigger: 'Swarm Cluster', amt: 250, time: '10:05:44', status: 'pending' },
  { ref: 'TXN-8815', rider: 'ZM-9921', name: 'Vijay Kumar',   platform: 'Zomato',  trigger: 'Rain ≥20mm',   amt: 500,  time: '09:55:31', status: 'held' },
];

const FRAUD_ALERTS = [
  { id: 'ZM-9921', type: 'Multi-Platform Login',       sev: 'critical', desc: 'Rider active on Zomato during Swiggy payout claim. Cross-platform activity within 30-min window.', time: '14:32:11', amt: 500 },
  { id: 'SW-1022', type: 'GPS Geofence Mismatch',      sev: 'high',     desc: 'Claimed disruption in Andheri West, GPS shows Navi Mumbai (23km away). Outside 500m tolerance.',   time: '13:45:07', amt: 150 },
  { id: 'BL-3341', type: 'Velocity Anomaly',           sev: 'medium',   desc: 'Rider claimed 3 separate trigger payouts in 4 hours across 3 different zones.',                    time: '11:20:44', amt: 1200 },
  { id: 'ZM-7712', type: 'Device Fingerprint Change',  sev: 'low',      desc: 'New device logged 15 min before trigger event. Previous device not seen for 8 days.',              time: '09:10:22', amt: 150 },
];

const CLUSTER_EVENTS = [
  { time: '14:20', zone: 'Andheri West', riders: 23, duration: '22min', payout: 5750,  status: 'processed' },
  { time: '11:45', zone: 'Kurla',        riders: 18, duration: '26min', payout: 4500,  status: 'processed' },
  { time: '09:30', zone: 'Malad West',   riders: 31, duration: '20min', payout: 7750,  status: 'processed' },
];

// ─── ROUTES ─────────────────────────────────────────────

// Login
app.post('/api/login', (req, res) => {
  const { role, username, password, riderId } = req.body;

  if (role === 'admin') {
    const user = ADMIN_USERS.find(u => u.username === username && u.password === password);
    if (user) return res.json({ success: true, redirect: '/admin.html', name: user.name });
    return res.json({ success: false, message: 'Invalid username or password.' });
  }

  if (role === 'rider') {
    const rider = RIDERS[riderId];
    if (rider) return res.json({ success: true, redirect: `/rider.html?id=${riderId}`, riderId, name: rider.name });
    return res.json({ success: false, message: 'Rider ID not found. Check your ID and try again.' });
  }

  res.json({ success: false, message: 'Unknown role.' });
});

// Analytics summary
app.get('/api/analytics', (req, res) => {
  const totalRiders = Object.keys(RIDERS).length;
  const activeRiders = Object.values(RIDERS).filter(r => r.status === 'active').length;
  const totalPremium = Object.values(RIDERS).reduce((s, r) => s + r.premium, 0);
  const totalClaims = PAYOUTS.filter(p => p.status === 'success').reduce((s, p) => s + p.amt, 0);
  const gwp = 586000;
  const lossRatio = ((totalClaims / gwp) * 100).toFixed(1);

  res.json({
    activePartners: 12482,
    weeklyGWP: 586000,
    claimsPaid: totalClaims,
    lossRatio: parseFloat(lossRatio),
    swarmEventsToday: 3,
    autoDisburseTime: 4.2,
    fraudAccuracy: 94.3,
  });
});

// Zone data
app.get('/api/zones/:city', (req, res) => {
  const city = req.params.city;
  const data = ZONE_DATA[city];
  if (!data) return res.status(404).json({ error: 'City not found' });
  res.json(data);
});

// All riders
app.get('/api/riders', (req, res) => {
  const list = Object.entries(RIDERS).map(([id, r]) => ({ id, ...r }));
  res.json(list);
});

// Single rider
app.get('/api/rider/:id', (req, res) => {
  const rider = RIDERS[req.params.id.toUpperCase()];
  if (!rider) return res.status(404).json({ error: 'Rider not found' });
  const myPayouts = PAYOUTS.filter(p => p.rider === req.params.id.toUpperCase());
  res.json({ id: req.params.id.toUpperCase(), ...rider, payouts: myPayouts });
});

// Payouts
app.get('/api/payouts', (req, res) => res.json(PAYOUTS));

// Fraud alerts
app.get('/api/fraud', (req, res) => res.json(FRAUD_ALERTS));

// Swarm cluster events
app.get('/api/swarm/events', (req, res) => res.json(CLUSTER_EVENTS));

// Swarm live metrics
app.get('/api/swarm/metrics', (req, res) => {
  res.json({
    totalRidersOnline: 847,
    stalledClusters: 3,
    autoDisburseToday: 18000,
    clusterEvents: CLUSTER_EVENTS,
  });
});

// Trigger a payout (admin action)
app.post('/api/trigger-payout', (req, res) => {
  const { zone, riderId } = req.body;
  if (!zone) return res.status(400).json({ error: 'Zone required' });
  res.json({
    success: true,
    ref: 'TXN-' + Math.floor(Math.random() * 9000 + 1000),
    zone,
    message: `Payout triggered for zone ${zone}`,
    timestamp: new Date().toISOString(),
  });
});

// Fraud action (suspend / investigate / clear)
app.post('/api/fraud/action', (req, res) => {
  const { riderId, action } = req.body;
  res.json({ success: true, riderId, action, timestamp: new Date().toISOString() });
});

// ML Pricing for a rider
app.get('/api/ml-pricing/:id', (req, res) => {
  const rider = RIDERS[req.params.id.toUpperCase()];
  if (!rider) return res.status(404).json({ error: 'Rider not found' });

  const riskMod   = { Low: -3, Medium: 0, High: 5, Critical: 8 }[rider.risk] || 0;
  const claimMod  = Math.min(rider.claims * 1, 6);
  const basePremium = 47;
  const finalPremium = basePremium + riskMod + claimMod;

  res.json({
    riderId: req.params.id.toUpperCase(),
    basePremium,
    riskModifier: riskMod,
    claimModifier: claimMod,
    finalPremium,
    factors: [
      { label: 'Zone Waterlog History', effect: +3 },
      { label: 'Current Rainfall Trend', effect: +2 },
      { label: 'Claim History',          effect: claimMod },
      { label: 'Risk Score',             effect: riskMod },
      { label: 'Long-term Rider Bonus',  effect: -3 },
    ],
  });
});

// Crash/sensor event
app.post('/api/sensor/crash', (req, res) => {
  const { riderId, gForce, event } = req.body;
  let claimAmt = 0;
  if (gForce >= 5.0)      claimAmt = 1500;
  else if (gForce >= 3.0) claimAmt = 500;
  else if (gForce >= 1.8) claimAmt = 200;

  res.json({
    success: true,
    riderId,
    event,
    gForce,
    claimTriggered: claimAmt > 0,
    claimAmount: claimAmt,
    ref: claimAmt > 0 ? 'TXN-' + Math.floor(Math.random() * 9000 + 1000) : null,
    processedIn: '4.2s',
  });
});

// Weekly stats
app.get('/api/stats/weekly', (req, res) => {
  res.json([
    { week: 'W1', gwp: 420, claims: 68 },
    { week: 'W2', gwp: 385, claims: 55 },
    { week: 'W3', gwp: 510, claims: 92 },
    { week: 'W4', gwp: 448, claims: 71 },
    { week: 'W5', gwp: 520, claims: 88 },
    { week: 'W6', gwp: 490, claims: 95 },
    { week: 'W7', gwp: 565, claims: 102 },
    { week: 'W8', gwp: 586, claims: 112 },
  ]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime().toFixed(0) + 's', timestamp: new Date().toISOString() });
});

// Fallback
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

app.listen(PORT, () => {
  console.log(`\n🛡️  Kavach.ai backend running at http://localhost:${PORT}`);
  console.log(`   Admin login : kavin / kavin123`);
  console.log(`   Rider login : SW-0011  or  ZM-0142\n`);
});