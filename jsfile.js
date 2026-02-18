document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('homeSection');
    const monthlySection = document.getElementById('monthlySection');
    const analysisSection = document.getElementById('analysisSection');
    const resultArea = document.getElementById('resultArea');
    const sajuTriggers = document.querySelectorAll('.saju-trigger');
    const btnBack = document.getElementById('btnBack');
    const homeLogo = document.getElementById('homeLogo');
    const serviceTitleDisplay = document.querySelector('.service-title');

    const navHome = document.querySelector('.nav-home');
    const navNewYear = document.querySelector('.nav-newyear');
    const navMonthly = document.querySelector('.nav-monthly');

    let currentSelectedService = '';

    // --- Navigation Logic ---
    function hideAll() {
        homeSection.style.display = 'none';
        monthlySection.style.display = 'none';
        analysisSection.style.display = 'none';
        resultArea.style.display = 'none';
        [navHome, navNewYear, navMonthly].forEach(el => el.classList.remove('active'));
    }

    function showHome() {
        hideAll();
        homeSection.style.display = 'block';
        navHome.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showNewYear() {
        hideAll();
        homeSection.style.display = 'block'; // New year is currently part of home
        navNewYear.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showMonthly() {
        hideAll();
        monthlySection.style.display = 'block';
        navMonthly.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showAnalysis(e) {
        const card = e.currentTarget;
        currentSelectedService = card.getAttribute('data-service');
        const categoryName = card.querySelector('.card-category').textContent;
        
        serviceTitleDisplay.textContent = categoryName.replace(/[\[\]]/g, '');
        
        homeSection.style.display = 'none';
        monthlySection.style.display = 'none';
        analysisSection.style.display = 'grid';
        window.scrollTo(0, 0);
    }

    sajuTriggers.forEach(card => card.addEventListener('click', showAnalysis));
    btnBack.addEventListener('click', () => {
        if (currentSelectedService && currentSelectedService.startsWith('monthly-')) {
            showMonthly();
        } else {
            showHome();
        }
    });
    
    homeLogo.addEventListener('click', showHome);
    navHome.addEventListener('click', showHome);
    navNewYear.addEventListener('click', showNewYear);
    navMonthly.addEventListener('click', showMonthly);

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
            
            let content = '';
            const name = document.getElementById('userName').value;

            switch(currentSelectedService) {
                // Monthly fortunes
                case 'monthly-love':
                    content = `<h4>💖 [월간 애정운] 2월 분석</h4>
                               <p>${name}님의 2월 애정운은 '설렘'으로 가득합니다. 솔로라면 새로운 인연이 예기치 못한 곳에서 나타날 것이며, 커플이라면 서로의 마음을 확인하는 깊은 대화가 필요한 달입니다.</p>`;
                    break;
                case 'monthly-destiny':
                    content = `<h4>🌱 [월간 운명] 2월의 길</h4>
                               <p>${name}님의 2월 운명은 '성장'을 향해 나아가고 있습니다. 새로운 배움이나 도전을 시작하기에 최적의 시기이며, 노력한 만큼의 보상이 따를 것입니다.</p>`;
                    break;
                // ... Existing cases
                case 'future3':
                    content = `<h4>🔮 [3개월 후의 미래] 분석 결과</h4>
                               <p>${name}님의 향후 3개월은 '결실의 계절'입니다. 그동안 공들여온 일들이 구체적인 성과로 나타나기 시작하며, 특히 금전적인 보상이 따르는 시기입니다. 2개월 차에 뜻밖의 조력자를 만날 운명이니 대인관계에 유의하십시오.</p>`;
                    break;
                case 'premium':
                    content = `<h4>❤️ [프리미엄 동양운세] 연애운 분석</h4>
                               <p>${name}님의 올해 연애운은 '봄날의 햇살'과 같습니다. 솔로라면 하반기에 도화살이 강하게 들어와 매력이 극대화되는 시기가 오며, 커플이라면 서로의 신뢰가 두터워져 결혼 이야기까지 오갈 수 있는 길한 기운입니다.</p>`;
                    break;
                case 'myeongri':
                    content = `<h4>🧠 [사주명리학] 심층 분석</h4>
                               <p>${name}님의 명조는 목(木) 기운이 조화롭게 흐르고 있어 창의력과 적응력이 매우 뛰어납니다. 올해는 부족했던 화(火) 기운이 들어와 정체되었던 문제들이 해결되고 활발한 활동을 하게 될 운명입니다.</p>`;
                    break;
                case 'job':
                    content = `<h4>💼 [직장 상사운] 분석 결과</h4>
                               <p>${name}님의 사주상 올해는 상사와의 관계에서 '인정'을 받는 기운이 강합니다. 다소 엄격한 상사를 만날 수 있으나 이는 본인의 성장을 돕는 스승의 역할을 하게 될 것이니, 예의를 갖추어 대하면 큰 기회를 얻게 됩니다.</p>`;
                    break;
                case 'jami':
                    content = `<h4>🌌 [자미두수] 운명 분석</h4>
                               <p>${name}님의 자미성 기운을 분석한 결과, 올해는 명예운이 하늘을 찌르는 형국입니다. 문서상의 이득이 강하게 들어와 있으니 집 계약이나 자격증 취득 등에서 매우 유리한 위치를 선점하게 될 것입니다.</p>`;
                    break;
                case 'tojeong':
                    content = `<h4>📜 [토정비결] 2026 해법풀이</h4>
                               <p>${name}님의 올해 토정비결 괘는 '청룡이 여의주를 얻는 격'입니다. 막혔던 운세가 풀리고 만사가 형통할 것이나, 다만 주변의 시기를 살 수 있으니 겸솔한 태도를 유지하는 것이 개운의 열쇠입니다.</p>`;
                    break;
                case 'money':
                    content = `<h4>💰 [금전궁합] 분석 결과</h4>
                               <p>${name}님의 금전운은 토(土) 기운의 안정감을 기반으로 하고 있습니다. 배우자 혹은 파트너와의 사주 합이 금전적으로 서로를 보강해주는 구조이며, 함께 투자나 저축을 계획할 때 시너지가 2배 이상 발생하는 길운입니다.</p>`;
                    break;
                default:
                    content = `<h4>🌟 평생사주 분석 결과</h4>
                               <p>${name}님의 사주는 끈기 있게 자수성가할 대기만성형입니다. 초년의 시행착오가 중년 이후의 거대한 자산이 될 것이며, 인복이 많아 귀인의 도움으로 번영할 운명입니다.</p>`;
            }

            resultArea.innerHTML = `
                <div style="border-bottom:2px solid #503396; padding-bottom:1rem; margin-bottom:2rem;">
                    <h3>${name}님의 맞춤형 분석 결과</h3>
                </div>
                <div class="result-section">
                    ${content}
                </div>
            `;
            resultArea.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});