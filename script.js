document.addEventListener("DOMContentLoaded", function() {

    // --- 1. FUNGSI MODAL LOGIN ---
    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.querySelector(".close-btn");

    if (loginBtn) {
        loginBtn.onclick = function() { modal.style.display = "block"; }
    }
    if (closeBtn) {
        closeBtn.onclick = function() { modal.style.display = "none"; }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- 2. FUNGSI CAROUSEL ---
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("carousel-slide");
        if (slides.length === 0) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000);
    }

    // --- 3. FUNGSI TOMBOL "BACK TO TOP" ---
    const toTopBtn = document.getElementById("toTopBtn");
    
    window.onscroll = function() {
        scrollFunction();
        checkProgressSection(); 
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    }

    toTopBtn.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // --- 4. FUNGSI INTERAKTIF: PROGRESS BAR & COUNTER ---
    const progressSection = document.getElementById("donasi");
    let hasAnimated = false; 

    function checkProgressSection() {
        if (hasAnimated) return;

        const rect = progressSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            animateProgress();
            hasAnimated = true;
        }
    }

    function animateProgress() {
        const progressBar = document.getElementById("progressBar");
        const terkumpul = 78500000;
        const target = 150000000;
        const percentage = (terkumpul / target) * 100;
        
        progressBar.style.width = percentage + '%';

        const counters = document.querySelectorAll('.counter');
        const speed = 200; 

        counters.forEach(counter => {
            const updateCount = () => {
                const targetVal = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, ''); 
                
                const inc = targetVal / speed;

                if (count < targetVal) {
                    let newCount = Math.ceil(count + inc);
                    if (newCount > targetVal) newCount = targetVal; 

                    if (counter.getAttribute('data-target') === "78500000") {
                        counter.innerText = 'Rp ' + newCount.toLocaleString('id-ID');
                    } else {
                        counter.innerText = newCount.toLocaleString('id-ID');
                    }

                    setTimeout(updateCount, 10);
                } else {
                    if (counter.getAttribute('data-target') === "78500000") {
                        counter.innerText = 'Rp ' + targetVal.toLocaleString('id-ID');
                    } else {
                        counter.innerText = targetVal.toLocaleString('id-ID');
                    }
                }
            };
            updateCount();
        });
    }

    checkProgressSection();

    // --- 5. FUNGSI HAMBURGER MENU (BARU) ---
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Tutup menu saat link diklik (agar lebih ramah mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });

        // Tutup menu saat mengklik di luar menu atau tombol toggle (opsional, tapi bagus untuk UX)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    }
});