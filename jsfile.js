document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        home: document.getElementById('homeSection'),
        newyear: document.getElementById('newyearSection'),
        monthly: document.getElementById('monthlySection'),
        crush: document.getElementById('crushSection'),
        analysis: document.getElementById('analysisSection'),
        result: document.getElementById('resultArea'),
        legal: document.getElementById('legalSection')
    };

    const legalContent = document.getElementById('legalContent');
    let currentSelectedService = '';

    // --- Hero Slider ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    if(slides.length) setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);

    // --- Navigation Logic ---
    function hideAll() {
        Object.values(sections).forEach(s => { if(s) s.style.display = 'none'; });
        document.querySelectorAll('.menu-desktop a').forEach(a => a.classList.remove('active'));
    }

    function showHome() { hideAll(); sections.home.style.display = 'block'; document.querySelector('.nav-home').classList.add('active'); window.scrollTo(0,0); }
    function showNewYear() { hideAll(); sections.newyear.style.display = 'block'; document.querySelector('.nav-newyear').classList.add('active'); window.scrollTo(0,0); }
    function showMonthly() { hideAll(); sections.monthly.style.display = 'block'; document.querySelector('.nav-monthly').classList.add('active'); window.scrollTo(0,0); }
    function showCrush() { hideAll(); sections.crush.style.display = 'block'; document.querySelector('.nav-crush').classList.add('active'); window.scrollTo(0,0); }

    function showLegal(type) {
        hideAll();
        sections.legal.style.display = 'block';
        let html = '';
        switch(type) {
            case 'privacy':
                html = `<h1>개인정보처리방침</h1><p>본 사이트는 서비스 제공을 위해 최소한의 개인정보를 수집합니다.\n\n■ 수집 항목\n- 생년월일\n- 성별\n- 이메일(선택)\n\n■ 이용 목적\n- 사주 분석 서비스 제공\n- 고객 문의 대응\n\n■ 보관 기간\n수집된 정보는 서비스 제공 목적 달성 후 즉시 파기됩니다.\n\n■ 제3자 제공\n본 사이트는 이용자의 개인정보를 외부에 제공하지 않습니다.\n\n■ 문의\n문의: your@email.com</p>`;
                break;
            case 'terms':
                html = `<h1>이용약관</h1><p>본 서비스는 참고용 사주 분석 콘텐츠를 제공합니다.\n\n이용자는 본 서비스를 개인적 참고 목적으로만 사용할 수 있으며,\n서비스 결과에 대한 최종 판단과 책임은 이용자 본인에게 있습니다.\n\n서비스는 예고 없이 변경되거나 중단될 수 있습니다.</p>`;
                break;
            case 'refund':
                html = `<h1>환불 규정</h1><p>디지털 콘텐츠 특성상 분석 결과 제공 이후에는 환불이 어렵습니다.\n\n다만 시스템 오류 등 서비스 제공이 정상적으로 이루어지지 않은 경우,\n결제 후 24시간 이내 문의 시 환불이 가능합니다.\n\n문의: your@email.com</p>`;
                break;
            case 'disclaimer':
                html = `<h1>면책문구</h1><p>본 사이트에서 제공하는 모든 사주 분석 콘텐츠는 참고용입니다.\n\n의학적, 법적, 재정적 조언을 대체하지 않으며,\n서비스 결과에 따른 모든 선택과 책임은 이용자 본인에게 있습니다.\n\n본 서비스는 미래를 보장하지 않습니다.</p>`;
                break;
        }
        legalContent.innerHTML = html;
        window.scrollTo(0,0);
    }

    // --- Listeners ---
    document.getElementById('homeLogo').addEventListener('click', showHome);
    document.querySelector('.nav-home').addEventListener('click', showHome);
    document.querySelector('.nav-newyear').addEventListener('click', showNewYear);
    document.querySelector('.nav-monthly').addEventListener('click', showMonthly);
    document.querySelector('.nav-crush').addEventListener('click', showCrush);

    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); showLegal(link.dataset.type); });
    });
    document.querySelector('.btn-back-legal').addEventListener('click', showHome);

    document.querySelectorAll('.saju-trigger').forEach(card => {
        card.addEventListener('click', (e) => {
            currentSelectedService = e.currentTarget.dataset.service;
            hideAll();
            sections.analysis.style.display = 'grid';
            window.scrollTo(0,0);
        });
    });

    document.getElementById('btnBack').addEventListener('click', showHome);

    // --- Selectors Init ---
    const yearSelect = document.getElementById('birthYear');
    if(yearSelect) {
        for (let y = 2024; y >= 1930; y--) {
            const o = document.createElement('option'); o.value = y; o.textContent = `${y}년`; yearSelect.appendChild(o);
        }
        yearSelect.value = "1990";
        const mS = document.getElementById('birthMonth'), dS = document.getElementById('birthDay');
        for (let m = 1; m <= 12; m++) { const o = document.createElement('option'); o.value = m; o.textContent = `${m}월`; mS.appendChild(o); }
        for (let d = 1; d <= 31; d++) { const o = document.createElement('option'); o.value = d; o.textContent = `${d}일`; dS.appendChild(o); }
    }

    // --- Theme ---
    document.getElementById('themeToggle').addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });

    // --- Analysis ---
    const sajuForm = document.getElementById('sajuForm');
    if(sajuForm) sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loading = document.getElementById('loading');
        loading.style.display = 'block';
        sections.result.style.display = 'none';
        setTimeout(() => {
            loading.style.display = 'none';
            sections.result.style.display = 'block';
            sections.result.innerHTML = `<h3>분석 결과</h3><p>당신의 운세 기운이 매우 맑습니다. 상세한 내용은 전문가 상담을 추천드립니다.</p>`;
            sections.result.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});