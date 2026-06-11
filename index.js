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
    link: '<path d="m9.5 14.5 5-5"/><path d="M11 7.5 12 6.5a4 4 0 0 1 5.7 5.7l-1 1M13 16.5l-1 1A4 4 0 0 1 6.3 11.8l1-1"/>'
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

  var applicationState = {
    session: null,
    hourlyRate: HOURLY_RATE_DEFAULT,
    reportPeriod: "year",
    navOpen: false
  };

  function clientById(id) {
    for (var index = 0; index < clients.length; index++) if (clients[index].id === id) return clients[index];
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
    if (status === "running") return '<span class="badge badge-indigo"><span class="dot" style="background:#6366F1"></span>Running</span>';
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
      var active = view === activeView ? " active" : "";
      return '<a class="nav-link' + active + '" href="' + href + '">' + icon(iconName, "icon-sm") + label + "</a>";
    }
    var nav = '<nav class="topbar-nav">'
      + navLink("dashboard", "#/dashboard", "Dashboard", "grid")
      + navLink("report", "#/report", "Reports", "chart")
      + '<button class="nav-link" data-action="open-support" type="button">' + icon("support", "icon-sm") + "Support</button>"
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
      + '<div class="hero-trust"><span><strong>21,000+</strong> tasks run weekly</span><span><strong>99.2%</strong> success rate</span><span><strong>4.8 hrs</strong> saved per day, on average</span></div></div>'
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
      + '<a class="btn btn-soft btn-sm" href="#/report">Full report' + icon("arrowRight", "icon-sm") + "</a></div>"
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
      { action: "run-flow", iconName: "play", title: "Run a flow", sub: "Trigger on demand" },
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
    var rate = applicationState.hourlyRate;
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
      + '<div class="field"><label for="reqHours">Roughly how many hours a week does it take you today?</label><input class="input" id="reqHours" type="number" min="0" step="0.5" placeholder="4" /></div></div>'
      + '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal" type="button">Cancel</button><button class="btn btn-primary" data-action="send-request" type="button">Submit request</button></div>'
    );
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

  function handleClick(event) {
    var stopNode = event.target.closest("[data-stop]");
    var trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    var action = trigger.getAttribute("data-action");

    if (action === "close-modal" && event.target.closest(".modal") && !event.target.closest('[data-action="close-modal"]')) return;

    switch (action) {
      case "toggle-nav":
        var nav = document.querySelector(".topbar-nav");
        if (nav) nav.classList.toggle("open");
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
      case "run-flow":
        showToast("Triggered a sample run. Watch the executions feed update.", "success");
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
      case "close-modal":
        closeModal();
        break;
      default:
        break;
    }

    if (stopNode && action !== "close-modal") return;
  }

  function handleSubmit(event) {
    var form = event.target.closest('[data-action="login-form"]');
    if (form) {
      event.preventDefault();
      attemptLogin();
    }
  }

  function handleChange(event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var action = target.getAttribute("data-action");
    if (action === "rate-input") {
      var parsed = parseFloat(target.value);
      applicationState.hourlyRate = isNaN(parsed) || parsed < 1 ? 1 : Math.round(parsed);
      render();
    } else if (action === "period-select") {
      applicationState.reportPeriod = target.value;
      render();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") closeModal();
  }

  function parseHash() {
    var raw = location.hash.replace(/^#\/?/, "");
    if (!raw) return { name: "home", param: null };
    var parts = raw.split("/");
    return { name: parts[0], param: parts[1] || null };
  }

  function render() {
    var route = parseHash();
    var session = applicationState.session;
    if ((route.name === "dashboard" || route.name === "report") && !session) {
      location.hash = "#/login";
      return;
    }
    if (route.name === "login" && session) {
      location.hash = "#/dashboard";
      return;
    }
    var app = document.getElementById("app");
    var html;
    if (route.name === "login") html = viewLogin();
    else if (route.name === "dashboard") html = viewDashboard();
    else if (route.name === "report") html = viewReport(route.param);
    else html = viewHome();
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", function () { closeModal(); render(); });
  document.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") render();
})();