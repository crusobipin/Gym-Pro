async function initializeSidebar() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = './login.html';
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/gym/single-gym', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      if (res.ok) {
        const gym = await res.json();
        if (gym.gym_name) {
          document.getElementById('gymName').textContent = gym.gym_name;
        }
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        window.location.href = './login.html';
      }
    } catch (err) {
      console.error('Failed to fetch gym info:', err);
    }
  }
  
  function attachLogoutHandler() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token');
        window.location.href = './login.html';
      });
    }
  }
  