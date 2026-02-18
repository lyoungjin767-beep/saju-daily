const URL = "https://teachablemachine.withgoogle.com/models/MiRC8hPXg/";
let model, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

document.addEventListener('DOMContentLoaded', () => {
    init();

    const imageUpload = document.getElementById('imageUpload');
    const faceImage = document.getElementById('faceImage');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const dogBar = document.getElementById('dogBar');
    const catBar = document.getElementById('catBar');
    const dogPercent = document.getElementById('dogPercent');
    const catPercent = document.getElementById('catPercent');
    const resultTitle = document.getElementById('resultTitle');

    imageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            loading.style.display = 'block';
            resultContainer.style.display = 'none';

            // Give the image time to render
            setTimeout(async () => {
                await predict();
            }, 200);
        };
        reader.readAsDataURL(file);
    });

    async function predict() {
        const prediction = await model.predict(faceImage);
        loading.style.display = 'none';
        resultContainer.style.display = 'block';

        let dogProb = 0;
        let catProb = 0;

        prediction.forEach(p => {
            if (p.className.toLowerCase().includes('dog')) {
                dogProb = (p.probability * 100).toFixed(0);
            } else if (p.className.toLowerCase().includes('cat')) {
                catProb = (p.probability * 100).toFixed(0);
            }
        });

        dogBar.style.width = dogProb + '%';
        dogPercent.textContent = dogProb + '%';
        catBar.style.width = catProb + '%';
        catPercent.textContent = catProb + '%';

        if (parseInt(dogProb) > parseInt(catProb)) {
            resultTitle.textContent = "You look like a Friendly Dog! 🐶";
        } else if (parseInt(catProb) > parseInt(dogProb)) {
            resultTitle.textContent = "You look like a Mysterious Cat! 🐱";
        } else {
            resultTitle.textContent = "You are a perfect mix of both! 🐾";
        }
    }

    // Theme Logic
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