document.addEventListener('DOMContentLoaded', function() {
    // Basic dropdown functionality (for mobile/simpler cases)
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownToggle.addEventListener('click', function(event) {
            // Only prevent default if it's a mobile view or if dropdown should toggle
            // On desktop, CSS :hover handles it
            if (window.innerWidth <= 768) { // Adjust breakpoint as per your CSS media query
                event.preventDefault();
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close dropdowns if clicked outside (for mobile/JS toggled)
    window.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (!dropdown.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    });

    // Inisialisasi Swiper untuk Testimonial (dipindahkan dari HTML ke sini)
    // Pastikan Swiper.js library dimuat di HTML sebelum script.js ini.
    if (typeof Swiper !== 'undefined') { // Periksa apakah Swiper sudah dimuat
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1, // Default: 1 slide untuk mobile
            spaceBetween: 30,
            loop: true, // Mengulang slide setelah slide terakhir
            autoplay: {
                delay: 3000, // Otomatis bergerak setiap 3 detik
                disableOnInteraction: false, // Melanjutkan autoplay setelah interaksi pengguna
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true, // Pagination bisa diklik
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: { // Untuk layar >= 640px
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: { // Untuk layar >= 768px (seperti yang terlihat di gambar)
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: { // Untuk layar >= 1024px
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
    } else {
        console.warn("Swiper library not loaded. Testimonial carousel will not function.");
    }


    // Example for a form submission (on register.html)
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            const schedule = document.getElementById('schedule').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!fullName || !email || !course || !schedule) {
                alert('Mohon lengkapi semua bidang yang wajib diisi.');
                return;
            }

            // In a real application, you would send this data to a backend server
            // using AJAX (fetch API or XMLHttpRequest)
            console.log('Form Submitted:');
            console.log('Nama Lengkap:', fullName);
            console.log('Email:', email);
            console.log('Nomor Telepon:', phone);
            console.log('Pilihan Kursus:', course);
            console.log('Pilihan Jadwal:', schedule);
            console.log('Pesan Tambahan:', message);

            alert('Terima kasih! Pendaftaran Anda telah kami terima.');
            registrationForm.reset(); // Clear the form
        });
    }

    // Specific JS for contact form (on contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            if (!name || !email || !message) {
                alert('Mohon lengkapi semua bidang yang wajib diisi.');
                return;
            }

            console.log('Contact Form Submitted:');
            console.log('Nama:', name);
            console.log('Email:', email);
            console.log('Subjek:', subject);
            console.log('Pesan:', message);

            alert('Terima kasih! Pesan Anda telah kami terima dan akan segera kami balas.');
            contactForm.reset();
        });
    }

    // Perbaikan untuk pre-fill course selection jika datang dari courses.html
    // Ini harus berada di register.html, atau di sini jika script.js dimuat di semua halaman
    // Jika script.js dimuat di semua halaman, ini akan dijalankan di index.html juga, tapi tidak akan berpengaruh
    // kecuali ada elemen dengan id 'course'
    if (document.getElementById('course')) { // Hanya jalankan jika elemen 'course' ada di halaman
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCourse = urlParams.get('course');
        if (selectedCourse) {
            document.getElementById('course').value = selectedCourse;
        }
    }
});