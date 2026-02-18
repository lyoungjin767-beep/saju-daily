document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Slider ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    // --- Navigation (Placeholder) ---
    // In a real app, this would hide/show sections.
    document.querySelectorAll('.nav-home, .nav-newyear, .nav-monthly, .nav-crush').forEach(nav => {
        nav.addEventListener('click', e => {
            e.preventDefault();
            alert(`'${e.target.textContent}' 메뉴를 클릭했습니다.`);
        });
    });

    document.querySelectorAll('.saju-trigger').forEach(card => {
        card.addEventListener('click', e => {
            alert(`'${e.currentTarget.querySelector('p').textContent}' 운세를 선택했습니다.`);
        });
    });
});
