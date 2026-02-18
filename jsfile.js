// AI Model URL
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/MiRC8hPXg/";
let model, webcam, maxPredictions;

// --- Helper Functions ---
function getBallColor(n) {
    if (n <= 10) return 'var(--ball-1)';
    if (n <= 20) return 'var(--ball-11)';
    if (n <= 30) return 'var(--ball-21)';
    if (n <= 40) return 'var(--ball-31)';
    return 'var(--ball-41)';
}

async function initModel() {
    if (model) return;
    try {
        model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        maxPredictions = model.getTotalClasses();
    } catch (e) {
        console.error("Model load failed", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const navAnimal = document.getElementById('navAnimal');
    const navLotto = document.getElementById('navLotto');
    const animalSection = document.getElementById('animalSection');
    const lottoSection = document.getElementById('lottoSection');

    function switchTab(tab) {
        if (tab === 'animal') {
            navAnimal.classList.add('active');
            navLotto.classList.remove('active');
            animalSection.classList.add('active');
            lottoSection.classList.remove('active');
            stopWebcam();
        } else {
            navLotto.classList.add('active');
            navAnimal.classList.remove('active');
            lottoSection.classList.add('active');
            animalSection.classList.remove('active');
            stopWebcam();
        }
    }

    navAnimal.addEventListener('click', () => switchTab('animal'));
    navLotto.addEventListener('click', () => switchTab('lotto'));

    // --- Theme Handling ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
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

    // --- Animal Test Logic ---
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
            }, 300);
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
        
        try {
            webcam = new tmImage.Webcam(300, 300, true);
            await webcam.setup();
            await webcam.play();
            loading.style.display = 'none';
            resultContainer.style.display = 'block';
            webcamContainer.innerHTML = '';
            webcamContainer.appendChild(webcam.canvas);
            webcamBtn.textContent = "Stop Webcam";
            webcamBtn.classList.replace('btn-secondary', 'btn-primary');
            window.requestAnimationFrame(webcamLoop);
        } catch (e) {
            alert("Webcam access denied or error occurred.");
            loading.style.display = 'none';
            faceImage.style.display = 'block';
        }
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
            webcamBtn.classList.replace('btn-primary', 'btn-secondary');
            faceImage.style.display = 'block';
        }
    }

    async function predict(element) {
        if (!model) return;
        const prediction = await model.predict(element);
        let dogProb = 0, catProb = 0;
        prediction.forEach(p => {
            const prob = (p.probability * 100).toFixed(0);
            if (p.className.toLowerCase().includes('dog')) dogProb = prob;
            else if (p.className.toLowerCase().includes('cat')) catProb = prob;
        });

        document.getElementById('dogBar').style.width = dogProb + '%';
        document.getElementById('dogPercent').textContent = dogProb + '%';
        document.getElementById('catBar').style.width = catProb + '%';
        document.getElementById('catPercent').textContent = catProb + '%';
        
        const title = document.getElementById('resultTitle');
        if (parseInt(dogProb) > parseInt(catProb)) title.textContent = "You look like a Friendly Dog! 🐶";
        else if (parseInt(catProb) > parseInt(dogProb)) title.textContent = "You look like a Mysterious Cat! 🐱";
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
            b.className = 'ball animate-pop';
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

    function updateHistoryUI() {
        if(history.length === 0) {
            historyList.innerHTML = '<p class="empty-msg">No history yet.</p>';
            return;
        }
        historyList.innerHTML = history.map(h => `
            <div class="history-item">
                <div style="display:flex; gap:8px">
                    ${h.nums.map(n => `<div class="ball mini-ball" style="background:${getBallColor(n)}">${n}</div>`).join('')}
                </div>
                <small style="color: var(--text-muted)">${h.date}</small>
            </div>
        `).join('');
    }
});