/*================================================================
  Общие функции сайта tatianinden.ru
  Требования:
  – управление баннером cookie‑согласия (152‑ФЗ);
  – загрузка аналитики только после согласия;
  – открытие/закрытие модальных окон (форма, политика ПД);
  – отправка данных в Telegram / Max через copy‑to‑clipboard;
  – отправка событий в аналитические системы;
================================================================*/

// ---------- COOKIE CONSENT ----------
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    setTimeout(() => banner.classList.add('show'), 900);
}
function setCookieChoice(choice) {
    try {
        localStorage.setItem('cookieChoice', choice);
        localStorage.setItem('cookieChoiceDate', new Date().toISOString());
    } catch (e) { /* ignore */ }
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.style.display = 'none', 700);
    }
    if (choice === 'accepted') {
        // 152‑ФЗ  — указываем согласие в атрибуте
        document.documentElement.setAttribute('data-cookie-consent', 'accepted');
        loadAnalytics(); // загрузка после согласия
    } else {
        document.documentElement.setAttribute('data-cookie-consent', 'rejected');
    }
}
function acceptCookies() { setCookieChoice('accepted'); }
function rejectCookies() { setCookieChoice('rejected'); }

// ---------- ANALYTICS ----------
const YM_COUNTER_ID = 109457377;       // замените на ваш ID
const GA4_ID       = 'G-31FPXBHXEV'; // замените на ваш ID
const GTM_ID       = 'GTM-NG4GMMWB';// замените на ваш ID
const CLARITY_ID   = null;           // при необходимости

function loadYandexMetrika() {
    if (!YM_COUNTER_ID) return;
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0];
        k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(YM_COUNTER_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer"
    });
}
function loadGoogleAnalytics() {
    if (!GA4_ID) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });
}
function loadMicrosoftClarity() {
    if (!CLARITY_ID) return;
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
}
function loadGTM() {
    if (!GTM_ID || window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(s);
}
function loadAnalytics() {
    loadYandexMetrika();
    loadGoogleAnalytics();
    loadMicrosoftClarity();
    loadGTM();
}

// ---------- MODALS ----------
function openModal(topic) {
    const titles = {
        intensiv: {eyebrow: 'Летний интенсив', title: 'Записаться на интенсив', sub: 'Заполните форму – мы свяжемся в Telegram/Max.'},
        trial:    {eyebrow: 'Пробное занятие', title: 'Первое занятие — бесплатно', sub: 'Заполните форму – предложим удобное время.'},
        online:   {eyebrow: 'Онлайн‑запись', title: 'Умный фитнес онлайн', sub: 'Заполните форму – будем вести занятия в Zoom/Teams.'},
        default: {eyebrow: 'Запись на первый урок', title: 'Танцуй ярко. Сияй на сцене.', sub: 'Заполните форму – мы свяжемся в Telegram/Max.'}
    };
    const t = titles[topic] || titles.default;
    document.getElementById('modalEyebrow').textContent = t.eyebrow;
    document.getElementById('modalTitle').innerHTML = t.title;
    document.getElementById('modalSubtitle').innerHTML = t.sub;
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
}
function openPrivacy() {
    document.getElementById('privacyModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closePrivacy() {
    document.getElementById('privacyModal').classList.remove('open');
    document.body.style.overflow = '';
}
function openCookieInfo() {
    document.getElementById('cookieInfoModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCookieInfo() {
    document.getElementById('cookieInfoModal').classList.remove('open');
    document.body.style.overflow = '';
}

// ---------- FORM SUBMISSION ----------
function submitForm(e, target) {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.getElementById('signupForm');
    if (!form.checkValidity()) { form.reportValidity(); return false; }

    // проверка согласия (обязательно)
    const consent = document.getElementById('consentCheckbox');
    if (consent && !consent.checked) {
        alert('Поставьте галочку согласия на обработку персональных данных.');
        return false;
    }

    const fd = new FormData(form);
    const name  = (fd.get('name')  || '').trim();
    const phone = (fd.get('phone') || '').trim();
    const age   = (fd.get('age')   || '').trim();

    const message =
        `Здравствуйте! Хочу записать ребёнка на пробный урок в детский театр танца «Татьянин День».\n\n` +
        `Имя родителя: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Возраст ребёнка: ${age} лет`;

    // копируем в буфер обмена (fallback – без ошибок)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).catch(() => {});
    }

    // открываем нужный мессенджер
    if (target === 'max') {
        alert('Сообщение скопировано в буфер обмена. Вставьте его в Max.');
        reachGoal('form_submit_max', {age});
        window.open('https://max.ru/u/f9LHodD0cOICny7_4ueVCXgFmHiWYBfMGbfaAM8uDY3EgFRawpyVXuzBn3Y', '_blank', 'noopener');
    } else {
        alert('Сообщение скопировано в буфер обмена. Вставьте его в Telegram.');
        reachGoal('trial_form_submit', {age});
        reachGoal('form_submit', {age});
        window.open('https://t.me/+79636719983', '_blank', 'noopener');
    }
    return false;
}

// ---------- REACH GOAL ----------
function reachGoal(goalId, params) {
    try {
        if (typeof ym === 'function' && YM_COUNTER_ID) ym(YM_COUNTER_ID, 'reachGoal', goalId, params || {});
        if (typeof gtag === 'function') gtag('event', goalId, params || {});
        if (window.dataLayer) window.dataLayer.push({event: goalId, params: params || {}});
    } catch (e) { /* analytics may not be loaded yet */ }
}

// ---------- SCROLL DEPTH ----------
(function () {
    const depths = [25, 50, 75, 90];
    const fired = {};
    window.addEventListener('scroll', () => {
        const scrolled = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        depths.forEach(d => {
            if (!fired[d] && scrolled >= d) {
                fired[d] = true;
                reachGoal(`scroll_depth_${d}`);
            }
        });
    }, {passive: true});
})();

// ---------- TIME ON PAGE ----------
(function () {
    const checkpoints = {30: false, 90: false};
    const start = Date.now();
    setInterval(() => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        if (!checkpoints[30] && elapsed >= 30) { checkpoints[30] = true; reachGoal('time_on_page_30s'); }
        if (!checkpoints[90] && elapsed >= 90) { checkpoints[90] = true; reachGoal('time_on_page_90s'); }
    }, 5000);
})();

// ---------- DELEGATED CLICK FOR GOALS ----------
document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-goal]');
    if (el) reachGoal(el.dataset.goal);
}, {passive: true});

// ---------- GLOBAL INIT ----------
document.addEventListener('DOMContentLoaded', () => {
    // проверяем, есть ли уже выбор в localStorage
    const stored = localStorage.getItem('cookieChoice');
    if (stored === 'accepted') {
        document.documentElement.setAttribute('data-cookie-consent', 'accepted');
        loadAnalytics();
    } else if (stored === 'rejected') {
        document.documentElement.setAttribute('data-cookie-consent', 'rejected');
    } else {
        showCookieBanner();
    }

    // включаем/выключаем кнопку отправки формы в зависимости от чек‑бокса согласия
    const consentBox = document.getElementById('consentCheckbox');
    const sendBtn = document.getElementById('submitBtn');
    const sendBtnMax = document.getElementById('submitBtnMax');
    const toggle = () => {
        const enabled = consentBox && consentBox.checked;
        if (sendBtn) sendBtn.disabled = !enabled;
        if (sendBtnMax) sendBtnMax.disabled = !enabled;
    };
    if (consentBox) consentBox.addEventListener('change', toggle);
    toggle();
});
