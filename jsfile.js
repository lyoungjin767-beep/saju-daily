document.addEventListener('DOMContentLoaded', () => {
    const sajuForm = document.getElementById('sajuForm');
    const loading = document.getElementById('loading');
    const resultArea = document.getElementById('resultArea');

    // --- Theme Handling ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = '라이트 모드';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = '다크 모드';
        }
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    updateThemeUI(currentTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    // --- Saju Logic Helpers ---
    const ZODIACS = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
    const CONSTELLATIONS = [
        { name: "염소자리", start: "0120" }, { name: "물병자리", start: "0219" },
        { name: "물고기자리", start: "0321" }, { name: "양자리", start: "0420" },
        { name: "황소자리", start: "0521" }, { name: "쌍둥이자리", start: "0621" },
        { name: "게자리", start: "0723" }, { name: "사자자리", start: "0823" },
        { name: "처녀자리", start: "0923" }, { name: "천칭자리", start: "1023" },
        { name: "전갈자리", start: "1123" }, { name: "사수자리", start: "1222" },
        { name: "염소자리", start: "1231" }
    ];

    function getZodiac(year) { return ZODIACS[year % 12]; }
    function getConstellation(dateStr) {
        const mmdd = dateStr.replace(/-/g, '').substring(4);
        return CONSTELLATIONS.find(c => mmdd <= c.start).name;
    }

    // --- Main Form Logic ---
    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const birthDate = document.getElementById('birthDate').value;
        const calendarType = document.getElementById('calendarType').value;
        const birthHour = document.getElementById('birthHour').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        resultArea.style.display = 'none';
        loading.style.display = 'block';

        setTimeout(() => {
            loading.style.display = 'none';
            resultArea.style.display = 'block';
            
            const year = parseInt(birthDate.substring(0, 4));
            const zodiac = getZodiac(year);
            const constellation = getConstellation(birthDate);
            const type = year % 2 === 0 ? "현실형" : "이상형";
            
            resultArea.innerHTML = `
                <div class="summary-card">
                    <div class="summary-item">
                        <div class="summary-label">운명 타입</div>
                        <div class="summary-value">${type}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">띠</div>
                        <div class="summary-value">${zodiac}띠</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">별자리</div>
                        <div class="summary-value">${constellation}</div>
                    </div>
                </div>

                <div class="advice-box">
                    ✨ 오늘의 조언: "오늘은 새로운 결정보다는 과거를 정리하고 기운을 보강하는 날입니다. 동북쪽의 기운이 길합니다."
                </div>

                <div class="report-section">
                    <div class="section-title">🔮 기본 사주 요약</div>
                    <div class="section-content">
                        본 사주는 <strong>오행(五行)</strong> 중 금(金)의 기운이 정수리에 머물고 토(土)의 기운이 기반을 지탱하는 형상입니다. 
                        <strong>음양(陰陽)</strong>의 조화가 안정적이며, 특히 <strong>일주(日柱)</strong>의 기운이 강하여 자수성가할 운명을 타고났습니다. 
                        초년의 고생이 중년의 거대한 자산이 되는 전형적인 대기만성형 구조입니다.
                    </div>
                </div>

                <div class="report-section">
                    <div class="section-title">💼 직업 및 재물운</div>
                    <div class="section-content">
                        재물운 지수는 매우 높으나, <strong>시주(時柱)</strong>의 흐름상 재물이 한꺼번에 들어오기보다 계단식으로 상승하는 패턴을 보입니다. 
                        분석력이 뛰어나 전문직이나 기술 기반의 사업에서 큰 성취를 이룰 수 있습니다. 
                        <div class="metric-container">
                            <div class="metric-row">
                                <span class="metric-label">재물 안정도</span>
                                <div class="metric-bar"><div class="metric-fill" style="width: 85%"></div></div>
                            </div>
                            <div class="metric-row">
                                <span class="metric-label">직업 성취도</span>
                                <div class="metric-bar"><div class="metric-fill" style="width: 72%"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <div class="section-title">❤️ 연애 및 대인관계</div>
                    <div class="section-content">
                        감성보다는 이성이 앞서는 타입으로, 상대방에게 신뢰를 주는 연애를 선호합니다. 
                        올해는 <strong>관성(官星)</strong>의 기운이 들어와 뜻밖의 인연이 닿을 수 있는 시기입니다. 
                        주변 사람들과의 관계에서는 묵직한 존재감을 발휘하며, 좁고 깊은 인맥이 평생의 복이 됩니다.
                        <div class="metric-container">
                            <div class="metric-row">
                                <span class="metric-label">연애운 지수</span>
                                <div class="metric-bar"><div class="metric-fill" style="width: 68%"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <div class="section-title">📅 2026년 대운 흐름</div>
                    <div class="section-content">
                        2026년 병오년(丙午年)은 당신에게 <strong>화(火)</strong>의 기운이 강하게 작용하는 해입니다. 
                        상반기에는 다소 정체기가 있을 수 있으나, 가을을 기점으로 막혔던 기운이 뚫리며 명예운이 상승합니다. 
                        문서상의 이득이 있을 수 있으니 계약 관련 사항을 꼼꼼히 챙기시기 바랍니다.
                    </div>
                </div>

                <div class="report-section">
                    <div class="section-title">⚠️ 주의해야 할 점</div>
                    <div class="section-content">
                        본인의 완벽주의 성향이 스스로를 갉아먹을 수 있습니다. <strong>식신(食神)</strong>의 기운이 과해지면 건강을 해칠 수 있으니, 
                        규칙적인 휴식과 하체 근력 강화에 힘쓰십시오. 특히 가을철 호흡기 계통 관리가 필수적입니다.
                    </div>
                </div>
            `;
        }, 2000);
    });
});