document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navAnimal = document.getElementById('navAnimal');
    const navLotto = document.getElementById('navLotto');
    const animalSection = document.getElementById('animalSection');
    const lottoSection = document.getElementById('lottoSection');

    navAnimal.addEventListener('click', () => {
        navAnimal.classList.add('active');
        navLotto.classList.remove('active');
        animalSection.classList.add('active');
        lottoSection.classList.remove('active');
        stopWebcam();
    });

    navLotto.addEventListener('click', () => {
        navLotto.classList.add('active');
        navAnimal.classList.remove('active');
        lottoSection.classList.add('active');
        animalSection.classList.remove('active');
        stopWebcam();
    });

    // --- AI Animal Test Logic ---
    const URL = "https://teachablemachine.withgoogle.com/models/MiRC8hPXg/";
    let model, webcam, maxPredictions;

    async function initModel() {
        if (model) return;
        model = await tmImage.load(URL + "model.json", URL + "metadata.json");
        maxPredictions = model.getTotalClasses();
    }

    const imageUpload = document.getElementById('imageUpload');
    const faceImage = document.getElementById('faceImage');
    const webcamBtn = document.getElementById('webcamBtn');
    const webcamContainer = document.getElementById('webcam-container');
    const resultContainer = document.getElementById('resultContainer');
    const loading = document.getElementById('loading');

    imageUpload.addEventListener('change', async (e) => {
        stopWebcam();
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            faceImage.style.display = 'block';
            loading.style.display = 'block';
            resultContainer.style.display = 'none';
            await initModel();
            setTimeout(async () => {
                await predict(faceImage);
                loading.style.display = 'none';
                resultContainer.style.display = 'block';
            }, 200);
        };
        reader.readAsDataURL(file);
    });

    webcamBtn.addEventListener('click', async () => {
        if (webcam) {
            stopWebcam();
            return;
        }
        loading.style.display = 'block';
        faceImage.style.display = 'none';
        resultContainer.style.display = 'none';
        await initModel();
        
        webcam = new tmImage.Webcam(300, 300, true);
        await webcam.setup();
        await webcam.play();
        loading.style.display = 'none';
        resultContainer.style.display = 'block';
        webcamContainer.appendChild(webcam.canvas);
        webcamBtn.textContent = "Stop Webcam";
        window.requestAnimationFrame(webcamLoop);
    });

    async function webcamLoop() {
        if (!webcam) return;
        webcam.update();
        await predict(webcam.canvas);
        window.requestAnimationFrame(webcamLoop);
    }

    function stopWebcam() {
        if (webcam) {
            webcam.stop();
            webcam = null;
            webcamContainer.innerHTML = '';
            webcamBtn.textContent = "Use Real-time Webcam";
            faceImage.style.display = 'block';
        }
    }

    async function predict(element) {
        const prediction = await model.predict(element);
        let dogProb = 0, catProb = 0;
        prediction.forEach(p => {
            if (p.className.toLowerCase().includes('dog')) dogProb = (p.probability * 100).toFixed(0);
            else if (p.className.toLowerCase().includes('cat')) catProb = (p.probability * 100).toFixed(0);
        });

        document.getElementById('dogBar').style.width = dogProb + '%';
        document.getElementById('dogPercent').textContent = dogProb + '%';
        document.getElementById('catBar').style.width = catProb + '%';
        document.getElementById('catPercent').textContent = catProb + '%';
        
        const title = document.getElementById('resultTitle');
        if (dogProb > catProb) title.textContent = "You look like a Friendly Dog! 🐶";
        else if (catProb > dogProb) title.textContent = "You look like a Mysterious Cat! 🐱";
        else title.textContent = "You are a perfect mix! 🐾";
    }

    // --- Lotto Generator Logic ---
    const generateBtn = document.getElementById('generateBtn');
    const resetHistoryBtn = document.getElementById('resetHistoryBtn');
    const numbersDisplay = document.getElementById('numbersDisplay');
    const historyList = document.getElementById('historyList');

    let history = JSON.parse(localStorage.getItem('lottoHistory') || '[]');
    updateHistoryUI();

    generateBtn.addEventListener('click', () => {
        const nums = [];
        while(nums.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if(!nums.includes(r)) nums.push(r);
        }
        nums.sort((a,b) => a-b);
        
        numbersDisplay.innerHTML = '';
        nums.forEach((n, i) => {
            const b = document.createElement('div');
            b.className = 'ball';
            b.textContent = n;
            b.style.backgroundColor = getBallColor(n);
            b.style.animationDelay = `${i * 0.1}s`;
            numbersDisplay.appendChild(b);
        });

        history.unshift({nums, date: new Date().toLocaleString()});
        if(history.length > 10) history.pop();
        localStorage.setItem('lottoHistory', JSON.stringify(history));
        updateHistoryUI();
    });

    resetHistoryBtn.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('lottoHistory');
        updateHistoryUI();
    });

    function getBallColor(n) {
        if(n <= 10) return 'var(--ball-1)';
        if(n <= 20) return 'var(--ball-11)';
        if(n <= 30) return 'var(--ball-21)';
        if(n <= 40) return 'var(--ball-31)';
        return 'var(--ball-41)';
    }

    function updateHistoryUI() {
        if(history.length === 0) {
            historyList.innerHTML = '<p class="empty-msg">No history yet.</p>';
            return;
        }
        historyList.innerHTML = history.map(h => `
            <div class="history-item">
                <div style="display:flex; gap:5px">
                    ${h.nums.map(n => `<div class="ball mini-ball" style="background:${getBallColor(n)}">${n}</div>`).join('')}
                </div>
                <small>${h.date}</small>
            </div>
        `).join('');
    }

    // --- Theme Handling ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

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
});