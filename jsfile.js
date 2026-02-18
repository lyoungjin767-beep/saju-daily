document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Selectors ---
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');

    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1930; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `${y}년`;
        yearSelect.appendChild(opt);
    }
    yearSelect.value = "1990";

    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = `${m.toString().padStart(2, '0')}월`;
        monthSelect.appendChild(opt);
    }

    for (let d = 1; d <= 31; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = `${d.toString().padStart(2, '0')}일`;
        daySelect.appendChild(opt);
    }

    // --- Theme Handling ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Saju Analysis Logic ---
    const sajuForm = document.getElementById('sajuForm');
    const loading = document.getElementById('loading');
    const resultArea = document.getElementById('resultArea');

    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const gender = document.getElementById('gender').value === 'male' ? '남성' : '여성';
        const year = yearSelect.value;
        const month = monthSelect.value;
        const day = daySelect.value;
        const hour = document.getElementById('birthHour').value;
        const calendar = document.getElementById('calendarType').value === 'solar' ? '양력' : '음력';

        resultArea.style.display = 'none';
        loading.style.display = 'block';

        setTimeout(() => {
            loading.style.display = 'none';
            resultArea.style.display = 'block';
            
            resultArea.innerHTML = `
                <div class="result-header">
                    <h3>${name}님의 사주 분석 결과</h3>
                    <p>${year}년 ${month}월 ${day}일 (${calendar}) ${hour === 'unknown' ? '시간모름' : hour + '시'} 생</p>
                </div>
                
                <div class="result-section">
                    <h4>🌟 인생 총운</h4>
                    <p>당신의 사주는 강인한 생명력과 유연한 사고를 동시에 지닌 '수목공생(水木共生)'의 형상을 띠고 있습니다. 어떤 환경에서도 뿌리를 내리는 끈기 덕분에 초년의 시행착오를 거쳐 중년 이후 안정적인 번영을 누릴 운명입니다. 특히 인복이 많아 귀인의 도움으로 큰 위기를 넘기는 경우가 많습니다.</p>
                </div>

                <div class="result-section">
                    <h4>💰 재물 및 사업운</h4>
                    <p>태어난 날의 기운이 토(土)의 성질을 품고 있어 재물을 모으는 능력이 탁월합니다. 다만, 씀씀이가 큰 편이니 자산 관리에 체계적인 계획이 필요합니다. 30대 중반부터 재운이 크게 열리는 시기가 오며, 본인의 기술이나 전문 지식을 활용한 사업에서 큰 성공을 거둘 확률이 높습니다.</p>
                </div>

                <div class="result-section">
                    <h4>❤️ 연애 및 배우자운</h4>
                    <p>다정다감한 성격으로 주변에 이성이 끊이지 않는 매력적인 사주입니다. 배우자 자리에는 본인을 지지해주고 정서적 안정을 주는 인연이 들어와 있습니다. 상대방과의 소통에서 솔직함을 유지한다면 화목한 가정을 꾸릴 수 있으며, 늦게 만나는 인연일수록 합이 더 좋습니다.</p>
                </div>

                <div class="result-section">
                    <h4>💪 건강 및 조언</h4>
                    <p>순환기 계통과 간 건강에 유의해야 하는 체질입니다. 과로를 피하고 규칙적인 수면 습관을 갖는 것이 가장 큰 개운법입니다. 푸른색 계열의 옷이나 소품이 당신의 기운을 보강해주며, 중요한 결정은 태양이 가장 높은 정오 시간에 내리는 것이 길합니다.</p>
                </div>

                <div class="result-section">
                    <h4>📅 올해의 한마디</h4>
                    <p>"새로운 도전보다는 내실을 다지고 인맥을 정비하는 해입니다. 가을철에 뜻밖의 기회가 찾아올 것이니 차분히 준비하십시오."</p>
                </div>
            `;
            
            // Scroll to results
            resultArea.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});