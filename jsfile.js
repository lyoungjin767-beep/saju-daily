document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('homeSection');
    const newyearSection = document.getElementById('newyearSection');
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

    // --- Hero Slider Logic ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 4000); // Change image every 4 seconds

    // --- Navigation Logic ---
    function hideAll() {
        homeSection.style.display = 'none';
        newyearSection.style.display = 'none';
        monthlySection.style.display = 'none';
        crushSection.style.display = 'none';
        analysisSection.style.display = 'none';
        resultArea.style.display = 'none';
        [navHome, navNewYear, navMonthly, navCrush].forEach(el => el ? el.classList.remove('active') : null);
    }

    function showHome() {
        hideAll();
        homeSection.style.display = 'block';
        navHome.classList.add('active');
        window.scrollTo(0, 0);
    }

    function showNewYear() {
        hideAll();
        newyearSection.style.display = 'block';
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
        const categoryName = card.querySelector('.card-category') ? card.querySelector('.card-category').textContent : '운세분석';
        
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
        if (currentSelectedService.startsWith('monthly-')) showMonthly();
        else if (currentSelectedService.startsWith('crush-')) showCrush();
        else if (newyearSection.style.display === 'block' || currentSelectedService.includes('2026')) showNewYear();
        else showHome();
    });
    
    homeLogo.addEventListener('click', showHome);
    navHome.addEventListener('click', showHome);
    navNewYear.addEventListener('click', showNewYear);
    navMonthly.addEventListener('click', showMonthly);
    navCrush.addEventListener('click', showCrush);

    // Icon menu listeners
    document.querySelectorAll('.icon-item.nav-newyear').forEach(el => el.addEventListener('click', showNewYear));
    document.querySelectorAll('.icon-item.nav-crush').forEach(el => el.addEventListener('click', showCrush));
    document.querySelectorAll('.icon-item.nav-monthly').forEach(el => el.addEventListener('click', showMonthly));

    // --- Date Selectors Init ---
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');
    if(yearSelect) {
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

    if(sajuForm) {
        sajuForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loading.style.display = 'block';
            resultArea.style.display = 'none';

            setTimeout(() => {
                loading.style.display = 'none';
                resultArea.style.display = 'block';
                const name = document.getElementById('userName').value;
                resultArea.innerHTML = `
                    <div style="border-bottom:2px solid #503396; padding-bottom:1rem; margin-bottom:2rem;">
                        <h3>${name}님의 맞춤 분석 결과</h3>
                    </div>
                    <div class="result-section">
                        <h4>🔮 분석 요약</h4>
                        <p>선택하신 서비스에 대한 AI 심층 분석 결과, 올해 ${name}님에게는 매우 긍정적인 변화의 기운이 감돌고 있습니다. 하반기로 갈수록 금전운과 명예운이 상승하는 형국이니 차분히 준비하시기 바랍니다.</p>
                    </div>
                `;
                resultArea.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        });
    }
});