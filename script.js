document.addEventListener('DOMContentLoaded', function() {
    // Fungsi Dropdown untuk tampilan mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownToggle.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) { // Sesuaikan breakpoint dengan CSS Anda
                event.preventDefault();
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Tutup dropdown jika diklik di luar pada tampilan mobile
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

    // Inisialisasi Swiper untuk Testimonial (jika ada di halaman ini)
    if (typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            },
        });
    } else {
        console.warn("Swiper library not loaded. Testimonial carousel will not function.");
    }

    // Logika Pengiriman Formulir Pendaftaran (untuk register.html)
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman formulir default

            // Ambil nilai-nilai formulir
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const course = document.getElementById('course').value;
            const schedule = document.getElementById('schedule').value;
            const phone = document.getElementById('phone').value; // Ambil nomor telepon
            const message = document.getElementById('message').value; // Ambil pesan tambahan

            // Validasi dasar
            if (!fullName || !email || !course || !schedule) {
                // Tampilkan modal kustom untuk pesan error
                showCustomModal('Error!', 'Mohon lengkapi semua bidang yang wajib diisi.', 'red');
                return;
            }

            // Di aplikasi nyata, Anda akan mengirim data ini ke server backend
            // menggunakan AJAX (fetch API atau XMLHttpRequest)
            console.log('Formulir Pendaftaran Dikirim:');
            console.log('Nama Lengkap:', fullName);
            console.log('Email:', email);
            console.log('Nomor WhatsApp:', phone);
            console.log('Pilihan Kursus:', course);
            console.log('Pilihan Jadwal:', schedule);
            console.log('Pesan Tambahan:', message);

            // Tampilkan modal sukses
            showCustomModal('Pendaftaran Berhasil!', 'Terima kasih! Pendaftaran Anda telah kami terima.', 'green');

            // Kosongkan formulir setelah pengiriman
            registrationForm.reset();
        });

        // Pre-fill pilihan kursus jika datang dari courses.html
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCourse = urlParams.get('course');
        if (selectedCourse) {
            const courseSelect = document.getElementById('course');
            // Pastikan nilai yang diambil dari URL ada di opsi select
            if (courseSelect) {
                const optionExists = Array.from(courseSelect.options).some(option => option.value === selectedCourse);
                if (optionExists) {
                    courseSelect.value = selectedCourse;
                }
            }
        }
    }

    // Fungsi untuk menampilkan modal kustom (menggantikan alert)
    function showCustomModal(title, message, type = 'info') {
        let modal = document.getElementById('successModal'); // Menggunakan ID modal yang sudah ada
        if (!modal) {
            // Jika modal belum ada, buat (ini seharusnya tidak terjadi jika HTML sudah benar)
            modal = document.createElement('div');
            modal.id = 'successModal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        const modalContent = modal.querySelector('.modal-content');
        if (!modalContent) {
            // Jika modal content belum ada, buat
            modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modal.appendChild(modalContent);
        }

        let iconClass = 'fas fa-info-circle'; // Default info icon
        let iconColor = 'var(--primary-color)'; // Default color

        if (type === 'success' || type === 'green') {
            iconClass = 'fas fa-check-circle';
            iconColor = 'var(--accent-color, #28a745)'; // Menggunakan --accent-color jika ada, fallback ke hijau
        } else if (type === 'error' || type === 'red') {
            iconClass = 'fas fa-times-circle';
            iconColor = '#dc3545'; // Merah untuk error
        }

        modalContent.innerHTML = `
            <i class="${iconClass} checkmark-icon" style="color: ${iconColor};"></i>
            <h3>${title}</h3>
            <p>${message}</p>
        `;

        // Tampilkan modal
        modal.classList.add('show');
        modalContent.classList.add('show'); // Untuk animasi translateY

        // Tutup modal saat diklik di luar konten modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) { // Hanya jika klik langsung pada overlay modal
                modal.classList.remove('show');
                modalContent.classList.remove('show');
                setTimeout(() => {
                    // Opsional: hapus modal dari DOM setelah animasi selesai jika dibuat secara dinamis
                    // atau jika Anda ingin membersihkan DOM
                    // if (modal.parentNode) modal.parentNode.removeChild(modal);
                }, 400); // Sesuaikan dengan durasi transisi CSS
            }
        }, { once: true }); // Hanya jalankan sekali

        // Tutup modal secara otomatis setelah 5 detik
        setTimeout(() => {
            modal.classList.remove('show');
            modalContent.classList.remove('show');
            setTimeout(() => {
                // if (modal.parentNode) modal.parentNode.removeChild(modal);
            }, 400);
        }, 5000);
    }

    // Logika Interaktif FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Tutup semua FAQ lain yang terbuka
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle FAQ yang diklik
            item.classList.toggle('active');
        });
    });
});
