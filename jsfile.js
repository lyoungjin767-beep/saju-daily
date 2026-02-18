document.addEventListener('DOMContentLoaded', () => {
    const sajuForm = document.getElementById('sajuForm');
    const loading = document.getElementById('loading');
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

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

    // --- Saju Analysis Logic ---
    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const birthDate = document.getElementById('birthDate').value;
        const calendarType = document.getElementById('calendarType').value;
        const birthHour = document.getElementById('birthHour').value;
        const birthMinute = document.getElementById('birthMinute').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        resultArea.style.display = 'none';
        loading.style.display = 'block';

        setTimeout(() => {
            loading.style.display = 'none';
            resultArea.style.display = 'block';
            
            const calendarLabel = calendarType === 'solar' ? '양력' : '음력';
            const genderLabel = gender === 'male' ? '남성' : '여성';
            
            // Extensive Report Generation
            let report = `
                <div class="report-header">
                    <h3>[ 상세 사주 분석 보고서 ]</h3>
                    <p>분석 정보: ${birthDate} (${calendarLabel}) ${birthHour}시 ${birthMinute}분 생 (${genderLabel})</p>
                </div>
                
                <div class="report-section">
                    <h4>1. 천명(天命) 및 총평</h4>
                    <p>당신의 사주는 하늘의 기운이 땅에 뿌리를 내리는 강직한 기운을 타고났습니다. 전체적인 오행의 흐름이 조화로우며, 특히 본인을 상징하는 일간(日干)이 뿌리가 깊어 어떠한 역경에도 쉽게 흔들리지 않는 내면의 힘을 가지고 있습니다. 대운의 흐름으로 보아 중년 이후 큰 성취를 이룰 대기만성형 사주입니다.</p>
                </div>

                <div class="report-section">
                    <h4>2. 오행(五行) 분석</h4>
                    <ul>
                        <li><strong>목(木):</strong> 성장을 의미하는 목 기운이 적절히 배치되어 창의력이 뛰어납니다.</li>
                        <li><strong>화(火):</strong> 열정을 뜻하는 화 기운이 부족할 수 있으니 적극적인 대외 활동이 필요합니다.</li>
                        <li><strong>토(土):</strong> 신용을 의미하는 토 기운이 강해 주변의 신뢰를 한몸에 받습니다.</li>
                        <li><strong>금(金):</strong> 결단력의 금 기운이 날카롭게 서 있어 공과 사의 구분이 명확합니다.</li>
                        <li><strong>수(水):</strong> 지혜를 뜻하는 수 기운이 유연하게 흐르니 임기응변에 능합니다.</li>
                    </ul>
                </div>

                <div class="report-section">
                    <h4>3. 성격 및 기질 분석</h4>
                    <p>겉으로는 유연해 보이나 속으로는 칼날 같은 주관을 가지고 있습니다. 정의감이 투철하며 거짓을 싫어하는 성품입니다. 명예를 중요시하며, 때로는 고집이 세 보일 수 있으나 이는 본인만의 확고한 가치관 때문입니다. 타인의 조언을 수용하는 유연함만 갖춘다면 만인에게 존경받는 지도자적 자질을 발휘할 것입니다.</p>
                </div>

                <div class="report-section">
                    <h4>4. 직업 및 적성운</h4>
                    <p>분석적인 사고와 체계적인 시스템 구축에 능합니다. 전문직, 기술직, 혹은 연구 분야에서 두각을 나타낼 수 있으며, 조직 내에서는 기획이나 관리직이 매우 잘 어울립니다. 본인의 아이디어를 실체화하는 사업가적 기질도 있으나, 초기에는 전문가의 도움을 받는 동업 형태가 유리합니다.</p>
                </div>

                <div class="report-section">
                    <h4>5. 재물 및 성공운</h4>
                    <p>초년에는 재물의 기복이 있을 수 있으나, 30대 중반을 기점으로 재운이 크게 열립니다. 투기적인 투자보다는 안전 자산 위주의 축적이 부의 크기를 키우는 비결입니다. 사주상 식신생재(食神生財)의 격을 갖추고 있어 본인의 재능이 곧 돈으로 연결되는 구조입니다. 꾸준한 자기계발이 곧 재산입니다.</p>
                </div>

                <div class="report-section">
                    <h4>6. 애정 및 대인관계</h4>
                    <p>표현력이 다소 부족하여 오해를 살 수 있으나 진심은 깊은 스타일입니다. 배우자 운이 좋아 본인을 잘 이해해주는 반려자를 만나 가정이 평안할 것입니다. 대인관계에서는 좁고 깊은 인맥을 선호하며, 진정한 친구 몇 명이 평생의 큰 자산이 됩니다.</p>
                </div>

                <div class="report-section">
                    <h4>7. 건강 주의사항</h4>
                    <p>오행의 흐름상 소화기 계통과 순환기 질환에 주의해야 합니다. 스트레스가 위장으로 전이되기 쉬운 체질이니 규칙적인 식사와 명상이 큰 도움이 됩니다. 하체 근력을 키우는 운동이 전체적인 기운을 보강하는 데 핵심입니다.</p>
                </div>

                <div class="report-section">
                    <h4>8. 행운의 조언 (Lucky Guide)</h4>
                    <ul>
                        <li><strong>행운의 색상:</strong> 푸른색 계열, 금색</li>
                        <li><strong>행운의 숫자:</strong> 3, 7</li>
                        <li><strong>길한 방향:</strong> 동북쪽</li>
                        <li><strong>개운(開運) 방법:</strong> 아침 일찍 해를 보며 걷는 습관이 운의 흐름을 빠르게 바꿔줄 것입니다.</li>
                    </ul>
                </div>
            `;
            resultText.innerHTML = report;
        }, 2000);
    });
});