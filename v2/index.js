const STORAGE_KEY_REMEMBER = 'autoSecretary.rememberedSession';
const STORAGE_KEY_SESSION = 'autoSecretary.session';

const appState = {
    currentRole: null,
    currentRoute: null,
    currentReportRange: '30d',
    flowsDemoState: 'many',
    flowsView: 'grid',
    flowsSearch: '',
    flowsStatusFilter: 'all',
    flowsCategoryFilter: 'all',
    flowsSort: 'hoursDesc',
    execSearch: '',
    execStatusFilter: 'all',
    execDateFilter: 'all',
    execTriggerFilter: 'all',
    execSortKey: 'started',
    execSortDirection: 'desc',
    execPage: 1,
    execPageSize: 25,
    execDensity: 'comfortable',
    execExpandedIds: {},
    execSelectedIds: {},
    cachedExecutionsFlowId: null,
    cachedExecutions: null,
    activeFlowId: null
};

function setSession(role, rememberMe) {
    appState.currentRole = role;
    const payload = JSON.stringify({ role, savedAt: new Date().toISOString() });
    if (rememberMe) {
        localStorage.setItem(STORAGE_KEY_REMEMBER, payload);
        sessionStorage.removeItem(STORAGE_KEY_SESSION);
    } else {
        sessionStorage.setItem(STORAGE_KEY_SESSION, payload);
        localStorage.removeItem(STORAGE_KEY_REMEMBER);
    }
}

function clearSession() {
    appState.currentRole = null;
    localStorage.removeItem(STORAGE_KEY_REMEMBER);
    sessionStorage.removeItem(STORAGE_KEY_SESSION);
}

function restoreSession() {
    const stored = localStorage.getItem(STORAGE_KEY_REMEMBER) || sessionStorage.getItem(STORAGE_KEY_SESSION);
    if (!stored) return null;
    try {
        const parsed = JSON.parse(stored);
        appState.currentRole = parsed.role;
        return parsed.role;
    } catch (error) {
        clearSession();
        return null;
    }
}

function setReportRange(range) {
    appState.currentReportRange = range;
}


const VALID_ROLES = ['admin', 'client', 'developer'];

function attemptLogin(username, password, rememberMe) {
    const normalizedUser = (username || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim().toLowerCase();
    if (!normalizedUser || !normalizedPassword) {
        return { success: false, message: 'Enter a username and password to continue.' };
    }
    if (normalizedUser !== normalizedPassword) {
        return { success: false, message: 'Those credentials don\'t match. For this prototype, use the same word for both fields.' };
    }
    if (!VALID_ROLES.includes(normalizedUser)) {
        return { success: false, message: 'Try admin, client, or developer to preview each role.' };
    }
    setSession(normalizedUser, rememberMe);
    return { success: true, role: normalizedUser };
}

function logout() {
    clearSession();
}

function isAuthenticated(role) {
    return VALID_ROLES.includes(role);
}


const mockClientProfile = {
    displayName: 'Avery Calloway',
    company: 'Calloway Studio',
    accountNumber: 'AS-10942',
    memberSince: 'March 2025'
};

const mockClientSavings = {
    dollarsSavedThisMonth: 4280,
    hoursSavedPerWeek: 11.5,
    totalHoursSaved: 187,
    dollarsSavedAllTime: 18420,
    deltaMonthOverMonth: 12.4,
    deltaHoursMonthOverMonth: 1.8
};

const mockClientActiveFlows = [
    { name: 'Inbox triage & reply drafts', status: 'running', lastRun: 'Just now', runsThisWeek: 142 },
    { name: 'Calendar scheduling & confirmations', status: 'running', lastRun: '12 min ago', runsThisWeek: 38 },
    { name: 'Invoice follow-ups', status: 'running', lastRun: '1 hr ago', runsThisWeek: 24 },
    { name: 'Receipt filing & expense logs', status: 'paused', lastRun: 'Yesterday', runsThisWeek: 0 },
    { name: 'Weekly status report drafts', status: 'running', lastRun: 'Yesterday', runsThisWeek: 5 }
];

const mockClientRecentExecutions = [
    { kind: 'success', title: 'Drafted reply to Mara Chen about Q3 proposal', detail: 'Inbox triage', when: '3 min ago' },
    { kind: 'success', title: 'Confirmed meeting with Lucent Studio for Thursday 2pm', detail: 'Calendar scheduling', when: '12 min ago' },
    { kind: 'success', title: 'Sent gentle reminder for invoice #1042', detail: 'Invoice follow-ups', when: '1 hr ago' },
    { kind: 'success', title: 'Filed 8 receipts to October expense report', detail: 'Receipt filing', when: '3 hr ago' },
    { kind: 'warning', title: 'Held back reply to Tomás Vega — flagged for your review', detail: 'Inbox triage', when: '4 hr ago' },
    { kind: 'success', title: 'Rescheduled standup to accommodate Priya', detail: 'Calendar scheduling', when: '5 hr ago' },
    { kind: 'success', title: 'Drafted weekly status report for the Hayward project', detail: 'Status reports', when: 'Yesterday' }
];

const mockClientAttention = [
    { title: 'Reply to Tomás Vega — pricing pushback', meta: 'I drafted three responses for you to pick from', action: 'Review' },
    { title: 'Confirm Thursday block for the Hayward kickoff', meta: 'Two attendees haven\'t responded', action: 'Confirm' },
    { title: 'Approve the October expense report', meta: 'I\'ve filed everything — needs your sign-off', action: 'Approve' }
];

const mockSavingsByFlow = [
    { name: 'Inbox triage & reply drafts', hours: 5.4, dollars: 1820 },
    { name: 'Calendar scheduling & confirmations', hours: 2.8, dollars: 940 },
    { name: 'Invoice follow-ups', hours: 1.6, dollars: 560 },
    { name: 'Receipt filing & expense logs', hours: 0.9, dollars: 320 },
    { name: 'Weekly status report drafts', hours: 0.8, dollars: 280 }
];

const mockWeeklyHours = [
    { day: 'Mon', hours: 2.4 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 2.9 },
    { day: 'Thu', hours: 1.2 },
    { day: 'Fri', hours: 2.1 },
    { day: 'Sat', hours: 0.6 },
    { day: 'Sun', hours: 0.5 }
];

const mockDeveloperProfile = {
    displayName: 'Jordan Reyes',
    company: 'Auto Secretary — Solutions',
    accountNumber: 'AS-DEV-204',
    memberSince: 'January 2025'
};

const mockDeveloperSummary = {
    clientsManaged: 14,
    activeFlows: 62,
    errorsThisWeek: 3,
    flowsDeployedThisMonth: 9
};

const mockDeveloperClients = [
    { name: 'Calloway Studio', flows: 5, dollarsSaved: 18420, hoursSaved: 187, status: 'healthy' },
    { name: 'Hayward & Lin', flows: 4, dollarsSaved: 22100, hoursSaved: 224, status: 'healthy' },
    { name: 'Northwind Therapeutics', flows: 7, dollarsSaved: 41280, hoursSaved: 412, status: 'attention' },
    { name: 'Bramble Creative', flows: 3, dollarsSaved: 9840, hoursSaved: 98, status: 'healthy' },
    { name: 'Vale & Mott Legal', flows: 6, dollarsSaved: 31460, hoursSaved: 296, status: 'healthy' },
    { name: 'Cinder Architecture', flows: 4, dollarsSaved: 14200, hoursSaved: 142, status: 'error' },
    { name: 'Lucent Studio', flows: 5, dollarsSaved: 19800, hoursSaved: 196, status: 'healthy' }
];

const mockDeveloperRecentDeployments = [
    { kind: 'success', title: 'Deployed v2.4 of inbox triage for Hayward & Lin', detail: 'Production', when: '2 hr ago' },
    { kind: 'success', title: 'Patched scheduling timezone bug for Northwind', detail: 'Hotfix', when: 'Yesterday' },
    { kind: 'warning', title: 'Rolled back receipt-filing for Cinder Architecture', detail: 'Investigation', when: 'Yesterday' },
    { kind: 'success', title: 'New flow: contract redlining for Vale & Mott', detail: 'Production', when: '2 days ago' }
];

const mockDeveloperErrors = [
    { title: 'Cinder Architecture — receipt OCR failing on PDF attachments', meta: 'First seen 18 hr ago · 4 occurrences', action: 'Investigate' },
    { title: 'Northwind — calendar API rate limit exceeded', meta: 'First seen 3 hr ago · 1 occurrence', action: 'Investigate' },
    { title: 'Calloway Studio — webhook timeout (non-blocking)', meta: 'First seen yesterday · 1 occurrence', action: 'Investigate' }
];

const mockAdminProfile = {
    displayName: 'Sasha Marin',
    company: 'Auto Secretary — Operations',
    accountNumber: 'AS-ADM-001',
    memberSince: 'October 2024'
};

const mockAdminSummary = {
    totalUsers: 248,
    totalDollarsSaved: 1842600,
    totalHoursSaved: 18420,
    monthlyRecurringRevenue: 64280
};

const mockAdminUsers = [
    { name: 'Calloway Studio', plan: 'Pro', dollarsSaved: 18420, hoursSaved: 187, flows: 5, lastActive: 'Now' },
    { name: 'Hayward & Lin', plan: 'Pro', dollarsSaved: 22100, hoursSaved: 224, flows: 4, lastActive: '12 min' },
    { name: 'Northwind Therapeutics', plan: 'Scale', dollarsSaved: 41280, hoursSaved: 412, flows: 7, lastActive: '34 min' },
    { name: 'Bramble Creative', plan: 'Starter', dollarsSaved: 9840, hoursSaved: 98, flows: 3, lastActive: '2 hr' },
    { name: 'Vale & Mott Legal', plan: 'Scale', dollarsSaved: 31460, hoursSaved: 296, flows: 6, lastActive: '5 hr' },
    { name: 'Cinder Architecture', plan: 'Pro', dollarsSaved: 14200, hoursSaved: 142, flows: 4, lastActive: 'Yesterday' },
    { name: 'Lucent Studio', plan: 'Pro', dollarsSaved: 19800, hoursSaved: 196, flows: 5, lastActive: '2 days' },
    { name: 'Mercer & Daughters', plan: 'Starter', dollarsSaved: 7820, hoursSaved: 84, flows: 2, lastActive: 'Today' },
    { name: 'Pellumbra Holdings', plan: 'Scale', dollarsSaved: 38940, hoursSaved: 364, flows: 8, lastActive: 'Today' },
    { name: 'Quirin Pharmaceuticals', plan: 'Scale', dollarsSaved: 52180, hoursSaved: 488, flows: 9, lastActive: '1 hr' }
];

const mockAdminRecentSignups = [
    { name: 'Sage & Co.', plan: 'Pro', when: '2 hr ago' },
    { name: 'Anwar Imports', plan: 'Starter', when: '6 hr ago' },
    { name: 'Trellis Architecture', plan: 'Pro', when: 'Yesterday' },
    { name: 'Halcyon Bakery', plan: 'Starter', when: '2 days ago' }
];

const mockAdminSystemHealth = [
    { label: 'API uptime (30d)', value: '99.98%', tone: 'success' },
    { label: 'Avg response time', value: '142 ms', tone: 'success' },
    { label: 'Active integrations', value: '34', tone: 'success' },
    { label: 'Open support tickets', value: '7', tone: 'warning' }
];

const mockClientFlowsFull = [
    { id: 'flow-inbox', name: 'Inbox triage & reply drafts', category: 'Email triage', hoursPerWeekSaved: 5.4, runsTotal: 4120, successRate: 99.2, status: 'running', lastRunMinutes: 3, hoursSavedToDate: 86 },
    { id: 'flow-calendar', name: 'Calendar scheduling & confirmations', category: 'Scheduling', hoursPerWeekSaved: 2.8, runsTotal: 2210, successRate: 98.1, status: 'running', lastRunMinutes: 12, hoursSavedToDate: 44 },
    { id: 'flow-invoices', name: 'Invoice follow-ups', category: 'Invoicing', hoursPerWeekSaved: 1.6, runsTotal: 980, successRate: 99.6, status: 'running', lastRunMinutes: 60, hoursSavedToDate: 26 },
    { id: 'flow-receipts', name: 'Receipt filing & expense logs', category: 'Data entry', hoursPerWeekSaved: 0.9, runsTotal: 620, successRate: 97.4, status: 'paused', lastRunMinutes: 1440, hoursSavedToDate: 15 },
    { id: 'flow-reports', name: 'Weekly status report drafts', category: 'Reporting', hoursPerWeekSaved: 0.8, runsTotal: 210, successRate: 100, status: 'running', lastRunMinutes: 1440, hoursSavedToDate: 13 },
    { id: 'flow-followups', name: 'Customer follow-up nudges', category: 'Email triage', hoursPerWeekSaved: 1.2, runsTotal: 540, successRate: 99, status: 'running', lastRunMinutes: 28, hoursSavedToDate: 19 },
    { id: 'flow-contracts', name: 'Contract renewal reminders', category: 'Reporting', hoursPerWeekSaved: 0.6, runsTotal: 120, successRate: 100, status: 'running', lastRunMinutes: 480, hoursSavedToDate: 10 },
    { id: 'flow-vendors', name: 'Vendor onboarding intake', category: 'Client intake', hoursPerWeekSaved: 1.1, runsTotal: 280, successRate: 94.6, status: 'error', lastRunMinutes: 95, hoursSavedToDate: 18 },
    { id: 'flow-travel', name: 'Travel booking & itinerary', category: 'Scheduling', hoursPerWeekSaved: 1.4, runsTotal: 340, successRate: 98.5, status: 'running', lastRunMinutes: 220, hoursSavedToDate: 22 },
    { id: 'flow-refunds', name: 'Refund request processing', category: 'Email triage', hoursPerWeekSaved: 1.8, runsTotal: 720, successRate: 97.2, status: 'running', lastRunMinutes: 33, hoursSavedToDate: 28 },
    { id: 'flow-payroll', name: 'Payroll variance check', category: 'Data entry', hoursPerWeekSaved: 0.5, runsTotal: 90, successRate: 100, status: 'paused', lastRunMinutes: 4320, hoursSavedToDate: 8 },
    { id: 'flow-board', name: 'Monthly board pack assembly', category: 'Reporting', hoursPerWeekSaved: 1.0, runsTotal: 60, successRate: 100, status: 'running', lastRunMinutes: 720, hoursSavedToDate: 16 },
    { id: 'flow-crm', name: 'CRM data hygiene', category: 'Data entry', hoursPerWeekSaved: 0.7, runsTotal: 410, successRate: 99.4, status: 'running', lastRunMinutes: 145, hoursSavedToDate: 11 },
    { id: 'flow-leads', name: 'New lead intake & routing', category: 'Client intake', hoursPerWeekSaved: 1.5, runsTotal: 360, successRate: 98.7, status: 'running', lastRunMinutes: 18, hoursSavedToDate: 24 }
];

const flowSuggestions = [
    { icon: '✉', title: 'Inbox triage', desc: 'Sort, label, and route incoming email by topic and urgency.' },
    { icon: '◉', title: 'Calendar scheduling', desc: 'Book meetings around your real availability, no back-and-forth.' },
    { icon: '$', title: 'Invoice follow-ups', desc: 'Match invoices to POs, file them, and chase unpaid balances.' },
    { icon: '☎', title: 'Client intake', desc: 'Capture, validate, and route new client forms automatically.' },
    { icon: '✎', title: 'Status reports', desc: 'Pull data from your tools and assemble a polished weekly recap.' },
    { icon: '↻', title: 'CRM data hygiene', desc: 'De-duplicate contacts and keep records up to date.' }
];

function getProfileForRole(role) {
    if (role === 'client') return mockClientProfile;
    if (role === 'developer') return mockDeveloperProfile;
    if (role === 'admin') return mockAdminProfile;
    return mockClientProfile;
}

function getInitialsFromName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatNumber(amount) {
    return new Intl.NumberFormat('en-US').format(amount);
}

function formatDecimal(value, places) {
    return Number(value).toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places });
}

function formatPercent(value) {
    return formatDecimal(value, 1) + '%';
}

function relativeTime(minutesAgo) {
    if (minutesAgo < 1) return 'just now';
    if (minutesAgo < 60) return Math.round(minutesAgo) + 'm ago';
    if (minutesAgo < 1440) return Math.round(minutesAgo / 60) + 'h ago';
    return Math.round(minutesAgo / 1440) + 'd ago';
}

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function formatDateTime(minutesAgo) {
    const date = new Date(Date.now() - minutesAgo * 60000);
    const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return datePart + ' · ' + timePart;
}

function formatDurationSeconds(totalSeconds) {
    if (totalSeconds < 60) return totalSeconds + 's';
    const minutesPart = Math.floor(totalSeconds / 60);
    const secondsPart = totalSeconds % 60;
    return minutesPart + 'm ' + (secondsPart < 10 ? '0' + secondsPart : secondsPart) + 's';
}

function flowById(flowId) {
    return mockClientFlowsFull.find(flow => flow.id === flowId) || null;
}


const TOAST_DURATION_MS = 3600;

function showToast(message, tone) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast--' + (tone || 'info');
    toast.setAttribute('role', 'status');

    const icon = document.createElement('span');
    icon.className = 'toast__icon';
    icon.textContent = toneIconFor(tone);

    const body = document.createElement('span');
    body.className = 'toast__body';
    body.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(body);

    const dismiss = () => {
        if (!toast.parentNode) return;
        toast.classList.add('is-leaving');
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 200);
    };

    toast.addEventListener('click', dismiss);
    container.appendChild(toast);
    setTimeout(dismiss, TOAST_DURATION_MS);
}

function toneIconFor(tone) {
    if (tone === 'success') return '✓';
    if (tone === 'error') return '!';
    if (tone === 'info') return 'i';
    return '·';
}


function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
        document.documentElement.style.paddingRight = scrollbarWidth + 'px';
        document.body.style.paddingRight = scrollbarWidth + 'px';
    }
}

function unlockScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    document.body.style.paddingRight = '';
}

function openModal({ title, titleEmphasis, subtitle, body, footer, size }) {
    closeModal();
    const layer = document.getElementById('modalLayer');
    if (!layer) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeModal();
    });

    const modal = document.createElement('div');
    modal.className = 'modal' + (size === 'lg' ? ' modal--lg' : '');

    const head = document.createElement('div');
    head.className = 'modal__head';

    const titleBlock = document.createElement('div');
    titleBlock.className = 'modal__title-block';

    const titleEl = document.createElement('div');
    titleEl.className = 'modal__title';
    if (titleEmphasis) {
        titleEl.innerHTML = escapeHtml(title) + ' <em>' + escapeHtml(titleEmphasis) + '</em>';
    } else {
        titleEl.textContent = title;
    }
    titleBlock.appendChild(titleEl);

    if (subtitle) {
        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'modal__subtitle';
        subtitleEl.textContent = '"' + subtitle + '"';
        titleBlock.appendChild(subtitleEl);
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', closeModal);

    head.appendChild(titleBlock);
    head.appendChild(closeBtn);

    const bodyEl = document.createElement('div');
    bodyEl.className = 'modal__body';
    if (body instanceof Node) bodyEl.appendChild(body);
    else if (typeof body === 'string') bodyEl.innerHTML = body;

    modal.appendChild(head);
    modal.appendChild(bodyEl);

    if (footer instanceof Node) modal.appendChild(footer);

    overlay.appendChild(modal);
    layer.appendChild(overlay);
    lockScroll();

    const firstFocusable = modal.querySelector('input, textarea, select, button:not(.modal__close)');
    if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
}

function closeModal() {
    const layer = document.getElementById('modalLayer');
    if (!layer || !layer.firstChild) return;
    layer.innerHTML = '';
    unlockScroll();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});


function buildModalFooter(buttons) {
    const foot = document.createElement('div');
    foot.className = 'modal__foot';
    for (const button of buttons) {
        if (button.spacer) {
            const spacer = document.createElement('div');
            spacer.className = 'modal__foot-spacer';
            foot.appendChild(spacer);
            continue;
        }
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn--' + (button.variant || 'secondary');
        btn.textContent = button.label;
        btn.addEventListener('click', button.onClick);
        foot.appendChild(btn);
    }
    return foot;
}

function buildModalField({ id, label, type, placeholder, value, helperText, options }) {
    const field = document.createElement('div');
    field.className = 'field';

    const labelEl = document.createElement('label');
    labelEl.className = 'field__label';
    labelEl.htmlFor = id;
    labelEl.textContent = label;
    field.appendChild(labelEl);

    if (type === 'select') {
        const select = document.createElement('select');
        select.id = id;
        select.className = 'field__select';
        for (const option of options || []) {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            if (option.value === value) opt.selected = true;
            select.appendChild(opt);
        }
        field.appendChild(select);
    } else if (type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.id = id;
        textarea.className = 'field__textarea';
        if (placeholder) textarea.placeholder = placeholder;
        if (value) textarea.value = value;
        field.appendChild(textarea);
    } else {
        const input = document.createElement('input');
        input.id = id;
        input.type = type || 'text';
        input.className = 'field__input';
        if (placeholder) input.placeholder = placeholder;
        if (value !== undefined) input.value = value;
        field.appendChild(input);
    }

    if (helperText) {
        const helper = document.createElement('div');
        helper.className = 'field__hint';
        helper.textContent = helperText;
        field.appendChild(helper);
    }

    return field;
}

function openRequestAutomationModal() {
    const body = document.createElement('div');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.gap = 'var(--space-4)';
    body.appendChild(buildModalField({ id: 'requestAutomationName', label: 'What should I take off your plate?', type: 'text', placeholder: 'e.g. Sort and reply to refund emails' }));
    body.appendChild(buildModalField({ id: 'requestAutomationHours', label: 'Roughly how many hours a week does it take you today?', type: 'number', placeholder: '4' }));
    body.appendChild(buildModalField({ id: 'requestAutomationUrgency', label: 'How urgent is it?', type: 'select', value: 'normal', options: [
        { value: 'whenever', label: 'Whenever you can' },
        { value: 'normal', label: 'Within the next month' },
        { value: 'urgent', label: 'This is hurting us — please prioritize' }
    ] }));

    const footer = buildModalFooter([
        { label: 'Cancel', variant: 'ghost', onClick: closeModal },
        { label: 'Send request', variant: 'primary', onClick: () => {
            closeModal();
            showToast('Request received. I\'ll scope it and follow up.', 'success');
        } }
    ]);

    openModal({
        title: 'Request an',
        titleEmphasis: 'automation',
        subtitle: 'Tell me about a task that\'s eating your time and I\'ll scope what I can take off your plate.',
        body: body,
        footer: footer
    });
}

function openEditFlowModal(flow) {
    const body = document.createElement('div');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.gap = 'var(--space-4)';
    body.appendChild(buildModalField({ id: 'editFlowSchedule', label: 'Schedule', type: 'select', value: 'hourly', options: [
        { value: '15m', label: 'Every 15 minutes' },
        { value: 'hourly', label: 'Hourly' },
        { value: 'daily', label: 'Daily at 8:00 AM' },
        { value: 'weekdays', label: 'Weekdays at 9:00 AM' },
        { value: 'manual', label: 'Manual only' }
    ] }));
    body.appendChild(buildModalField({ id: 'editFlowNotifications', label: 'Failure notifications', type: 'select', value: 'streak', options: [
        { value: 'every', label: 'Email me on every failure' },
        { value: 'streak', label: 'Email me on 3+ failures in a row' },
        { value: 'digest', label: 'Daily digest only' },
        { value: 'none', label: 'Don\'t notify me' }
    ] }));
    body.appendChild(buildModalField({ id: 'editFlowApproval', label: 'Approval mode', type: 'select', value: 'external', options: [
        { value: 'autonomous', label: 'Fully autonomous' },
        { value: 'external', label: 'Confirm before sending external messages' },
        { value: 'every', label: 'Confirm every action' }
    ] }));
    body.appendChild(buildModalField({ id: 'editFlowNotes', label: 'Notes for me', type: 'textarea', placeholder: 'Anything you\'d like me to keep in mind when running this flow…' }));

    const footer = buildModalFooter([
        { label: 'Pause this flow', variant: 'danger', onClick: () => {
            closeModal();
            showToast('Flow paused.', 'info');
        } },
        { spacer: true },
        { label: 'Cancel', variant: 'ghost', onClick: closeModal },
        { label: 'Save changes', variant: 'primary', onClick: () => {
            closeModal();
            showToast('Flow settings saved.', 'success');
        } }
    ]);

    openModal({
        title: flow.name,
        subtitle: flow.category + ' · prototype settings won\'t persist.',
        body: body,
        footer: footer
    });
}


function renderAppHeader(currentRoute) {
    const header = document.createElement('header');
    header.className = 'app-header';

    header.appendChild(buildBrand());

    if (appState.currentRole) {
        header.appendChild(buildAuthenticatedNav(currentRoute));
        header.appendChild(buildUserCluster());
    } else {
        header.appendChild(buildPublicActions(currentRoute));
    }

    return header;
}

function buildBrand() {
    const brand = document.createElement('button');
    brand.className = 'app-header__brand';
    brand.type = 'button';
    brand.setAttribute('aria-label', 'Go to home');

    const mark = document.createElement('span');
    mark.className = 'app-header__brand-mark';
    mark.textContent = 'A';

    const name = document.createElement('span');
    name.className = 'app-header__brand-name';
    name.innerHTML = 'Auto <em>Secretary</em>';

    brand.appendChild(mark);
    brand.appendChild(name);

    brand.addEventListener('click', () => {
        const destination = appState.currentRole ? 'dashboard' : 'home';
        navigateTo(destination);
    });

    return brand;
}

function buildAuthenticatedNav(currentRoute) {
    const nav = document.createElement('nav');
    nav.className = 'app-header__nav';
    nav.setAttribute('aria-label', 'Primary');

    const items = [
        { label: 'Dashboard', route: 'dashboard' },
        { label: 'Cost savings', route: 'report' },
        { label: 'Flows', route: 'flows' },
        { label: 'Settings', route: null, toastMessage: 'Settings view is on the roadmap.' }
    ];

    for (const item of items) {
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'app-header__nav-link';
        const isActive = item.route && (item.route === currentRoute || (item.route === 'flows' && currentRoute === 'executions'));
        if (isActive) link.classList.add('is-active');
        link.textContent = item.label;
        link.addEventListener('click', () => {
            if (item.route) navigateTo(item.route);
            else showToast(item.toastMessage, 'info');
        });
        nav.appendChild(link);
    }

    return nav;
}

function buildUserCluster() {
    const cluster = document.createElement('div');
    cluster.className = 'app-header__actions';

    const profile = getProfileForRole(appState.currentRole);

    const userPill = document.createElement('button');
    userPill.type = 'button';
    userPill.className = 'app-header__user';
    userPill.setAttribute('aria-label', 'Account menu');

    const avatar = document.createElement('span');
    avatar.className = 'app-header__user-avatar';
    avatar.textContent = getInitialsFromName(profile.displayName);

    const meta = document.createElement('span');
    meta.className = 'app-header__user-meta';
    meta.innerHTML = '<span class="app-header__user-name">' + profile.displayName + '</span><br><span class="app-header__user-role">' + appState.currentRole + '</span>';

    userPill.appendChild(avatar);
    userPill.appendChild(meta);
    userPill.addEventListener('click', () => showToast('Account menu is on the roadmap.', 'info'));

    const signOutBtn = document.createElement('button');
    signOutBtn.type = 'button';
    signOutBtn.className = 'btn btn--ghost btn--sm';
    signOutBtn.textContent = 'Sign out';
    signOutBtn.addEventListener('click', () => {
        logout();
        showToast('Signed out.', 'success');
        navigateTo('home');
    });

    cluster.appendChild(userPill);
    cluster.appendChild(signOutBtn);

    return cluster;
}

function buildPublicActions(currentRoute) {
    const actions = document.createElement('div');
    actions.className = 'app-header__actions';

    if (currentRoute !== 'login') {
        const loginBtn = document.createElement('button');
        loginBtn.type = 'button';
        loginBtn.className = 'btn btn--primary btn--sm';
        loginBtn.textContent = 'Log in';
        loginBtn.addEventListener('click', () => navigateTo('login'));
        actions.appendChild(loginBtn);
    } else {
        const homeBtn = document.createElement('button');
        homeBtn.type = 'button';
        homeBtn.className = 'btn btn--ghost btn--sm';
        homeBtn.textContent = 'Back to home';
        homeBtn.addEventListener('click', () => navigateTo('home'));
        actions.appendChild(homeBtn);
    }

    return actions;
}


function renderHomeView(container) {
    const page = document.createElement('section');
    page.className = 'page';

    page.appendChild(buildHomeHero());
    page.appendChild(buildHomeProofStrip());
    page.appendChild(buildHomeHandlesSection());

    container.appendChild(page);
}

function buildHomeHero() {
    const hero = document.createElement('div');
    hero.className = 'home-hero';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'home-hero__eyebrow';
    eyebrow.innerHTML = '<span class="home-hero__eyebrow-dot"></span><span>Your secretary is on the clock.</span>';

    const title = document.createElement('h1');
    title.className = 'home-hero__title';
    title.innerHTML = 'Hand the busywork<br>to <em>your secretary</em>.';

    const lede = document.createElement('p');
    lede.className = 'home-hero__lede';
    lede.textContent = 'Auto Secretary handles the email, the calendar, the receipts, the reminders, and the follow-ups so the rest of your day is yours.';

    const actions = document.createElement('div');
    actions.className = 'home-hero__actions';

    const primaryCta = document.createElement('button');
    primaryCta.type = 'button';
    primaryCta.className = 'btn btn--primary btn--lg';
    primaryCta.innerHTML = 'Log in <span class="btn__arrow">→</span>';
    primaryCta.addEventListener('click', () => navigateTo('login'));

    const secondaryCta = document.createElement('button');
    secondaryCta.type = 'button';
    secondaryCta.className = 'btn btn--secondary btn--lg';
    secondaryCta.textContent = 'See how it works';
    secondaryCta.addEventListener('click', () => {
        const proofStrip = document.querySelector('.home-proof');
        if (proofStrip) proofStrip.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    actions.appendChild(primaryCta);
    actions.appendChild(secondaryCta);

    hero.appendChild(eyebrow);
    hero.appendChild(title);
    hero.appendChild(lede);
    hero.appendChild(actions);

    return hero;
}

function buildHomeProofStrip() {
    const strip = document.createElement('div');
    strip.className = 'home-proof';

    const lede = document.createElement('p');
    lede.className = 'home-proof__lede';
    lede.textContent = '"I\'ve handled 18,420 hours of admin work this year so my clients could spend that time on the work that pays them."';

    const stats = document.createElement('div');
    stats.className = 'home-proof__stats';

    const statSpecs = [
        { value: '11.5', label: 'Hrs / week reclaimed' },
        { value: '$1.8M', label: 'Saved across clients' },
        { value: '248', label: 'Businesses served' }
    ];

    for (const spec of statSpecs) {
        const wrap = document.createElement('div');
        const value = document.createElement('div');
        value.className = 'home-proof__stat-value';
        value.textContent = spec.value;
        const label = document.createElement('div');
        label.className = 'home-proof__stat-label';
        label.textContent = spec.label;
        wrap.appendChild(value);
        wrap.appendChild(label);
        stats.appendChild(wrap);
    }

    strip.appendChild(lede);
    strip.appendChild(stats);

    return strip;
}

function buildHomeHandlesSection() {
    const wrap = document.createElement('div');
    wrap.className = 'home-handles';

    const title = document.createElement('h2');
    title.className = 'home-handles__title';
    title.innerHTML = 'What <em>I&#39;ll handle</em> for you.';

    const subtitle = document.createElement('p');
    subtitle.className = 'home-handles__subtitle';
    subtitle.textContent = 'Five things off your plate, every day.';

    const grid = document.createElement('div');
    grid.className = 'grid grid--3';

    const handles = [
        { num: '01', title: 'Inbox triage', text: 'I read every email, sort what matters, draft your replies, and only bring you the few that need your voice.' },
        { num: '02', title: 'Calendar & scheduling', text: 'I find the time, send the invite, confirm the attendees, and reschedule when life happens.' },
        { num: '03', title: 'Receipts & expenses', text: 'I file every receipt to the right project and have your expense report ready before you ask.' },
        { num: '04', title: 'Follow-ups & reminders', text: 'I keep a list of who owes you what and send the gentle nudges so you don\'t have to.' },
        { num: '05', title: 'Status reports & docs', text: 'I draft your weekly updates, meeting notes, and recurring documents in your voice.' },
        { num: '06', title: 'Whatever else comes up', text: 'I learn the parts of your job that don\'t have a name yet, and I take those off your plate too.' }
    ];

    for (const handle of handles) {
        const card = document.createElement('div');
        card.className = 'handle-card';

        const num = document.createElement('div');
        num.className = 'handle-card__num';
        num.textContent = handle.num;

        const heading = document.createElement('div');
        heading.className = 'handle-card__title';
        heading.textContent = handle.title;

        const text = document.createElement('div');
        text.className = 'handle-card__text';
        text.textContent = handle.text;

        card.appendChild(num);
        card.appendChild(heading);
        card.appendChild(text);
        grid.appendChild(card);
    }

    wrap.appendChild(title);
    wrap.appendChild(subtitle);
    wrap.appendChild(grid);

    return wrap;
}


function renderLoginView(container) {
    const page = document.createElement('section');
    page.className = 'page page--form page--center';

    const card = document.createElement('div');
    card.className = 'login-card';

    card.appendChild(buildLoginBrandBlock());
    card.appendChild(buildLoginForm());
    card.appendChild(buildLoginHint());

    page.appendChild(card);
    container.appendChild(page);

    setTimeout(() => {
        const firstInput = document.getElementById('loginUsername');
        if (firstInput) firstInput.focus();
    }, 50);
}

function buildLoginBrandBlock() {
    const wrap = document.createElement('div');
    wrap.className = 'login-card__brand';

    const mark = document.createElement('div');
    mark.className = 'login-card__brand-mark';
    mark.textContent = 'A';

    const welcome = document.createElement('div');
    welcome.className = 'login-card__welcome';

    const heading = document.createElement('div');
    heading.className = 'login-card__welcome-title';
    heading.innerHTML = 'Welcome back to <em>Auto Secretary</em>.';

    const subtitle = document.createElement('div');
    subtitle.className = 'login-card__welcome-subtitle';
    subtitle.textContent = 'Sign in to see what I\'ve handled.';

    welcome.appendChild(heading);
    welcome.appendChild(subtitle);

    wrap.appendChild(mark);
    wrap.appendChild(welcome);

    return wrap;
}

function buildLoginForm() {
    const form = document.createElement('form');
    form.className = 'login-form';
    form.autocomplete = 'on';
    form.noValidate = true;

    const usernameField = buildLoginField({ id: 'loginUsername', label: 'Username', type: 'text', autocomplete: 'username', placeholder: 'admin, client, or developer' });
    const passwordField = buildLoginField({ id: 'loginPassword', label: 'Password', type: 'password', autocomplete: 'current-password', placeholder: 'Match your username for this demo' });

    const inlineRow = document.createElement('div');
    inlineRow.className = 'login-form__inline-row';

    const rememberLabel = document.createElement('label');
    rememberLabel.className = 'checkbox';
    const rememberInput = document.createElement('input');
    rememberInput.type = 'checkbox';
    rememberInput.id = 'loginRemember';
    rememberInput.className = 'checkbox__input';
    rememberLabel.appendChild(rememberInput);
    rememberLabel.appendChild(document.createTextNode('Remember me'));

    const forgotBtn = document.createElement('button');
    forgotBtn.type = 'button';
    forgotBtn.className = 'btn btn--link';
    forgotBtn.textContent = 'Forgot username or password?';
    forgotBtn.addEventListener('click', () => showToast('Password recovery is on the roadmap.', 'info'));

    inlineRow.appendChild(rememberLabel);
    inlineRow.appendChild(forgotBtn);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn--primary btn--lg btn--block';
    submitBtn.textContent = 'Sign in';

    form.appendChild(usernameField);
    form.appendChild(passwordField);
    form.appendChild(inlineRow);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('loginRemember').checked;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in…';

        setTimeout(() => {
            const result = attemptLogin(username, password, rememberMe);
            if (!result.success) {
                showToast(result.message, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign in';
                return;
            }
            showToast('Welcome back.', 'success');
            navigateTo('dashboard');
        }, 180);
    });

    return form;
}

function buildLoginField({ id, label, type, autocomplete, placeholder }) {
    const field = document.createElement('div');
    field.className = 'field';

    const labelEl = document.createElement('label');
    labelEl.className = 'field__label';
    labelEl.htmlFor = id;
    labelEl.textContent = label;

    const input = document.createElement('input');
    input.className = 'field__input';
    input.type = type;
    input.id = id;
    input.name = id;
    input.autocomplete = autocomplete;
    input.placeholder = placeholder;

    field.appendChild(labelEl);
    field.appendChild(input);
    return field;
}

function buildLoginHint() {
    const hint = document.createElement('div');
    hint.className = 'login-card__hint';
    hint.innerHTML = '<strong>Prototype credentials.</strong> Use <code>admin</code>, <code>client</code>, or <code>developer</code> for both the username and password to preview each dashboard.';
    return hint;
}


function renderDashboardView(container) {
    const page = document.createElement('section');
    page.className = 'page';
    container.appendChild(page);

    if (appState.currentRole === 'client') renderClientDashboard(page);
    else if (appState.currentRole === 'developer') renderDeveloperDashboard(page);
    else if (appState.currentRole === 'admin') renderAdminDashboard(page);
}

function renderClientDashboard(page) {
    const profile = getProfileForRole('client');
    const firstName = profile.displayName.split(' ')[0];

    page.appendChild(buildDashboardGreeting(
        `Good morning, ${firstName}. I&#39;ve handled <span class="greeting__voice-emphasis">${formatNumber(mockClientSavings.totalHoursSaved)} hours</span> of your work so far — and <span class="greeting__voice-emphasis">${mockClientSavings.hoursSavedPerWeek} more</span> this week alone.`,
        [
            { label: 'All flows running smoothly', tone: 'success' },
            { label: `${mockClientAttention.length} items need your attention`, tone: 'warning' },
            { label: 'Last activity 3 min ago', tone: 'info' }
        ]
    ));

    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid--3 section';
    statsGrid.appendChild(buildDashboardStatCard({
        label: 'Saved this month',
        value: formatCurrency(mockClientSavings.dollarsSavedThisMonth),
        delta: '+' + mockClientSavings.deltaMonthOverMonth + '% vs. last month',
        caption: 'Across all five flows.'
    }));
    statsGrid.appendChild(buildDashboardStatCard({
        label: 'Hours / week saved',
        value: mockClientSavings.hoursSavedPerWeek.toString(),
        valueSuffix: 'hrs',
        delta: '+' + mockClientSavings.deltaHoursMonthOverMonth + ' hrs vs. last month',
        caption: 'Roughly one and a half workdays.'
    }));
    statsGrid.appendChild(buildDashboardStatCard({
        label: 'Total hours saved',
        value: formatNumber(mockClientSavings.totalHoursSaved),
        valueSuffix: 'hrs',
        caption: 'Since you signed up in ' + profile.memberSince + '.'
    }));
    page.appendChild(statsGrid);

    const seeReportRow = document.createElement('div');
    seeReportRow.style.textAlign = 'right';
    seeReportRow.style.marginTop = 'calc(-1 * var(--space-6))';
    seeReportRow.style.marginBottom = 'var(--space-7)';
    const seeReportBtn = document.createElement('button');
    seeReportBtn.type = 'button';
    seeReportBtn.className = 'btn btn--link';
    seeReportBtn.innerHTML = 'View full cost savings report <span class="btn__arrow">→</span>';
    seeReportBtn.addEventListener('click', () => navigateTo('report'));
    seeReportRow.appendChild(seeReportBtn);
    page.appendChild(seeReportRow);

    const mainGrid = document.createElement('div');
    mainGrid.className = 'grid grid--main-aside';
    mainGrid.appendChild(buildClientMainColumn());
    mainGrid.appendChild(buildClientAsideColumn());
    page.appendChild(mainGrid);
}

function buildClientMainColumn() {
    const column = document.createElement('div');
    column.className = 'stack stack--lg';

    column.appendChild(buildDashboardSection('Active flows', null, buildActiveFlowsCard()));
    column.appendChild(buildDashboardSection('Recent activity', 'I\'ve done this for you lately', buildRecentExecutionsCard()));

    return column;
}

function buildActiveFlowsCard() {
    const card = document.createElement('div');
    card.className = 'card';

    const list = document.createElement('ul');
    list.className = 'list';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.style.margin = '0';

    for (const flow of mockClientActiveFlows) {
        const item = document.createElement('li');
        item.className = 'list__item';

        const icon = document.createElement('div');
        const isRunning = flow.status === 'running';
        icon.className = 'list__item-icon ' + (isRunning ? 'list__item-icon--teal' : '');
        icon.textContent = isRunning ? '◉' : '⏸';

        const body = document.createElement('div');
        body.className = 'list__item-body';
        const title = document.createElement('div');
        title.className = 'list__item-title';
        title.textContent = flow.name;
        const meta = document.createElement('div');
        meta.className = 'list__item-meta';
        meta.textContent = isRunning
            ? `${flow.runsThisWeek} runs this week · last ${flow.lastRun.toLowerCase()}`
            : `Paused · last ran ${flow.lastRun.toLowerCase()}`;
        body.appendChild(title);
        body.appendChild(meta);

        const aside = document.createElement('div');
        const badge = document.createElement('span');
        badge.className = 'badge ' + (isRunning ? 'badge--success' : 'badge--warning');
        badge.innerHTML = '<span class="badge__dot"></span><span>' + (isRunning ? 'Running' : 'Paused') + '</span>';
        aside.appendChild(badge);

        item.appendChild(icon);
        item.appendChild(body);
        item.appendChild(aside);
        list.appendChild(item);
    }

    card.appendChild(list);
    return card;
}

function buildRecentExecutionsCard() {
    const card = document.createElement('div');
    card.className = 'card';

    const list = document.createElement('ul');
    list.className = 'list';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.style.margin = '0';

    for (const execution of mockClientRecentExecutions) {
        const item = document.createElement('li');
        item.className = 'list__item';

        const icon = document.createElement('div');
        icon.className = 'list__item-icon list__item-icon--' + execution.kind;
        icon.textContent = execution.kind === 'success' ? '✓' : (execution.kind === 'warning' ? '!' : '·');

        const body = document.createElement('div');
        body.className = 'list__item-body';
        const title = document.createElement('div');
        title.className = 'list__item-title';
        title.textContent = execution.title;
        const meta = document.createElement('div');
        meta.className = 'list__item-meta';
        meta.textContent = execution.detail + ' · ' + execution.when;
        body.appendChild(title);
        body.appendChild(meta);

        item.appendChild(icon);
        item.appendChild(body);
        list.appendChild(item);
    }

    card.appendChild(list);
    return card;
}

function buildClientAsideColumn() {
    const column = document.createElement('div');
    column.className = 'stack stack--lg';

    column.appendChild(buildDashboardSection('Needs your attention', null, buildClientAttentionCard()));
    column.appendChild(buildDashboardSection('Quick actions', null, buildClientQuickActionsCard()));
    column.appendChild(buildDashboardSection('Support', null, buildClientSupportCard()));

    return column;
}

function buildClientAttentionCard() {
    const card = document.createElement('div');
    card.className = 'card attention-card';

    for (const item of mockClientAttention) {
        const row = document.createElement('div');
        row.className = 'attention-item';
        const body = document.createElement('div');
        body.className = 'attention-item__body';
        const title = document.createElement('div');
        title.className = 'attention-item__title';
        title.textContent = item.title;
        const meta = document.createElement('div');
        meta.className = 'attention-item__meta secretary-voice';
        meta.textContent = '"' + item.meta + '"';
        body.appendChild(title);
        body.appendChild(meta);

        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'btn btn--secondary btn--sm';
        action.textContent = item.action;
        action.addEventListener('click', () => showToast('Action flow is on the roadmap.', 'info'));

        row.appendChild(body);
        row.appendChild(action);
        card.appendChild(row);
    }

    return card;
}

function buildClientQuickActionsCard() {
    const card = document.createElement('div');
    card.className = 'card';

    const grid = document.createElement('div');
    grid.className = 'quick-actions';

    const actions = [
        { title: 'View all flows', desc: 'See and manage your automations.', onClick: () => navigateTo('flows') },
        { title: 'Run a flow now', desc: 'Trigger any flow on demand.', toast: 'Run-now picker is on the roadmap.' },
        { title: 'Add a new flow', desc: 'Tell me about a new task.', onClick: () => openRequestAutomationModal() },
        { title: 'Export this month', desc: 'Download as CSV or PDF.', toast: 'Export is on the roadmap.' }
    ];

    for (const action of actions) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quick-action';
        btn.innerHTML = '<span class="quick-action__title">' + action.title + '</span><span class="quick-action__desc">' + action.desc + '</span>';
        btn.addEventListener('click', () => {
            if (action.onClick) action.onClick();
            else showToast(action.toast || (action.title + ' is on the roadmap.'), 'info');
        });
        grid.appendChild(btn);
    }

    card.appendChild(grid);
    return card;
}

function buildClientSupportCard() {
    const card = document.createElement('div');
    card.className = 'card support-card';

    const title = document.createElement('div');
    title.className = 'support-card__title';
    title.textContent = 'Need a human?';

    const text = document.createElement('div');
    text.className = 'support-card__text';
    text.textContent = 'For anything I can\'t do, my team is one click away.';

    const channels = document.createElement('div');
    channels.className = 'support-card__channels';
    const channelSpecs = [
        { label: 'Start a chat', meta: 'Typical reply under 5 min', icon: '◉' },
        { label: 'Email support', meta: 'help@autosecretary.app', icon: '✉' },
        { label: 'Book a call', meta: '15-min slots on the calendar', icon: '☎' }
    ];

    for (const spec of channelSpecs) {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'support-channel';
        row.innerHTML = '<span class="list__item-icon list__item-icon--teal" style="width:32px;height:32px;font-size:13px;">' + spec.icon + '</span><span style="flex:1;text-align:left;"><div class="support-channel__label">' + spec.label + '</div><div class="support-channel__meta">' + spec.meta + '</div></span>';
        row.addEventListener('click', () => showToast(spec.label + ' is on the roadmap.', 'info'));
        channels.appendChild(row);
    }

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(channels);
    return card;
}

function renderDeveloperDashboard(page) {
    const profile = getProfileForRole('developer');
    const firstName = profile.displayName.split(' ')[0];

    page.appendChild(buildDashboardGreeting(
        `Good morning, ${firstName}. <span class="greeting__voice-emphasis">${mockDeveloperSummary.clientsManaged} clients</span> on your watch, <span class="greeting__voice-emphasis">${mockDeveloperSummary.activeFlows} flows</span> live, and <span class="greeting__voice-emphasis">${mockDeveloperSummary.errorsThisWeek} things</span> want your eyes.`,
        [
            { label: 'All clients online', tone: 'success' },
            { label: `${mockDeveloperSummary.errorsThisWeek} errors to triage`, tone: 'warning' },
            { label: `${mockDeveloperSummary.flowsDeployedThisMonth} deploys this month`, tone: 'info' }
        ]
    ));

    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid--4 section';
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Clients managed', value: mockDeveloperSummary.clientsManaged.toString(), caption: 'Across three plan tiers.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Active flows', value: mockDeveloperSummary.activeFlows.toString(), caption: 'Live in production.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Errors this week', value: mockDeveloperSummary.errorsThisWeek.toString(), caption: 'Down from 11 last week.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Deploys this month', value: mockDeveloperSummary.flowsDeployedThisMonth.toString(), caption: 'New flows + revisions.' }));
    page.appendChild(statsGrid);

    page.appendChild(buildDashboardSection('Your clients', 'Sorted by hours saved', buildDeveloperClientsTable()));

    const twoColumn = document.createElement('div');
    twoColumn.className = 'grid grid--2 section';
    twoColumn.appendChild(buildDashboardSection('Errors needing attention', null, buildDeveloperErrorsCard(), { unwrap: true }));
    twoColumn.appendChild(buildDashboardSection('Recent deployments', null, buildDeveloperDeploymentsCard(), { unwrap: true }));
    page.appendChild(twoColumn);
}

function buildDeveloperClientsTable() {
    const wrap = document.createElement('div');
    wrap.className = 'card card--flush';

    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrap';

    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = '<thead><tr><th>Client</th><th>Flows</th><th class="num">Hours saved</th><th class="num">Dollars saved</th><th>Status</th></tr></thead>';

    const tbody = document.createElement('tbody');
    for (const client of mockDeveloperClients) {
        const row = document.createElement('tr');
        row.className = 'is-clickable';
        const statusTone = client.status === 'healthy' ? 'success' : (client.status === 'attention' ? 'warning' : 'danger');
        const statusLabel = client.status === 'healthy' ? 'Healthy' : (client.status === 'attention' ? 'Attention' : 'Error');
        row.innerHTML = '<td><strong>' + client.name + '</strong></td><td>' + client.flows + '</td><td class="num">' + formatNumber(client.hoursSaved) + '</td><td class="num">' + formatCurrency(client.dollarsSaved) + '</td><td><span class="badge badge--' + statusTone + '"><span class="badge__dot"></span><span>' + statusLabel + '</span></span></td>';
        row.addEventListener('click', () => showToast('Client detail view is on the roadmap.', 'info'));
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);

    return wrap;
}

function buildDeveloperErrorsCard() {
    const card = document.createElement('div');
    card.className = 'card';
    for (const item of mockDeveloperErrors) {
        const row = document.createElement('div');
        row.className = 'attention-item';
        row.innerHTML = '<div class="attention-item__body"><div class="attention-item__title">' + item.title + '</div><div class="attention-item__meta">' + item.meta + '</div></div>';
        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'btn btn--secondary btn--sm';
        action.textContent = item.action;
        action.addEventListener('click', () => showToast('Error investigation view is on the roadmap.', 'info'));
        row.appendChild(action);
        card.appendChild(row);
    }
    return card;
}

function buildDeveloperDeploymentsCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const list = document.createElement('ul');
    list.className = 'list';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.style.margin = '0';
    for (const dep of mockDeveloperRecentDeployments) {
        const item = document.createElement('li');
        item.className = 'list__item';
        const icon = document.createElement('div');
        icon.className = 'list__item-icon list__item-icon--' + dep.kind;
        icon.textContent = dep.kind === 'success' ? '✓' : '!';
        const body = document.createElement('div');
        body.className = 'list__item-body';
        body.innerHTML = '<div class="list__item-title">' + dep.title + '</div><div class="list__item-meta">' + dep.detail + ' · ' + dep.when + '</div>';
        item.appendChild(icon);
        item.appendChild(body);
        list.appendChild(item);
    }
    card.appendChild(list);
    return card;
}

function renderAdminDashboard(page) {
    const profile = getProfileForRole('admin');
    const firstName = profile.displayName.split(' ')[0];

    page.appendChild(buildDashboardGreeting(
        `Good morning, ${firstName}. The platform has reclaimed <span class="greeting__voice-emphasis">${formatNumber(mockAdminSummary.totalHoursSaved)} hours</span> for <span class="greeting__voice-emphasis">${mockAdminSummary.totalUsers} businesses</span> — and counting.`,
        [
            { label: 'All systems nominal', tone: 'success' },
            { label: '7 open tickets', tone: 'warning' },
            { label: '4 new signups today', tone: 'info' }
        ]
    ));

    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid--4 section';
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Total users', value: formatNumber(mockAdminSummary.totalUsers), caption: '+14 this week.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Platform savings', value: formatCurrency(mockAdminSummary.totalDollarsSaved), caption: 'All-time across customers.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Hours reclaimed', value: formatNumber(mockAdminSummary.totalHoursSaved), valueSuffix: 'hrs', caption: 'All-time across customers.' }));
    statsGrid.appendChild(buildDashboardStatCard({ label: 'Monthly recurring', value: formatCurrency(mockAdminSummary.monthlyRecurringRevenue), caption: '+8.4% vs. last month.' }));
    page.appendChild(statsGrid);

    page.appendChild(buildDashboardSection('All users', 'Sorted by total savings', buildAdminUsersTable()));

    const twoColumn = document.createElement('div');
    twoColumn.className = 'grid grid--2 section';
    twoColumn.appendChild(buildDashboardSection('Recent signups', null, buildAdminSignupsCard(), { unwrap: true }));
    twoColumn.appendChild(buildDashboardSection('System health', null, buildAdminHealthCard(), { unwrap: true }));
    page.appendChild(twoColumn);
}

function buildAdminUsersTable() {
    const wrap = document.createElement('div');
    wrap.className = 'card card--flush';

    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrap';

    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = '<thead><tr><th>Customer</th><th>Plan</th><th>Flows</th><th class="num">Hours saved</th><th class="num">Dollars saved</th><th>Last active</th></tr></thead>';

    const tbody = document.createElement('tbody');
    for (const user of mockAdminUsers) {
        const row = document.createElement('tr');
        row.className = 'is-clickable';
        row.innerHTML = '<td><strong>' + user.name + '</strong></td><td><span class="badge badge--teal">' + user.plan + '</span></td><td>' + user.flows + '</td><td class="num">' + formatNumber(user.hoursSaved) + '</td><td class="num">' + formatCurrency(user.dollarsSaved) + '</td><td style="color: var(--text-tertiary); font-size: 13px;">' + user.lastActive + '</td>';
        row.addEventListener('click', () => showToast('Customer detail view is on the roadmap.', 'info'));
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);

    return wrap;
}

function buildAdminSignupsCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const list = document.createElement('ul');
    list.className = 'list';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.style.margin = '0';
    for (const signup of mockAdminRecentSignups) {
        const item = document.createElement('li');
        item.className = 'list__item';
        item.innerHTML = '<div class="list__item-icon list__item-icon--teal">+</div><div class="list__item-body"><div class="list__item-title">' + signup.name + '</div><div class="list__item-meta">' + signup.plan + ' plan · ' + signup.when + '</div></div>';
        list.appendChild(item);
    }
    card.appendChild(list);
    return card;
}

function buildAdminHealthCard() {
    const card = document.createElement('div');
    card.className = 'card';
    const grid = document.createElement('div');
    grid.className = 'grid grid--2';
    grid.style.gap = 'var(--space-3)';
    for (const metric of mockAdminSystemHealth) {
        const cell = document.createElement('div');
        cell.style.padding = 'var(--space-4)';
        cell.style.backgroundColor = 'var(--bg-subtle)';
        cell.style.borderRadius = 'var(--radius-md)';
        cell.innerHTML = '<div style="font-size:11px;color:var(--text-tertiary);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">' + metric.label + '</div><div style="font-size:20px;font-weight:600;font-variant-numeric:tabular-nums;color:var(--text-primary);">' + metric.value + '</div>';
        grid.appendChild(cell);
    }
    card.appendChild(grid);
    return card;
}

function buildDashboardGreeting(voiceHtml, chips) {
    const greeting = document.createElement('div');
    greeting.className = 'greeting';

    const voice = document.createElement('div');
    voice.className = 'greeting__voice';
    voice.innerHTML = '"' + voiceHtml + '"';

    const meta = document.createElement('div');
    meta.className = 'greeting__meta';
    for (const chip of chips) {
        const item = document.createElement('div');
        item.className = 'greeting__meta-item';
        const dot = document.createElement('span');
        dot.className = 'greeting__meta-dot';
        if (chip.tone === 'warning') dot.style.backgroundColor = 'var(--status-warning)';
        if (chip.tone === 'info') dot.style.backgroundColor = 'var(--accent-indigo)';
        item.appendChild(dot);
        item.appendChild(document.createTextNode(chip.label));
        meta.appendChild(item);
    }

    greeting.appendChild(voice);
    greeting.appendChild(meta);
    return greeting;
}

function buildDashboardStatCard({ label, value, valueSuffix, delta, caption }) {
    const card = document.createElement('div');
    card.className = 'stat-card';

    const labelEl = document.createElement('div');
    labelEl.className = 'stat-card__label';
    labelEl.textContent = label;

    const valueEl = document.createElement('div');
    valueEl.className = 'stat-card__value';
    valueEl.textContent = value;
    if (valueSuffix) {
        const suffix = document.createElement('span');
        suffix.className = 'stat-card__value-suffix';
        suffix.textContent = valueSuffix;
        valueEl.appendChild(suffix);
    }

    card.appendChild(labelEl);
    card.appendChild(valueEl);

    if (delta) {
        const deltaEl = document.createElement('div');
        deltaEl.className = 'stat-card__delta';
        deltaEl.innerHTML = '<span>↑</span><span>' + delta + '</span>';
        card.appendChild(deltaEl);
    }

    if (caption) {
        const captionEl = document.createElement('div');
        captionEl.className = 'stat-card__caption';
        captionEl.textContent = caption;
        card.appendChild(captionEl);
    }

    return card;
}

function buildDashboardSection(titleText, subtitleText, contentNode, options) {
    const section = document.createElement('section');
    section.className = 'section';

    const header = document.createElement('div');
    header.className = 'section-header';

    const titleBlock = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'section-header__title';
    title.textContent = titleText;
    titleBlock.appendChild(title);

    if (subtitleText) {
        const subtitle = document.createElement('div');
        subtitle.className = 'secretary-voice';
        subtitle.style.fontSize = '13px';
        subtitle.style.marginTop = '4px';
        subtitle.textContent = '"' + subtitleText + '"';
        titleBlock.appendChild(subtitle);
    }

    header.appendChild(titleBlock);
    section.appendChild(header);
    section.appendChild(contentNode);

    if (options && options.unwrap) section.style.margin = '0';
    return section;
}


function renderCostSavingsReportView(container) {
    const page = document.createElement('section');
    page.className = 'page';
    container.appendChild(page);

    page.appendChild(buildReportBackLink());

    if (appState.currentRole === 'client') renderClientReport(page);
    else if (appState.currentRole === 'developer') renderDeveloperReport(page);
    else if (appState.currentRole === 'admin') renderAdminReport(page);
}

function buildReportBackLink() {
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'back-link';
    link.innerHTML = '<span>←</span><span>Back to dashboard</span>';
    link.addEventListener('click', () => navigateTo('dashboard'));
    return link;
}

function renderClientReport(page) {
    const profile = getProfileForRole('client');

    const hero = document.createElement('div');
    hero.className = 'report-hero';
    hero.innerHTML = '<div class="report-hero__eyebrow">Cost savings report · ' + profile.company + '</div>' +
        '<div class="report-hero__value">' + formatCurrency(mockClientSavings.dollarsSavedAllTime) + '</div>' +
        '<div class="report-hero__caption">"That\'s ' + formatNumber(mockClientSavings.totalHoursSaved) + ' hours I\'ve handled so you didn\'t have to — since ' + profile.memberSince + '."</div>';
    hero.appendChild(buildReportRangeTabs());
    page.appendChild(hero);

    const headlineGrid = document.createElement('div');
    headlineGrid.className = 'grid grid--3 section';
    headlineGrid.appendChild(buildReportMetricBlock('This month', formatCurrency(mockClientSavings.dollarsSavedThisMonth), '+' + mockClientSavings.deltaMonthOverMonth + '% vs. last'));
    headlineGrid.appendChild(buildReportMetricBlock('Hours / week', mockClientSavings.hoursSavedPerWeek + ' hrs', '+' + mockClientSavings.deltaHoursMonthOverMonth + ' hrs vs. last'));
    headlineGrid.appendChild(buildReportMetricBlock('Total hours', formatNumber(mockClientSavings.totalHoursSaved) + ' hrs', 'Since ' + profile.memberSince));
    page.appendChild(headlineGrid);

    const breakdownSection = document.createElement('section');
    breakdownSection.className = 'section';
    const breakdownHeader = document.createElement('div');
    breakdownHeader.className = 'section-header';
    breakdownHeader.innerHTML = '<div><div class="section-header__title">Savings by flow</div><div class="secretary-voice" style="font-size:13px;margin-top:4px;">"Here\'s where the hours went, broken down by what I did."</div></div>';
    breakdownSection.appendChild(breakdownHeader);

    const breakdownCard = document.createElement('div');
    breakdownCard.className = 'card';
    breakdownCard.appendChild(buildReportBarChart(mockSavingsByFlow));
    breakdownSection.appendChild(breakdownCard);
    page.appendChild(breakdownSection);

    const weeklySection = document.createElement('section');
    weeklySection.className = 'section';
    const weeklyHeader = document.createElement('div');
    weeklyHeader.className = 'section-header';
    weeklyHeader.innerHTML = '<div><div class="section-header__title">Hours this week</div><div class="secretary-voice" style="font-size:13px;margin-top:4px;">"Wednesday was your heaviest day."</div></div>';
    weeklySection.appendChild(weeklyHeader);

    const weeklyCard = document.createElement('div');
    weeklyCard.className = 'card';
    weeklyCard.appendChild(buildReportWeeklyChart(mockWeeklyHours));
    weeklySection.appendChild(weeklyCard);
    page.appendChild(weeklySection);

    const exportSection = document.createElement('div');
    exportSection.className = 'callout';
    exportSection.innerHTML = '<div class="callout__body"><div class="callout__title">Need this on paper?</div><div class="callout__text">Export your report as CSV or PDF for your records, your accountant, or your team.</div></div>';
    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'btn btn--secondary btn--sm';
    exportBtn.textContent = 'Export report';
    exportBtn.addEventListener('click', () => showToast('Export is on the roadmap.', 'info'));
    exportSection.appendChild(exportBtn);
    page.appendChild(exportSection);
}

function renderDeveloperReport(page) {
    const totalDollars = mockDeveloperClients.reduce((sum, client) => sum + client.dollarsSaved, 0);
    const totalHours = mockDeveloperClients.reduce((sum, client) => sum + client.hoursSaved, 0);

    const hero = document.createElement('div');
    hero.className = 'report-hero';
    hero.innerHTML = '<div class="report-hero__eyebrow">Cost savings · clients you manage</div>' +
        '<div class="report-hero__value">' + formatCurrency(totalDollars) + '</div>' +
        '<div class="report-hero__caption">"Across ' + mockDeveloperClients.length + ' clients, your flows have saved ' + formatNumber(totalHours) + ' hours of admin work."</div>';
    hero.appendChild(buildReportRangeTabs());
    page.appendChild(hero);

    const tableSection = document.createElement('section');
    tableSection.className = 'section';
    const tableHeader = document.createElement('div');
    tableHeader.className = 'section-header';
    tableHeader.innerHTML = '<div class="section-header__title">Per-client breakdown</div>';
    tableSection.appendChild(tableHeader);

    const card = document.createElement('div');
    card.className = 'card card--flush';
    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrap';
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = '<thead><tr><th>Client</th><th>Flows</th><th class="num">Hours saved</th><th class="num">Dollars saved</th><th class="num">% of total</th></tr></thead>';
    const tbody = document.createElement('tbody');

    const sorted = [...mockDeveloperClients].sort((first, second) => second.dollarsSaved - first.dollarsSaved);
    for (const client of sorted) {
        const percent = ((client.dollarsSaved / totalDollars) * 100).toFixed(1);
        const row = document.createElement('tr');
        row.className = 'is-clickable';
        row.innerHTML = '<td><strong>' + client.name + '</strong></td><td>' + client.flows + '</td><td class="num">' + formatNumber(client.hoursSaved) + '</td><td class="num">' + formatCurrency(client.dollarsSaved) + '</td><td class="num">' + percent + '%</td>';
        row.addEventListener('click', () => showToast('Per-client detailed report is on the roadmap.', 'info'));
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    card.appendChild(tableWrap);
    tableSection.appendChild(card);
    page.appendChild(tableSection);

    const chartSection = document.createElement('section');
    chartSection.className = 'section';
    const chartHeader = document.createElement('div');
    chartHeader.className = 'section-header';
    chartHeader.innerHTML = '<div class="section-header__title">Savings distribution</div>';
    chartSection.appendChild(chartHeader);

    const chartCard = document.createElement('div');
    chartCard.className = 'card';
    const chartData = sorted.map(client => ({ name: client.name, hours: client.hoursSaved, dollars: client.dollarsSaved }));
    chartCard.appendChild(buildReportBarChart(chartData));
    chartSection.appendChild(chartCard);
    page.appendChild(chartSection);
}

function renderAdminReport(page) {
    const hero = document.createElement('div');
    hero.className = 'report-hero';
    hero.innerHTML = '<div class="report-hero__eyebrow">Platform cost savings · all customers</div>' +
        '<div class="report-hero__value">' + formatCurrency(mockAdminSummary.totalDollarsSaved) + '</div>' +
        '<div class="report-hero__caption">"Across ' + formatNumber(mockAdminSummary.totalUsers) + ' customers, Auto Secretary has reclaimed ' + formatNumber(mockAdminSummary.totalHoursSaved) + ' hours of admin work this year."</div>';
    hero.appendChild(buildReportRangeTabs());
    page.appendChild(hero);

    const headlineGrid = document.createElement('div');
    headlineGrid.className = 'grid grid--4 section';
    headlineGrid.appendChild(buildReportMetricBlock('Customers', formatNumber(mockAdminSummary.totalUsers), 'Active in last 30 days'));
    headlineGrid.appendChild(buildReportMetricBlock('Hours saved', formatNumber(mockAdminSummary.totalHoursSaved), 'All time'));
    headlineGrid.appendChild(buildReportMetricBlock('Dollars saved', formatCurrency(mockAdminSummary.totalDollarsSaved), 'All time'));
    headlineGrid.appendChild(buildReportMetricBlock('Avg. per customer', formatCurrency(Math.round(mockAdminSummary.totalDollarsSaved / mockAdminSummary.totalUsers)), 'Lifetime'));
    page.appendChild(headlineGrid);

    const tableSection = document.createElement('section');
    tableSection.className = 'section';
    const tableHeader = document.createElement('div');
    tableHeader.className = 'section-header';
    tableHeader.innerHTML = '<div><div class="section-header__title">Top customers by savings</div><div class="secretary-voice" style="font-size:13px;margin-top:4px;">"Sorted by all-time dollars saved."</div></div>';
    tableSection.appendChild(tableHeader);

    const card = document.createElement('div');
    card.className = 'card card--flush';
    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrap';
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = '<thead><tr><th>Customer</th><th>Plan</th><th>Flows</th><th class="num">Hours saved</th><th class="num">Dollars saved</th></tr></thead>';
    const tbody = document.createElement('tbody');
    const sorted = [...mockAdminUsers].sort((first, second) => second.dollarsSaved - first.dollarsSaved);
    for (const user of sorted) {
        const row = document.createElement('tr');
        row.className = 'is-clickable';
        row.innerHTML = '<td><strong>' + user.name + '</strong></td><td><span class="badge badge--teal">' + user.plan + '</span></td><td>' + user.flows + '</td><td class="num">' + formatNumber(user.hoursSaved) + '</td><td class="num">' + formatCurrency(user.dollarsSaved) + '</td>';
        row.addEventListener('click', () => showToast('Customer detail report is on the roadmap.', 'info'));
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    card.appendChild(tableWrap);
    tableSection.appendChild(card);
    page.appendChild(tableSection);
}

function buildReportRangeTabs() {
    const tabs = document.createElement('div');
    tabs.className = 'range-tabs';
    const ranges = ['7d', '30d', '90d', 'All time'];
    for (const range of ranges) {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'range-tab';
        if (range === appState.currentReportRange) tab.classList.add('is-active');
        tab.textContent = range;
        tab.addEventListener('click', () => {
            setReportRange(range);
            renderCurrentRoute();
        });
        tabs.appendChild(tab);
    }
    return tabs;
}

function buildReportMetricBlock(label, value, caption) {
    const block = document.createElement('div');
    block.className = 'stat-card';
    block.innerHTML = '<div class="stat-card__label">' + label + '</div><div class="stat-card__value">' + value + '</div>' + (caption ? '<div class="stat-card__caption">' + caption + '</div>' : '');
    return block;
}

function buildReportBarChart(rows) {
    const chart = document.createElement('div');
    chart.className = 'bar-chart';

    const maxHours = Math.max(...rows.map(row => row.hours));

    for (const row of rows) {
        const rowEl = document.createElement('div');
        rowEl.className = 'bar-chart__row';

        const label = document.createElement('div');
        label.className = 'bar-chart__label';
        label.textContent = row.name;

        const track = document.createElement('div');
        track.className = 'bar-chart__track';
        const fill = document.createElement('div');
        fill.className = 'bar-chart__fill';
        fill.style.width = ((row.hours / maxHours) * 100).toFixed(1) + '%';
        track.appendChild(fill);

        const value = document.createElement('div');
        value.className = 'bar-chart__value';
        value.textContent = formatCurrency(row.dollars);

        rowEl.appendChild(label);
        rowEl.appendChild(track);
        rowEl.appendChild(value);
        chart.appendChild(rowEl);
    }

    return chart;
}

function buildReportWeeklyChart(rows) {
    const chart = document.createElement('div');
    chart.className = 'weekly-chart';

    const maxHours = Math.max(...rows.map(row => row.hours));

    for (const row of rows) {
        const col = document.createElement('div');
        col.className = 'weekly-chart__col';

        const barWrap = document.createElement('div');
        barWrap.className = 'weekly-chart__bar-wrap';
        const bar = document.createElement('div');
        bar.className = 'weekly-chart__bar';
        bar.style.height = ((row.hours / maxHours) * 100).toFixed(1) + '%';
        bar.title = row.day + ': ' + row.hours + ' hrs';
        barWrap.appendChild(bar);

        const label = document.createElement('div');
        label.className = 'weekly-chart__label';
        label.textContent = row.day;

        col.appendChild(barWrap);
        col.appendChild(label);
        chart.appendChild(col);
    }

    return chart;
}


// ============================================================
// FLOWS LIST VIEW
// ============================================================

function flowsForCurrentDemoState() {
    if (appState.flowsDemoState === 'empty') return [];
    if (appState.flowsDemoState === 'single') return [mockClientFlowsFull[0]];
    return mockClientFlowsFull.slice();
}

function sparklineSvg(seed) {
    const points = [];
    let randomState = 0;
    for (let characterIndex = 0; characterIndex < seed.length; characterIndex++) {
        randomState = (randomState * 31 + seed.charCodeAt(characterIndex)) & 0xffff;
    }
    for (let pointIndex = 0; pointIndex < 12; pointIndex++) {
        randomState = (randomState * 1103515245 + 12345) & 0x7fffffff;
        points.push(0.35 + ((randomState % 100) / 100) * 0.55);
    }
    const width = 220;
    const height = 36;
    const stepX = width / (points.length - 1);
    const pathData = points.map((value, pointIndex) => {
        const positionX = pointIndex * stepX;
        const positionY = height - value * (height - 4) - 2;
        return (pointIndex === 0 ? 'M' : 'L') + positionX.toFixed(1) + ' ' + positionY.toFixed(1);
    }).join(' ');
    const areaData = pathData + ' L' + width + ' ' + height + ' L0 ' + height + ' Z';
    const gradientId = 'sparkGrad-' + seed;
    return '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none">'
        + '<defs><linearGradient id="' + gradientId + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgba(13,148,136,0.35)"/><stop offset="100%" stop-color="rgba(13,148,136,0)"/></linearGradient></defs>'
        + '<path d="' + areaData + '" fill="url(#' + gradientId + ')" />'
        + '<path d="' + pathData + '" fill="none" stroke="var(--accent-teal)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" />'
        + '</svg>';
}

function statusDotSpan(status) {
    if (status === 'running') return '<span class="status-dot status-dot--running"></span>';
    if (status === 'paused') return '<span class="status-dot status-dot--paused"></span>';
    if (status === 'error') return '<span class="status-dot status-dot--error"></span>';
    return '<span class="status-dot"></span>';
}

function statusBadgeHtml(status) {
    if (status === 'running') return '<span class="badge badge--success"><span class="badge__dot"></span><span>Running</span></span>';
    if (status === 'paused') return '<span class="badge badge--warning"><span class="badge__dot"></span><span>Paused</span></span>';
    if (status === 'error') return '<span class="badge badge--danger"><span class="badge__dot"></span><span>Needs attention</span></span>';
    return '<span class="badge"><span>' + status + '</span></span>';
}

function executionStatusBadgeHtml(status) {
    if (status === 'success') return '<span class="badge badge--success"><span class="badge__dot"></span><span>Success</span></span>';
    if (status === 'running') return '<span class="badge badge--indigo"><span class="badge__dot"></span><span>Running</span></span>';
    return '<span class="badge badge--danger"><span class="badge__dot"></span><span>Failed</span></span>';
}

function uniqueCategoriesFor(flows) {
    const seen = {};
    const result = [];
    for (const flow of flows) {
        if (!seen[flow.category]) { seen[flow.category] = true; result.push(flow.category); }
    }
    result.sort();
    return result;
}

function filterAndSortFlows(flows) {
    const searchTerm = appState.flowsSearch.trim().toLowerCase();
    const statusFilter = appState.flowsStatusFilter;
    const categoryFilter = appState.flowsCategoryFilter;
    const sortKey = appState.flowsSort;
    const filtered = flows.filter(flow => {
        if (statusFilter !== 'all' && flow.status !== statusFilter) return false;
        if (categoryFilter !== 'all' && flow.category !== categoryFilter) return false;
        if (searchTerm && flow.name.toLowerCase().indexOf(searchTerm) === -1 && flow.category.toLowerCase().indexOf(searchTerm) === -1) return false;
        return true;
    });
    filtered.sort((alpha, beta) => {
        if (sortKey === 'hoursDesc') return beta.hoursPerWeekSaved - alpha.hoursPerWeekSaved;
        if (sortKey === 'hoursAsc') return alpha.hoursPerWeekSaved - beta.hoursPerWeekSaved;
        if (sortKey === 'nameAsc') return alpha.name.localeCompare(beta.name);
        if (sortKey === 'nameDesc') return beta.name.localeCompare(alpha.name);
        if (sortKey === 'recentDesc') return alpha.lastRunMinutes - beta.lastRunMinutes;
        if (sortKey === 'successDesc') return beta.successRate - alpha.successRate;
        return 0;
    });
    return filtered;
}

function renderFlowsView(container) {
    const page = document.createElement('section');
    page.className = 'page';
    container.appendChild(page);

    if (appState.currentRole !== 'client') {
        const notice = document.createElement('div');
        notice.className = 'flow-empty';
        notice.innerHTML = '<div class="flow-empty__art">○</div>'
            + '<div class="flow-empty__title">The <em>flows view</em> is from the client perspective.</div>'
            + '<div class="flow-empty__lede">Sign in as <code style="font-family:var(--font-mono);background:var(--bg-subtle);padding:1px 6px;border-radius:4px;font-size:12px;">client</code> to explore the experience the customer sees.</div>';
        page.appendChild(notice);
        return;
    }

    page.appendChild(buildDemoStateBar());

    const headerRow = document.createElement('div');
    headerRow.className = 'page-header';

    const titleBlock = document.createElement('div');
    titleBlock.className = 'page-header__title-block';
    const eyebrow = document.createElement('div');
    eyebrow.className = 'page-header__eyebrow';
    eyebrow.textContent = 'Automations';
    const title = document.createElement('h1');
    title.className = 'page-header__title';
    title.innerHTML = 'Your <em>flows</em>.';
    const subtitle = document.createElement('p');
    subtitle.className = 'page-header__subtitle secretary-voice';
    subtitle.style.fontFamily = 'var(--font-serif)';
    subtitle.style.fontStyle = 'italic';
    subtitle.textContent = '"Everything I\'m running for you, with hours and dollars saved at a glance."';
    titleBlock.appendChild(eyebrow);
    titleBlock.appendChild(title);
    titleBlock.appendChild(subtitle);

    const headerActions = document.createElement('div');
    headerActions.style.display = 'flex';
    headerActions.style.gap = 'var(--space-2)';
    headerActions.style.flexWrap = 'wrap';

    if (appState.flowsDemoState !== 'empty') {
        const exportBtn = document.createElement('button');
        exportBtn.type = 'button';
        exportBtn.className = 'btn btn--ghost btn--sm';
        exportBtn.textContent = 'Export CSV';
        exportBtn.addEventListener('click', () => showToast('Export is on the roadmap.', 'info'));
        headerActions.appendChild(exportBtn);
    }

    const requestBtn = document.createElement('button');
    requestBtn.type = 'button';
    requestBtn.className = 'btn btn--primary btn--sm';
    requestBtn.innerHTML = '＋ Request automation';
    requestBtn.addEventListener('click', () => openRequestAutomationModal());
    headerActions.appendChild(requestBtn);

    headerRow.appendChild(titleBlock);
    headerRow.appendChild(headerActions);
    page.appendChild(headerRow);

    const flows = flowsForCurrentDemoState();

    if (appState.flowsDemoState === 'empty') {
        page.appendChild(buildFlowsEmptyState());
    } else if (appState.flowsDemoState === 'single') {
        page.appendChild(buildFlowsSingleState(flows[0]));
    } else {
        page.appendChild(buildFlowsSummary(flows));
        page.appendChild(buildFlowsToolbar(flows));
        page.appendChild(buildFlowsListOrGrid(flows));
    }
}

function buildDemoStateBar() {
    const bar = document.createElement('div');
    bar.className = 'demo-state-bar';

    const label = document.createElement('span');
    label.className = 'demo-state-bar__label';
    label.textContent = 'Demo state';
    bar.appendChild(label);

    const toggle = document.createElement('div');
    toggle.className = 'state-toggle';
    const states = [
        { value: 'empty', label: 'Empty (no flows)' },
        { value: 'single', label: 'Single flow' },
        { value: 'many', label: 'Many (14)' }
    ];
    for (const state of states) {
        const btn = document.createElement('button');
        btn.type = 'button';
        if (appState.flowsDemoState === state.value) btn.classList.add('is-active');
        btn.textContent = state.label;
        btn.addEventListener('click', () => {
            appState.flowsDemoState = state.value;
            appState.flowsSearch = '';
            appState.flowsStatusFilter = 'all';
            appState.flowsCategoryFilter = 'all';
            renderCurrentRoute();
        });
        toggle.appendChild(btn);
    }
    bar.appendChild(toggle);

    const note = document.createElement('span');
    note.className = 'demo-state-bar__note';
    note.textContent = '"Switch states to preview each acceptance case."';
    bar.appendChild(note);

    return bar;
}

function buildFlowsSummary(flows) {
    let totalCount = flows.length, runningCount = 0, pausedCount = 0, errorCount = 0, hoursWeek = 0;
    for (const flow of flows) {
        if (flow.status === 'running') runningCount++;
        else if (flow.status === 'paused') pausedCount++;
        else if (flow.status === 'error') errorCount++;
        hoursWeek += flow.hoursPerWeekSaved;
    }

    const wrap = document.createElement('div');
    wrap.className = 'flows-summary';
    const cells = [
        { label: 'Automations', value: totalCount, tone: '' },
        { label: 'Running', value: runningCount, tone: 'success' },
        { label: 'Paused', value: pausedCount, tone: 'warning' },
        { label: 'Needs attention', value: errorCount, tone: 'danger' },
        { label: 'Hours / week saved', value: formatDecimal(hoursWeek, 1), tone: 'success' }
    ];
    for (const cell of cells) {
        const div = document.createElement('div');
        div.className = 'flows-summary__cell' + (cell.tone ? ' flows-summary__cell--' + cell.tone : '');
        div.innerHTML = '<div class="flows-summary__cell-label">' + cell.label + '</div><div class="flows-summary__cell-value">' + cell.value + '</div>';
        wrap.appendChild(div);
    }
    return wrap;
}

function buildFlowsToolbar(flows) {
    const toolbar = document.createElement('div');
    toolbar.className = 'flows-toolbar';

    const searchField = document.createElement('div');
    searchField.className = 'search-field';
    searchField.innerHTML = '<span class="search-field__icon">⌕</span>';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-field__input';
    searchInput.placeholder = 'Search flows by name or category…';
    searchInput.value = appState.flowsSearch;
    searchInput.addEventListener('input', (event) => {
        appState.flowsSearch = event.target.value;
        const scrollY = window.scrollY;
        renderCurrentRoute();
        window.scrollTo(0, scrollY);
        const refocused = document.querySelector('.search-field__input');
        if (refocused) {
            refocused.focus();
            refocused.setSelectionRange(refocused.value.length, refocused.value.length);
        }
    });
    searchField.appendChild(searchInput);
    toolbar.appendChild(searchField);

    const statusSelect = document.createElement('select');
    statusSelect.className = 'toolbar-select';
    const statusOptions = [
        { value: 'all', label: 'All statuses' },
        { value: 'running', label: 'Running only' },
        { value: 'paused', label: 'Paused only' },
        { value: 'error', label: 'Needs attention' }
    ];
    for (const option of statusOptions) {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        if (appState.flowsStatusFilter === option.value) opt.selected = true;
        statusSelect.appendChild(opt);
    }
    statusSelect.addEventListener('change', () => {
        appState.flowsStatusFilter = statusSelect.value;
        renderCurrentRoute();
    });
    toolbar.appendChild(statusSelect);

    const categorySelect = document.createElement('select');
    categorySelect.className = 'toolbar-select';
    const allCatOpt = document.createElement('option');
    allCatOpt.value = 'all';
    allCatOpt.textContent = 'All categories';
    if (appState.flowsCategoryFilter === 'all') allCatOpt.selected = true;
    categorySelect.appendChild(allCatOpt);
    for (const category of uniqueCategoriesFor(flows)) {
        const opt = document.createElement('option');
        opt.value = category;
        opt.textContent = category;
        if (appState.flowsCategoryFilter === category) opt.selected = true;
        categorySelect.appendChild(opt);
    }
    categorySelect.addEventListener('change', () => {
        appState.flowsCategoryFilter = categorySelect.value;
        renderCurrentRoute();
    });
    toolbar.appendChild(categorySelect);

    const sortSelect = document.createElement('select');
    sortSelect.className = 'toolbar-select';
    const sortOptions = [
        { value: 'hoursDesc', label: 'Sort: Most hours saved' },
        { value: 'hoursAsc', label: 'Sort: Least hours saved' },
        { value: 'nameAsc', label: 'Sort: Name A–Z' },
        { value: 'nameDesc', label: 'Sort: Name Z–A' },
        { value: 'recentDesc', label: 'Sort: Most recent run' },
        { value: 'successDesc', label: 'Sort: Success rate' }
    ];
    for (const option of sortOptions) {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        if (appState.flowsSort === option.value) opt.selected = true;
        sortSelect.appendChild(opt);
    }
    sortSelect.addEventListener('change', () => {
        appState.flowsSort = sortSelect.value;
        renderCurrentRoute();
    });
    toolbar.appendChild(sortSelect);

    const spacer = document.createElement('div');
    spacer.className = 'flows-toolbar__spacer';
    toolbar.appendChild(spacer);

    const viewToggle = document.createElement('div');
    viewToggle.className = 'view-toggle';
    const gridBtn = document.createElement('button');
    gridBtn.type = 'button';
    gridBtn.textContent = '▦';
    gridBtn.setAttribute('aria-label', 'Grid view');
    if (appState.flowsView === 'grid') gridBtn.classList.add('is-active');
    gridBtn.addEventListener('click', () => { appState.flowsView = 'grid'; renderCurrentRoute(); });
    const listBtn = document.createElement('button');
    listBtn.type = 'button';
    listBtn.textContent = '☰';
    listBtn.setAttribute('aria-label', 'List view');
    if (appState.flowsView === 'list') listBtn.classList.add('is-active');
    listBtn.addEventListener('click', () => { appState.flowsView = 'list'; renderCurrentRoute(); });
    viewToggle.appendChild(gridBtn);
    viewToggle.appendChild(listBtn);
    toolbar.appendChild(viewToggle);

    return toolbar;
}

function buildFlowsListOrGrid(flows) {
    const filtered = filterAndSortFlows(flows);
    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'flow-no-results';
        empty.innerHTML = '<div class="flow-no-results__icon">⌕</div>'
            + '<div class="flow-no-results__title">No flows match your filters</div>'
            + '<div class="flow-no-results__text">"Try clearing the search or switching the status filter back to All."</div>';
        return empty;
    }

    if (appState.flowsView === 'grid') {
        const grid = document.createElement('div');
        grid.className = 'flow-grid';
        for (const flow of filtered) grid.appendChild(buildFlowCard(flow));
        return grid;
    }

    const list = document.createElement('div');
    list.className = 'flow-list';
    for (const flow of filtered) list.appendChild(buildFlowListRow(flow));
    return list;
}

function buildFlowCardActions(flow) {
    const wrap = document.createElement('div');
    wrap.className = 'flow-card__actions';

    if (flow.status === 'paused') {
        wrap.appendChild(makeIconBtn('▶', 'Resume', () => showToast(`Resumed "${flow.name}". It will pick up at its next scheduled run.`, 'success')));
    } else if (flow.status === 'running') {
        wrap.appendChild(makeIconBtn('▶', 'Run now', () => showToast(`Run started for "${flow.name}".`, 'success')));
        wrap.appendChild(makeIconBtn('⏸', 'Pause', () => showToast(`Paused "${flow.name}".`, 'info')));
    } else {
        wrap.appendChild(makeIconBtn('↻', 'Retry', () => showToast(`Retrying "${flow.name}".`, 'success')));
    }
    wrap.appendChild(makeIconBtn('⚡', 'View executions', () => navigateToExecutions(flow.id)));
    wrap.appendChild(makeIconBtn('⚙', 'Settings', () => openEditFlowModal(flow)));
    return wrap;
}

function makeIconBtn(glyph, label, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'icon-btn';
    btn.textContent = glyph;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.addEventListener('click', onClick);
    return btn;
}

function buildFlowCard(flow) {
    const card = document.createElement('article');
    card.className = 'flow-card' + (flow.status === 'error' ? ' flow-card--attention' : '');

    const annualSaved = flow.hoursPerWeekSaved * 52 * 38;

    const top = document.createElement('div');
    top.className = 'flow-card__top';
    top.innerHTML = '<div><div class="flow-card__name">' + escapeHtml(flow.name) + '</div><div class="flow-card__category">' + statusDotSpan(flow.status) + escapeHtml(flow.category) + '</div></div>' + statusBadgeHtml(flow.status);
    card.appendChild(top);

    const savings = document.createElement('div');
    savings.className = 'flow-card__savings';
    savings.innerHTML = '<span class="flow-card__savings-value">' + formatCurrency(annualSaved) + '</span><span class="flow-card__savings-label">saved / yr</span>';
    card.appendChild(savings);

    const spark = document.createElement('div');
    spark.className = 'flow-spark';
    spark.innerHTML = sparklineSvg(flow.id);
    card.appendChild(spark);

    const miniStats = document.createElement('div');
    miniStats.className = 'flow-card__mini-stats';
    miniStats.innerHTML = '<div><div class="flow-card__mini-stat-label">Hrs / wk</div><div class="flow-card__mini-stat-value">' + formatDecimal(flow.hoursPerWeekSaved, 1) + '</div></div>'
        + '<div><div class="flow-card__mini-stat-label">Runs</div><div class="flow-card__mini-stat-value">' + formatNumber(flow.runsTotal) + '</div></div>'
        + '<div><div class="flow-card__mini-stat-label">Success</div><div class="flow-card__mini-stat-value">' + formatPercent(flow.successRate) + '</div></div>';
    card.appendChild(miniStats);

    const foot = document.createElement('div');
    foot.className = 'flow-card__foot';
    const lastRun = document.createElement('span');
    lastRun.className = 'flow-card__last-run';
    lastRun.textContent = 'Last run ' + relativeTime(flow.lastRunMinutes);
    foot.appendChild(lastRun);
    foot.appendChild(buildFlowCardActions(flow));
    card.appendChild(foot);

    return card;
}

function buildFlowListRow(flow) {
    const row = document.createElement('div');
    row.className = 'flow-list-row' + (flow.status === 'error' ? ' flow-list-row--attention' : '');

    const annualSaved = flow.hoursPerWeekSaved * 52 * 38;

    row.innerHTML = '<div class="flow-list-row__name">'
        + '<div class="flow-list-row__title">' + statusDotSpan(flow.status) + escapeHtml(flow.name) + '</div>'
        + '<div class="flow-list-row__cat">' + escapeHtml(flow.category) + '</div>'
        + '</div>'
        + '<div class="flow-list-row__cell flow-list-row__cell--money"><span class="flow-list-row__cell-label">Saved / yr</span><span class="flow-list-row__cell-value">' + formatCurrency(annualSaved) + '</span></div>'
        + '<div class="flow-list-row__cell flow-list-row__cell--hide-md"><span class="flow-list-row__cell-label">Hrs / wk</span><span class="flow-list-row__cell-value">' + formatDecimal(flow.hoursPerWeekSaved, 1) + '</span></div>'
        + '<div class="flow-list-row__cell flow-list-row__cell--hide-md"><span class="flow-list-row__cell-label">Success</span><span class="flow-list-row__cell-value">' + formatPercent(flow.successRate) + '</span></div>'
        + '<div class="flow-list-row__cell flow-list-row__cell--hide-sm"><span class="flow-list-row__cell-label">Last run</span><span class="flow-list-row__cell-value">' + relativeTime(flow.lastRunMinutes) + '</span></div>';
    row.appendChild(buildFlowCardActions(flow));

    return row;
}

function buildFlowsEmptyState() {
    const wrap = document.createElement('div');
    wrap.className = 'flow-empty';

    wrap.innerHTML = '<div class="flow-empty__art">✦</div>'
        + '<div class="flow-empty__title">I haven\'t taken anything off your <em>plate</em> yet.</div>'
        + '<div class="flow-empty__lede">Tell me what eats up the most hours in your week and I\'ll build the first automation for you. Most clients have their first flow running within 48 hours.</div>';

    const actions = document.createElement('div');
    actions.className = 'flow-empty__actions';
    const primary = document.createElement('button');
    primary.type = 'button';
    primary.className = 'btn btn--primary btn--lg';
    primary.innerHTML = '＋ Request your first automation';
    primary.addEventListener('click', () => openRequestAutomationModal());
    const secondary = document.createElement('button');
    secondary.type = 'button';
    secondary.className = 'btn btn--secondary btn--lg';
    secondary.textContent = 'Talk to a specialist';
    secondary.addEventListener('click', () => showToast('A specialist will reach out shortly.', 'success'));
    actions.appendChild(primary);
    actions.appendChild(secondary);
    wrap.appendChild(actions);

    const suggestHead = document.createElement('div');
    suggestHead.className = 'flow-empty__suggestions-head';
    suggestHead.textContent = 'Popular starting points';
    wrap.appendChild(suggestHead);

    const suggestions = document.createElement('div');
    suggestions.className = 'flow-empty__suggestions';
    for (const suggestion of flowSuggestions.slice(0, 3)) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'flow-suggest';
        btn.innerHTML = '<div class="flow-suggest__icon">' + suggestion.icon + '</div>'
            + '<div class="flow-suggest__title">' + suggestion.title + '</div>'
            + '<div class="flow-suggest__desc">' + suggestion.desc + '</div>';
        btn.addEventListener('click', () => openRequestAutomationModal());
        suggestions.appendChild(btn);
    }
    wrap.appendChild(suggestions);

    return wrap;
}

function buildFlowsSingleState(flow) {
    const wrap = document.createElement('div');

    const hero = document.createElement('div');
    hero.className = 'flow-single-hero';

    const annualSaved = flow.hoursPerWeekSaved * 52 * 38;

    const inner = document.createElement('div');
    inner.className = 'flow-single-hero__inner';

    const leftCol = document.createElement('div');
    leftCol.innerHTML = statusBadgeHtml(flow.status)
        + '<div class="flow-single-hero__name">' + escapeHtml(flow.name) + '</div>'
        + '<div class="flow-single-hero__cat">' + escapeHtml(flow.category) + ' · running since onboarding</div>'
        + '<div class="flow-single-hero__money">' + formatCurrency(annualSaved) + '</div>'
        + '<div class="flow-single-hero__money-label">"' + formatDecimal(flow.hoursPerWeekSaved, 1) + ' hours per week given back to you."</div>';

    const actions = document.createElement('div');
    actions.className = 'flow-single-hero__actions';
    const runBtn = document.createElement('button');
    runBtn.type = 'button';
    runBtn.className = 'btn btn--primary';
    runBtn.innerHTML = '▶ Run now';
    runBtn.addEventListener('click', () => showToast(`Run started for "${flow.name}".`, 'success'));
    const execBtn = document.createElement('button');
    execBtn.type = 'button';
    execBtn.className = 'btn btn--secondary';
    execBtn.innerHTML = '⚡ See executions';
    execBtn.addEventListener('click', () => navigateToExecutions(flow.id));
    const settingsBtn = document.createElement('button');
    settingsBtn.type = 'button';
    settingsBtn.className = 'btn btn--ghost';
    settingsBtn.innerHTML = '⚙ Settings';
    settingsBtn.addEventListener('click', () => openEditFlowModal(flow));
    actions.appendChild(runBtn);
    actions.appendChild(execBtn);
    actions.appendChild(settingsBtn);
    leftCol.appendChild(actions);

    const rightCol = document.createElement('div');
    rightCol.className = 'flow-single-hero__stats';
    const statSpecs = [
        { value: formatNumber(flow.runsTotal), label: 'Total runs' },
        { value: formatPercent(flow.successRate), label: 'Success rate' },
        { value: formatNumber(Math.round(flow.hoursSavedToDate)), label: 'Hours to date' },
        { value: relativeTime(flow.lastRunMinutes), label: 'Last run' }
    ];
    for (const spec of statSpecs) {
        const cell = document.createElement('div');
        cell.className = 'flow-single-hero__stat';
        cell.innerHTML = '<div class="flow-single-hero__stat-value">' + spec.value + '</div><div class="flow-single-hero__stat-label">' + spec.label + '</div>';
        rightCol.appendChild(cell);
    }

    inner.appendChild(leftCol);
    inner.appendChild(rightCol);
    hero.appendChild(inner);
    wrap.appendChild(hero);

    const callout = document.createElement('div');
    callout.className = 'callout';
    callout.style.marginBottom = 'var(--space-6)';
    callout.innerHTML = '<div class="callout__body"><div class="callout__title">Room to grow.</div><div class="callout__text secretary-voice" style="font-style:italic;">"One flow is already paying off — clients who layer scheduling and invoicing on top typically triple their savings within a quarter."</div></div>';
    const calloutBtn = document.createElement('button');
    calloutBtn.type = 'button';
    calloutBtn.className = 'btn btn--secondary btn--sm';
    calloutBtn.textContent = 'Request another';
    calloutBtn.addEventListener('click', () => openRequestAutomationModal());
    callout.appendChild(calloutBtn);
    wrap.appendChild(callout);

    const suggestHead = document.createElement('div');
    suggestHead.className = 'flow-empty__suggestions-head';
    suggestHead.style.marginBottom = 'var(--space-3)';
    suggestHead.style.textAlign = 'left';
    suggestHead.textContent = 'Suggested next automations';
    wrap.appendChild(suggestHead);

    const suggestions = document.createElement('div');
    suggestions.className = 'flow-empty__suggestions';
    for (const suggestion of flowSuggestions.slice(1, 4)) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'flow-suggest';
        btn.innerHTML = '<div class="flow-suggest__icon">' + suggestion.icon + '</div>'
            + '<div class="flow-suggest__title">' + suggestion.title + '</div>'
            + '<div class="flow-suggest__desc">' + suggestion.desc + '</div>';
        btn.addEventListener('click', () => openRequestAutomationModal());
        suggestions.appendChild(btn);
    }
    wrap.appendChild(suggestions);

    return wrap;
}


// ============================================================
// EXECUTIONS VIEW
// ============================================================

const EXECUTION_TRIGGERS = ['scheduled', 'manual', 'webhook', 'email', 'calendar'];

const EXECUTION_SUMMARIES = {
    'Email triage': ['Sorted 14 new emails into 4 buckets', 'Drafted reply to Mara Chen about Q3 proposal', 'Flagged 2 urgent messages for review', 'Routed 7 messages to sales queue', 'Held back reply to Tomás Vega for your eyes'],
    'Scheduling': ['Booked meeting with Lucent Studio for Thursday 2pm', 'Found shared slot across 4 calendars', 'Rescheduled standup to accommodate Priya', 'Sent invites to 6 attendees', 'Confirmed appointment with Linda Park'],
    'Invoicing': ['Matched invoice #4821 to PO #2210', 'Filed 3 invoices to QuickBooks', 'Sent gentle reminder for invoice #1042', 'Chased 2 overdue invoices via email', 'Generated retainer invoice for May'],
    'Client intake': ['Captured new lead from website form', 'Validated and routed to assigned rep', 'Triggered welcome sequence', 'Added contact to CRM with tags', 'Scheduled intro call for Wednesday'],
    'Reporting': ['Assembled weekly status report for Hayward', 'Pulled metrics from 3 dashboards', 'Distributed PDF to 5 stakeholders', 'Posted summary to Slack #ops', 'Archived prior week\'s deliverables'],
    'Data entry': ['Filed 8 receipts to October expense report', 'Cleaned 23 duplicate contact records', 'Merged 4 company entries', 'Updated 12 stale phone numbers', 'Validated address formatting on 17 rows']
};

const EXECUTION_STEP_TEMPLATES = {
    'Email triage': ['Fetch inbox', 'Classify messages', 'Apply labels', 'Route to queues', 'Send auto-replies'],
    'Scheduling': ['Check availability', 'Find shared slot', 'Draft invite', 'Send invitation', 'Update calendar'],
    'Invoicing': ['Pull invoice data', 'Match to PO', 'Validate amounts', 'File to QuickBooks', 'Notify owner'],
    'Client intake': ['Receive form data', 'Validate fields', 'Create CRM record', 'Trigger welcome email', 'Notify rep'],
    'Reporting': ['Pull source data', 'Aggregate metrics', 'Render report', 'Distribute to list'],
    'Data entry': ['Scan dataset', 'Detect duplicates', 'Apply merge rules', 'Update master record']
};

function deterministicRandom(seed) {
    let state = 0;
    for (let characterIndex = 0; characterIndex < seed.length; characterIndex++) {
        state = ((state << 5) - state + seed.charCodeAt(characterIndex)) | 0;
    }
    if (state === 0) state = 1;
    let currentState = Math.abs(state);
    return () => {
        currentState = (currentState * 1103515245 + 12345) & 0x7fffffff;
        return currentState / 0x7fffffff;
    };
}

function pickFromList(rng, list) {
    return list[Math.floor(rng() * list.length) % list.length];
}

function triggeredByLabel(trigger) {
    if (trigger === 'manual') return 'Avery Calloway';
    if (trigger === 'scheduled') return 'System scheduler';
    if (trigger === 'webhook') return 'Zapier webhook';
    if (trigger === 'email') return 'Inbox listener';
    return 'Calendar listener';
}

function generateExecutionsForFlow(flow) {
    if (appState.cachedExecutionsFlowId === flow.id && appState.cachedExecutions) return appState.cachedExecutions;
    const rng = deterministicRandom(flow.id);
    const summaries = EXECUTION_SUMMARIES[flow.category] || ['Completed scheduled task'];
    const stepTemplate = EXECUTION_STEP_TEMPLATES[flow.category] || ['Run task'];
    const totalExecutions = 152;
    const executions = [];
    let elapsedMinutes = 0;
    for (let executionIndex = 0; executionIndex < totalExecutions; executionIndex++) {
        elapsedMinutes += Math.floor(15 + rng() * 240);
        const failureChance = (100 - flow.successRate) / 100;
        const statusRoll = rng();
        let status = 'success';
        if (executionIndex === 0 && rng() < 0.18) status = 'running';
        else if (statusRoll < failureChance) status = 'failed';
        const trigger = pickFromList(rng, EXECUTION_TRIGGERS);
        let baseDuration = status === 'failed' ? 4 + Math.floor(rng() * 18) : 18 + Math.floor(rng() * 90);
        if (status === 'running') baseDuration = Math.floor(rng() * 40);
        const summary = pickFromList(rng, summaries);
        const itemsProcessed = Math.floor(2 + rng() * 28);
        const steps = stepTemplate.map((stepName, stepIndex, allSteps) => {
            let stepStatus = 'success';
            if (status === 'failed' && stepIndex === allSteps.length - 1) stepStatus = 'failed';
            else if (status === 'running' && stepIndex >= Math.floor(allSteps.length / 2)) stepStatus = 'running';
            return { name: stepName, status: stepStatus, durationSeconds: Math.max(1, Math.floor(baseDuration / allSteps.length) + Math.floor(rng() * 4)) };
        });
        let errorMessage = null;
        if (status === 'failed') {
            errorMessage = 'Step "' + stepTemplate[stepTemplate.length - 1] + '" returned 422: upstream validation failed. An automatic retry did not resolve. Manual review recommended.';
        }
        executions.push({
            id: 'exec_' + flow.id + '_' + (10000 + executionIndex),
            flowId: flow.id,
            minutesAgo: elapsedMinutes,
            status: status,
            durationSeconds: baseDuration,
            trigger: trigger,
            summary: summary,
            itemsProcessed: itemsProcessed,
            triggeredBy: triggeredByLabel(trigger),
            steps: steps,
            errorMessage: errorMessage
        });
    }
    appState.cachedExecutionsFlowId = flow.id;
    appState.cachedExecutions = executions;
    return executions;
}

function filterExecutionList(executions) {
    const searchTerm = appState.execSearch.trim().toLowerCase();
    const statusFilter = appState.execStatusFilter;
    const dateFilter = appState.execDateFilter;
    const triggerFilter = appState.execTriggerFilter;
    let dateCutoff;
    if (dateFilter === 'today') dateCutoff = 24 * 60;
    else if (dateFilter === '7d') dateCutoff = 7 * 24 * 60;
    else if (dateFilter === '30d') dateCutoff = 30 * 24 * 60;
    else dateCutoff = Infinity;
    return executions.filter(execution => {
        if (statusFilter !== 'all' && execution.status !== statusFilter) return false;
        if (triggerFilter !== 'all' && execution.trigger !== triggerFilter) return false;
        if (execution.minutesAgo > dateCutoff) return false;
        if (searchTerm) {
            const haystack = (execution.id + ' ' + execution.summary + ' ' + execution.trigger + ' ' + execution.triggeredBy).toLowerCase();
            if (haystack.indexOf(searchTerm) === -1) return false;
        }
        return true;
    });
}

function sortExecutionList(executions) {
    const key = appState.execSortKey;
    const direction = appState.execSortDirection === 'asc' ? 1 : -1;
    const sorted = executions.slice();
    sorted.sort((alpha, beta) => {
        let alphaValue, betaValue;
        if (key === 'started') { alphaValue = -alpha.minutesAgo; betaValue = -beta.minutesAgo; }
        else if (key === 'duration') { alphaValue = alpha.durationSeconds; betaValue = beta.durationSeconds; }
        else if (key === 'status') { alphaValue = alpha.status; betaValue = beta.status; }
        else if (key === 'trigger') { alphaValue = alpha.trigger; betaValue = beta.trigger; }
        else if (key === 'items') { alphaValue = alpha.itemsProcessed; betaValue = beta.itemsProcessed; }
        else { alphaValue = alpha.id; betaValue = beta.id; }
        if (alphaValue < betaValue) return -1 * direction;
        if (alphaValue > betaValue) return 1 * direction;
        return 0;
    });
    return sorted;
}

function resetExecutionViewState() {
    appState.execSearch = '';
    appState.execStatusFilter = 'all';
    appState.execDateFilter = 'all';
    appState.execTriggerFilter = 'all';
    appState.execSortKey = 'started';
    appState.execSortDirection = 'desc';
    appState.execPage = 1;
    appState.execExpandedIds = {};
    appState.execSelectedIds = {};
}

function navigateToExecutions(flowId) {
    resetExecutionViewState();
    appState.activeFlowId = flowId;
    appState.cachedExecutionsFlowId = null;
    appState.cachedExecutions = null;
    window.location.hash = '#/flows/' + flowId + '/executions';
}

function renderExecutionsView(container) {
    const page = document.createElement('section');
    page.className = 'page';
    container.appendChild(page);

    const backLink = document.createElement('button');
    backLink.type = 'button';
    backLink.className = 'back-link';
    backLink.innerHTML = '<span>←</span><span>Back to flows</span>';
    backLink.addEventListener('click', () => navigateTo('flows'));
    page.appendChild(backLink);

    if (appState.currentRole !== 'client') {
        const notice = document.createElement('div');
        notice.className = 'flow-empty';
        notice.innerHTML = '<div class="flow-empty__art">○</div>'
            + '<div class="flow-empty__title">The <em>executions view</em> is from the client perspective.</div>'
            + '<div class="flow-empty__lede">Sign in as <code style="font-family:var(--font-mono);background:var(--bg-subtle);padding:1px 6px;border-radius:4px;font-size:12px;">client</code> to explore.</div>';
        page.appendChild(notice);
        return;
    }

    const flow = flowById(appState.activeFlowId);
    if (!flow) {
        const notice = document.createElement('div');
        notice.className = 'flow-empty';
        notice.innerHTML = '<div class="flow-empty__art">!</div>'
            + '<div class="flow-empty__title">Flow <em>not found</em>.</div>'
            + '<div class="flow-empty__lede">That automation doesn\'t exist or has been removed.</div>';
        page.appendChild(notice);
        return;
    }

    const allExecutions = generateExecutionsForFlow(flow);
    const filtered = filterExecutionList(allExecutions);
    const sorted = sortExecutionList(filtered);
    const totalItems = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / appState.execPageSize));
    if (appState.execPage > totalPages) appState.execPage = totalPages;
    const pageStart = (appState.execPage - 1) * appState.execPageSize;
    const paged = sorted.slice(pageStart, pageStart + appState.execPageSize);

    page.appendChild(buildExecHero(flow));
    page.appendChild(buildExecStats(filtered, flow));
    page.appendChild(buildExecToolbar());

    const bulkBar = buildExecBulkBar();
    if (bulkBar) page.appendChild(bulkBar);

    page.appendChild(buildExecTable(paged, sorted, totalItems));
}

function buildExecHero(flow) {
    const annualSaved = flow.hoursPerWeekSaved * 52 * 38;
    const hero = document.createElement('div');
    hero.className = 'exec-hero';

    const left = document.createElement('div');
    left.className = 'exec-hero__left';
    left.innerHTML = '<div class="exec-hero__title-row">' + statusBadgeHtml(flow.status) + '<span class="exec-hero__title">' + escapeHtml(flow.name) + '</span></div>'
        + '<div class="exec-hero__meta">' + escapeHtml(flow.category) + ' · <strong>' + formatNumber(flow.runsTotal) + '</strong> total runs · <strong>' + formatPercent(flow.successRate) + '</strong> success rate · saves about <strong>' + formatCurrency(annualSaved) + '</strong> / yr</div>';
    hero.appendChild(left);

    const actions = document.createElement('div');
    actions.className = 'exec-hero__actions';
    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'btn btn--ghost btn--sm';
    exportBtn.innerHTML = '↓ Export CSV';
    exportBtn.addEventListener('click', () => showToast('Export is on the roadmap.', 'info'));
    const settingsBtn = document.createElement('button');
    settingsBtn.type = 'button';
    settingsBtn.className = 'btn btn--ghost btn--sm';
    settingsBtn.innerHTML = '⚙ Settings';
    settingsBtn.addEventListener('click', () => openEditFlowModal(flow));
    const runBtn = document.createElement('button');
    runBtn.type = 'button';
    runBtn.className = 'btn btn--primary btn--sm';
    runBtn.innerHTML = '▶ Run now';
    runBtn.addEventListener('click', () => showToast(`Run started for "${flow.name}".`, 'success'));
    actions.appendChild(exportBtn);
    actions.appendChild(settingsBtn);
    actions.appendChild(runBtn);
    hero.appendChild(actions);

    return hero;
}

function buildExecStats(filtered, flow) {
    let successCount = 0, failedCount = 0, runningCount = 0, totalDuration = 0;
    for (const execution of filtered) {
        if (execution.status === 'success') successCount++;
        else if (execution.status === 'failed') failedCount++;
        else if (execution.status === 'running') runningCount++;
        totalDuration += execution.durationSeconds;
    }
    const total = filtered.length;
    const successRate = total > 0 ? (successCount / total) * 100 : 0;
    const perRunMinutes = flow.runsTotal > 0 ? (flow.hoursSavedToDate * 60) / flow.runsTotal : 0;
    const hoursSavedInView = Math.round((total * perRunMinutes) / 60 * 10) / 10;

    const wrap = document.createElement('div');
    wrap.className = 'exec-stats';
    const cells = [
        { label: 'Executions in view', value: formatNumber(total), tone: '' },
        { label: 'Success rate', value: total > 0 ? formatDecimal(successRate, 1) + '%' : '—', tone: 'success' },
        { label: 'Failures', value: failedCount, tone: 'fail' },
        { label: 'Running now', value: runningCount, tone: 'run' },
        { label: 'Hours saved (view)', value: formatDecimal(hoursSavedInView, 1), tone: 'warn' }
    ];
    for (const cell of cells) {
        const div = document.createElement('div');
        div.className = 'exec-stat' + (cell.tone ? ' exec-stat--' + cell.tone : '');
        div.innerHTML = '<div class="exec-stat__label">' + cell.label + '</div><div class="exec-stat__value">' + cell.value + '</div>';
        wrap.appendChild(div);
    }
    return wrap;
}

function buildExecToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'exec-toolbar';

    const searchField = document.createElement('div');
    searchField.className = 'search-field';
    searchField.innerHTML = '<span class="search-field__icon">⌕</span>';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-field__input';
    searchInput.placeholder = 'Search by ID, summary, or trigger…';
    searchInput.value = appState.execSearch;
    searchInput.addEventListener('input', (event) => {
        appState.execSearch = event.target.value;
        appState.execPage = 1;
        const scrollY = window.scrollY;
        renderCurrentRoute();
        window.scrollTo(0, scrollY);
        const refocused = document.querySelector('.exec-toolbar .search-field__input');
        if (refocused) {
            refocused.focus();
            refocused.setSelectionRange(refocused.value.length, refocused.value.length);
        }
    });
    searchField.appendChild(searchInput);
    toolbar.appendChild(searchField);

    const chipRow = document.createElement('div');
    chipRow.className = 'chip-row';
    const statusChips = [
        { value: 'all', label: 'All', dotClass: '' },
        { value: 'success', label: 'Success', dotClass: 'status-dot--running' },
        { value: 'failed', label: 'Failed', dotClass: 'status-dot--error' },
        { value: 'running', label: 'Running', dotClass: '' }
    ];
    for (const chip of statusChips) {
        const btn = document.createElement('button');
        btn.type = 'button';
        if (appState.execStatusFilter === chip.value) btn.classList.add('is-active');
        if (chip.dotClass) btn.innerHTML = '<span class="status-dot ' + chip.dotClass + '"></span>' + chip.label;
        else if (chip.value === 'running') btn.innerHTML = '<span class="badge__dot" style="background-color:var(--accent-indigo)"></span>' + chip.label;
        else btn.textContent = chip.label;
        btn.addEventListener('click', () => {
            appState.execStatusFilter = chip.value;
            appState.execPage = 1;
            renderCurrentRoute();
        });
        chipRow.appendChild(btn);
    }
    toolbar.appendChild(chipRow);

    const dateSelect = document.createElement('select');
    dateSelect.className = 'toolbar-select';
    const dateOptions = [
        { value: 'today', label: 'Today' },
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: 'all', label: 'All time' }
    ];
    for (const option of dateOptions) {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        if (appState.execDateFilter === option.value) opt.selected = true;
        dateSelect.appendChild(opt);
    }
    dateSelect.addEventListener('change', () => {
        appState.execDateFilter = dateSelect.value;
        appState.execPage = 1;
        renderCurrentRoute();
    });
    toolbar.appendChild(dateSelect);

    const triggerSelect = document.createElement('select');
    triggerSelect.className = 'toolbar-select';
    const triggerOptions = [
        { value: 'all', label: 'All triggers' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'manual', label: 'Manual' },
        { value: 'webhook', label: 'Webhook' },
        { value: 'email', label: 'Email listener' },
        { value: 'calendar', label: 'Calendar listener' }
    ];
    for (const option of triggerOptions) {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        if (appState.execTriggerFilter === option.value) opt.selected = true;
        triggerSelect.appendChild(opt);
    }
    triggerSelect.addEventListener('change', () => {
        appState.execTriggerFilter = triggerSelect.value;
        appState.execPage = 1;
        renderCurrentRoute();
    });
    toolbar.appendChild(triggerSelect);

    const spacer = document.createElement('div');
    spacer.className = 'flows-toolbar__spacer';
    toolbar.appendChild(spacer);

    const densityToggle = document.createElement('div');
    densityToggle.className = 'view-toggle';
    const comfortBtn = document.createElement('button');
    comfortBtn.type = 'button';
    comfortBtn.textContent = '☰';
    comfortBtn.setAttribute('aria-label', 'Comfortable');
    comfortBtn.setAttribute('title', 'Comfortable density');
    if (appState.execDensity === 'comfortable') comfortBtn.classList.add('is-active');
    comfortBtn.addEventListener('click', () => { appState.execDensity = 'comfortable'; renderCurrentRoute(); });
    const compactBtn = document.createElement('button');
    compactBtn.type = 'button';
    compactBtn.textContent = '≡';
    compactBtn.setAttribute('aria-label', 'Compact');
    compactBtn.setAttribute('title', 'Compact density');
    if (appState.execDensity === 'compact') compactBtn.classList.add('is-active');
    compactBtn.addEventListener('click', () => { appState.execDensity = 'compact'; renderCurrentRoute(); });
    densityToggle.appendChild(comfortBtn);
    densityToggle.appendChild(compactBtn);
    toolbar.appendChild(densityToggle);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn--ghost btn--sm';
    resetBtn.innerHTML = '↻ Reset';
    resetBtn.addEventListener('click', () => {
        resetExecutionViewState();
        renderCurrentRoute();
        showToast('Filters reset.', 'info');
    });
    toolbar.appendChild(resetBtn);

    return toolbar;
}

function buildExecBulkBar() {
    const selectedCount = Object.keys(appState.execSelectedIds).length;
    if (selectedCount === 0) return null;

    const bar = document.createElement('div');
    bar.className = 'bulk-bar';
    bar.innerHTML = '<span class="bulk-bar__count">' + selectedCount + ' selected</span>';

    const rerunBtn = document.createElement('button');
    rerunBtn.type = 'button';
    rerunBtn.className = 'btn btn--sm';
    rerunBtn.innerHTML = '↻ Re-run selected';
    rerunBtn.addEventListener('click', () => {
        showToast('Re-running ' + selectedCount + ' executions.', 'success');
        appState.execSelectedIds = {};
        renderCurrentRoute();
    });

    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'btn btn--sm';
    exportBtn.innerHTML = '↓ Export CSV';
    exportBtn.addEventListener('click', () => showToast('Exporting ' + selectedCount + ' executions to CSV.', 'info'));

    const markBtn = document.createElement('button');
    markBtn.type = 'button';
    markBtn.className = 'btn btn--sm';
    markBtn.innerHTML = '✓ Mark reviewed';
    markBtn.addEventListener('click', () => {
        showToast(selectedCount + ' executions marked as reviewed.', 'success');
        appState.execSelectedIds = {};
        renderCurrentRoute();
    });

    const spacer = document.createElement('div');
    spacer.className = 'bulk-bar__spacer';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn--sm btn--clear';
    clearBtn.textContent = 'Clear selection';
    clearBtn.addEventListener('click', () => {
        appState.execSelectedIds = {};
        renderCurrentRoute();
    });

    bar.appendChild(rerunBtn);
    bar.appendChild(exportBtn);
    bar.appendChild(markBtn);
    bar.appendChild(spacer);
    bar.appendChild(clearBtn);

    return bar;
}

function sortIndicatorHtml(columnKey) {
    if (appState.execSortKey !== columnKey) return '<span class="sort-indicator">↕</span>';
    return '<span class="sort-indicator">' + (appState.execSortDirection === 'asc' ? '↑' : '↓') + '</span>';
}

function buildSortableHeader(columnKey, label, extraClass) {
    const th = document.createElement('th');
    th.className = 'sortable' + (appState.execSortKey === columnKey ? ' sorted' : '') + (extraClass ? ' ' + extraClass : '');
    th.innerHTML = label + ' ' + sortIndicatorHtml(columnKey);
    th.addEventListener('click', () => {
        if (appState.execSortKey === columnKey) {
            appState.execSortDirection = appState.execSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            appState.execSortKey = columnKey;
            appState.execSortDirection = columnKey === 'started' ? 'desc' : 'asc';
        }
        renderCurrentRoute();
    });
    return th;
}

function buildExecTable(pagedExecutions, sortedAll, totalItems) {
    const card = document.createElement('div');
    card.className = 'exec-table-card';

    const scroll = document.createElement('div');
    scroll.className = 'exec-table-scroll';

    const table = document.createElement('table');
    table.className = 'exec-table' + (appState.execDensity === 'compact' ? ' is-compact' : '');

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    const checkTh = document.createElement('th');
    checkTh.className = 'exec-table__check-cell';
    const headCheckbox = document.createElement('input');
    headCheckbox.type = 'checkbox';
    const allOnPageSelected = pagedExecutions.length > 0 && pagedExecutions.every(execution => appState.execSelectedIds[execution.id]);
    headCheckbox.checked = allOnPageSelected;
    headCheckbox.addEventListener('change', () => {
        if (headCheckbox.checked) {
            for (const execution of pagedExecutions) appState.execSelectedIds[execution.id] = true;
        } else {
            for (const execution of pagedExecutions) delete appState.execSelectedIds[execution.id];
        }
        renderCurrentRoute();
    });
    checkTh.appendChild(headCheckbox);
    headRow.appendChild(checkTh);

    const expandTh = document.createElement('th');
    expandTh.className = 'exec-table__expand-cell';
    headRow.appendChild(expandTh);

    headRow.appendChild(buildSortableHeader('status', 'Status'));
    headRow.appendChild(buildSortableHeader('started', 'Started'));
    const summaryTh = document.createElement('th');
    summaryTh.textContent = 'Summary';
    headRow.appendChild(summaryTh);
    headRow.appendChild(buildSortableHeader('trigger', 'Trigger'));
    headRow.appendChild(buildSortableHeader('items', 'Items', 'exec-table__num'));
    headRow.appendChild(buildSortableHeader('duration', 'Duration'));
    const idTh = document.createElement('th');
    idTh.textContent = 'Execution ID';
    headRow.appendChild(idTh);
    headRow.appendChild(document.createElement('th'));

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const maxDuration = Math.max(1, sortedAll.reduce((max, execution) => Math.max(max, execution.durationSeconds), 1));

    if (pagedExecutions.length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 10;
        emptyCell.style.padding = '0';
        emptyCell.innerHTML = '<div class="exec-empty"><div class="exec-empty__icon">⌕</div><div class="exec-empty__title">No executions match your filters</div><div class="exec-empty__text">"Try clearing the search or switching the status chip back to All."</div></div>';
        emptyRow.appendChild(emptyCell);
        tbody.appendChild(emptyRow);
    } else {
        for (const execution of pagedExecutions) {
            const row = buildExecRow(execution, maxDuration);
            tbody.appendChild(row.main);
            if (row.expand) tbody.appendChild(row.expand);
        }
    }

    table.appendChild(tbody);
    scroll.appendChild(table);
    card.appendChild(scroll);
    card.appendChild(buildPagination(totalItems));

    return card;
}

function buildExecRow(execution, maxDuration) {
    const isExpanded = !!appState.execExpandedIds[execution.id];
    const isSelected = !!appState.execSelectedIds[execution.id];

    const row = document.createElement('tr');
    if (isExpanded) row.classList.add('is-expanded');
    if (isSelected) row.classList.add('is-selected');

    const checkCell = document.createElement('td');
    checkCell.className = 'exec-table__check-cell';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isSelected;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) appState.execSelectedIds[execution.id] = true;
        else delete appState.execSelectedIds[execution.id];
        renderCurrentRoute();
    });
    checkCell.appendChild(checkbox);
    row.appendChild(checkCell);

    const expandCell = document.createElement('td');
    expandCell.className = 'exec-table__expand-cell';
    const expandBtn = document.createElement('button');
    expandBtn.type = 'button';
    expandBtn.className = 'exec-table__expand-btn';
    expandBtn.textContent = '›';
    expandBtn.setAttribute('aria-label', 'Expand');
    expandBtn.addEventListener('click', () => {
        if (appState.execExpandedIds[execution.id]) delete appState.execExpandedIds[execution.id];
        else appState.execExpandedIds[execution.id] = true;
        renderCurrentRoute();
    });
    expandCell.appendChild(expandBtn);
    row.appendChild(expandCell);

    const statusCell = document.createElement('td');
    statusCell.innerHTML = executionStatusBadgeHtml(execution.status);
    row.appendChild(statusCell);

    const startedCell = document.createElement('td');
    startedCell.innerHTML = formatDateTime(execution.minutesAgo) + '<div style="font-size:11.5px;color:var(--text-tertiary);margin-top:2px;font-style:italic;font-family:var(--font-serif);">' + relativeTime(execution.minutesAgo) + '</div>';
    row.appendChild(startedCell);

    const summaryCell = document.createElement('td');
    summaryCell.className = 'exec-table__summary-cell';
    summaryCell.title = execution.summary;
    summaryCell.textContent = execution.summary;
    row.appendChild(summaryCell);

    const triggerCell = document.createElement('td');
    triggerCell.innerHTML = '<span class="badge"><span>' + execution.trigger + '</span></span>';
    row.appendChild(triggerCell);

    const itemsCell = document.createElement('td');
    itemsCell.className = 'exec-table__num';
    itemsCell.textContent = execution.itemsProcessed;
    row.appendChild(itemsCell);

    const durationCell = document.createElement('td');
    if (execution.status === 'running') {
        durationCell.innerHTML = '<span class="badge badge--indigo"><span class="badge__dot"></span><span>Running</span></span>';
    } else {
        const widthPercent = Math.min(100, Math.round((execution.durationSeconds / maxDuration) * 100));
        durationCell.innerHTML = '<div class="duration-bar"><div class="duration-bar__track"><div class="duration-bar__fill" style="width:' + widthPercent + '%"></div></div><div class="duration-bar__value">' + formatDurationSeconds(execution.durationSeconds) + '</div></div>';
    }
    row.appendChild(durationCell);

    const idCell = document.createElement('td');
    idCell.className = 'exec-table__id-cell';
    idCell.textContent = execution.id;
    row.appendChild(idCell);

    const actionsCell = document.createElement('td');
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'exec-table__row-actions';
    actionsWrap.appendChild(makeIconBtn('↻', 'Re-run', () => showToast('Re-running execution — a new entry will appear shortly.', 'success')));
    actionsWrap.appendChild(makeIconBtn('⧉', 'Copy ID', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(execution.id);
        showToast('Execution ID copied to clipboard.', 'success');
    }));
    actionsCell.appendChild(actionsWrap);
    row.appendChild(actionsCell);

    if (!isExpanded) return { main: row, expand: null };

    const expandRow = document.createElement('tr');
    expandRow.className = 'exec-expand-row';
    const expandTd = document.createElement('td');
    expandTd.colSpan = 10;
    expandTd.appendChild(buildExecExpandContent(execution));
    expandRow.appendChild(expandTd);

    return { main: row, expand: expandRow };
}

function buildExecExpandContent(execution) {
    const wrap = document.createElement('div');
    wrap.className = 'exec-expand';

    const timelineCol = document.createElement('div');
    timelineCol.innerHTML = '<div class="exec-expand__heading">Timeline</div>';
    const timeline = document.createElement('div');
    timeline.className = 'exec-timeline';
    for (const step of execution.steps) {
        const stepEl = document.createElement('div');
        stepEl.className = 'exec-step' + (step.status === 'failed' ? ' exec-step--fail' : step.status === 'running' ? ' exec-step--running' : '');
        stepEl.innerHTML = '<div class="exec-step__title">' + escapeHtml(step.name) + '</div><div class="exec-step__meta">' + (step.status === 'running' ? 'in progress' : formatDurationSeconds(step.durationSeconds)) + '</div>';
        timeline.appendChild(stepEl);
    }
    timelineCol.appendChild(timeline);
    wrap.appendChild(timelineCol);

    const detailCol = document.createElement('div');
    if (execution.errorMessage) {
        detailCol.innerHTML = '<div class="exec-expand__heading">Error</div>'
            + '<div class="exec-detail-block exec-detail-block--error">' + escapeHtml(execution.errorMessage) + '</div>'
            + '<div class="exec-detail-meta">'
            + '<div class="exec-detail-meta__cell"><div class="exec-detail-meta__label">Execution ID</div><div class="exec-detail-meta__value">' + execution.id + '</div></div>'
            + '<div class="exec-detail-meta__cell"><div class="exec-detail-meta__label">Triggered by</div><div class="exec-detail-meta__value">' + escapeHtml(execution.triggeredBy) + '</div></div>'
            + '</div>';
    } else {
        const outputText = execution.summary + '\n\nItems processed: ' + execution.itemsProcessed + '\nTotal duration: ' + formatDurationSeconds(execution.durationSeconds);
        detailCol.innerHTML = '<div class="exec-expand__heading">Output summary</div>'
            + '<div class="exec-detail-block">' + escapeHtml(outputText) + '</div>'
            + '<div class="exec-detail-meta">'
            + '<div class="exec-detail-meta__cell"><div class="exec-detail-meta__label">Execution ID</div><div class="exec-detail-meta__value">' + execution.id + '</div></div>'
            + '<div class="exec-detail-meta__cell"><div class="exec-detail-meta__label">Triggered by</div><div class="exec-detail-meta__value">' + escapeHtml(execution.triggeredBy) + '</div></div>'
            + '</div>';
    }

    const actions = document.createElement('div');
    actions.className = 'exec-expand__actions';
    const rerunBtn = document.createElement('button');
    rerunBtn.type = 'button';
    rerunBtn.className = 'btn btn--secondary btn--sm';
    rerunBtn.innerHTML = '↻ Re-run';
    rerunBtn.addEventListener('click', () => showToast('Re-running execution — a new entry will appear shortly.', 'success'));
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn--ghost btn--sm';
    copyBtn.innerHTML = '⧉ Copy ID';
    copyBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(execution.id);
        showToast('Execution ID copied to clipboard.', 'success');
    });
    actions.appendChild(rerunBtn);
    actions.appendChild(copyBtn);
    if (execution.errorMessage) {
        const supportBtn = document.createElement('button');
        supportBtn.type = 'button';
        supportBtn.className = 'btn btn--ghost btn--sm';
        supportBtn.innerHTML = '? Contact support';
        supportBtn.addEventListener('click', () => showToast('Support flow is on the roadmap.', 'info'));
        actions.appendChild(supportBtn);
    }
    detailCol.appendChild(actions);
    wrap.appendChild(detailCol);

    return wrap;
}

function buildPagination(totalItems) {
    const pageSize = appState.execPageSize;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(appState.execPage, totalPages);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(totalItems, currentPage * pageSize);

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    const info = document.createElement('div');
    info.className = 'pagination__info';
    const infoText = document.createElement('span');
    infoText.innerHTML = 'Showing <strong>' + startItem + '–' + endItem + '</strong> of <strong>' + formatNumber(totalItems) + '</strong> executions';
    info.appendChild(infoText);

    const sizeSelect = document.createElement('select');
    sizeSelect.className = 'page-size-select';
    for (const size of [10, 25, 50, 100]) {
        const opt = document.createElement('option');
        opt.value = size;
        opt.textContent = size + ' per page';
        if (pageSize === size) opt.selected = true;
        sizeSelect.appendChild(opt);
    }
    sizeSelect.addEventListener('change', () => {
        appState.execPageSize = parseInt(sizeSelect.value, 10);
        appState.execPage = 1;
        renderCurrentRoute();
    });
    info.appendChild(sizeSelect);
    pagination.appendChild(info);

    const controls = document.createElement('div');
    controls.className = 'pagination__controls';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.textContent = '←';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) { appState.execPage = currentPage - 1; renderCurrentRoute(); }
    });
    controls.appendChild(prevBtn);

    const pagesToShow = [];
    const pushPage = (pageNumber) => {
        if (pagesToShow.indexOf(pageNumber) === -1 && pageNumber >= 1 && pageNumber <= totalPages) pagesToShow.push(pageNumber);
    };
    pushPage(1);
    pushPage(2);
    pushPage(currentPage - 1);
    pushPage(currentPage);
    pushPage(currentPage + 1);
    pushPage(totalPages - 1);
    pushPage(totalPages);
    pagesToShow.sort((alpha, beta) => alpha - beta);

    let lastRendered = 0;
    for (const pageNumber of pagesToShow) {
        if (pageNumber - lastRendered > 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'ellipsis';
            ellipsis.textContent = '…';
            controls.appendChild(ellipsis);
        }
        const pageBtn = document.createElement('button');
        pageBtn.type = 'button';
        if (pageNumber === currentPage) pageBtn.classList.add('is-active');
        pageBtn.textContent = pageNumber;
        pageBtn.addEventListener('click', () => { appState.execPage = pageNumber; renderCurrentRoute(); });
        controls.appendChild(pageBtn);
        lastRendered = pageNumber;
    }

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.textContent = '→';
    nextBtn.disabled = currentPage >= totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) { appState.execPage = currentPage + 1; renderCurrentRoute(); }
    });
    controls.appendChild(nextBtn);

    pagination.appendChild(controls);
    return pagination;
}


const PUBLIC_ROUTES = ['home', 'login'];

const routeRegistry = {
    home: { render: renderHomeView, requiresAuth: false, showHeader: true },
    login: { render: renderLoginView, requiresAuth: false, showHeader: true },
    dashboard: { render: renderDashboardView, requiresAuth: true, showHeader: true },
    report: { render: renderCostSavingsReportView, requiresAuth: true, showHeader: true },
    flows: { render: renderFlowsView, requiresAuth: true, showHeader: true },
    executions: { render: renderExecutionsView, requiresAuth: true, showHeader: true }
};

function navigateTo(routeName) {
    window.location.hash = '#/' + routeName;
}

function parseHash() {
    const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (!raw) return { name: null, param: null, subParam: null };
    const parts = raw.split('/');
    return { name: parts[0] || null, param: parts[1] || null, subParam: parts[2] || null };
}

function getCurrentRouteName() {
    const parsed = parseHash();
    if (parsed.name === 'flows' && parsed.param && parsed.subParam === 'executions') {
        appState.activeFlowId = parsed.param;
        return 'executions';
    }
    if (parsed.name && routeRegistry[parsed.name]) return parsed.name;
    return null;
}

function initializeRouter() {
    window.addEventListener('hashchange', () => {
        closeModal();
        renderCurrentRoute();
    });
    renderCurrentRoute();
}

function renderCurrentRoute() {
    const requestedRoute = getCurrentRouteName();
    const fallbackRoute = appState.currentRole ? 'dashboard' : 'home';
    const targetRoute = requestedRoute || fallbackRoute;
    const routeConfig = routeRegistry[targetRoute];

    if (routeConfig.requiresAuth && !isAuthenticated(appState.currentRole)) {
        navigateTo('login');
        return;
    }

    if (PUBLIC_ROUTES.includes(targetRoute) && appState.currentRole && targetRoute !== 'home') {
        navigateTo('dashboard');
        return;
    }

    appState.currentRoute = targetRoute;

    const appRoot = document.getElementById('appRoot');
    appRoot.innerHTML = '';

    if (routeConfig.showHeader) {
        appRoot.appendChild(renderAppHeader(targetRoute));
    }

    const viewContainer = document.createElement('main');
    viewContainer.className = 'app-view';
    appRoot.appendChild(viewContainer);

    routeConfig.render(viewContainer);
}


restoreSession();
initializeRouter();