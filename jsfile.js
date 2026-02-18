document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('homeSection');
    const analysisSection = document.getElementById('analysisSection');
    const resultArea = document.getElementById('resultArea');
    const sajuTriggers = document.querySelectorAll('.saju-trigger');
    const btnBack = document.getElementById('btnBack');
    const homeLogo = document.getElementById('homeLogo');

    // --- Navigation Logic ---
    function showHome() {
        homeSection.style.display = 'block';
        analysisSection.style.display = 'none';
        resultArea.style.display = 'none';
        window.scrollTo(0, 0);
    }

    function showAnalysis() {
        homeSection.style.display = 'none';
        analysisSection.style.display = 'grid';
        window.scrollTo(0, 0);
    }

    sajuTriggers.forEach(card => card.addEventListener('click', showAnalysis));
    btnBack.addEventListener('click', showHome);
    homeLogo.addEventListener('click', showHome);
    document.querySelector('.nav-home').addEventListener('click', showHome);
    document.querySelector('.nav-newyear').addEventListener('click', showHome);

    // --- Date Selectors Init ---
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');

    for (let y = 2024; y >= 1930; y--) {
        const o = document.createElement('option'); o.value = y; o.textContent = `${y}년`; yearSelect.appendChild(o);
    }
    yearSelect.value = "1990";
    for (let m = 1; m <= 12; m++) {
        const o = document.createElement('option'); o.value = m; o.textContent = `${m.toString().padStart(2, '0')}월`; monthSelect.appendChild(o);
    }
    for (let d = 1; d <= 31; d++) {
        const o = document.createElement('option'); o.value = d; o.textContent = `${d.toString().padStart(2, '0')}일`; daySelect.appendChild(o);
    }

    // --- Theme Handling ---
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });

    // --- Saju Analysis ---
    const sajuForm = document.getElementById('sajuForm');
    const loading = document.getElementById('loading');

    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loading.style.display = 'block';
        resultArea.style.display = 'none';

        setTimeout(() => {
            loading.style.display = 'none';
            resultArea.style.display = 'block';
            resultArea.innerHTML = `
                <div style="border-bottom:2px solid #503396; padding-bottom:1rem; margin-bottom:2rem;">
                    <h3>심층 분석 결과</h3>
                </div>
                <div class="result-section">
                    <h4>🌟 2026년 신년운세 총평</h4>
                    <p>당신의 2026년은 '변화'와 '도약'의 해입니다. 상반기에는 다소 정체되는 기운이 있으나, 하반기로 갈수록 금(金)의 기운이 강해지며 그동안 노력했던 결실이 맺히기 시작합니다. 특히 문서운이 좋으니 자격증 취득이나 계약 관련 업무에서 큰 이득을 얻을 수 있습니다.</p>
                </div>
                <div class="result-section" style="margin-top:2rem">
                    <h4>💰 재물 및 직업운</h4>
                    <p>재물운은 안정적인 흐름을 보입니다. 큰 횡재수보다는 꾸준한 수입이 늘어나는 형상이며, 직장 내에서는 승진이나 중요한 프로젝트를 맡게 될 가능성이 높습니다. 주변 동료와의 협력을 통해 더 큰 성취를 이룰 수 있으니 인맥 관리에 힘쓰십시오.</p>
                </div>
            `;
            resultArea.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});