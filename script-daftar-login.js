document.addEventListener('DOMContentLoaded', function() {

    // Fungsi untuk menampilkan popup
    function showPopup(modalId, title, message) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalTitle = modal.querySelector('#modalTitle');
            const modalMessage = modal.querySelector('#modalMessage');
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalMessage) modalMessage.textContent = message;

            modal.classList.add('show');

            // Sembunyikan popup setelah 4 detik
            setTimeout(() => {
                modal.classList.remove('show');
            }, 4000);

            // Sembunyikan popup jika user mengklik di luar area konten
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.remove('show');
                }
            }, { once: true });
        }
    }

    // Logika untuk form pendaftaran AKUN (daftar.html)
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman
            
            // Mengambil nilai dari form
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validasi: Pastikan semua field terisi
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Mohon lengkapi semua data untuk membuat akun.');
                return;
            }

            // Validasi: Pastikan password dan konfirmasi password cocok
            if (password !== confirmPassword) {
                alert('Password dan Konfirmasi Password tidak cocok. Silakan coba lagi.');
                return;
            }

            // Tampilkan popup sukses
            showPopup('successModal', 'Akun Berhasil Dibuat!', 'Terima kasih telah mendaftar. Silakan login untuk melanjutkan.');

            // Kosongkan form
            registrationForm.reset();
        });
    }

    // Logika untuk form login (login.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman
            
            // Validasi sederhana
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Mohon masukkan email dan password.');
                return;
            }

            // Tampilkan popup sukses
            showPopup('successModal', 'Login Berhasil!', 'Selamat datang kembali. Anda akan diarahkan.');
            
            // Kosongkan form
            loginForm.reset();
        });
    }

});