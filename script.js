
document.addEventListener("DOMContentLoaded", function() {
    (function() {
        try {
            const loginBtnNav = document.getElementById('loginBtn');
            const modal = document.getElementById("loginModal");
            const closeBtn = document.querySelector(".close-btn"); 
            const loginForm = document.getElementById("loginForm");
            
            if (!loginBtnNav) {
                console.warn("Tombol #loginBtn tidak ditemukan.");
                return;
            }

            let loggedInUser = sessionStorage.getItem('loggedInUser');

            if (loggedInUser) {
                loginBtnNav.innerText = 'Logout (' + loggedInUser + ')';
                loginBtnNav.classList.remove('btn-primary');
                loginBtnNav.classList.add('btn-danger');
                
                loginBtnNav.onclick = function(e) {
                    e.preventDefault(); 
                    sessionStorage.removeItem('loggedInUser');
                    alert('Anda telah logout.');
                    window.location.reload();
                };
            } else {
                loginBtnNav.innerText = 'Login';
                loginBtnNav.classList.remove('btn-danger');
                loginBtnNav.classList.add('btn-primary');
                
                loginBtnNav.onclick = function(e) {
                    e.preventDefault(); 
                    if (modal) {
                        modal.style.display = "block"; 
                    } else {
                        alert("Silakan kembali ke halaman Home untuk login.");
                        window.location.href = 'index.html';
                    }
                };
            }

            if (modal && loginForm && closeBtn) {
                
                closeBtn.onclick = function() {
                    modal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const usernameInput = document.getElementById('username');
                    const username = usernameInput.value;

                    if (username.trim() === '') {
                        alert('Username tidak boleh kosong!');
                        return;
                    }
                    sessionStorage.setItem('loggedInUser', username);
                    alert(`Selamat datang, ${username}! Anda berhasil login.`);
                    window.location.reload();
                });
            }

        } catch (e) {
            console.error("Error di Kapsul Login:", e);
        }
    })(); 

    
    (function() {
        try {
            const carouselSlides = document.getElementsByClassName("carousel-slide");
            if (carouselSlides.length > 0) {
                let slideIndex = 0;
                showSlides(); 

                function showSlides() {
                    for (let i = 0; i < carouselSlides.length; i++) {
                        carouselSlides[i].style.display = "none";
                    }
                    slideIndex++;
                    if (slideIndex > carouselSlides.length) { slideIndex = 1; }
                    carouselSlides[slideIndex - 1].style.display = "block";
                    setTimeout(showSlides, 4000); 
                }
            }
        } catch (e) {
            console.error("Error di Kapsul Carousel:", e);
        }
    })(); 


    
    (function() {
        try {
            const toTopBtn = document.getElementById("toTopBtn");
            const progressSection = document.getElementById("donasi");
            let hasAnimated = false;

            window.onscroll = function() {
                if (toTopBtn) {
                    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                        toTopBtn.style.display = "block";
                    } else {
                        toTopBtn.style.display = "none";
                    }
                }
                
                if (progressSection && !hasAnimated) {
                    const rect = progressSection.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        animateProgress();
                        hasAnimated = true;
                    }
                }
            };

            if (toTopBtn) {
                toTopBtn.onclick = function() {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }

            function animateProgress() {
                const progressBar = document.getElementById("progressBar");
                if (!progressBar) return;
                const terkumpul = 78500000;
                const target = 150000000;
                const percentage = (terkumpul / target) * 100;
                progressBar.style.width = percentage + '%';
            }
            
            if (window.onscroll) {
                window.onscroll();
            }

        } catch (e) {
            console.error("Error di Kapsul On-Scroll:", e);
        }
    })(); 


  
    (function() {
        try {
            const menuToggle = document.getElementById('menuToggle');
            const mainNav = document.getElementById('mainNav');

            if (menuToggle && mainNav) {
                menuToggle.addEventListener('click', function() {
                    mainNav.classList.toggle('active');
                });
                mainNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function() {
                        if (mainNav.classList.contains('active')) {
                            mainNav.classList.remove('active');
                        }
                    });
                });
                document.addEventListener('click', function(event) {
                    const isClickInsideNav = mainNav.contains(event.target);
                    const isClickOnToggle = menuToggle.contains(event.target);
                    if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }
                });
            }
        } catch (e) {
            console.error("Error di Kapsul Hamburger Menu:", e);
        }
    })(); 
    
    

    (function() {
        try {
            const donationForm = document.getElementById("donationForm");
            if (!donationForm) return; 

            const nominalButtons = document.querySelectorAll(".nominal-btn");
            const customAmountInput = document.getElementById("customAmount");

            if (nominalButtons.length > 0 && customAmountInput) {
                nominalButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        const amount = this.getAttribute("data-amount");
                        customAmountInput.value = amount;
                        nominalButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
                customAmountInput.addEventListener('input', function() {
                    nominalButtons.forEach(btn => btn.classList.remove('active'));
                });
            }
            
            donationForm.addEventListener("submit", function(e) {
                e.preventDefault(); 
                const amountInput = document.getElementById("customAmount");
                if (!amountInput) return;
                const amount = amountInput.value;
                if (amount < 10000) {
                    alert("Minimal donasi adalah Rp 10.000");
                    return;
                }
                alert("Terima kasih! \nAnda akan diarahkan ke halaman pembayaran...");
            });
        } catch (e) {
            console.error("Error di Kapsul Form Donasi:", e);
        }
    })(); 

});
