document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('homeSection');
    const monthlySection = document.getElementById('monthlySection');
    const crushSection = document.getElementById('crushSection');
    const analysisSection = document.getElementById('analysisSection');
    const resultArea = document.getElementById('resultArea');
    const sajuTriggers = document.querySelectorAll('.saju-trigger');
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

    // Update triggers as they are added dynamically or refreshed
    function refreshTriggers() {
        document.querySelectorAll('.saju-trigger').forEach(card => {
            card.removeEventListener('click', showAnalysis);
            card.addEventListener('click', showAnalysis);
        });
    }
    refreshTriggers();

    btnBack.addEventListener('click', () => {
        if (currentSelectedService && currentSelectedService.startsWith('monthly-')) {
            showMonthly();
        } else if (currentSelectedService && currentSelectedService.startsWith('crush-')) {
            showCrush();
        } else {
            showHome();
        }
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
                // Crush services
                case 'crush-kagami':
                    content = `<h4>✨ [카가미 류지 점성술] 분석 결과</h4>
                               <p>${name}님이 생각하는 그 사람의 무의식 속에는 ${name}님에 대한 호기심이 가득합니다. 다만 현재는 확신이 부족한 상태이니, 먼저 가벼운 안부를 전하며 거리를 좁혀보시기 바랍니다.</p>`;
                    break;
                case 'crush-stella':
                    content = `<h4>💖 [스텔라 타로] 연애? 우정?</h4>
                               <p>현재 두 분의 관계는 '우정'과 '연애'의 경계선에 있습니다. 상대방은 ${name}님을 매우 편안한 대화 상대로 느끼고 있으며, 이번 달 하반기에 두 분 사이를 반전시킬 수 있는 기회가 찾아옵니다.</p>`;
                    break;
                case 'crush-sinjo':
                    content = `<h4>📜 [신죠의 사주추명] 상대의 속마음</h4>
                               <p>${name}님의 사주와 상대방의 기운을 합쳐본 결과, 상대방은 겉으로 드러내지는 않지만 ${name}님의 섬세한 배려에 큰 감동을 느끼고 있습니다. 조급해하지 말고 꾸준함을 보여주는 것이 승부수입니다.</p>`;
                    break;
                // Monthly fortunes
                case 'monthly-love':
                    content = `<h4>💖 [월간 애정운] 2월 분석</h4>
                               <p>${name}님의 2월 애정운은 '설렘'으로 가득합니다. 솔로라면 새로운 인연이 예기치 못한 곳에서 나타날 것이며, 커플이라면 서로의 마음을 확인하는 깊은 대화가 필요한 달입니다.</p>`;
                    break;
                case 'monthly-destiny':
                    content = `<h4>🌱 [월간 운명] 2월의 길</h4>
                               <p>${name}님의 2월 운명은 '성장'을 향해 나아가고 있습니다. 새로운 배움이나 도전을 시작하기에 최적의 시기이며, 노력한 만큼의 보상이 따를 것입니다.</p>`;
                    break;
                // Existing
                case 'future3':
                    content = `<h4>🔮 [3개월 후의 미래] 분석 결과</h4>
                               <p>${name}님의 향후 3개월은 '결실의 계절'입니다. 그동안 공들여온 일들이 구체적인 성과로 나타나기 시작하며, 특히 금전적인 보상이 따르는 시기입니다.</p>`;
                    break;
                case 'premium':
                    content = `<h4>❤️ [프리미엄 동양운세] 연애운 분석</h4>
                               <p>${name}님의 올해 연애운은 '봄날의 햇살'과 같습니다. 솔로라면 하반기에 도화살이 강하게 들어와 매력이 극대화되는 시기가 옵니다.</p>`;
                    break;
                default:
                    content = `<h4>🌟 평생사주 분석 결과</h4>
                               <p>${name}님의 사주는 끈기 있게 자수성가할 대기만성형입니다. 초년의 시행착오가 중년 이후의 거대한 자산이 될 운명입니다.</p>`;
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