const STORAGE_KEY_REMEMBER = 'autoSecretary.rememberedSession';
const STORAGE_KEY_SESSION = 'autoSecretary.session';

const appState = {
    currentRole: null,
    currentRoute: null,
    currentReportRange: '30d'
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
        { label: 'Flows', route: null, toastMessage: 'Flows view is on the roadmap.' },
        { label: 'Settings', route: null, toastMessage: 'Settings view is on the roadmap.' }
    ];

    for (const item of items) {
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'app-header__nav-link';
        if (item.route === currentRoute) link.classList.add('is-active');
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
        { title: 'Pause all flows', desc: 'Stop everything for the day.' },
        { title: 'Run a flow now', desc: 'Trigger any flow on demand.' },
        { title: 'Add a new flow', desc: 'Tell me about a new task.' },
        { title: 'Export this month', desc: 'Download as CSV or PDF.' }
    ];

    for (const action of actions) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quick-action';
        btn.innerHTML = '<span class="quick-action__title">' + action.title + '</span><span class="quick-action__desc">' + action.desc + '</span>';
        btn.addEventListener('click', () => showToast(action.title + ' is on the roadmap.', 'info'));
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


const PUBLIC_ROUTES = ['home', 'login'];

const routeRegistry = {
    home: { render: renderHomeView, requiresAuth: false, showHeader: true },
    login: { render: renderLoginView, requiresAuth: false, showHeader: true },
    dashboard: { render: renderDashboardView, requiresAuth: true, showHeader: true },
    report: { render: renderCostSavingsReportView, requiresAuth: true, showHeader: true }
};

function navigateTo(routeName) {
    window.location.hash = '#/' + routeName;
}

function getCurrentRouteName() {
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (hash && routeRegistry[hash]) return hash;
    return null;
}

function initializeRouter() {
    window.addEventListener('hashchange', renderCurrentRoute);
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

    window.scrollTo({ top: 0, behavior: 'instant' });
}


restoreSession();
initializeRouter();