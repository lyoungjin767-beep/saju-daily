document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Highlights ---
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // --- Quick Menu Interactions ---
    const quickMenuItems = document.querySelectorAll('.quick-menu-item');
    quickMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuName = item.querySelector('p').textContent;
            console.log(`${menuName} 메뉴가 클릭되었습니다.`);
            // alert(`${menuName} 페이지로 이동합니다.`);
        });
    });

    // --- Search Icon Interaction ---
    const searchIcon = document.querySelector('.fa-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const query = prompt('검색어를 입력하세요:');
            if (query) {
                console.log(`검색어: ${query}`);
            }
        });
    }

    // --- Mobile Menu Interaction ---
    const menuIcon = document.querySelector('.fa-bars');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            console.log('사이드바 메뉴를 엽니다.');
        });
    }
});
