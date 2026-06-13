(function () {
  "use strict";

  var HOURLY_RATE_DEFAULT = 38;

  var ICONS = {
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
    chart: '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7" rx="0.6"/><rect x="12" y="7" width="3" height="11" rx="0.6"/><rect x="17" y="4" width="3" height="14" rx="0.6"/>',
    support: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="m6.2 6.2 3.4 3.4M17.8 6.2l-3.4 3.4M6.2 17.8l3.4-3.4M17.8 17.8l-3.4-3.4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3 2"/>',
    logout: '<path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3"/><path d="m10 16 4-4-4-4M14 12H4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    alert: '<path d="M12 9v4.5M12 17h.01"/><path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    check: '<path d="M4.5 12.5 9 17 19.5 6.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    arrowRight: '<path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5"/>',
    arrowLeft: '<path d="M19.5 12h-15M11 18.5 4.5 12 11 5.5"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    chevronDown: '<path d="m5 9 7 7 7-7"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.6 20a6.4 6.4 0 0 1 12.8 0"/><path d="M16.5 5.4a3.2 3.2 0 0 1 0 6.2M17 20a6.4 6.4 0 0 0-2.5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 3.5v11M7.5 11l4.5 4.5L16.5 11"/><path d="M5 20.5h14"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    inbox: '<path d="M3 13.5h5l1.6 3h4.8l1.6-3H21"/><path d="M5.2 5h13.6l2.2 8.5V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5z"/>',
    dollar: '<path d="M12 2.5v19M16 6.5A4 4 0 0 0 12.5 5h-1.2a3.3 3.3 0 0 0-.3 6.6l2 .3a3.3 3.3 0 0 1-.3 6.6H11A4 4 0 0 1 7.6 17"/>',
    fileText: '<path d="M14 3.2v5h5"/><path d="M14 3.2H6.5a1 1 0 0 0-1 1v15.6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8.2z"/><path d="M9 13h6M9 16.5h6"/>',
    trendUp: '<path d="M3.5 16.5 9.5 10l4 4 7-7"/><path d="M20.5 11V7h-4"/>',
    activity: '<path d="M3 12h4l2.2-6.4 4.4 12.8L16 12h5"/>',
    shield: '<path d="M12 3.2 19.5 6v6c0 4.8-3.2 7.7-7.5 8.8C7.7 19.7 4.5 16.8 4.5 12V6z"/>',
    play: '<path d="M7.5 5v14l11-7z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    refresh: '<path d="M20.5 12a8.5 8.5 0 1 1-2.4-6L20.5 8.5"/><path d="M20.5 3v5.5H15"/>',
    spark: '<path d="M12 3l1.7 4.6L18.3 9l-4.6 1.4L12 15l-1.7-4.6L5.7 9l4.6-1.4z"/>',
    link: '<path d="m9.5 14.5 5-5"/><path d="M11 7.5 12 6.5a4 4 0 0 1 5.7 5.7l-1 1M13 16.5l-1 1A4 4 0 0 1 6.3 11.8l1-1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5 2 2 0 1 1-4 0 1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1 2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5 2 2 0 1 1 4 0 1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1 2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.5 1z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="1.6"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    boltSquare: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M13 7l-4 7h3l-1 3 4-7h-3z"/>',
    layers: '<path d="M12 2 2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
    ascend: '<path d="M8 16h12M8 12h9M8 8h6M4 5v14M4 5l-2 2M4 5l2 2"/>',
    descend: '<path d="M8 16h6M8 12h9M8 8h12M4 19V5M4 19l-2-2M4 19l2-2"/>',
    sortNone: '<path d="M8 9l-3-3-3 3M8 15l-3 3-3-3"/>'
  };

  function icon(name, extraClass) {
    var paths = ICONS[name] || "";
    return '<svg class="icon ' + (extraClass || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
  }

  var avatarPalette = ["#4F46E5", "#0EA5A4", "#D97706", "#DB2777", "#7C3AED", "#0284C7"];

  function initialsFor(fullName) {
    var words = fullName.trim().split(/\s+/);
    var first = words[0] ? words[0][0] : "";
    var second = words[1] ? words[1][0] : "";
    return (first + second).toUpperCase();
  }

  function colorFor(seed) {
    var total = 0;
    for (var index = 0; index < seed.length; index++) total += seed.charCodeAt(index);
    return avatarPalette[total % avatarPalette.length];
  }

  function avatar(fullName, seed) {
    var background = colorFor(seed || fullName);
    return '<span class="avatar" style="background:' + background + '">' + initialsFor(fullName) + "</span>";
  }

  function money(amount) {
    return "$" + Math.round(amount).toLocaleString("en-US");
  }

  function moneyCompact(amount) {
    if (amount >= 1000) return "$" + (Math.round(amount / 100) / 10).toLocaleString("en-US") + "k";
    return "$" + Math.round(amount).toLocaleString("en-US");
  }

  function decimal(value, places) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: places, maximumFractionDigits: places });
  }

  function percent(value) {
    return decimal(value, 1) + "%";
  }

  function relativeTime(minutesAgo) {
    if (minutesAgo < 1) return "just now";
    if (minutesAgo < 60) return Math.round(minutesAgo) + "m ago";
    if (minutesAgo < 1440) return Math.round(minutesAgo / 60) + "h ago";
    return Math.round(minutesAgo / 1440) + "d ago";
  }

  function todayLabel() {
    return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }

  function firstNameOf(fullName) {
    return fullName.trim().split(/\s+/)[0];
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function formatDateTime(minutesAgo) {
    var date = new Date(Date.now() - minutesAgo * 60000);
    var datePart = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    var timePart = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return datePart + " &middot; " + timePart;
  }

  function formatDurationSeconds(totalSeconds) {
    if (totalSeconds < 60) return totalSeconds + "s";
    var minutesPart = Math.floor(totalSeconds / 60);
    var secondsPart = totalSeconds % 60;
    return minutesPart + "m " + (secondsPart < 10 ? "0" + secondsPart : secondsPart) + "s";
  }

  var accounts = {
    admin: { role: "admin", displayName: "Jordan Pierce", clientId: null },
    client: { role: "client", displayName: "Maya Rodriguez", clientId: "northwind" },
    developer: { role: "developer", displayName: "Sam Whitfield", clientId: null }
  };

  var roleLabels = { admin: "Admin", client: "Client", developer: "Developer" };

  var developerClientIds = ["meridian", "bayside", "harborview", "cedarpoint"];

  var clients = [
    {
      id: "northwind", contact: "Maya Rodriguez", company: "Northwind Trading", plan: "Growth",
      flows: [
        { id: "nw1", name: "Inbox triage & routing", category: "Email triage", hoursPerWeekSaved: 9.5, runsTotal: 4120, successRate: 99.2, status: "active", lastRunMinutes: 18, hoursSavedToDate: 494 },
        { id: "nw2", name: "Meeting scheduling", category: "Scheduling", hoursPerWeekSaved: 6, runsTotal: 2210, successRate: 98.1, status: "active", lastRunMinutes: 42, hoursSavedToDate: 312 },
        { id: "nw3", name: "Invoice processing", category: "Invoicing", hoursPerWeekSaved: 5.5, runsTotal: 1680, successRate: 99.6, status: "active", lastRunMinutes: 120, hoursSavedToDate: 286 },
        { id: "nw4", name: "Client intake forms", category: "Client intake", hoursPerWeekSaved: 4, runsTotal: 940, successRate: 97.4, status: "active", lastRunMinutes: 300, hoursSavedToDate: 208 },
        { id: "nw5", name: "Weekly status reports", category: "Reporting", hoursPerWeekSaved: 3.5, runsTotal: 610, successRate: 100, status: "active", lastRunMinutes: 60, hoursSavedToDate: 182 }
      ]
    },
    {
      id: "meridian", contact: "Daniel Okafor", company: "Meridian Logistics", plan: "Scale",
      flows: [
        { id: "mr1", name: "Dispatch email triage", category: "Email triage", hoursPerWeekSaved: 8, runsTotal: 3300, successRate: 98.7, status: "active", lastRunMinutes: 12, hoursSavedToDate: 416 },
        { id: "mr2", name: "Carrier scheduling", category: "Scheduling", hoursPerWeekSaved: 5, runsTotal: 1500, successRate: 96.2, status: "active", lastRunMinutes: 35, hoursSavedToDate: 260 },
        { id: "mr3", name: "Proof-of-delivery filing", category: "Data entry", hoursPerWeekSaved: 4.5, runsTotal: 1200, successRate: 91.4, status: "error", lastRunMinutes: 180, hoursSavedToDate: 234 },
        { id: "mr4", name: "AP invoice matching", category: "Invoicing", hoursPerWeekSaved: 6, runsTotal: 1750, successRate: 99.1, status: "active", lastRunMinutes: 50, hoursSavedToDate: 312 }
      ]
    },
    {
      id: "bayside", contact: "Priya Nair", company: "Bayside Dental", plan: "Starter",
      flows: [
        { id: "by1", name: "Appointment reminders & confirmations", category: "Scheduling", hoursPerWeekSaved: 7, runsTotal: 2600, successRate: 99.4, status: "active", lastRunMinutes: 22, hoursSavedToDate: 364 }
      ]
    },
    {
      id: "harborview", contact: "Sofia Marchetti", company: "Harborview Realty", plan: "Growth",
      flows: [
        { id: "hv1", name: "Lead intake & routing", category: "Client intake", hoursPerWeekSaved: 6.5, runsTotal: 1900, successRate: 98.9, status: "active", lastRunMinutes: 16, hoursSavedToDate: 338 },
        { id: "hv2", name: "Showing scheduling", category: "Scheduling", hoursPerWeekSaved: 5, runsTotal: 1320, successRate: 97.8, status: "active", lastRunMinutes: 44, hoursSavedToDate: 260 },
        { id: "hv3", name: "Listing data entry", category: "Data entry", hoursPerWeekSaved: 4, runsTotal: 880, successRate: 99, status: "paused", lastRunMinutes: 2880, hoursSavedToDate: 196 }
      ]
    },
    {
      id: "lumen", contact: "Aaron Cole", company: "Lumen Creative", plan: "Growth",
      flows: [
        { id: "lm1", name: "Client email triage", category: "Email triage", hoursPerWeekSaved: 7, runsTotal: 2400, successRate: 99, status: "active", lastRunMinutes: 9, hoursSavedToDate: 364 },
        { id: "lm2", name: "Project kickoff scheduling", category: "Scheduling", hoursPerWeekSaved: 4.5, runsTotal: 1100, successRate: 98.3, status: "active", lastRunMinutes: 61, hoursSavedToDate: 234 },
        { id: "lm3", name: "Invoice & retainer billing", category: "Invoicing", hoursPerWeekSaved: 5, runsTotal: 1300, successRate: 99.5, status: "active", lastRunMinutes: 180, hoursSavedToDate: 260 },
        { id: "lm4", name: "Monthly client reports", category: "Reporting", hoursPerWeekSaved: 3, runsTotal: 540, successRate: 100, status: "active", lastRunMinutes: 360, hoursSavedToDate: 156 }
      ]
    },
    {
      id: "cedarpoint", contact: "Grace Liu", company: "Cedar Point Clinic", plan: "Starter",
      flows: [
        { id: "cp1", name: "Patient intake forms", category: "Client intake", hoursPerWeekSaved: 5.5, runsTotal: 1500, successRate: 98.2, status: "active", lastRunMinutes: 14, hoursSavedToDate: 286 },
        { id: "cp2", name: "Referral sorting", category: "Email triage", hoursPerWeekSaved: 4, runsTotal: 980, successRate: 95.5, status: "paused", lastRunMinutes: 1440, hoursSavedToDate: 208 }
      ]
    }
  ];

  var extendedNorthwindFlows = [
    { id: "nw1", name: "Inbox triage & routing", category: "Email triage", hoursPerWeekSaved: 9.5, runsTotal: 4120, successRate: 99.2, status: "active", lastRunMinutes: 18, hoursSavedToDate: 494 },
    { id: "nw2", name: "Meeting scheduling", category: "Scheduling", hoursPerWeekSaved: 6, runsTotal: 2210, successRate: 98.1, status: "active", lastRunMinutes: 42, hoursSavedToDate: 312 },
    { id: "nw3", name: "Invoice processing", category: "Invoicing", hoursPerWeekSaved: 5.5, runsTotal: 1680, successRate: 99.6, status: "active", lastRunMinutes: 120, hoursSavedToDate: 286 },
    { id: "nw4", name: "Client intake forms", category: "Client intake", hoursPerWeekSaved: 4, runsTotal: 940, successRate: 97.4, status: "active", lastRunMinutes: 300, hoursSavedToDate: 208 },
    { id: "nw5", name: "Weekly status reports", category: "Reporting", hoursPerWeekSaved: 3.5, runsTotal: 610, successRate: 100, status: "active", lastRunMinutes: 60, hoursSavedToDate: 182 },
    { id: "nw6", name: "Expense report filing", category: "Data entry", hoursPerWeekSaved: 4.5, runsTotal: 820, successRate: 96.8, status: "active", lastRunMinutes: 75, hoursSavedToDate: 234 },
    { id: "nw7", name: "Customer follow-up emails", category: "Email triage", hoursPerWeekSaved: 3, runsTotal: 1340, successRate: 99, status: "active", lastRunMinutes: 28, hoursSavedToDate: 156 },
    { id: "nw8", name: "Contract renewal reminders", category: "Reporting", hoursPerWeekSaved: 2.5, runsTotal: 410, successRate: 100, status: "active", lastRunMinutes: 480, hoursSavedToDate: 130 },
    { id: "nw9", name: "Vendor onboarding", category: "Client intake", hoursPerWeekSaved: 3.5, runsTotal: 560, successRate: 94.6, status: "error", lastRunMinutes: 95, hoursSavedToDate: 182 },
    { id: "nw10", name: "Travel booking & itinerary", category: "Scheduling", hoursPerWeekSaved: 4, runsTotal: 720, successRate: 98.5, status: "active", lastRunMinutes: 220, hoursSavedToDate: 208 },
    { id: "nw11", name: "Refund request processing", category: "Email triage", hoursPerWeekSaved: 5, runsTotal: 1100, successRate: 97.2, status: "active", lastRunMinutes: 33, hoursSavedToDate: 260 },
    { id: "nw12", name: "Payroll variance check", category: "Data entry", hoursPerWeekSaved: 2, runsTotal: 280, successRate: 100, status: "paused", lastRunMinutes: 4320, hoursSavedToDate: 104 },
    { id: "nw13", name: "Monthly board pack assembly", category: "Reporting", hoursPerWeekSaved: 3, runsTotal: 180, successRate: 100, status: "active", lastRunMinutes: 720, hoursSavedToDate: 156 },
    { id: "nw14", name: "CRM data hygiene", category: "Data entry", hoursPerWeekSaved: 2.5, runsTotal: 640, successRate: 99.4, status: "active", lastRunMinutes: 145, hoursSavedToDate: 130 }
  ];

  var executionFeed = [
    { clientId: "lumen", company: "Lumen Creative", flow: "Client email triage", minutesAgo: 9, status: "success", durationSeconds: 31 },
    { clientId: "meridian", company: "Meridian Logistics", flow: "Dispatch email triage", minutesAgo: 12, status: "success", durationSeconds: 55 },
    { clientId: "cedarpoint", company: "Cedar Point Clinic", flow: "Patient intake forms", minutesAgo: 14, status: "success", durationSeconds: 37 },
    { clientId: "harborview", company: "Harborview Realty", flow: "Lead intake & routing", minutesAgo: 16, status: "running", durationSeconds: 0 },
    { clientId: "northwind", company: "Northwind Trading", flow: "Inbox triage & routing", minutesAgo: 18, status: "success", durationSeconds: 42 },
    { clientId: "bayside", company: "Bayside Dental", flow: "Appointment reminders & confirmations", minutesAgo: 22, status: "success", durationSeconds: 28 },
    { clientId: "meridian", company: "Meridian Logistics", flow: "Proof-of-delivery filing", minutesAgo: 34, status: "failed", durationSeconds: 12 },
    { clientId: "northwind", company: "Northwind Trading", flow: "Meeting scheduling", minutesAgo: 42, status: "success", durationSeconds: 19 },
    { clientId: "harborview", company: "Harborview Realty", flow: "Showing scheduling", minutesAgo: 44, status: "success", durationSeconds: 22 },
    { clientId: "meridian", company: "Meridian Logistics", flow: "AP invoice matching", minutesAgo: 50, status: "success", durationSeconds: 40 },
    { clientId: "lumen", company: "Lumen Creative", flow: "Project kickoff scheduling", minutesAgo: 61, status: "success", durationSeconds: 24 },
    { clientId: "northwind", company: "Northwind Trading", flow: "Invoice processing", minutesAgo: 120, status: "success", durationSeconds: 48 }
  ];

  var integrationsCatalog = [
    { name: "Gmail & Outlook", category: "Email", status: "connected" },
    { name: "Google Calendar", category: "Scheduling", status: "connected" },
    { name: "QuickBooks", category: "Invoicing", status: "connected" },
    { name: "HubSpot CRM", category: "Contacts", status: "action" }
  ];

  var flowSuggestions = [
    { iconName: "inbox", title: "Email triage & routing", desc: "Sort, label, and route incoming email by topic and urgency." },
    { iconName: "calendar", title: "Meeting scheduling", desc: "Book meetings around your real availability with no back-and-forth." },
    { iconName: "dollar", title: "Invoice processing", desc: "Match invoices to POs, file them, and chase unpaid balances." },
    { iconName: "users", title: "Client intake", desc: "Capture, validate, and route new client forms automatically." },
    { iconName: "fileText", title: "Weekly status reports", desc: "Pull data from your tools and assemble a polished recap." },
    { iconName: "refresh", title: "CRM data hygiene", desc: "De-duplicate contacts and keep records up to date." }
  ];

  var applicationState = {
    session: null,
    hourlyRate: HOURLY_RATE_DEFAULT,
    reportPeriod: "year",
    navOpen: false,
    flowsDemoState: "many",
    flowsView: "grid",
    flowsSearch: "",
    flowsStatusFilter: "all",
    flowsCategoryFilter: "all",
    flowsSort: "hoursDesc",
    execSearch: "",
    execStatusFilter: "all",
    execDateFilter: "all",
    execTriggerFilter: "all",
    execSortKey: "started",
    execSortDirection: "desc",
    execPage: 1,
    execPageSize: 25,
    execDensity: "comfortable",
    execExpandedIds: {},
    execSelectedIds: {},
    cachedExecutionsFlowId: null,
    cachedExecutions: null,
    diagnosticsClientFilter: "all",
    diagnosticsFlowFilter: "all"
  };

  function clientById(id) {
    for (var index = 0; index < clients.length; index++) if (clients[index].id === id) return clients[index];
    return null;
  }

  function flowById(flowId) {
    for (var clientIndex = 0; clientIndex < clients.length; clientIndex++) {
      var clientRecord = clients[clientIndex];
      for (var flowIndex = 0; flowIndex < clientRecord.flows.length; flowIndex++) {
        if (clientRecord.flows[flowIndex].id === flowId) return { flow: clientRecord.flows[flowIndex], client: clientRecord };
      }
    }
    for (var extendedIndex = 0; extendedIndex < extendedNorthwindFlows.length; extendedIndex++) {
      if (extendedNorthwindFlows[extendedIndex].id === flowId) {
        return { flow: extendedNorthwindFlows[extendedIndex], client: clientById("northwind") };
      }
    }
    return null;
  }

  function scopedClients() {
    var session = applicationState.session;
    if (!session) return [];
    if (session.role === "admin") return clients.slice();
    if (session.role === "developer") return clients.filter(function (client) { return developerClientIds.indexOf(client.id) !== -1; });
    return clients.filter(function (client) { return client.id === session.clientId; });
  }

  function scopedClientIds() {
    return scopedClients().map(function (client) { return client.id; });
  }

  function aggregate(client) {
    var hoursWeek = 0, hoursToDate = 0, activeFlows = 0;
    client.flows.forEach(function (flow) {
      hoursWeek += flow.hoursPerWeekSaved;
      hoursToDate += flow.hoursSavedToDate;
      if (flow.status === "active") activeFlows++;
    });
    return { hoursWeek: hoursWeek, hoursToDate: hoursToDate, activeFlows: activeFlows, totalFlows: client.flows.length };
  }

  function periodInfo(period) {
    if (period === "month") return { label: "this month", weeksFactor: 4.33, divisor: 12, isAll: false };
    if (period === "quarter") return { label: "this quarter", weeksFactor: 13, divisor: 4, isAll: false };
    if (period === "all") return { label: "all time", weeksFactor: 0, divisor: 0, isAll: true };
    return { label: "this year", weeksFactor: 52, divisor: 1, isAll: false };
  }

  function flowPeriodDollars(flow, rate, period) {
    var info = periodInfo(period);
    if (info.isAll) return flow.hoursSavedToDate * rate;
    return (flow.hoursPerWeekSaved * 52 * rate) / info.divisor;
  }

  function clientPeriodDollars(client, rate, period) {
    var info = periodInfo(period);
    var summary = aggregate(client);
    if (info.isAll) return summary.hoursToDate * rate;
    return (summary.hoursWeek * 52 * rate) / info.divisor;
  }

  function clientPeriodHours(client, period) {
    var info = periodInfo(period);
    var summary = aggregate(client);
    if (info.isAll) return summary.hoursToDate;
    return summary.hoursWeek * info.weeksFactor;
  }

  function statusBadge(status) {
    if (status === "active") return '<span class="badge badge-active"><span class="dot dot-active"></span>Active</span>';
    if (status === "paused") return '<span class="badge badge-paused"><span class="dot dot-paused"></span>Paused</span>';
    if (status === "error") return '<span class="badge badge-error"><span class="dot dot-error"></span>Needs attention</span>';
    return '<span class="badge badge-neutral">' + status + "</span>";
  }

  function executionStatusNode(status) {
    if (status === "success") return '<span class="badge badge-active"><span class="dot dot-active"></span>Success</span>';
    if (status === "running") return '<span class="badge badge-indigo"><span class="dot dot-running"></span>Running</span>';
    return '<span class="badge badge-error"><span class="dot dot-error"></span>Failed</span>';
  }

  function brandMark() {
    return '<span class="brand-mark">' + icon("bolt") + "</span>";
  }

  function topbarPublic(variant) {
    var right = variant === "login"
      ? '<a class="btn btn-ghost" href="#/home">Back to home</a>'
      : '<a class="btn btn-primary" href="#/login">Log in</a>';
    return '<header class="topbar"><div class="topbar-inner">'
      + '<a class="brand" href="#/home">' + brandMark() + "Auto Secretary</a>"
      + '<div class="topbar-spacer"></div>'
      + '<div class="topbar-right">' + right + "</div>"
      + "</div></header>";
  }

  function topbarAuthed(activeView) {
    var session = applicationState.session;
    function navLink(view, href, label, iconName) {
        var active = view === activeView ? " active" : ""; // Maintain active class for the current view
      return '<a class="nav-link' + active + '" href="' + href + '">' + icon(iconName, "icon-sm") + label + "</a>";
    }
    var nav = '<nav class="topbar-nav">'
      + navLink("dashboard", "#/dashboard", "Dashboard", "grid");
    // If developer is active, make the Flows button act as Diagnostics (label, href, and active state)
    var isDev = session && session.role === 'developer';
    var flowsViewName = isDev ? 'diagnostics' : 'flows';
    var flowsHref = isDev ? '#/diagnostics' : '#/flows';
    var flowsLabel = isDev ? 'Diagnostics' : 'Flows';
    var flowsIcon = isDev ? 'search' : 'boltSquare';
    nav += navLink(flowsViewName, flowsHref, flowsLabel, flowsIcon)
      + navLink("report", "#/report", "Reports", "chart");
    nav += '<button class="nav-link" data-action="open-support" type="button">' + icon("support", "icon-sm") + "Support</button>"
      + "</nav>";
    var profile = '<div class="profile-chip">'
      + '<div class="profile-meta"><div class="profile-name">' + session.displayName + '</div><div class="profile-role">' + roleLabels[session.role] + "</div></div>"
      + avatar(session.displayName, session.role)
      + "</div>";
    return '<header class="topbar"><div class="topbar-inner">'
      + '<a class="brand" href="#/dashboard">' + brandMark() + "Auto Secretary</a>"
      + nav
      + '<div class="topbar-spacer"></div>'
      + '<div class="topbar-right">'
      + profile
      + '<button class="btn btn-ghost btn-sm" data-action="logout" type="button" aria-label="Log out">' + icon("logout", "icon-sm") + "</button>"
      + '<button class="nav-toggle" data-action="toggle-nav" type="button" aria-label="Open menu">' + icon("menu") + "</button>"
      + "</div></div></header>";
  }

  function viewHome() {
    var features = [
      { iconName: "inbox", tint: "indigo", title: "Runs the inbox", text: "Email is triaged, routed, and answered to your playbook, so nothing waits and nothing slips." },
      { iconName: "calendar", tint: "emerald", title: "Books the calendar", text: "Meetings, reminders, and follow-ups schedule themselves around your real availability." },
      { iconName: "trendUp", tint: "amber", title: "Proves the savings", text: "Every automation reports the hours and dollars it gives back, in plain numbers you can trust." }
    ];
    var tintMap = {
      indigo: "background:var(--indigo-50);color:var(--indigo-600)",
      emerald: "background:var(--emerald-50);color:var(--emerald-600)",
      amber: "background:var(--amber-50);color:var(--amber-600)"
    };
    var featureHtml = features.map(function (feature) {
      return '<article class="feature">'
        + '<span class="feature-icon" style="' + tintMap[feature.tint] + '">' + icon(feature.iconName) + "</span>"
        + "<h3>" + feature.title + "</h3><p>" + feature.text + "</p></article>";
    }).join("");

    var heroBars = [
      { label: "Email triage", value: 82 },
      { label: "Scheduling", value: 58 },
      { label: "Invoicing", value: 47 }
    ].map(function (bar) {
      return '<div class="hero-bar-row"><span>' + bar.label + '</span><span class="hero-bar"><span style="width:' + bar.value + '%"></span></span><span>' + Math.round(bar.value / 10 * 6) + "h</span></div>";
    }).join("");

    return topbarPublic("home")
      + '<section class="hero"><div class="hero-glow"></div><div class="hero-inner">'
      + "<div><p class=\"eyebrow\">Your back office, automated</p>"
      + '<h1>Everything a secretary does, <span class="accent">handled for you.</span></h1>'
      + '<p class="lede">Auto Secretary triages email, schedules meetings, files paperwork, and chases invoices, then shows you exactly how many hours and dollars it saves.</p>'
      + '<div class="hero-actions"><a class="btn btn-primary btn-lg" href="#/login">Log in to your dashboard' + icon("arrowRight", "icon-sm") + '</a><a class="btn btn-ghost btn-lg" href="#/login">See a live report</a></div>'
        + '<div class="hero-trust"><span><strong>21,000+</strong> tasks run weekly</span><span><strong>99.2%</strong> success rate</span><span><strong>4.8 hrs</strong> saved per day, on average</span></div></div>' // Updated hero trust section
      + '<div class="hero-card"><div class="hero-card-top"><span class="badge badge-indigo">' + icon("spark", "icon-sm") + 'This month</span><span class="badge badge-active"><span class="dot dot-active"></span>All flows healthy</span></div>'
      + '<div class="hero-savings">$48,200</div><div class="hero-savings-label">saved this year &middot; 28.5 hours / week given back</div>'
      + '<div class="hero-bars">' + heroBars + "</div></div>"
      + "</div></section>"
      + '<section class="section"><div class="section-head"><h2>One quiet system doing the busywork</h2><p>Built for owners and operators who would rather grow the business than run the back office.</p></div>'
      + '<div class="feature-grid">' + featureHtml + "</div></section>"
      + '<footer class="site-footer"><div class="site-footer-inner"><a class="brand" href="#/home" style="font-size:15px">' + brandMark() + 'Auto Secretary</a><span>&copy; ' + new Date().getFullYear() + " Auto Secretary &middot; Prototype</span></div></footer>";
  }

  function viewLogin() {
    var demoRows = ["admin", "client", "developer"].map(function (key) {
      var label = roleLabels[accounts[key].role];
      return '<button class="demo-cred" type="button" data-action="demo-login" data-user="' + key + '"><span><b>' + label + '</b> &middot; <code>' + key + " / " + key + '</code></span>' + icon("arrowRight", "icon-sm") + "</button>";
    }).join("");

    return topbarPublic("login")
      + '<div class="auth-wrap"><div class="auth-card">'
      + '<div class="auth-head">' + brandMark() + '<h1 style="margin-top:14px">Welcome back</h1><p>Log in to your Auto Secretary workspace.</p></div>'
      + '<div class="auth-error" id="authError">' + icon("alert", "icon-sm") + "<span>Those credentials weren\u2019t recognized. Try one of the demo logins below.</span></div>"
      + '<form data-action="login-form" novalidate>'
      + '<div class="field"><label for="loginUser">Username</label><input class="input" id="loginUser" type="text" autocomplete="username" placeholder="admin, client, or developer" /></div>'
      + '<div class="field"><label for="loginPass">Password</label><input class="input" id="loginPass" type="password" autocomplete="current-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" /></div>'
      + '<div class="field-row"><label class="checkbox"><input type="checkbox" id="rememberMe" /> Remember me</label><a class="link" href="#/login" data-action="forgot">Forgot password?</a></div>'
      + '<button class="btn btn-primary btn-block btn-lg" type="submit">Log in' + icon("arrowRight", "icon-sm") + "</button>"
      + "</form>"
      + '<div class="demo-hint"><p>Demo logins (click to enter)</p><div class="demo-creds">' + demoRows + "</div></div>"
      + "</div></div>";
  }

  function executionsCard(scopeIds, title) {
    var rows = executionFeed.filter(function (item) { return scopeIds.indexOf(item.clientId) !== -1; }).slice(0, 7);
    var showCompany = applicationState.session.role !== "client";
    var body = rows.map(function (item) {
      var meta = (showCompany ? item.company + " &middot; " : "") + (item.status === "running" ? "in progress" : item.durationSeconds + "s");
      return '<div class="exec-row">' + executionStatusNode(item.status)
        + '<div><div class="exec-name">' + item.flow + '</div><div class="exec-meta">' + meta + "</div></div>"
        + '<div class="exec-time">' + relativeTime(item.minutesAgo) + "</div></div>";
    }).join("");
    return '<section class="card"><div class="card-head"><div><h3>' + title + '</h3><div class="sub">Live across your automations</div></div>'
      + '<button class="btn btn-ghost btn-sm" data-action="run-flow" type="button">' + icon("play", "icon-sm") + "Run a flow</button></div>"
      + '<div class="card-body">' + body + "</div></section>";
  }

  function attentionCard(scopeClients) {
    var alerts = [];
    scopeClients.forEach(function (client) {
      client.flows.forEach(function (flow) {
        if (flow.status === "error") alerts.push({ level: "error", title: flow.name + " is failing", desc: client.company + " &middot; success rate dropped to " + percent(flow.successRate) });
        else if (flow.status === "paused") alerts.push({ level: "warn", title: flow.name + " is paused", desc: client.company + " &middot; last run " + relativeTime(flow.lastRunMinutes) });
      });
    });
    var body;
    if (alerts.length === 0) {
      body = '<div class="empty">' + icon("checkCircle") + "<div>Everything is running smoothly.</div></div>";
    } else {
      body = alerts.slice(0, 4).map(function (alert) {
        return '<div class="alert-row"><span class="alert-ic ' + (alert.level === "warn" ? "warn" : "") + '">' + icon(alert.level === "warn" ? "pause" : "alert", "icon-sm") + "</span>"
          + '<div><div class="alert-title">' + alert.title + '</div><div class="alert-desc">' + alert.desc + "</div></div></div>";
      }).join("");
    }
    return '<section class="card"><div class="card-head"><h3>Needs attention</h3><span class="badge ' + (alerts.length ? "badge-error" : "badge-active") + '">' + alerts.length + "</span></div>"
      + '<div class="card-body">' + body + "</div></section>";
  }

  function quickActionsCard(actions) {
    var body = actions.map(function (action) {
      return '<button class="qa" type="button" data-action="' + action.action + '"><span class="qa-ic">' + icon(action.iconName, "icon-sm") + "</span>"
        + '<span><span class="qa-title">' + action.title + '</span><br><span class="qa-sub">' + action.sub + "</span></span></button>";
    }).join("");
    return '<section class="card"><div class="card-head"><h3>Quick actions</h3></div><div class="card-pad"><div class="qa-grid">' + body + "</div></div></section>";
  }

  function integrationsCard() {
    var body = integrationsCatalog.map(function (item) {
      var right = item.status === "connected"
        ? '<span class="badge badge-active"><span class="dot dot-active"></span>Connected</span>'
        : '<button class="btn btn-soft btn-sm" data-action="run-flow" type="button">Reconnect</button>';
      return '<div class="integration"><div class="integration-left"><span class="integration-ic">' + icon("link", "icon-sm") + "</span>"
        + '<div><div class="integration-name">' + item.name + '</div><div class="integration-cat">' + item.category + "</div></div></div>" + right + "</div>";
    }).join("");
    return '<section class="card"><div class="card-head"><h3>Connected tools</h3></div><div class="card-pad">' + body + "</div></section>";
  }

  function automationsCard(client) {
    var maxHours = Math.max.apply(null, client.flows.map(function (flow) { return flow.hoursPerWeekSaved; }));
    var body = client.flows.map(function (flow) {
      var width = Math.round((flow.hoursPerWeekSaved / maxHours) * 100);
      return '<div class="flow-bar-row"><div class="flow-bar-head"><span class="flow-bar-name">' + statusDot(flow.status) + flow.name + '</span><span class="flow-bar-val">' + decimal(flow.hoursPerWeekSaved, 1) + " hrs/wk</span></div>"
        + '<div class="flow-bar-track"><div class="flow-bar-fill" style="width:' + width + '%"></div></div></div>';
    }).join("");
    return '<section class="card"><div class="card-head"><div><h3>Your automations</h3><div class="sub">Hours saved each week</div></div>'
      + '<a class="btn btn-soft btn-sm" href="#/flows">View all' + icon("arrowRight", "icon-sm") + "</a></div>"
      + '<div class="card-pad"><div class="flow-bars">' + body + "</div></div></section>";
  }

  function statusDot(status) {
    if (status === "active") return '<span class="dot dot-active"></span>';
    if (status === "paused") return '<span class="dot dot-paused"></span>';
    if (status === "error") return '<span class="dot dot-error"></span>';
    return '<span class="dot"></span>';
  }

  function statCard(iconName, tint, label, value, valueClass, delta) {
    var tintMap = {
      indigo: "background:var(--indigo-50);color:var(--indigo-600)",
      emerald: "background:var(--emerald-50);color:var(--emerald-600)",
      amber: "background:var(--amber-50);color:var(--amber-600)",
      slate: "background:var(--slate-100);color:var(--slate-600)"
    };
    var deltaHtml = delta ? '<div class="stat-delta up">' + icon("trendUp", "icon-sm") + delta + "</div>" : "";
    return '<div class="stat-card"><div class="stat-top"><span class="stat-ic" style="' + tintMap[tint] + '">' + icon(iconName, "icon-sm") + "</span></div>"
      + '<div class="stat-label">' + label + '</div><div class="stat-value ' + (valueClass || "") + '">' + value + "</div>" + deltaHtml + "</div>";
  }

  function clientsTableCard(scopeClients, headingTitle) {
    var rate = applicationState.hourlyRate;
    var rows = scopeClients.map(function (client) {
      var summary = aggregate(client);
      var annual = summary.hoursWeek * 52 * rate;
      return '<tr class="clickable" data-action="open-report" data-client="' + client.id + '">'
        + '<td><div class="cell-user">' + avatar(client.contact, client.id) + '<div><div class="cell-user-name">' + client.contact + '</div><div class="cell-user-co">' + client.company + "</div></div></div></td>"
        + '<td><span class="badge badge-neutral">' + client.plan + "</span></td>"
        + '<td class="num">' + summary.activeFlows + " / " + summary.totalFlows + "</td>"
        + '<td class="num">' + decimal(summary.hoursWeek, 1) + "</td>"
        + '<td class="num money">' + money(annual) + "</td>"
        + "<td>" + (hasIssue(client) ? statusBadge("error") : statusBadge("active")) + "</td></tr>";
    }).join("");
    return '<section class="card"><div class="card-head"><div><h3>' + headingTitle + '</h3><div class="sub">Tap a client to open their cost savings report</div></div>'
      + '<a class="btn btn-ghost btn-sm" href="#/report">All reports' + icon("arrowRight", "icon-sm") + "</a></div>"
      + '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Plan</th><th class="num">Live</th><th class="num">Hrs/wk</th><th class="num">Saved / yr</th><th>Status</th></tr></thead><tbody>'
      + rows + "</tbody></table></div></section>";
  }

  function hasIssue(client) {
    return client.flows.some(function (flow) { return flow.status === "error"; });
  }

  function systemHealthCard() {
    var rows = [
      { name: "Automation engine", value: "99.98% uptime", ok: true },
      { name: "Job queue", value: "Healthy &middot; 0 backlog", ok: true },
      { name: "Worker pool", value: "8 / 8 online", ok: true },
      { name: "Integrations", value: "1 needs reconnect", ok: false }
    ];
    var body = rows.map(function (row) {
      return '<div class="integration"><div class="integration-left"><span class="integration-ic" style="' + (row.ok ? "background:var(--emerald-50);color:var(--emerald-600)" : "background:var(--amber-50);color:var(--amber-600)") + '">' + icon(row.ok ? "checkCircle" : "alert", "icon-sm") + "</span>"
        + '<div><div class="integration-name">' + row.name + '</div><div class="integration-cat">' + row.value + "</div></div></div></div>";
    }).join("");
    return '<section class="card"><div class="card-head"><h3>System health</h3>' + icon("server", "icon-sm") + "</div><div class=\"card-pad\">" + body + "</div></section>";
  }

  function dashboardGreeting(title, subtitle) {
    return '<div class="page-head"><div><h1 class="page-title">' + title + '</h1><p class="page-sub">' + subtitle + '</p></div>'
      + '<a class="btn btn-primary" href="#/report">' + icon("chart", "icon-sm") + "View cost savings report</a></div>";
  }

  function stack(parts) {
    return '<div style="display:grid;gap:18px;align-items:start">' + parts.join("") + "</div>";
  }

  function viewClientDashboard() {
    var client = clientById(applicationState.session.clientId);
    var summary = aggregate(client);
    var rate = applicationState.hourlyRate;
    var annual = summary.hoursWeek * 52 * rate;
    var stats = '<div class="grid stat-grid">'
      + statCard("dollar", "emerald", "Saved this year", money(annual), "pos", "vs. manual")
      + statCard("clock", "indigo", "Hours / week saved", decimal(summary.hoursWeek, 1), "")
      + statCard("activity", "amber", "Total hours saved", Math.round(summary.hoursToDate).toLocaleString("en-US"), "")
      + statCard("grid", "slate", "Live automations", summary.activeFlows + " / " + summary.totalFlows, "")
      + "</div>";
    var actions = [
      { action: "go-flows", iconName: "boltSquare", title: "View all flows", sub: "Manage your automations" },
      { action: "request-automation", iconName: "plus", title: "Request automation", sub: "Add a new task" },
      { action: "download-report", iconName: "download", title: "Download report", sub: "PDF or CSV" },
      { action: "open-support", iconName: "support", title: "Contact support", sub: "We reply same day" }
    ];
    var main = stack([executionsCard([client.id], "Recent executions"), automationsCard(client)]);
    var side = stack([attentionCard([client]), quickActionsCard(actions), integrationsCard()]);
    return topbarAuthed("dashboard")
      + '<main class="page">'
      + dashboardGreeting("Welcome back, " + firstNameOf(applicationState.session.displayName), client.company + " &middot; " + todayLabel())
      + stats
      + '<div class="grid cols-3" style="margin-top:18px"><div class="span-2">' + main + "</div><div>" + side + "</div></div>"
      + "</main>";
  }

  function viewDeveloperDashboard() {
    var managed = scopedClients();
    var hoursWeek = 0, liveFlows = 0, attentionCount = 0;
    managed.forEach(function (client) {
      var summary = aggregate(client);
      hoursWeek += summary.hoursWeek;
      liveFlows += summary.activeFlows;
      client.flows.forEach(function (flow) { if (flow.status === "error") attentionCount++; });
    });
    var stats = '<div class="grid stat-grid">'
      + statCard("users", "indigo", "Clients managed", managed.length, "")
      + statCard("grid", "emerald", "Automations live", liveFlows, "")
      + statCard("clock", "amber", "Hours / week saved", decimal(hoursWeek, 1), "")
      + statCard("alert", "slate", "Flows needing work", attentionCount, "")
      + "</div>";
    var actions = [
      { action: "build-flow", iconName: "plus", title: "Build new flow", sub: "Start from a template" },
      { action: "open-report", iconName: "chart", title: "Open reports", sub: "Per-client savings" },
      { action: "run-flow", iconName: "refresh", title: "Re-run failed jobs", sub: "Clear the queue" },
      { action: "open-support", iconName: "support", title: "Contact support", sub: "Escalate an issue" }
    ];
    var main = stack([clientsTableCard(managed, "Assigned clients"), executionsCard(scopedClientIds(), "Recent executions")]);
    var side = stack([attentionCard(managed), quickActionsCard(actions)]);
    return topbarAuthed("dashboard")
      + '<main class="page">'
      + dashboardGreeting("Developer console", firstNameOf(applicationState.session.displayName) + " &middot; " + todayLabel())
      + stats
      + '<div class="grid cols-3" style="margin-top:18px"><div class="span-2">' + main + "</div><div>" + side + "</div></div>"
      + "</main>";
  }

  function viewAdminDashboard() {
    var all = scopedClients();
    var rate = applicationState.hourlyRate;
    var hoursWeek = 0, liveFlows = 0;
    all.forEach(function (client) {
      var summary = aggregate(client);
      hoursWeek += summary.hoursWeek;
      liveFlows += summary.activeFlows;
    });
    var annual = hoursWeek * 52 * rate;
    var stats = '<div class="grid stat-grid">'
      + statCard("dollar", "emerald", "Total saved this year", money(annual), "pos", "across all clients")
      + statCard("clock", "indigo", "Hours / week saved", decimal(hoursWeek, 1), "")
      + statCard("users", "amber", "Active clients", all.length, "")
      + statCard("grid", "slate", "Automations live", liveFlows, "")
      + "</div>";
    var actions = [
      { action: "add-client", iconName: "plus", title: "Add client", sub: "Onboard a workspace" },
      { action: "open-report", iconName: "chart", title: "Reports", sub: "Platform-wide savings" },
      { action: "run-flow", iconName: "refresh", title: "Run health check", sub: "Sweep all flows" },
      { action: "open-support", iconName: "support", title: "Support inbox", sub: "Client requests" }
    ];
    var main = stack([clientsTableCard(all, "All clients"), executionsCard(scopedClientIds(), "Recent executions")]);
    var side = stack([systemHealthCard(), attentionCard(all), quickActionsCard(actions)]);
    return topbarAuthed("dashboard")
      + '<main class="page">'
      + dashboardGreeting("Admin overview", firstNameOf(applicationState.session.displayName) + " &middot; " + todayLabel())
      + stats
      + '<div class="grid cols-3" style="margin-top:18px"><div class="span-2">' + main + "</div><div>" + side + "</div></div>"
      + "</main>";
  }

  function viewDashboard() {
    var role = applicationState.session.role;
    if (role === "client") return viewClientDashboard();
    if (role === "developer") return viewDeveloperDashboard();
    return viewAdminDashboard();
  }

  function reportControls() {
    var rate = applicationState.hourlyRate;
    var period = applicationState.reportPeriod;
    function option(value, label) {
      return '<option value="' + value + '"' + (period === value ? " selected" : "") + ">" + label + "</option>";
    }
    return '<div class="report-controls">'
      + '<div class="control"><label for="rateInput">Assumed staff cost</label><div class="rate-field"><span>$</span><input id="rateInput" type="number" min="1" step="1" value="' + rate + '" data-action="rate-input" /><span style="border-left:1px solid var(--slate-200);border-right:none">/ hr</span></div></div>'
      + '<div class="control"><label for="periodSelect">Period</label><select id="periodSelect" class="select" data-action="period-select">' + option("month", "This month") + option("quarter", "This quarter") + option("year", "This year") + option("all", "All time") + "</select></div>"
      + '<div class="spacer"></div>'
      + '<div class="report-export"><button class="btn btn-ghost" data-action="export-csv" type="button">' + icon("download", "icon-sm") + 'CSV</button><button class="btn btn-ghost" data-action="export-pdf" type="button">' + icon("fileText", "icon-sm") + "PDF</button></div>"
      + "</div>";
  }

  function reportStats(client) {
    var rate = applicationState.hourlyRate;
    var period = applicationState.reportPeriod;
    var info = periodInfo(period);
    var summary = aggregate(client);
    var dollars = clientPeriodDollars(client, rate, period);
    var hours = clientPeriodHours(client, period);
    return '<div class="grid stat-grid">'
      + statCard("dollar", "emerald", "Dollars saved " + info.label, money(dollars), "pos")
      + statCard("clock", "indigo", "Hours saved " + info.label, Math.round(hours).toLocaleString("en-US"), "")
      + statCard("activity", "amber", "Hours / week saved", decimal(summary.hoursWeek, 1), "")
      + statCard("grid", "slate", "Automations", summary.activeFlows + " / " + summary.totalFlows, "")
      + "</div>";
  }

  function singleFlowReport(client) {
    var rate = applicationState.hourlyRate;
    var period = applicationState.reportPeriod;
    var info = periodInfo(period);
    var flow = client.flows[0];
    var dollars = flowPeriodDollars(flow, rate, period);
    var hours = info.isAll ? flow.hoursSavedToDate : flow.hoursPerWeekSaved * info.weeksFactor;
    return '<div class="single-flow">'
      + '<div class="single-hero"><span class="badge badge-active"><span class="dot dot-active"></span>' + flow.name + "</span>"
      + '<div class="big" style="margin-top:18px">' + money(dollars) + '</div><div class="big-label">saved ' + info.label + " &middot; " + flow.category + "</div>"
      + '<div class="single-mini">'
      + '<div><div class="v">' + decimal(flow.hoursPerWeekSaved, 1) + '</div><div class="l">hours / week</div></div>'
      + '<div><div class="v">' + Math.round(hours).toLocaleString("en-US") + '</div><div class="l">hours ' + info.label + "</div></div>"
      + '<div><div class="v">' + flow.runsTotal.toLocaleString("en-US") + '</div><div class="l">total runs</div></div>'
      + '<div><div class="v">' + percent(flow.successRate) + '</div><div class="l">success rate</div></div>'
      + "</div></div>"
      + '<div class="nudge"><span class="badge" style="background:rgba(255,255,255,0.16);color:#fff;align-self:flex-start">' + icon("spark", "icon-sm") + "Room to grow</span>"
      + "<h3>One flow is already paying off.</h3><p>Clients who add scheduling and invoicing automations on top of this typically triple their monthly savings within a quarter.</p>"
      + '<button class="btn" data-action="request-automation" type="button">' + icon("plus", "icon-sm") + "Request another automation</button></div>"
      + "</div>";
  }

  function multiFlowReport(client) {
    var rate = applicationState.hourlyRate;
    var period = applicationState.reportPeriod;
    var maxDollars = Math.max.apply(null, client.flows.map(function (flow) { return flowPeriodDollars(flow, rate, period); }));
    var bars = client.flows.map(function (flow) {
      var dollars = flowPeriodDollars(flow, rate, period);
      var width = Math.round((dollars / maxDollars) * 100);
      return '<div class="flow-bar-row"><div class="flow-bar-head"><span class="flow-bar-name">' + statusDot(flow.status) + flow.name + '</span><span class="flow-bar-val">' + money(dollars) + "</span></div>"
        + '<div class="flow-bar-track"><div class="flow-bar-fill" style="width:' + width + '%"></div></div></div>';
    }).join("");
    var tableRows = client.flows.map(function (flow) {
      return "<tr><td><span class=\"strong\">" + flow.name + "</span></td><td>" + flow.category + "</td><td>" + statusBadge(flow.status) + "</td>"
        + '<td class="num">' + decimal(flow.hoursPerWeekSaved, 1) + '</td><td class="num">' + flow.runsTotal.toLocaleString("en-US") + '</td><td class="num">' + percent(flow.successRate) + "</td>"
        + '<td class="num money">' + money(flowPeriodDollars(flow, rate, period)) + "</td></tr>";
    }).join("");
    return '<div class="grid" style="gap:18px">'
      + '<section class="card"><div class="card-head"><div><h3>Savings by automation</h3><div class="sub">Dollars saved ' + periodInfo(period).label + "</div></div></div>"
      + '<div class="card-pad"><div class="flow-bars">' + bars + "</div></div></section>"
      + '<section class="card"><div class="card-head"><h3>Automation detail</h3></div>'
      + '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Automation</th><th>Category</th><th>Status</th><th class="num">Hrs/wk</th><th class="num">Runs</th><th class="num">Success</th><th class="num">Saved</th></tr></thead><tbody>'
      + tableRows + "</tbody></table></div></section></div>";
  }

  function clientReport(client, backTo) {
    var role = applicationState.session.role;
    var heading = role === "client" ? "Your cost savings report" : client.company + " \u2014 cost savings report";
    var body = client.flows.length === 1 ? singleFlowReport(client) : multiFlowReport(client);
    var note = '<p class="page-sub" style="margin-top:18px">Dollar figures use an assumed staff cost of ' + money(applicationState.hourlyRate) + " per hour. Adjust the rate above to match your own loaded labor cost.</p>";
    return '<a class="back-link" href="' + backTo.href + '">' + icon("arrowLeft", "icon-sm") + backTo.label + "</a>"
      + '<div class="page-head"><div><p class="eyebrow">Cost savings</p><h1 class="page-title">' + heading + '</h1><p class="page-sub">' + client.contact + " &middot; " + client.company + "</p></div></div>"
      + reportControls()
      + reportStats(client)
      + '<div style="margin-top:18px">' + body + "</div>"
      + note;
  }

  function reportsOverview(scopeClients) {
    var rate = applicationState.hourlyRate;
    var period = applicationState.reportPeriod;
    var cards = scopeClients.map(function (client) {
      var summary = aggregate(client);
      var dollars = clientPeriodDollars(client, rate, period);
      return '<article class="client-card" data-action="open-report" data-client="' + client.id + '">'
        + '<div class="client-card-top">' + avatar(client.contact, client.id) + '<div><div class="cell-user-name">' + client.contact + '</div><div class="cell-user-co">' + client.company + "</div></div></div>"
        + '<div class="client-card-savings">' + money(dollars) + '</div><div class="page-sub" style="font-size:13px">saved ' + periodInfo(period).label + "</div>"
        + '<div class="client-card-foot"><span>' + decimal(summary.hoursWeek, 1) + ' hrs/wk</span><span>' + summary.activeFlows + " / " + summary.totalFlows + " live</span>" + (hasIssue(client) ? statusBadge("error") : statusBadge("active")) + "</div></article>";
    }).join("");
    return '<a class="back-link" href="#/dashboard">' + icon("arrowLeft", "icon-sm") + "Back to dashboard</a>"
      + '<div class="page-head"><div><p class="eyebrow">Cost savings</p><h1 class="page-title">Client reports</h1><p class="page-sub">Open any client to see their full cost savings report.</p></div></div>'
      + reportControls()
      + '<div class="client-grid">' + cards + "</div>";
  }

  function viewReport(param) {
    var role = applicationState.session.role;
    var content;
    if (role === "client") {
      content = clientReport(clientById(applicationState.session.clientId), { href: "#/dashboard", label: "Back to dashboard" });
    } else if (param) {
      var target = clientById(param);
      if (!target || scopedClientIds().indexOf(param) === -1) {
        content = reportsOverview(scopedClients());
      } else {
        content = clientReport(target, { href: "#/report", label: "All client reports" });
      }
    } else {
      content = reportsOverview(scopedClients());
    }
    return topbarAuthed("report") + '<main class="page">' + content + "</main>";
  }

  // ============================================================
  // FLOWS LIST PAGE
  // ============================================================

  function flowsForCurrentDemoState() {
    var demoState = applicationState.flowsDemoState;
    if (demoState === "empty") return [];
    if (demoState === "single") return [extendedNorthwindFlows[0]];
    return extendedNorthwindFlows.slice();
  }

  function sparklineSvg(seed) {
    var points = [];
    var randomState = 0;
    for (var characterIndex = 0; characterIndex < seed.length; characterIndex++) randomState = (randomState * 31 + seed.charCodeAt(characterIndex)) & 0xffff;
    for (var pointIndex = 0; pointIndex < 12; pointIndex++) {
      randomState = (randomState * 1103515245 + 12345) & 0x7fffffff;
      points.push(0.35 + ((randomState % 100) / 100) * 0.55);
    }
    var width = 220;
    var height = 36;
    var stepX = width / (points.length - 1);
    var pathData = points.map(function (value, currentIndex) {
      var positionX = currentIndex * stepX;
      var positionY = height - value * (height - 4) - 2;
      return (currentIndex === 0 ? "M" : "L") + positionX.toFixed(1) + " " + positionY.toFixed(1);
    }).join(" ");
    var areaData = pathData + " L" + width + " " + height + " L0 " + height + " Z";
    var gradientId = "sparkGrad-" + seed;
    return '<svg viewBox="0 0 ' + width + " " + height + '" preserveAspectRatio="none">'
      + '<defs><linearGradient id="' + gradientId + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgba(79,70,229,0.35)"/><stop offset="100%" stop-color="rgba(79,70,229,0)"/></linearGradient></defs>'
      + '<path d="' + areaData + '" fill="url(#' + gradientId + ')" />'
      + '<path d="' + pathData + '" fill="none" stroke="var(--indigo-600)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" />'
      + '</svg>';
  }

  function flowsSummaryStrip(flows) {
    var totalCount = flows.length;
    var activeCount = 0, pausedCount = 0, errorCount = 0, hoursWeekTotal = 0;
    flows.forEach(function (flow) {
      if (flow.status === "active") activeCount++;
      else if (flow.status === "paused") pausedCount++;
      else if (flow.status === "error") errorCount++;
      hoursWeekTotal += flow.hoursPerWeekSaved;
    });
    return '<div class="flows-summary">'
      + '<div class="flows-summary-cell"><span class="label">Automations</span><span class="value">' + totalCount + '</span></div>'
      + '<div class="flows-summary-cell"><span class="label">Active</span><span class="value">' + activeCount + '</span></div>'
      + '<div class="flows-summary-cell warn"><span class="label">Paused</span><span class="value">' + pausedCount + '</span></div>'
      + '<div class="flows-summary-cell error"><span class="label">Needs attention</span><span class="value">' + errorCount + '</span></div>'
      + '<div class="flows-summary-cell accent"><span class="label">Hours / week saved</span><span class="value">' + decimal(hoursWeekTotal, 1) + '</span></div>'
      + '</div>';
  }

  function flowsStateToggleBanner() {
    var currentState = applicationState.flowsDemoState;
    function stateOption(value, label) {
      return '<button type="button" data-action="set-flows-state" data-state="' + value + '"' + (currentState === value ? ' class="active"' : "") + '>' + label + '</button>';
    }
    return '<div class="state-toggle-wrap">'
      + '<span class="eyebrow">Demo state</span>'
      + '<div class="state-toggle">' + stateOption("empty", "Empty (no flows)") + stateOption("single", "Single flow") + stateOption("many", "Many (14)") + "</div>"
      + '<span style="font-size:12px;color:var(--muted)">Toggle to see how each acceptance state looks. Prototype-only control.</span>'
      + '</div>';
  }

  function uniqueCategoriesFor(flows) {
    var seen = {};
    var result = [];
    flows.forEach(function (flow) { if (!seen[flow.category]) { seen[flow.category] = true; result.push(flow.category); } });
    result.sort();
    return result;
  }

  function flowsToolbar(allFlows) {
    var categories = uniqueCategoriesFor(allFlows);
    var categoryOptions = '<option value="all">All categories</option>' + categories.map(function (categoryName) {
      var selected = applicationState.flowsCategoryFilter === categoryName ? " selected" : "";
      return '<option value="' + categoryName + '"' + selected + ">" + categoryName + "</option>";
    }).join("");
    function statusOption(value, label) {
      return '<option value="' + value + '"' + (applicationState.flowsStatusFilter === value ? " selected" : "") + ">" + label + "</option>";
    }
    function sortOption(value, label) {
      return '<option value="' + value + '"' + (applicationState.flowsSort === value ? " selected" : "") + ">" + label + "</option>";
    }
    var searchValue = escapeHtml(applicationState.flowsSearch);
    return '<div class="flows-toolbar">'
      + '<div class="search-field"><span class="search-ic">' + icon("search", "icon-sm") + '</span><input type="text" placeholder="Search automations by name or category\u2026" value="' + searchValue + '" data-action="flows-search" /></div>'
      + '<select class="toolbar-select" data-action="flows-status">' + statusOption("all", "All statuses") + statusOption("active", "Active only") + statusOption("paused", "Paused only") + statusOption("error", "Needs attention") + '</select>'
      + '<select class="toolbar-select" data-action="flows-category">' + categoryOptions + '</select>'
      + '<select class="toolbar-select" data-action="flows-sort">'
      + sortOption("hoursDesc", "Sort: Most hours saved") + sortOption("hoursAsc", "Sort: Least hours saved")
      + sortOption("nameAsc", "Sort: Name A\u2013Z") + sortOption("nameDesc", "Sort: Name Z\u2013A")
      + sortOption("recentDesc", "Sort: Most recent run") + sortOption("successDesc", "Sort: Success rate") + "</select>"
      + '<div class="toolbar-spacer"></div>'
      + '<div class="view-toggle">'
      + '<button type="button" data-action="set-flows-view" data-view="grid"' + (applicationState.flowsView === "grid" ? ' class="active"' : "") + ' aria-label="Grid view">' + icon("grid", "icon-sm") + "</button>"
      + '<button type="button" data-action="set-flows-view" data-view="list"' + (applicationState.flowsView === "list" ? ' class="active"' : "") + ' aria-label="List view">' + icon("list", "icon-sm") + "</button>"
      + "</div>"
      + '</div>';
  }

  function filterAndSortFlows(flows) {
    var searchTerm = applicationState.flowsSearch.trim().toLowerCase();
    var statusFilter = applicationState.flowsStatusFilter;
    var categoryFilter = applicationState.flowsCategoryFilter;
    var sortKey = applicationState.flowsSort;
    var filtered = flows.filter(function (flow) {
      if (statusFilter !== "all" && flow.status !== statusFilter) return false;
      if (categoryFilter !== "all" && flow.category !== categoryFilter) return false;
      if (searchTerm && flow.name.toLowerCase().indexOf(searchTerm) === -1 && flow.category.toLowerCase().indexOf(searchTerm) === -1) return false;
      return true;
    });
    filtered.sort(function (alpha, beta) {
      if (sortKey === "hoursDesc") return beta.hoursPerWeekSaved - alpha.hoursPerWeekSaved;
      if (sortKey === "hoursAsc") return alpha.hoursPerWeekSaved - beta.hoursPerWeekSaved;
      if (sortKey === "nameAsc") return alpha.name.localeCompare(beta.name);
      if (sortKey === "nameDesc") return beta.name.localeCompare(alpha.name);
      if (sortKey === "recentDesc") return alpha.lastRunMinutes - beta.lastRunMinutes;
      if (sortKey === "successDesc") return beta.successRate - alpha.successRate;
      return 0;
    });
    return filtered;
  }

  function flowCardActionsHtml(flow) {
    var buttons = "";
    if (flow.status === "paused") {
      buttons += '<button class="flow-icon-btn" data-action="resume-flow" data-flow="' + flow.id + '" type="button" aria-label="Resume" title="Resume">' + icon("play", "icon-sm") + "</button>";
    } else if (flow.status === "active") {
      buttons += '<button class="flow-icon-btn" data-action="run-flow-now" data-flow="' + flow.id + '" type="button" aria-label="Run now" title="Run now">' + icon("play", "icon-sm") + "</button>";
      buttons += '<button class="flow-icon-btn" data-action="pause-flow" data-flow="' + flow.id + '" type="button" aria-label="Pause" title="Pause">' + icon("pause", "icon-sm") + "</button>";
    } else {
      buttons += '<button class="flow-icon-btn" data-action="run-flow-now" data-flow="' + flow.id + '" type="button" aria-label="Retry" title="Retry">' + icon("refresh", "icon-sm") + "</button>";
    }
    buttons += '<button class="flow-icon-btn" data-action="open-executions" data-flow="' + flow.id + '" type="button" aria-label="View executions" title="View executions">' + icon("activity", "icon-sm") + "</button>";
    buttons += '<button class="flow-icon-btn" data-action="edit-flow" data-flow="' + flow.id + '" type="button" aria-label="Settings" title="Settings">' + icon("settings", "icon-sm") + "</button>";
    return buttons;
  }

  function flowGridCard(flow) {
    var rate = applicationState.hourlyRate;
    var annualSaved = flow.hoursPerWeekSaved * 52 * rate;
    var attentionClass = flow.status === "error" ? " attention" : "";
    return '<article class="flow-card' + attentionClass + '">'
      + '<div class="flow-card-top">'
      + '<div><div class="flow-card-title">' + escapeHtml(flow.name) + '</div><div class="flow-card-cat">' + statusDot(flow.status) + escapeHtml(flow.category) + "</div></div>"
      + statusBadge(flow.status)
      + "</div>"
      + '<div class="flow-card-savings"><span class="v">' + money(annualSaved) + '</span><span class="u">saved / yr</span></div>'
      + '<div class="flow-spark">' + sparklineSvg(flow.id) + "</div>"
      + '<div class="flow-mini-stats">'
      + '<div><div class="l">Hrs / wk</div><div class="v">' + decimal(flow.hoursPerWeekSaved, 1) + "</div></div>"
      + '<div><div class="l">Runs</div><div class="v">' + flow.runsTotal.toLocaleString("en-US") + "</div></div>"
      + '<div><div class="l">Success</div><div class="v">' + percent(flow.successRate) + "</div></div>"
      + "</div>"
      + '<div class="flow-card-foot"><span class="last-run">Last run ' + relativeTime(flow.lastRunMinutes) + '</span>'
      + '<div class="flow-card-actions">' + flowCardActionsHtml(flow) + "</div></div>"
      + "</article>";
  }

  function flowListRow(flow) {
    var rate = applicationState.hourlyRate;
    var annualSaved = flow.hoursPerWeekSaved * 52 * rate;
    var attentionClass = flow.status === "error" ? " attention" : "";
    return '<div class="flow-list-row' + attentionClass + '">'
      + '<div><div class="flow-list-title">' + statusDot(flow.status) + escapeHtml(flow.name) + '</div><div class="flow-list-cat">' + escapeHtml(flow.category) + "</div></div>"
      + '<div class="flow-list-cell money"><span class="label">Saved / yr</span><span class="v">' + money(annualSaved) + "</span></div>"
      + '<div class="flow-list-cell hide-md"><span class="label">Hrs / wk</span><span class="v">' + decimal(flow.hoursPerWeekSaved, 1) + "</span></div>"
      + '<div class="flow-list-cell hide-md"><span class="label">Success</span><span class="v">' + percent(flow.successRate) + "</span></div>"
      + '<div class="flow-list-cell hide-sm"><span class="label">Last run</span><span class="v">' + relativeTime(flow.lastRunMinutes) + "</span></div>"
      + '<div class="flow-card-actions">' + flowCardActionsHtml(flow) + "</div></div>";
  }

  function flowsEmptyState() {
    var suggestionHtml = flowSuggestions.slice(0, 3).map(function (suggestion) {
      return '<button class="flow-empty-suggest" type="button" data-action="request-automation">'
        + '<span class="ic">' + icon(suggestion.iconName, "icon-sm") + "</span>"
        + '<div class="t">' + suggestion.title + '</div><div class="d">' + suggestion.desc + "</div></button>";
    }).join("");
    return '<div class="flow-empty">'
      + '<div class="flow-empty-art">' + icon("sparkle") + "</div>"
      + "<h2>No automations yet</h2>"
      + "<p>Tell us what eats up the most hours in your week and we\u2019ll build the first automation for you. Most clients have their first flow running within 48 hours.</p>"
      + '<div class="flow-empty-actions">'
      + '<button class="btn btn-primary" type="button" data-action="request-automation">' + icon("plus", "icon-sm") + "Request your first automation</button>"
      + '<button class="btn btn-ghost" type="button" data-action="open-support">' + icon("support", "icon-sm") + "Talk to a specialist</button>"
      + "</div>"
      + '<div class="flow-empty-suggestions-head">Popular starting points</div>'
      + '<div class="flow-empty-suggestions">' + suggestionHtml + "</div>"
      + "</div>";
  }

  function flowsSingleState(flow) {
    var rate = applicationState.hourlyRate;
    var annualSaved = flow.hoursPerWeekSaved * 52 * rate;
    var suggestionHtml = flowSuggestions.slice(1, 4).map(function (suggestion) {
      return '<button class="flow-empty-suggest" type="button" data-action="request-automation">'
        + '<span class="ic">' + icon(suggestion.iconName, "icon-sm") + "</span>"
        + '<div class="t">' + suggestion.title + '</div><div class="d">' + suggestion.desc + "</div></button>";
    }).join("");
    return '<div class="single-flow-hero">'
      + '<div class="single-flow-hero-inner">'
      + '<div>'
      + statusBadge(flow.status)
      + '<h2>' + escapeHtml(flow.name) + "</h2>"
      + '<p class="lede">' + escapeHtml(flow.category) + " &middot; running since onboarding</p>"
      + '<div class="big-money">' + money(annualSaved) + "</div>"
      + '<div class="big-money-label">saved this year &middot; ' + decimal(flow.hoursPerWeekSaved, 1) + " hrs / week given back</div>"
      + '<div class="single-flow-hero-actions">'
      + '<button class="btn btn-primary" data-action="run-flow-now" data-flow="' + flow.id + '" type="button">' + icon("play", "icon-sm") + "Run now</button>"
      + '<button class="btn btn-ghost" data-action="open-executions" data-flow="' + flow.id + '" type="button">' + icon("activity", "icon-sm") + "See executions</button>"
      + '<button class="btn btn-ghost" data-action="edit-flow" data-flow="' + flow.id + '" type="button">' + icon("settings", "icon-sm") + "Settings</button>"
      + "</div>"
      + "</div>"
      + '<div class="single-flow-hero-stats">'
      + '<div class="single-flow-hero-stat"><div class="v">' + flow.runsTotal.toLocaleString("en-US") + '</div><div class="l">Total runs</div></div>'
      + '<div class="single-flow-hero-stat"><div class="v">' + percent(flow.successRate) + '</div><div class="l">Success rate</div></div>'
      + '<div class="single-flow-hero-stat"><div class="v">' + Math.round(flow.hoursSavedToDate).toLocaleString("en-US") + '</div><div class="l">Hours saved to date</div></div>'
      + '<div class="single-flow-hero-stat"><div class="v">' + relativeTime(flow.lastRunMinutes) + '</div><div class="l">Last run</div></div>'
      + "</div>"
      + "</div>"
      + "</div>"
      + '<div class="nudge" style="margin-top:20px"><span class="badge" style="background:rgba(255,255,255,0.16);color:#fff;align-self:flex-start">' + icon("spark", "icon-sm") + "Room to grow</span>"
      + "<h3>One automation is paying off \u2014 imagine three.</h3><p>Clients who layer scheduling and invoicing on top of a triage flow typically triple their savings within a quarter. Pick one below to get started, or talk to us about a custom flow.</p>"
      + "</div>"
      + '<div class="single-suggestions-head">Suggested next automations</div>'
      + '<div class="flow-empty-suggestions">' + suggestionHtml + "</div>";
  }

  function flowsManyState(flows) {
    var visibleFlows = filterAndSortFlows(flows);
    if (visibleFlows.length === 0) {
      return '<div class="exec-empty">' + icon("search") + "<h3>No automations match your filters</h3><p>Try clearing the search or switching the status filter back to \u201cAll statuses\u201d.</p></div>";
    }
    if (applicationState.flowsView === "grid") {
      return '<div class="flow-grid">' + visibleFlows.map(flowGridCard).join("") + "</div>";
    }
    return '<div class="flow-list">' + visibleFlows.map(flowListRow).join("") + "</div>";
  }

  function viewFlows() {
    var role = applicationState.session.role;
    if (role !== "client") {
      return topbarAuthed("flows") + '<main class="page">'
        + '<div class="page-head"><div><p class="eyebrow">Automations</p><h1 class="page-title">Flows</h1>'
        + '<p class="page-sub">This page is from the client perspective. Log in as <b>client</b> to view it as the customer sees it.</p></div></div>'
        + '<div class="exec-empty">' + icon("users") + '<h3>Switch to the client account</h3><p>The Flows experience is tailored for the client view. Use the demo client login to explore it.</p></div>'
        + "</main>";
    }
    var flows = flowsForCurrentDemoState();
    var demoState = applicationState.flowsDemoState;
    var headRight;
    if (demoState === "empty") {
      headRight = '<button class="btn btn-primary" data-action="request-automation" type="button">' + icon("plus", "icon-sm") + "Request automation</button>";
    } else {
      headRight = '<button class="btn btn-ghost" data-action="export-csv" type="button">' + icon("download", "icon-sm") + "Export</button>"
        + '<button class="btn btn-primary" data-action="request-automation" type="button">' + icon("plus", "icon-sm") + "Request automation</button>";
    }
    var body;
    if (demoState === "empty") body = flowsEmptyState();
    else if (demoState === "single") body = flowsSingleState(flows[0]);
    else body = flowsSummaryStrip(flows) + flowsToolbar(flows) + flowsManyState(flows);

    return topbarAuthed("flows") + '<main class="page">'
      + flowsStateToggleBanner()
      + '<div class="page-head"><div><p class="eyebrow">Automations</p><h1 class="page-title">Your flows</h1>'
      + '<p class="page-sub">Every automation working for you, with hours and dollars saved at a glance.</p></div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + headRight + "</div></div>"
      + body
      + "</main>";
  }

  // ============================================================
  // EXECUTIONS PAGE
  // ============================================================

  var EXECUTION_TRIGGERS = ["scheduled", "manual", "webhook", "email", "calendar"];

  var EXECUTION_SUMMARIES = {
    "Email triage": ["Sorted 14 new emails into 4 buckets", "Auto-replied to 3 standard inquiries", "Flagged 2 urgent messages for review", "Routed 7 messages to sales queue", "Deferred 5 newsletters to digest"],
    "Scheduling": ["Booked meeting with Acme Corp for Tuesday", "Found shared slot across 4 calendars", "Rescheduled 2 conflicts on Friday", "Sent calendar invites to 6 attendees", "Confirmed appointment with Linda Park"],
    "Invoicing": ["Matched invoice #4821 to PO #2210", "Filed 3 invoices to QuickBooks", "Flagged invoice #4823 \u2014 amount mismatch", "Chased 2 overdue invoices via email", "Generated retainer invoice for May"],
    "Client intake": ["Captured new lead from website form", "Validated and routed to assigned rep", "Triggered welcome sequence", "Added contact to CRM with tags", "Scheduled intro call for Wednesday"],
    "Reporting": ["Assembled weekly status report", "Pulled metrics from 3 dashboards", "Distributed PDF to 5 stakeholders", "Posted summary to Slack #ops", "Archived prior week\u2019s deliverables"],
    "Data entry": ["Cleaned 23 duplicate contact records", "Merged 4 company entries", "Updated 12 stale phone numbers", "Synced 8 records with master list", "Validated address formatting on 17 rows"]
  };

  var EXECUTION_STEP_TEMPLATES = {
    "Email triage": ["Fetch inbox", "Classify messages", "Apply labels", "Route to queues", "Send auto-replies"],
    "Scheduling": ["Check availability", "Find shared slot", "Draft invite", "Send invitation", "Update calendar"],
    "Invoicing": ["Pull invoice data", "Match to PO", "Validate amounts", "File to QuickBooks", "Notify owner"],
    "Client intake": ["Receive form data", "Validate fields", "Create CRM record", "Trigger welcome email", "Notify rep"],
    "Reporting": ["Pull source data", "Aggregate metrics", "Render report", "Distribute to list"],
    "Data entry": ["Scan dataset", "Detect duplicates", "Apply merge rules", "Update master record"]
  };

  function deterministicRandom(seed) {
    var seedState = 0;
    for (var characterIndex = 0; characterIndex < seed.length; characterIndex++) {
      seedState = ((seedState << 5) - seedState + seed.charCodeAt(characterIndex)) | 0;
    }
    if (seedState === 0) seedState = 1;
    var currentState = Math.abs(seedState);
    return function () {
      currentState = (currentState * 1103515245 + 12345) & 0x7fffffff;
      return currentState / 0x7fffffff;
    };
  }

  function pickFromList(randomFunction, list) {
    return list[Math.floor(randomFunction() * list.length) % list.length];
  }

  function triggeredByLabel(triggerName) {
    if (triggerName === "manual") return "Maya Rodriguez";
    if (triggerName === "scheduled") return "System scheduler";
    if (triggerName === "webhook") return "Zapier webhook";
    if (triggerName === "email") return "Inbox listener";
    return "Calendar listener";
  }

  function generateExecutionsForFlow(flow) {
    if (applicationState.cachedExecutionsFlowId === flow.id && applicationState.cachedExecutions) return applicationState.cachedExecutions;
    var randomFunction = deterministicRandom(flow.id);
    var categoryName = flow.category;
    var summaryList = EXECUTION_SUMMARIES[categoryName] || ["Completed scheduled task"];
    var stepTemplate = EXECUTION_STEP_TEMPLATES[categoryName] || ["Run task"];
    var totalExecutions = 152;
    var generatedExecutions = [];
    var elapsedMinutes = 0;
    for (var executionIndex = 0; executionIndex < totalExecutions; executionIndex++) {
      var minutesGap = Math.floor(15 + randomFunction() * 240);
      elapsedMinutes += minutesGap;
      var failureChance = (100 - flow.successRate) / 100;
      var statusRoll = randomFunction();
      var executionStatus = "success";
      if (executionIndex === 0 && randomFunction() < 0.18) executionStatus = "running";
      else if (statusRoll < failureChance) executionStatus = "failed";
      var triggerName = pickFromList(randomFunction, EXECUTION_TRIGGERS);
      var baseDurationSeconds = executionStatus === "failed" ? 4 + Math.floor(randomFunction() * 18) : 18 + Math.floor(randomFunction() * 90);
      if (executionStatus === "running") baseDurationSeconds = Math.floor(randomFunction() * 40);
      var summaryText = pickFromList(randomFunction, summaryList);
      var itemsProcessed = Math.floor(2 + randomFunction() * 28);
      var executionSteps = stepTemplate.map(function (stepName, stepIndex, allSteps) {
        var stepStatus = "success";
        if (executionStatus === "failed" && stepIndex === allSteps.length - 1) stepStatus = "failed";
        else if (executionStatus === "running" && stepIndex >= Math.floor(allSteps.length / 2)) stepStatus = "running";
        return { name: stepName, status: stepStatus, durationSeconds: Math.max(1, Math.floor(baseDurationSeconds / allSteps.length) + Math.floor(randomFunction() * 4)) };
      });
      var errorMessage = null;
      if (executionStatus === "failed") {
        var lastStepName = stepTemplate[stepTemplate.length - 1];
        errorMessage = "Step \u201c" + lastStepName + "\u201d returned 422: upstream validation failed. An automatic retry did not resolve. Manual review recommended.";
      }
      generatedExecutions.push({
        id: "exec_" + flow.id + "_" + (10000 + executionIndex),
        flowId: flow.id,
        minutesAgo: elapsedMinutes,
        status: executionStatus,
        durationSeconds: baseDurationSeconds,
        trigger: triggerName,
        summary: summaryText,
        itemsProcessed: itemsProcessed,
        triggeredBy: triggeredByLabel(triggerName),
        steps: executionSteps,
        errorMessage: errorMessage
      });
    }
    applicationState.cachedExecutionsFlowId = flow.id;
    applicationState.cachedExecutions = generatedExecutions;
    return generatedExecutions;
  }

  function filterExecutionList(executions) {
    var searchTerm = applicationState.execSearch.trim().toLowerCase();
    var statusFilter = applicationState.execStatusFilter;
    var dateFilter = applicationState.execDateFilter;
    var triggerFilter = applicationState.execTriggerFilter;
    var dateCutoffMinutes;
    if (dateFilter === "today") dateCutoffMinutes = 24 * 60;
    else if (dateFilter === "7d") dateCutoffMinutes = 7 * 24 * 60;
    else if (dateFilter === "30d") dateCutoffMinutes = 30 * 24 * 60;
    else dateCutoffMinutes = Infinity;
    return executions.filter(function (execution) {
      // diagnostics-specific filters (optional)
      var clientFilter = applicationState.diagnosticsClientFilter;
      var flowFilter = applicationState.diagnosticsFlowFilter;
      if (clientFilter && clientFilter !== "all" && execution.clientId !== clientFilter) return false;
      if (flowFilter && flowFilter !== "all" && execution.flowId !== flowFilter) return false;
      if (statusFilter !== "all" && execution.status !== statusFilter) return false;
      if (triggerFilter !== "all" && execution.trigger !== triggerFilter) return false;
      if (execution.minutesAgo > dateCutoffMinutes) return false;
      if (searchTerm) {
        var haystack = (execution.id + " " + execution.summary + " " + execution.trigger + " " + execution.triggeredBy).toLowerCase();
        if (haystack.indexOf(searchTerm) === -1) return false;
      }
      return true;
    });
  }

  function sortExecutionList(executions) {
    var sortKey = applicationState.execSortKey;
    var directionMultiplier = applicationState.execSortDirection === "asc" ? 1 : -1;
    var sortedExecutions = executions.slice();
    sortedExecutions.sort(function (alpha, beta) {
      var alphaValue, betaValue;
      if (sortKey === "started") { alphaValue = -alpha.minutesAgo; betaValue = -beta.minutesAgo; }
      else if (sortKey === "duration") { alphaValue = alpha.durationSeconds; betaValue = beta.durationSeconds; }
      else if (sortKey === "status") { alphaValue = alpha.status; betaValue = beta.status; }
      else if (sortKey === "trigger") { alphaValue = alpha.trigger; betaValue = beta.trigger; }
      else if (sortKey === "items") { alphaValue = alpha.itemsProcessed; betaValue = beta.itemsProcessed; }
      else { alphaValue = alpha.id; betaValue = beta.id; }
      if (alphaValue < betaValue) return -1 * directionMultiplier;
      if (alphaValue > betaValue) return 1 * directionMultiplier;
      return 0;
    });
    return sortedExecutions;
  }

  function executionStatsStrip(filteredExecutions, flow) {
    var totalCount = filteredExecutions.length;
    var successCount = 0, failedCount = 0, runningCount = 0, totalDuration = 0;
    filteredExecutions.forEach(function (execution) {
      if (execution.status === "success") successCount++;
      else if (execution.status === "failed") failedCount++;
      else if (execution.status === "running") runningCount++;
      totalDuration += execution.durationSeconds;
    });
    var successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;
    var perRunMinutes = flow.runsTotal > 0 ? (flow.hoursSavedToDate * 60) / flow.runsTotal : 0;
    var hoursSavedInView = Math.round((totalCount * perRunMinutes) / 60 * 10) / 10;
    return '<div class="exec-stats">'
      + '<div class="exec-stat"><div class="l">Executions in view</div><div class="v">' + totalCount.toLocaleString("en-US") + "</div></div>"
      + '<div class="exec-stat success"><div class="l">Success rate</div><div class="v">' + (totalCount > 0 ? decimal(successRate, 1) + "%" : "\u2014") + "</div></div>"
      + '<div class="exec-stat fail"><div class="l">Failures</div><div class="v">' + failedCount.toLocaleString("en-US") + "</div></div>"
      + '<div class="exec-stat run"><div class="l">Running now</div><div class="v">' + runningCount + "</div></div>"
      + '<div class="exec-stat warn"><div class="l">Hours saved (view)</div><div class="v">' + decimal(hoursSavedInView, 1) + "</div></div>"
      + "</div>";
  }

  function executionToolbar() {
    var searchValue = escapeHtml(applicationState.execSearch);
    var statusFilter = applicationState.execStatusFilter;
    var dateFilter = applicationState.execDateFilter;
    var triggerFilter = applicationState.execTriggerFilter;
    function statusChip(value, label) {
      var chipDot = "";
      if (value === "success") chipDot = '<span class="dot dot-active"></span>';
      else if (value === "failed") chipDot = '<span class="dot dot-error"></span>';
      else if (value === "running") chipDot = '<span class="dot dot-running"></span>';
      return '<button type="button" data-action="exec-status" data-value="' + value + '"' + (statusFilter === value ? ' class="active"' : "") + ">" + chipDot + label + "</button>";
    }
    function dateOption(value, label) {
      return '<option value="' + value + '"' + (dateFilter === value ? " selected" : "") + ">" + label + "</option>";
    }
    function triggerOption(value, label) {
      return '<option value="' + value + '"' + (triggerFilter === value ? " selected" : "") + ">" + label + "</option>";
    }
    return '<div class="exec-toolbar">'
      + '<div class="search-field"><span class="search-ic">' + icon("search", "icon-sm") + '</span><input type="text" placeholder="Search by ID, summary, or trigger\u2026" value="' + searchValue + '" data-action="exec-search" /></div>'
      + '<div class="chip-row">' + statusChip("all", "All") + statusChip("success", "Success") + statusChip("failed", "Failed") + statusChip("running", "Running") + "</div>"
      + '<select class="toolbar-select" data-action="exec-date">' + dateOption("today", "Today") + dateOption("7d", "Last 7 days") + dateOption("30d", "Last 30 days") + dateOption("all", "All time") + "</select>"
      + '<select class="toolbar-select" data-action="exec-trigger">' + triggerOption("all", "All triggers") + triggerOption("scheduled", "Scheduled") + triggerOption("manual", "Manual") + triggerOption("webhook", "Webhook") + triggerOption("email", "Email listener") + triggerOption("calendar", "Calendar listener") + "</select>"
      + '<div class="toolbar-spacer"></div>'
      + '<div class="view-toggle">'
      + '<button type="button" data-action="exec-density" data-density="comfortable"' + (applicationState.execDensity === "comfortable" ? ' class="active"' : "") + ' aria-label="Comfortable density" title="Comfortable">' + icon("list", "icon-sm") + "</button>"
      + '<button type="button" data-action="exec-density" data-density="compact"' + (applicationState.execDensity === "compact" ? ' class="active"' : "") + ' aria-label="Compact density" title="Compact">' + icon("layers", "icon-sm") + "</button>"
      + "</div>"
      + '<button class="btn btn-ghost btn-sm" data-action="exec-reset" type="button">' + icon("refresh", "icon-sm") + "Reset</button>"
      + "</div>";
  }

  function bulkActionBarHtml() {
    var selectedIds = Object.keys(applicationState.execSelectedIds);
    if (selectedIds.length === 0) return "";
    return '<div class="bulk-bar">'
      + '<span class="count">' + selectedIds.length + " selected</span>"
      + '<button class="btn btn-sm" data-action="bulk-rerun" type="button">' + icon("refresh", "icon-sm") + "Re-run selected</button>"
      + '<button class="btn btn-sm" data-action="bulk-export" type="button">' + icon("download", "icon-sm") + "Export CSV</button>"
      + '<button class="btn btn-sm" data-action="bulk-mark" type="button">' + icon("check", "icon-sm") + "Mark reviewed</button>"
      + '<div class="spacer"></div>'
      + '<button class="btn btn-sm btn-clear" data-action="bulk-clear" type="button">Clear selection</button>'
      + "</div>";
  }

  function sortIndicatorHtml(columnKey) {
    if (applicationState.execSortKey !== columnKey) return '<span class="sort-indicator">' + icon("sortNone", "icon-xs") + "</span>";
    return '<span class="sort-indicator">' + icon(applicationState.execSortDirection === "asc" ? "ascend" : "descend", "icon-xs") + "</span>";
  }

  function sortableHeaderCell(columnKey, columnLabel, extraClass) {
    var sortedClass = applicationState.execSortKey === columnKey ? " sorted" : "";
    return '<th class="sortable' + sortedClass + " " + (extraClass || "") + '" data-action="exec-sort" data-key="' + columnKey + '">' + columnLabel + sortIndicatorHtml(columnKey) + "</th>";
  }

  function expandedRowContentHtml(execution) {
    var stepsHtml = execution.steps.map(function (step) {
      var stepClass = step.status === "failed" ? " fail" : step.status === "running" ? " running" : "";
      var stepLabel = step.status === "running" ? "in progress" : formatDurationSeconds(step.durationSeconds);
      return '<div class="exec-step' + stepClass + '"><div class="step-title">' + escapeHtml(step.name) + "</div><div class=\"step-meta\">" + stepLabel + "</div></div>";
    }).join("");

    var canDebug = applicationState.session && applicationState.session.role !== 'client';
    var debugBtn = canDebug ? ('<button class="btn btn-primary btn-sm" data-action="debug-execution" data-execution="' + execution.id + '" data-flow="' + execution.flowId + '" type="button">' + icon('spark', 'icon-sm') + 'Debug run</button>') : '';

    var rightBlock = '';
    if (execution.errorMessage || execution.status === 'failed') {
      var btText = escapeHtml(execution.errorMessage || 'Unknown error');
      rightBlock = "<div>" +
        "<h4>Error</h4>" +
        "<div class=\"exec-detail-block error\">" + btText + "</div>" +
        "<div class=\"exec-detail-meta\">" +
          "<div><div class=\"l\">Execution ID</div><div class=\"v\">" + execution.id + "</div></div>" +
          "<div><div class=\"l\">Triggered by</div><div class=\"v\">" + escapeHtml(execution.triggeredBy) + "</div></div>" +
        "</div>" +
        "<div class=\"exec-expand-actions\">" +
          "<button class=\"btn btn-soft btn-sm\" data-action=\"rerun-execution\" data-execution=\"" + execution.id + "\" type=\"button\">" + icon("refresh", "icon-sm") + "Re-run</button>" +
          "<button class=\"btn btn-ghost btn-sm\" data-action=\"copy-execution-id\" data-execution=\"" + execution.id + "\" type=\"button\">" + icon("copy", "icon-sm") + "Copy ID</button>" +
          "<button class=\"btn btn-ghost btn-sm\" data-action=\"open-support\" type=\"button\">" + icon("support", "icon-sm") + "Contact support</button>" +
          debugBtn +
        "</div></div>";
    } else {
      var outputText = escapeHtml(execution.summary + "\n\nItems processed: " + execution.itemsProcessed + "\nTotal duration: " + formatDurationSeconds(execution.durationSeconds));
      rightBlock = "<div>" +
        "<h4>Output summary</h4>" +
        "<div class=\"exec-detail-block\">" + outputText + "</div>" +
        "<div class=\"exec-detail-meta\">" +
          "<div><div class=\"l\">Execution ID</div><div class=\"v\">" + execution.id + "</div></div>" +
          "<div><div class=\"l\">Triggered by</div><div class=\"v\">" + escapeHtml(execution.triggeredBy) + "</div></div>" +
        "</div>" +
        "<div class=\"exec-expand-actions\">" +
          "<button class=\"btn btn-soft btn-sm\" data-action=\"rerun-execution\" data-execution=\"" + execution.id + "\" type=\"button\">" + icon("refresh", "icon-sm") + "Re-run</button>" +
          "<button class=\"btn btn-ghost btn-sm\" data-action=\"copy-execution-id\" data-execution=\"" + execution.id + "\" type=\"button\">" + icon("copy", "icon-sm") + "Copy ID</button>" +
          debugBtn +
        "</div></div>";
    }

    var backtraceHtml = "";
    if ((execution.errorMessage || execution.status === 'failed') && canDebug) {
      var bt = execution.backtrace || generateBacktrace(execution);
      backtraceHtml = '<div style="margin-top:12px"><h4>Backtrace</h4><pre class="exec-backtrace" style="white-space:pre-wrap;max-height:220px;overflow:auto;padding:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);">' + escapeHtml(bt) + "</pre></div>";
    }

    return '<div class="exec-expand">' +
      '<div><h4>Timeline</h4><div class="exec-timeline">' + stepsHtml + '</div></div>' +
      rightBlock +
      backtraceHtml +
      '</div>';
  }

  function generateBacktrace(execution) {
    var header = execution.errorMessage ? execution.errorMessage : 'Execution failed';
    var frames = execution.steps.slice().reverse().map(function (s, idx) {
      return 'at ' + s.name + ' (step ' + (execution.steps.length - idx) + ')';
    }).slice(0, 8);
    return header + '\n' + frames.join('\n') + '\n    at runExecution (runtime.js:42:13)';
  }

  function executionRowHtml(execution, maxDurationSeconds, totalColumnCount) {
    var isExpanded = !!applicationState.execExpandedIds[execution.id];
    var isSelected = !!applicationState.execSelectedIds[execution.id];
    var rowClassList = [];
    if (isExpanded) rowClassList.push("expanded");
    if (isSelected) rowClassList.push("selected");
    var rowClassString = rowClassList.join(" ");
    var durationDisplay;
    if (execution.status === "running") {
      durationDisplay = '<span class="badge badge-indigo"><span class="dot dot-running"></span>Running</span>';
    } else {
      var widthPercent = Math.min(100, Math.round((execution.durationSeconds / maxDurationSeconds) * 100));
      durationDisplay = '<div class="duration-bar"><div class="track"><div class="fill" style="width:' + widthPercent + '%"></div></div><div class="v">' + formatDurationSeconds(execution.durationSeconds) + "</div></div>";
    }
    var mainRow = '<tr class="' + rowClassString + '" data-execution-row="' + execution.id + '">'
      + '<td class="check-cell"><input type="checkbox" data-action="toggle-select" data-execution="' + execution.id + '"' + (isSelected ? " checked" : "") + " /></td>"
      + '<td class="expand-cell"><button class="expand-btn" data-action="toggle-expand" data-execution="' + execution.id + '" type="button" aria-label="Expand">' + icon("chevronRight", "icon-xs") + "</button></td>"
      + "<td>" + executionStatusNode(execution.status) + "</td>"
      + "<td>" + formatDateTime(execution.minutesAgo) + '<div style="font-size:11.5px;color:var(--muted);margin-top:2px">' + relativeTime(execution.minutesAgo) + "</div></td>"
      + '<td class="summary-cell" title="' + escapeHtml(execution.summary) + '">' + escapeHtml(execution.summary) + "</td>"
      + "<td><span class=\"badge badge-neutral\">" + execution.trigger + "</span></td>"
      + '<td class="num">' + execution.itemsProcessed + "</td>"
      + "<td>" + durationDisplay + "</td>"
      + '<td class="id-cell">' + execution.id + "</td>"
      + '<td><div class="row-actions">'
      + '<button class="flow-icon-btn" data-action="rerun-execution" data-execution="' + execution.id + '" type="button" aria-label="Re-run" title="Re-run">' + icon("refresh", "icon-sm") + "</button>"
      + '<button class="flow-icon-btn" data-action="copy-execution-id" data-execution="' + execution.id + '" type="button" aria-label="Copy ID" title="Copy ID">' + icon("copy", "icon-sm") + "</button>"
      + '<button class="flow-icon-btn" data-action="open-execution-detail" data-execution="' + execution.id + '" data-flow="' + execution.flowId + '" type="button" aria-label="Open details" title="Open details">' + icon("arrowRight", "icon-sm") + "</button>"
      + "</div></td>"
      + "</tr>";
    if (!isExpanded) return mainRow;
    return mainRow + '<tr class="exec-expand-row"><td colspan="' + totalColumnCount + '">' + expandedRowContentHtml(execution) + "</td></tr>";
  }

  function paginationHtml(totalItems) {
    var pageSize = applicationState.execPageSize;
    var totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    var currentPage = Math.min(applicationState.execPage, totalPages);
    var startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    var endItem = Math.min(totalItems, currentPage * pageSize);
    var pagesToShow = [];
    function pushPageIfMissing(pageNumber) {
      if (pagesToShow.indexOf(pageNumber) === -1 && pageNumber >= 1 && pageNumber <= totalPages) pagesToShow.push(pageNumber);
    }
    pushPageIfMissing(1);
    pushPageIfMissing(2);
    pushPageIfMissing(currentPage - 1);
    pushPageIfMissing(currentPage);
    pushPageIfMissing(currentPage + 1);
    pushPageIfMissing(totalPages - 1);
    pushPageIfMissing(totalPages);
    pagesToShow.sort(function (alpha, beta) { return alpha - beta; });
    var lastRenderedPage = 0;
    var pageButtonsHtml = "";
    pagesToShow.forEach(function (pageNumber) {
      if (pageNumber - lastRenderedPage > 1) pageButtonsHtml += '<span class="ellipsis">\u2026</span>';
      pageButtonsHtml += '<button type="button" data-action="exec-page" data-page="' + pageNumber + '"' + (pageNumber === currentPage ? ' class="active"' : "") + ">" + pageNumber + "</button>";
      lastRenderedPage = pageNumber;
    });
    function sizeOption(value, label) {
      return '<option value="' + value + '"' + (pageSize === value ? " selected" : "") + ">" + label + "</option>";
    }
    return '<div class="pagination">'
      + '<div class="pagination-info"><span>Showing <b>' + startItem + "\u2013" + endItem + "</b> of <b>" + totalItems.toLocaleString("en-US") + "</b> executions</span>"
      + '<select class="page-size-select" data-action="exec-page-size">' + sizeOption(10, "10 per page") + sizeOption(25, "25 per page") + sizeOption(50, "50 per page") + sizeOption(100, "100 per page") + "</select></div>"
      + '<div class="pagination-controls">'
      + '<button type="button" data-action="exec-page" data-page="' + (currentPage - 1) + '"' + (currentPage === 1 ? " disabled" : "") + ' aria-label="Previous page">' + icon("arrowLeft", "icon-xs") + "</button>"
      + pageButtonsHtml
      + '<button type="button" data-action="exec-page" data-page="' + (currentPage + 1) + '"' + (currentPage >= totalPages ? " disabled" : "") + ' aria-label="Next page">' + icon("arrowRight", "icon-xs") + "</button>"
      + "</div></div>";
  }

  function viewExecutions(flowId) {
    var role = applicationState.session.role;
    var headerTopbar = topbarAuthed("flows");
    if (role !== "client") {
      return headerTopbar + '<main class="page">'
        + '<a class="back-link" href="#/flows">' + icon("arrowLeft", "icon-sm") + "Back to flows</a>"
        + '<div class="exec-empty">' + icon("users") + '<h3>Switch to the client account</h3><p>The Executions view is from the client perspective. Use the demo client login to explore it.</p></div>'
        + "</main>";
    }
    var lookup = flowById(flowId);
    if (!lookup) {
      return headerTopbar + '<main class="page">'
        + '<a class="back-link" href="#/flows">' + icon("arrowLeft", "icon-sm") + "Back to flows</a>"
        + '<div class="exec-empty">' + icon("alert") + '<h3>Flow not found</h3><p>That automation doesn\u2019t exist or has been removed.</p></div>'
        + "</main>";
    }
    var flow = lookup.flow;
    var allExecutions = generateExecutionsForFlow(flow);
    var filteredExecutions = filterExecutionList(allExecutions);
    var sortedExecutions = sortExecutionList(filteredExecutions);
    var totalItems = sortedExecutions.length;
    var totalPages = Math.max(1, Math.ceil(totalItems / applicationState.execPageSize));
    if (applicationState.execPage > totalPages) applicationState.execPage = totalPages;
    var pageStart = (applicationState.execPage - 1) * applicationState.execPageSize;
    var pagedExecutions = sortedExecutions.slice(pageStart, pageStart + applicationState.execPageSize);
    var maxDurationSeconds = Math.max(1, sortedExecutions.reduce(function (currentMax, execution) {
      return Math.max(currentMax, execution.durationSeconds);
    }, 1));
    var totalColumnCount = 10;
    var tableDensityClass = applicationState.execDensity === "compact" ? " compact" : "";
    var tableRowsHtml = pagedExecutions.map(function (execution) {
      return executionRowHtml(execution, maxDurationSeconds, totalColumnCount);
    }).join("");

    var emptyRowHtml = "";
    if (pagedExecutions.length === 0) {
      emptyRowHtml = '<tr><td colspan="' + totalColumnCount + '"><div class="exec-empty" style="border:none;box-shadow:none;background:transparent;padding:50px 20px">' + icon("search") + '<h3>No executions match your filters</h3><p>Try clearing the search or switching the status chip back to \u201cAll\u201d.</p></div></td></tr>';
    }

    var rate = applicationState.hourlyRate;
    var heroAnnual = flow.hoursPerWeekSaved * 52 * rate;

    var heroBlock = '<div class="exec-hero" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px 22px;box-shadow:var(--shadow-sm);margin-bottom:18px;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap">'
      + '<div style="flex:1;min-width:280px">'
      + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">' + statusBadge(flow.status) + '<h1 class="page-title">' + escapeHtml(flow.name) + " \u2014 executions</h1></div>"
      + '<p class="page-sub">' + escapeHtml(flow.category) + " &middot; " + flow.runsTotal.toLocaleString("en-US") + " total runs &middot; " + percent(flow.successRate) + " success rate &middot; saves about " + money(heroAnnual) + " / yr</p>"
      + "</div>"
      + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
      + '<button class="btn btn-ghost" data-action="export-csv" type="button">' + icon("download", "icon-sm") + "Export CSV</button>"
      + '<button class="btn btn-ghost" data-action="edit-flow" data-flow="' + flow.id + '" type="button">' + icon("settings", "icon-sm") + "Settings</button>"
      + '<button class="btn btn-primary" data-action="run-flow-now" data-flow="' + flow.id + '" type="button">' + icon("play", "icon-sm") + "Run now</button>"
      + "</div></div>";

    return headerTopbar + '<main class="page">'
      + '<a class="back-link" href="#/flows">' + icon("arrowLeft", "icon-sm") + "Back to flows</a>"
      + heroBlock
      + executionStatsStrip(filteredExecutions, flow)
      + executionToolbar()
      + bulkActionBarHtml()
      + '<div class="exec-tbl"><div class="exec-tbl-scroll"><table class="exec-tbl-inner' + tableDensityClass + '"><thead><tr>'
      + '<th class="check-cell"><input type="checkbox" data-action="toggle-select-all"' + (pagedExecutions.length > 0 && pagedExecutions.every(function (execution) { return applicationState.execSelectedIds[execution.id]; }) ? " checked" : "") + ' /></th>'
      + '<th class="expand-cell"></th>'
      + sortableHeaderCell("status", "Status")
      + sortableHeaderCell("started", "Started")
      + '<th>Summary</th>'
      + sortableHeaderCell("trigger", "Trigger")
      + sortableHeaderCell("items", "Items", "num")
      + sortableHeaderCell("duration", "Duration")
      + '<th>Execution ID</th>'
      + '<th></th>'
      + "</tr></thead><tbody>"
      + tableRowsHtml
      + emptyRowHtml
      + "</tbody></table></div>"
      + paginationHtml(totalItems)
      + "</div>"
      + "</main>";
  }

  function viewDiagnostics() {
    var role = applicationState.session.role;
    var headerTopbar = topbarAuthed("flows");
    if (role !== "developer" && role !== "consultant") {
      var body = '<a class="back-link" href="#/dashboard">' + icon("arrowLeft", "icon-sm") + 'Back to dashboard</a>'
        + '<div class="exec-empty">' + icon("users") + '<h3>Switch to the developer account</h3><p>The diagnostics view is available to consultants and developers only. Use the demo developer login to explore it.</p></div>';
      return headerTopbar + '<main class="page">' + body + '</main>';
    }
    // gather executions across scoped clients and flows
    var clientsToScan = scopedClients();
    var allExecutions = [];
    clientsToScan.forEach(function (client) {
      client.flows.forEach(function (flow) {
        var execs = generateExecutionsForFlow(flow).slice(0, 30).map(function (e) { e.clientId = client.id; e.company = client.company; e.flowName = flow.name; e.flowId = flow.id; return e; });
        allExecutions = allExecutions.concat(execs);
      });
    });
    var filteredExecutions = filterExecutionList(allExecutions);
    var sortedExecutions = sortExecutionList(filteredExecutions);
    var totalItems = sortedExecutions.length;
    // pagination for diagnostics uses same execPage and execPageSize
    var totalPages = Math.max(1, Math.ceil(totalItems / applicationState.execPageSize));
    if (applicationState.execPage > totalPages) applicationState.execPage = totalPages;
    var pageStart = (applicationState.execPage - 1) * applicationState.execPageSize;
    var pagedExecutions = sortedExecutions.slice(pageStart, pageStart + applicationState.execPageSize);
    var maxDurationSeconds = Math.max(1, sortedExecutions.reduce(function (currentMax, execution) { return Math.max(currentMax, execution.durationSeconds); }, 1));
    var totalColumnCount = 11;
    var tableDensityClass = applicationState.execDensity === "compact" ? " compact" : "";
    var tableRowsHtml = pagedExecutions.map(function (execution) { return executionRowHtml(execution, maxDurationSeconds, totalColumnCount); }).join("");
    var emptyRowHtml = pagedExecutions.length === 0 ? '<tr><td colspan="' + totalColumnCount + '"><div class="exec-empty" style="border:none;box-shadow:none;background:transparent;padding:50px 20px">' + icon("search") + '<h3>No executions match your filters</h3><p>Try clearing the search or switching the status chip back to \u201cAll\u201d.</p></div></td></tr>' : "";

    var clientOptions = '<option value="all">All clients</option>' + scopedClients().map(function (c) { return '<option value="' + c.id + '"' + (applicationState.diagnosticsClientFilter === c.id ? ' selected' : '') + '>' + escapeHtml(c.company) + '</option>'; }).join("");

    var header = '<a class="back-link" href="#/dashboard">' + icon("arrowLeft", "icon-sm") + 'Back to dashboard</a>'
      + '<div class="page-head"><div><p class="eyebrow">Diagnostics</p><h1 class="page-title">Consultant diagnostic log</h1><p class="page-sub">Recent executions across assigned clients. Use filters to narrow by client, flow, or status.</p></div></div>';

    var toolArea = '<div class="flows-toolbar" style="margin-bottom:12px">'
      + '<select class="toolbar-select" data-action="diagnostics-client">' + clientOptions + '</select>'
      + executionToolbar()
      + '</div>';

    return headerTopbar + '<main class="page">' + header + executionStatsStrip(filteredExecutions, { hoursPerWeekSaved: 0, runsTotal: 0, successRate: 0 }) + toolArea + bulkActionBarHtml()
      + '<div class="exec-tbl"><div class="exec-tbl-scroll"><table class="exec-tbl-inner' + tableDensityClass + '"><thead><tr>'
      + '<th class="check-cell"><input type="checkbox" data-action="toggle-select-all"' + (pagedExecutions.length > 0 && pagedExecutions.every(function (execution) { return applicationState.execSelectedIds[execution.id]; }) ? " checked" : "") + ' /></th>'
      + '<th class="expand-cell"></th>'
      + sortableHeaderCell("status", "Status")
      + sortableHeaderCell("started", "Started")
      + '<th>Summary</th>'
      + sortableHeaderCell("trigger", "Trigger")
      + sortableHeaderCell("items", "Items", "num")
      + sortableHeaderCell("duration", "Duration")
      + '<th>Execution ID</th>'
      + '<th>Client / Flow</th>'
      + '<th></th>'
      + '</tr></thead><tbody>'
      + tableRowsHtml
      + emptyRowHtml
      + '</tbody></table></div>'
      + paginationHtml(totalItems)
      + '</div></main>';
  }

  function viewExecutionDetail(flowId, executionId) {
    var role = applicationState.session.role;
    var headerTopbar = topbarAuthed("flows");
    var lookup = flowById(flowId);
    if (!lookup) {
      return headerTopbar + '<main class="page">' + '<a class="back-link" href="#/flows">' + icon("arrowLeft", "icon-sm") + 'Back to flows</a>' + '<div class="exec-empty">' + icon("alert") + '<h3>Execution not found</h3><p>That execution or flow does not exist.</p></div>' + '</main>';
    }
    var flow = lookup.flow;
    var client = lookup.client;
    // permission: clients may view only their own flows
    if (applicationState.session.role === 'client' && applicationState.session.clientId !== client.id) {
      return headerTopbar + '<main class="page">' + '<a class="back-link" href="#/flows">' + icon("arrowLeft", "icon-sm") + 'Back to flows</a>' + '<div class="exec-empty">' + icon("alert") + '<h3>Not authorized</h3><p>You do not have access to this execution.</p></div>' + '</main>';
    }
    var allExecutions = generateExecutionsForFlow(flow);
    var execution = allExecutions.find(function (e) { return e.id === executionId; });
    if (!execution) {
      return headerTopbar + '<main class="page">' + '<a class="back-link" href="#/flows/' + flow.id + '/executions">' + icon("arrowLeft", "icon-sm") + 'Back to executions</a>' + '<div class="exec-empty">' + icon("search") + '<h3>Execution not found</h3><p>That execution is not in the generated feed for this flow.</p></div>' + '</main>';
    }

    var hero = '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">' + statusBadge(execution.status) + '<h1 class="page-title">Execution detail</h1></div>'
      + '<p class="page-sub">' + escapeHtml(flow.name) + ' &middot; ' + client.company + ' &middot; ' + formatDateTime(execution.minutesAgo) + '</p>';

    var actions = '<div style="display:flex;gap:8px;flex-wrap:wrap">'
      + '<button class="btn btn-soft" data-action="rerun-execution" data-execution="' + execution.id + '" type="button">' + icon('refresh', 'icon-sm') + 'Re-run</button>'
      + '<button class="btn btn-ghost" data-action="copy-execution-id" data-execution="' + execution.id + '" type="button">' + icon('copy', 'icon-sm') + 'Copy ID</button>'
      + '<button class="btn btn-ghost" data-action="export-execution-csv" data-execution="' + execution.id + '" data-flow="' + flow.id + '" type="button">' + icon('download', 'icon-sm') + 'Export CSV</button>'
      + '</div>';

    return headerTopbar + '<main class="page">' + '<a class="back-link" href="#/flows/' + flow.id + '/executions">' + icon("arrowLeft", "icon-sm") + 'Back to executions</a>'
      + '<div class="page-head"><div><p class="eyebrow">Execution</p><h1 class="page-title">' + escapeHtml(flow.name) + '</h1><p class="page-sub">' + client.company + '</p></div><div>' + actions + '</div></div>'
      + '<div class="card"><div class="card-pad">' + expandedRowContentHtml(execution) + '</div></div>'
      + '</main>';
  }

  // ============================================================
  // MODALS / TOASTS / SCROLL LOCK
  // ============================================================

  function lockScroll() {
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.documentElement.style.paddingRight = scrollbarWidth + "px";
      document.body.style.paddingRight = scrollbarWidth + "px";
    }
  }

  function unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.style.paddingRight = "";
    document.body.style.paddingRight = "";
  }

  function openModal(innerHtml) {
    var layer = document.getElementById("modalLayer");
    layer.innerHTML = '<div class="modal-overlay" data-action="close-modal"><div class="modal" data-stop="1">' + innerHtml + "</div></div>";
    lockScroll();
    var firstField = layer.querySelector("input, textarea, select, button");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    var layer = document.getElementById("modalLayer");
    if (!layer.innerHTML) return;
    layer.innerHTML = "";
    unlockScroll();
  }

  function openSupportModal() {
    openModal(
      '<div class="modal-head"><div><h3>Contact support</h3><p>Tell us what you need and we\u2019ll reply within one business day.</p></div>'
      + '<button class="modal-close" data-action="close-modal" type="button" aria-label="Close">' + icon("close", "icon-sm") + "</button></div>"
      + '<div class="modal-body"><div class="field"><label for="supportSubject">Subject</label><input class="input" id="supportSubject" type="text" placeholder="What\u2019s going on?" /></div>'
      + '<div class="field"><label for="supportPriority">Priority</label><select class="select" id="supportPriority"><option>Normal</option><option>High</option><option>Urgent</option></select></div>'
      + '<div class="field"><label for="supportMessage">Message</label><textarea class="textarea" id="supportMessage" placeholder="Add any details that would help us help you."></textarea></div></div>'
      + '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal" type="button">Cancel</button><button class="btn btn-primary" data-action="send-support" type="button">' + icon("mail", "icon-sm") + "Send request</button></div>"
    );
  }

  function openForgotModal() {
    openModal(
      '<div class="modal-head"><div><h3>Password help</h3><p>Recovery isn\u2019t wired up in this prototype.</p></div>'
      + '<button class="modal-close" data-action="close-modal" type="button" aria-label="Close">' + icon("close", "icon-sm") + "</button></div>"
      + '<div class="modal-body"><p style="color:var(--muted);font-size:14px">In the live product this sends a secure reset link to your email. For now, use one of the demo logins on the sign-in screen: <b>admin</b>, <b>client</b>, or <b>developer</b> (username and password are the same).</p></div>'
      + '<div class="modal-foot"><button class="btn btn-primary" data-action="close-modal" type="button">Got it</button></div>'
    );
  }

  function openRequestModal() {
    openModal(
      '<div class="modal-head"><div><h3>Request an automation</h3><p>Describe the task and we\u2019ll scope it for you.</p></div>'
      + '<button class="modal-close" data-action="close-modal" type="button" aria-label="Close">' + icon("close", "icon-sm") + "</button></div>"
      + '<div class="modal-body"><div class="field"><label for="reqName">What should it do?</label><input class="input" id="reqName" type="text" placeholder="e.g. Sort and reply to refund emails" /></div>'
      + '<div class="field"><label for="reqHours">Roughly how many hours a week does it take you today?</label><input class="input" id="reqHours" type="number" min="0" step="0.5" placeholder="4" /></div>'
      + '<div class="field"><label for="reqUrgency">Priority</label><select class="select" id="reqUrgency"><option>Whenever you can</option><option>Within the next month</option><option>This is hurting us, please prioritize</option></select></div></div>'
      + '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal" type="button">Cancel</button><button class="btn btn-primary" data-action="send-request" type="button">Submit request</button></div>'
    );
  }

  function openEditFlowModal(flow) {
    openModal(
      '<div class="modal-head"><div><h3>' + escapeHtml(flow.name) + " settings</h3><p>" + escapeHtml(flow.category) + " &middot; this is a prototype \u2014 settings won\u2019t persist.</p></div>"
      + '<button class="modal-close" data-action="close-modal" type="button" aria-label="Close">' + icon("close", "icon-sm") + "</button></div>"
      + '<div class="modal-body">'
      + '<div class="field"><label>Schedule</label><select class="select"><option>Every 15 minutes</option><option>Hourly</option><option>Daily at 8:00 AM</option><option>Weekdays at 9:00 AM</option><option>Manual only</option></select></div>'
      + '<div class="field"><label>Failure notifications</label><select class="select"><option>Email me on every failure</option><option>Email me on 3+ failures in a row</option><option>Daily digest only</option><option>Don\u2019t notify me</option></select></div>'
      + '<div class="field"><label>Approval mode</label><select class="select"><option>Fully autonomous</option><option>Confirm before sending external emails</option><option>Confirm every action</option></select></div>'
      + '</div>'
      + '<div class="modal-foot"><button class="btn btn-danger-soft" data-action="close-modal" type="button">' + icon("pause", "icon-sm") + 'Pause this flow</button><div style="flex:1"></div><button class="btn btn-ghost" data-action="close-modal" type="button">Cancel</button><button class="btn btn-primary" data-action="save-flow-settings" type="button">Save changes</button></div>'
    );
  }

  function openDebugModal(executionId, flowId) {
    var lookup = flowById(flowId);
    var flowName = lookup ? escapeHtml(lookup.flow.name) : 'Flow';
    var body = `
      <div class="modal-head"><div><h3>Debug run</h3><p>Run this execution in debug mode with reduced side effects.</p></div>
      <button class="modal-close" data-action="close-modal" type="button" aria-label="Close">${icon("close", "icon-sm")}</button></div>
      <div class="modal-body">
        <p><strong>Execution:</strong> ${executionId} &middot; ${flowName}</p>
        <div class="field"><label>Debug level</label><div style="display:flex;gap:8px"><label><input type="radio" name="debugMode" value="safe" checked /> Safe (no external side effects)</label><label><input type="radio" name="debugMode" value="staged" /> Staged (limited side effects)</label></div></div>
        <div style="margin-top:8px;color:var(--muted);font-size:13px">In debug mode the system will simulate external actions (emails, calendar invites) rather than performing them.</div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal" type="button">Cancel</button>
      <button class="btn btn-primary" data-action="start-debug-run" data-execution="${executionId}" data-flow="${flowId}" type="button">Start debug run</button></div>`;
    openModal(body);
  }

  function showToast(message, variant) {
    var layer = document.getElementById("toastLayer");
    var node = document.createElement("div");
    node.className = "toast " + (variant || "");
    var leadIcon = variant === "success" ? "checkCircle" : variant === "error" ? "alert" : "bolt";
    node.innerHTML = icon(leadIcon, "icon-sm") + "<span>" + message + "</span>";
    layer.appendChild(node);
    setTimeout(function () {
      node.classList.add("leaving");
      setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 240);
    }, 3600);
  }

  // ============================================================
  // AUTH / NAV HELPERS
  // ============================================================

  function attemptLogin() {
    var userField = document.getElementById("loginUser");
    var passField = document.getElementById("loginPass");
    var errorBox = document.getElementById("authError");
    var username = userField ? userField.value.trim().toLowerCase() : "";
    var password = passField ? passField.value.trim().toLowerCase() : "";
    var account = accounts[username];
    if (account && password === username) {
      applicationState.session = { role: account.role, username: username, displayName: account.displayName, clientId: account.clientId };
      applicationState.reportPeriod = "year";
      location.hash = "#/dashboard";
    } else if (errorBox) {
      errorBox.classList.add("show");
    }
  }

  function loginAs(username) {
    var account = accounts[username];
    if (!account) return;
    applicationState.session = { role: account.role, username: username, displayName: account.displayName, clientId: account.clientId };
    applicationState.reportPeriod = "year";
    location.hash = "#/dashboard";
  }

  function logout() {
    applicationState.session = null;
    closeModal();
    location.hash = "#/home";
  }

  function navigateReport(clientId) {
    location.hash = clientId ? "#/report/" + clientId : "#/report";
  }

  function resetExecutionViewState() {
    applicationState.execSearch = "";
    applicationState.execStatusFilter = "all";
    applicationState.execDateFilter = "all";
    applicationState.execTriggerFilter = "all";
    applicationState.execSortKey = "started";
    applicationState.execSortDirection = "desc";
    applicationState.execPage = 1;
    applicationState.execExpandedIds = {};
    applicationState.execSelectedIds = {};
  }

  // ============================================================
  // EVENT HANDLING
  // ============================================================

  function handleClick(event) {
    var clickedInsideModalBody = event.target.closest(".modal");
    if (clickedInsideModalBody) {
      var actionInsideModal = event.target.closest(".modal [data-action]");
      if (!actionInsideModal) return;
      if (actionInsideModal.getAttribute("data-action") === "close-modal" && !event.target.closest(".modal-close") && !event.target.closest(".modal-foot")) return;
    }
    var trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    var action = trigger.getAttribute("data-action");

    switch (action) {
      case "toggle-nav":
        var navElement = document.querySelector(".topbar-nav");
        if (navElement) navElement.classList.toggle("open");
        break;
      case "logout":
        logout();
        break;
      case "open-support":
        document.querySelectorAll(".topbar-nav.open").forEach(function (node) { node.classList.remove("open"); });
        openSupportModal();
        break;
      case "send-support":
        closeModal();
        showToast("Support request sent. We\u2019ll reply within one business day.", "success");
        break;
      case "forgot":
        event.preventDefault();
        openForgotModal();
        break;
      case "demo-login":
        loginAs(trigger.getAttribute("data-user"));
        break;
      case "open-report":
        navigateReport(trigger.getAttribute("data-client"));
        break;
      case "go-flows":
        location.hash = "#/flows";
        break;
      case "run-flow":
        showToast("Triggered a sample run. Watch the executions feed update.", "success");
        break;
      case "run-flow-now":
        showToast("Run started. New execution will appear at the top in a moment.", "success");
        break;
      case "pause-flow":
        showToast("Flow paused. You can resume it anytime.", "");
        break;
      case "resume-flow":
        showToast("Flow resumed. It will pick up at its next scheduled run.", "success");
        break;
      case "request-automation":
        openRequestModal();
        break;
      case "send-request":
        closeModal();
        showToast("Automation request submitted. We\u2019ll scope it and follow up.", "success");
        break;
      case "download-report":
      case "export-csv":
      case "export-pdf":
        showToast("Export is a prototype stub for now.", "");
        break;
      case "build-flow":
        showToast("Flow builder is next on the roadmap.", "");
        break;
      case "add-client":
        showToast("Client onboarding wizard coming soon.", "");
        break;
      case "set-flows-state":
        applicationState.flowsDemoState = trigger.getAttribute("data-state");
        applicationState.flowsSearch = "";
        applicationState.flowsStatusFilter = "all";
        applicationState.flowsCategoryFilter = "all";
        render();
        break;
      case "set-flows-view":
        applicationState.flowsView = trigger.getAttribute("data-view");
        render();
        break;
      case "open-executions":
        resetExecutionViewState();
        location.hash = "#/flows/" + trigger.getAttribute("data-flow") + "/executions";
        break;
      case "edit-flow":
        var editFlowId = trigger.getAttribute("data-flow");
        var editLookup = flowById(editFlowId);
        if (editLookup) openEditFlowModal(editLookup.flow);
        break;
      case "save-flow-settings":
        closeModal();
        showToast("Flow settings saved.", "success");
        break;
      case "exec-status":
        applicationState.execStatusFilter = trigger.getAttribute("data-value");
        applicationState.execPage = 1;
        render();
        break;
      case "exec-sort":
        var sortKey = trigger.getAttribute("data-key");
        if (applicationState.execSortKey === sortKey) {
          applicationState.execSortDirection = applicationState.execSortDirection === "asc" ? "desc" : "asc";
        } else {
          applicationState.execSortKey = sortKey;
          applicationState.execSortDirection = sortKey === "started" ? "desc" : "asc";
        }
        render();
        break;
      case "exec-density":
        applicationState.execDensity = trigger.getAttribute("data-density");
        render();
        break;
      case "exec-reset":
        resetExecutionViewState();
        render();
        showToast("Filters reset.", "");
        break;
      case "exec-page":
        var nextPage = parseInt(trigger.getAttribute("data-page"), 10);
        if (!isNaN(nextPage) && nextPage > 0) {
          applicationState.execPage = nextPage;
          render();
        }
        break;
      case "toggle-expand":
        var expandId = trigger.getAttribute("data-execution");
        if (applicationState.execExpandedIds[expandId]) delete applicationState.execExpandedIds[expandId];
        else applicationState.execExpandedIds[expandId] = true;
        render();
        break;
      case "rerun-execution":
        showToast("Re-running execution \u2014 a new entry will appear shortly.", "success");
        break;
      case "debug-execution":
        var dbgExec = trigger.getAttribute("data-execution");
        var dbgFlow = trigger.getAttribute("data-flow");
        openDebugModal(dbgExec, dbgFlow);
        break;
      case "copy-execution-id":
        var executionIdToCopy = trigger.getAttribute("data-execution");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(executionIdToCopy);
        }
        showToast("Execution ID copied to clipboard.", "success");
        break;
      case "open-execution-detail":
        var execIdNav = trigger.getAttribute("data-execution");
        var flowIdNav = trigger.getAttribute("data-flow");
        if (flowIdNav && execIdNav) location.hash = "#/flows/" + flowIdNav + "/executions/" + execIdNav;
        break;
      case "export-execution-csv":
        var expId = trigger.getAttribute("data-execution");
        var expFlow = trigger.getAttribute("data-flow");
        if (expFlow && expId) {
          var lookupExp = flowById(expFlow);
          if (lookupExp) {
            var execList = generateExecutionsForFlow(lookupExp.flow);
            var execToExport = execList.find(function (e) { return e.id === expId; });
            if (execToExport) {
              var csv = 'step,status,durationSeconds\n' + execToExport.steps.map(function (s) { return '"' + s.name.replace(/"/g, '""') + '","' + s.status + '",' + s.durationSeconds; }).join('\n');
              var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              var url = URL.createObjectURL(blob);
              var a = document.createElement('a'); a.href = url; a.download = expId + '.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
            }
          }
        }
        showToast('CSV exported (prototype).', 'success');
        break;
      case "start-debug-run":
        var startExec = trigger.getAttribute("data-execution") || trigger.getAttribute("data-exec") || trigger.getAttribute("data-execution-id");
        var startFlow = trigger.getAttribute("data-flow");
        // read selected debug mode from modal
        var selected = document.querySelector('.modal [name="debugMode"]:checked');
        var mode = selected ? selected.value : 'safe';
        closeModal();
        showToast('Started debug run (' + mode + '). No external side effects.', 'success');
        break;
      case "bulk-rerun":
        showToast("Re-running " + Object.keys(applicationState.execSelectedIds).length + " executions.", "success");
        applicationState.execSelectedIds = {};
        render();
        break;
      case "bulk-export":
        showToast("Exporting " + Object.keys(applicationState.execSelectedIds).length + " executions to CSV.", "");
        break;
      case "bulk-mark":
        showToast(Object.keys(applicationState.execSelectedIds).length + " executions marked as reviewed.", "success");
        applicationState.execSelectedIds = {};
        render();
        break;
      case "bulk-clear":
        applicationState.execSelectedIds = {};
        render();
        break;
      case "close-modal":
        closeModal();
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    var loginForm = event.target.closest('[data-action="login-form"]');
    if (loginForm) {
      event.preventDefault();
      attemptLogin();
    }
  }

  function handleChange(event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var action = target.getAttribute("data-action");
    if (action === "rate-input") {
      var parsedRate = parseFloat(target.value);
      applicationState.hourlyRate = isNaN(parsedRate) || parsedRate < 1 ? 1 : Math.round(parsedRate);
      render();
    } else if (action === "period-select") {
      applicationState.reportPeriod = target.value;
      render();
    } else if (action === "flows-status") {
      applicationState.flowsStatusFilter = target.value;
      render();
    } else if (action === "flows-category") {
      applicationState.flowsCategoryFilter = target.value;
      render();
    } else if (action === "flows-sort") {
      applicationState.flowsSort = target.value;
      render();
    } else if (action === "exec-date") {
      applicationState.execDateFilter = target.value;
      applicationState.execPage = 1;
      render();
    } else if (action === "exec-trigger") {
      applicationState.execTriggerFilter = target.value;
      applicationState.execPage = 1;
      render();
    } else if (action === "exec-page-size") {
      applicationState.execPageSize = parseInt(target.value, 10);
      applicationState.execPage = 1;
      render();
    } else if (action === "diagnostics-client") {
      applicationState.diagnosticsClientFilter = target.value;
      applicationState.execPage = 1;
      render();
    } else if (action === "toggle-select") {
      var selectionId = target.getAttribute("data-execution");
      if (target.checked) applicationState.execSelectedIds[selectionId] = true;
      else delete applicationState.execSelectedIds[selectionId];
      render();
    } else if (action === "toggle-select-all") {
      var routeInfo = parseHash();
      if (routeInfo.name === "flows" && routeInfo.param && routeInfo.subParam === "executions") {
        var lookup = flowById(routeInfo.param);
        if (lookup) {
          var allExecutions = generateExecutionsForFlow(lookup.flow);
          var filteredList = sortExecutionList(filterExecutionList(allExecutions));
          var pageStart = (applicationState.execPage - 1) * applicationState.execPageSize;
          var pagedList = filteredList.slice(pageStart, pageStart + applicationState.execPageSize);
          if (target.checked) {
            pagedList.forEach(function (execution) { applicationState.execSelectedIds[execution.id] = true; });
          } else {
            pagedList.forEach(function (execution) { delete applicationState.execSelectedIds[execution.id]; });
          }
          render();
        }
      }
    }
  }

  function handleInput(event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var action = target.getAttribute("data-action");
    if (action === "flows-search") {
      applicationState.flowsSearch = target.value;
      var scrollPosition = window.scrollY;
      render();
      window.scrollTo(0, scrollPosition);
      var inputAfterRender = document.querySelector('[data-action="flows-search"]');
      if (inputAfterRender) {
        inputAfterRender.focus();
        var caretPosition = inputAfterRender.value.length;
        inputAfterRender.setSelectionRange(caretPosition, caretPosition);
      }
    } else if (action === "exec-search") {
      applicationState.execSearch = target.value;
      applicationState.execPage = 1;
      var scrollPositionExec = window.scrollY;
      render();
      window.scrollTo(0, scrollPositionExec);
      var inputAfterRenderExec = document.querySelector('[data-action="exec-search"]');
      if (inputAfterRenderExec) {
        inputAfterRenderExec.focus();
        var caretPositionExec = inputAfterRenderExec.value.length;
        inputAfterRenderExec.setSelectionRange(caretPositionExec, caretPositionExec);
      }
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") closeModal();
  }

  function parseHash() {
    var rawHash = location.hash.replace(/^#\/?/, "");
    if (!rawHash) return { name: "home", param: null, subParam: null };
    var parts = rawHash.split("/");
    return { name: parts[0], param: parts[1] || null, subParam: parts[2] || null, subSubParam: parts[3] || null };
  }

  function render() {
    var route = parseHash();
    var session = applicationState.session;
    var protectedRoutes = ["dashboard", "report", "flows", "diagnostics"];
    if (protectedRoutes.indexOf(route.name) !== -1 && !session) {
      location.hash = "#/login";
      return;
    }
    if (route.name === "login" && session) {
      location.hash = "#/dashboard";
      return;
    }
    var appElement = document.getElementById("app");
    var html;
    if (route.name === "login") html = viewLogin();
    else if (route.name === "dashboard") html = viewDashboard();
    else if (route.name === "report") html = viewReport(route.param);
    else if (route.name === "diagnostics") html = viewDiagnostics();
    else if (route.name === "flows" && route.param && route.subParam === "executions" && !route.subSubParam) html = viewExecutions(route.param);
    else if (route.name === "flows" && route.param && route.subParam === "executions" && route.subSubParam) html = viewExecutionDetail(route.param, route.subSubParam);
    else if (route.name === "flows") html = viewFlows();
    else html = viewHome();
    appElement.innerHTML = html;
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", function () {
    closeModal();
    var route = parseHash();
    if (route.name === "flows" && route.param && route.subParam === "executions") {
      var lookup = flowById(route.param);
      if (lookup && applicationState.cachedExecutionsFlowId !== lookup.flow.id) {
        resetExecutionViewState();
        applicationState.cachedExecutionsFlowId = null;
        applicationState.cachedExecutions = null;
      }
    }
    render();
    window.scrollTo(0, 0);
  });
  document.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") render();
})();