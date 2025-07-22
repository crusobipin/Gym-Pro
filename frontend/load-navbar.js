document.addEventListener("DOMContentLoaded", () => {
  fetch('dashboardNavbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
      initializeSidebar();
      attachLogoutHandler();
      setActiveNav(); // 🔥 NEW FUNCTION
      hideAdminLinksIfNotAdmin();
    });
});

// Add this function
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href.includes(currentPage)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Hide Dashboard and Settings links for non-admin users
function hideAdminLinksIfNotAdmin() {
  const token = localStorage.getItem('token');
  if (!token) return;
  let role = null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    role = payload.role;
  } catch (e) {}
  if (role !== 'admin') {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('Admindas') || href.includes('settings')) {
        link.style.display = 'none';
      }
    });
  }
}
