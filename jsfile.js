document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const homeSection = document.getElementById('homeSection');
    const newyearSection = document.getElementById('newyearSection');
    const monthlySection = document.getElementById('monthlySection');
    const crushSection = document.getElementById('crushSection');
    const analysisSection = document.getElementById('analysisSection');

    function hideAll() {
        if(homeSection) homeSection.style.display = 'none';
        if(newyearSection) newyearSection.style.display = 'none';
        if(monthlySection) monthlySection.style.display = 'none';
        if(crushSection) crushSection.style.display = 'none';
        if(analysisSection) analysisSection.style.display = 'none';
        document.querySelectorAll('.menu-desktop a').forEach(a => a.classList.remove('active'));
    }

    function showHome() { hideAll(); homeSection.style.display = 'block'; document.querySelector('.nav-home').classList.add('active'); }
    function showNewYear() { hideAll(); newyearSection.style.display = 'block'; document.querySelector('.nav-newyear').classList.add('active'); }
    // ... other show functions

    // Listeners
    document.getElementById('homeLogo').addEventListener('click', showHome);
    document.querySelector('.nav-home').addEventListener('click', showHome);
    document.querySelector('.nav-newyear').addEventListener('click', showNewYear);
    // ... other listeners

    // --- Hero Banner is static now, so slider logic is removed ---
});
