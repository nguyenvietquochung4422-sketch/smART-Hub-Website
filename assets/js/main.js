// 1. Hiệu ứng Parallax cho Background Noise
let scrollPercent = 0;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = maxScroll > 0 ? (scrollPos / maxScroll) : 0; 
    updateParallax();
});

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    updateParallax();
});

function updateParallax() {
    const masterBg = document.getElementById("parallax-master-bg");
    if (masterBg) {
        const moveX = mouseX * 25; 
        const moveY = mouseY * 25;
        masterBg.style.transform = `translate(calc(${moveX}px), calc(-${scrollPercent * 20}vh + ${moveY}px))`;
    }
}

// 2. Điều khiển đóng/mở Accordion cho Consortium & Team
document.querySelectorAll('.mit-acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.mit-acc-content');
        
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            content.style.maxHeight = null;
        } else {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// 3. Tương tác Menu Năm/Tháng & Bộ lọc Tin tức (Sort/Filter News)
document.querySelectorAll('.year-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const block = toggle.parentElement;
        const isActive = block.classList.contains('active');
        const selectedYear = toggle.textContent.trim();
        
        document.querySelectorAll('.year-block').forEach(b => b.classList.remove('active'));
        
        if (!isActive) {
            block.classList.add('active');
            filterNews(selectedYear, null); // Lọc theo năm khi click vào năm
        } else {
            filterNews(null, null); // Hiển thị lại tất cả khi đóng tab năm
        }
    });
});

document.querySelectorAll('.month-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Cập nhật trạng thái active cho tháng được chọn
        document.querySelectorAll('.month-link').forEach(m => m.classList.remove('active'));
        link.classList.add('active');
        
        const parentYear = link.closest('.year-block').querySelector('.year-toggle').textContent.trim();
        const selectedMonth = link.textContent.trim();
        
        filterNews(parentYear, selectedMonth); // Lọc chính xác theo cả Năm và Tháng
    });
});

// Hàm cốt lõi để phân loại và ẩn/hiển thị tin tức
function filterNews(year, month) {
    const cards = document.querySelectorAll('.mit-project-card');
    
    cards.forEach(card => {
        const cardYear = card.getAttribute('data-year');
        const cardMonth = card.getAttribute('data-month');
        
        let matchYear = year ? (cardYear === year) : true;
        let matchMonth = month ? (cardMonth === month) : true;
        
        if (matchYear && matchMonth) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}