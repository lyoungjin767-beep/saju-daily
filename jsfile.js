document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const generateBtn = document.getElementById('generateBtn');
    const resetHistoryBtn = document.getElementById('resetHistoryBtn');
    const numbersDisplay = document.getElementById('numbersDisplay');
    const historyList = document.getElementById('historyList');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    // Theme Handling
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeUI('dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeUI('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeUI('dark');
        }
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }

    // Lotto Logic
    let history = JSON.parse(localStorage.getItem('lottoHistory') || '[]');
    updateHistoryUI();

    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        displayNumbers(numbers);
        addToHistory(numbers);
    });

    resetHistoryBtn.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('lottoHistory');
        updateHistoryUI();
    });

    function generateLottoNumbers() {
        const nums = new Set();
        while(nums.size < 6) {
            nums.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(nums).sort((a, b) => a - b);
    }

    function getBallColor(num) {
        if (num <= 10) return 'var(--ball-1)';
        if (num <= 20) return 'var(--ball-11)';
        if (num <= 30) return 'var(--ball-21)';
        if (num <= 40) return 'var(--ball-31)';
        return 'var(--ball-41)';
    }

    function displayNumbers(numbers) {
        numbersDisplay.innerHTML = '';
        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = num;
            ball.style.backgroundColor = getBallColor(num);
            ball.style.animationDelay = `${index * 0.1}s`;
            numbersDisplay.appendChild(ball);
        });
    }

    function addToHistory(numbers) {
        const entry = {
            numbers: numbers,
            date: new Date().toLocaleString()
        };
        history.unshift(entry);
        if (history.length > 10) history.pop();
        localStorage.setItem('lottoHistory', JSON.stringify(history));
        updateHistoryUI();
    }

    function updateHistoryUI() {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-msg">No history yet. Try generating some numbers!</p>';
            return;
        }

        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="history-balls">
                    ${item.numbers.map(n => `
                        <div class="ball mini-ball" style="background-color: ${getBallColor(n)}">${n}</div>
                    `).join('')}
                </div>
                <small style="color: var(--text-muted)">${item.date}</small>
            </div>
        `).join('');
    }
});