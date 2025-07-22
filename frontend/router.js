// this function loads the page
function loadPage(page) {
    fetch(`${page}.html`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
      });
  }
  // this function attaches the nav link handlers
  function attachNavLinkHandlers() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Remove active class from all
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
        // Add active to current
        this.classList.add('active');
  
        // Load content
        const page = this.getAttribute('href').substring(1); // removes #
        loadPage(page);
      });
    });
  
    // Load default (e.g., dashboard)
    loadPage('dashboard');
  }
  