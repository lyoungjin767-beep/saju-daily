document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('homeSection');
    const monthlySection = document.getElementById('monthlySection');
    const crushSection = document.getElementById('crushSection');
    const analysisSection = document.getElementById('analysisSection');
    const resultArea = document.getElementById('resultArea');
    const btnBack = document.getElementById('btnBack');
    const homeLogo = document.getElementById('homeLogo');
    const serviceTitleDisplay = document.querySelector('.service-title');

    const navHome = document.querySelector('.nav-home');
    const navNewYear = document.querySelector('.nav-newyear');
    const navMonthly = document.querySelector('.nav-monthly');
    const navCrush = document.querySelector('.nav-crush');

    let currentSelectedService = '';

    // --- Navigation Logic ---
    function hideAll() {
        homeSection.style.display = 'none';
        monthlySection.style.display = 'none';
        crushSection.style.display = 'none';
        analysisSection.style.display = 'none';
        resultArea.style.display = 'none';
        [navHome, navNewYear, navMonthly, navCrush].forEach(el => el.classList.remove('active'));
    }

    function showHome() {
        hideAll();
        homeSection.style.display = 'block';
        navHome.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showNewYear() {
        hideAll();
        homeSection.style.display = 'block';
        navNewYear.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showMonthly() {
        hideAll();
        monthlySection.style.display = 'block';
        navMonthly.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showCrush() {
        hideAll();
        crushSection.style.display = 'block';
        navCrush.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showAnalysis(e) {
        const card = e.currentTarget;
        currentSelectedService = card.getAttribute('data-service');
        const categoryName = card.querySelector('.card-category').textContent;
        
        serviceTitleDisplay.textContent = categoryName.replace(/[\[\]]/g, '');
        
        hideAll();
        analysisSection.style.display = 'grid';
        window.scrollTo(0, 0);
    }

    function refreshTriggers() {
        document.querySelectorAll('.saju-trigger').forEach(card => {
            card.removeEventListener('click', showAnalysis);
            card.addEventListener('click', showAnalysis);
        });
    }
    refreshTriggers();

    btnBack.addEventListener('click', () => {
        if (currentSelectedService && currentSelectedService.startsWith('monthly-')) showMonthly();
        else if (currentSelectedService && currentSelectedService.startsWith('crush-')) showCrush();
        else showHome();
    });
    
    homeLogo.addEventListener('click', showHome);
    navHome.addEventListener('click', showHome);
    navNewYear.addEventListener('click', showNewYear);
    navMonthly.addEventListener('click', showMonthly);
    navCrush.addEventListener('click', showCrush);

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
                // New Year 2026
                case 'future3':
                    content = `<h4>🔮 [3개월 후의 미래] 분석 결과</h4>
                               <p>${name}님의 2026년 초반 3개월은 '기회의 문'이 열리는 시기입니다. 1월에는 주변의 도움으로 새로운 계획을 세우게 되며, 3월에는 그 결과가 가시화될 것입니다. 특히 문서와 관련된 이득이 강하게 들어와 있습니다.</p>`;
                    break;
                case 'premium':
                    content = `<h4>❤️ [프리미엄 연애운세] 분석</h4>
                               <p>${name}님의 2026년 연애운은 '안정 속의 변화'입니다. 기존의 관계는 더욱 깊어질 것이며, 새로운 인연을 찾는다면 하반기보다 상반기 5월 전후의 기운이 매우 길합니다. 진심 어린 대화가 관계 개선의 핵심입니다.</p>`;
                    break;
                case 'myeongri-love':
                    content = `<h4>💓 [사주명리학 (연애)] 분석</h4>
                               <p>${name}님의 사주 구조상 2026년은 관성(官星)의 기운이 조화롭게 들어와 인연운이 상승합니다. 본인의 매력이 돋보이는 시기이므로 적극적인 대외 활동이 연애운을 더욱 높여줄 것입니다.</p>`;
                    break;
                case 'job':
                    content = `<h4>🏢 [직장 상사운] 분석</h4>
                               <p>2026년 직장 내에서는 상사와의 호흡이 매우 중요합니다. 다소 까다로운 업무 지시가 있을 수 있으나 이는 ${name}님의 능력을 검증하기 위한 과정이니, 차분히 대응하신다면 연말에 큰 인정을 받게 될 것입니다.</p>`;
                    break;
                case 'jami':
                    content = `<h4>🌌 [자미두수] 핵심 포인트</h4>
                               <p>자미두수 명식상 2026년은 명궁에 길성이 비추고 있습니다. 예기치 못한 곳에서 재물적 이득이 발생하거나 명예가 올라가는 시기입니다. 특히 서북쪽 방향의 기운이 본인에게 유리하게 작용합니다.</p>`;
                    break;
                case 'tojeong':
                    content = `<h4>📜 [토정비결] 2026년 총운</h4>
                               <p>${name}님의 2026년 토정비결 괘는 '봄바람에 꽃이 피는 격'입니다. 만사가 순조롭게 풀리고 가정이 평안할 운세입니다. 다만, 지나친 자신감으로 인한 실수를 경계한다면 무난히 성공을 거둘 해입니다.</p>`;
                    break;
                case 'myeongri-total':
                    content = `<h4>🌟 [사주명리학 (종합)] 분석</h4>
                               <p>${name}님의 타고난 강직한 성품이 2026년의 유연한 기운과 만나 시너지를 냅니다. 새로운 분야로의 확장이 길하며, 특히 하반기로 갈수록 금(金)의 기운이 강해져 재물 축적에 매우 유리한 형국입니다.</p>`;
                    break;
                case 'gunghap':
                    content = `<h4>👫 [궁합] 2026년 관계 분석</h4>
                               <p>두 사람의 2026년 합은 '상생(相生)'의 기운이 매우 강합니다. 서로의 부족한 오행을 채워주는 구조이며, 특히 올해는 공동의 목표를 세우고 추진하기에 최적의 시기입니다. 갈등이 생겨도 대화로 쉽게 풀릴 길운입니다.</p>`;
                    break;
                // Monthly
                case 'monthly-love':
                    content = `<h4>💖 [월간 애정운] 2월 분석</h4>
                               <p>${name}님의 2월 애정운은 '설렘'으로 가득합니다. 솔로라면 새로운 인연이 예기치 못한 곳에서 나타날 것이며, 커플이라면 깊은 대화가 필요한 달입니다.</p>`;
                    break;
                // Crush
                case 'crush-kagami':
                    content = `<h4>✨ [카가미 류지 점성술] 분석</h4>
                               <p>${name}님이 생각하는 그 사람의 무의식 속에는 ${name}님에 대한 호기심이 가득합니다. 가벼운 안부를 전하며 거리를 좁혀보시기 바랍니다.</p>`;
                    break;
                default:
                    content = `<h4>🌟 평생사주 분석 결과</h4>
                               <p>${name}님의 사주는 대기만성형입니다. 시행착오가 중년 이후의 자산이 될 것이며, 귀인의 도움으로 번영할 운명입니다.</p>`;
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