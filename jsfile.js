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

    // --- Saju Form Handling ---
    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const birthDate = document.getElementById('birthDate').value;
        const calendarType = document.getElementById('calendarType').value;
        const birthHour = document.getElementById('birthHour').value;
        const birthMinute = document.getElementById('birthMinute').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        // Hide old results
        resultArea.style.display = 'none';
        loading.style.display = 'block';

        // Simulate analysis
        setTimeout(() => {
            loading.style.display = 'none';
            resultArea.style.display = 'block';
            
            const calendarLabel = calendarType === 'solar' ? '양력' : '음력';
            const genderLabel = gender === 'male' ? '남성' : '여성';
            
            resultText.innerHTML = `
                <strong>분석 대상:</strong> ${birthDate} (${calendarLabel}) ${birthHour}시 ${birthMinute}분 생, ${genderLabel}<br><br>
                당신의 사주는 <strong>금(金)</strong>의 기운이 강하며, 올해는 <strong>목(木)</strong>의 기운이 들어와 재물운이 상승하는 시기입니다. 
                주변 사람들과의 협력을 통해 더 큰 성취를 이룰 수 있는 한 해가 될 것입니다. 
                특히 태어난 시간에 비추어 볼 때 오후 시간대에 중요한 결정을 내리는 것이 길합니다.
            `;
        }, 1500);
    });
});