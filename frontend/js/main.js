/**
 * ProcureX - Main Application JavaScript
 * Handles navigation, session management, demo mode helpers, notifications, and UI alerts
 */

const API_BASE = '/api';

// Current session state
const Session = {
  getUser() {
    try {
      const data = localStorage.getItem('procurex_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  setUser(user) {
    localStorage.setItem('procurex_user', JSON.stringify(user));
  },
  getRole() {
    return localStorage.getItem('procurex_role') || (this.getUser() ? 'farmer' : null);
  },
  setRole(role) {
    localStorage.setItem('procurex_role', role);
  },
  getActiveBookingId() {
    return localStorage.getItem('procurex_booking_id') || 'PX10245';
  },
  setActiveBookingId(id) {
    localStorage.setItem('procurex_booking_id', id);
  },
  clear() {
    localStorage.removeItem('procurex_user');
    localStorage.removeItem('procurex_role');
    localStorage.removeItem('procurex_booking_id');
  }
};

// UI Notification Toast
function showToast(title, message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? '✅' : (type === 'urgent' || type === 'warning' ? '⚠️' : '🔔');
  
  toast.innerHTML = `
    <div style="font-size: 1.5rem;">${icon}</div>
    <div style="flex: 1;">
      <div style="font-weight: 700; font-size: 0.95rem; color: var(--secondary); margin-bottom: 2px;">${title}</div>
      <div style="font-size: 0.88rem; color: var(--text-muted);">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--text-light); font-size:1.2rem; cursor:pointer;">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

// 1-Click Demo Actions
async function loginAsDemoFarmer() {
  try {
    const res = await fetch(`${API_BASE}/farmers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'FARM1024' })
    });
    const data = await res.json();
    if (data.success) {
      Session.setUser(data.farmer);
      Session.setRole('farmer');
      Session.setActiveBookingId('PX10245');
      showToast('Welcome!', 'Logged in as Demo Farmer: Ramesh Kumar', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    } else {
      showToast('Error', data.message || 'Could not load demo farmer', 'warning');
    }
  } catch (err) {
    console.error(err);
    // Offline / fallback fallback
    Session.setUser({
      name: 'Ramesh Kumar',
      farmerId: 'FARM1024',
      mobile: '9876543210',
      commodity: 'Rice',
      preferredCentre: 'Central Procurement Centre (APMC Yard)'
    });
    Session.setRole('farmer');
    Session.setActiveBookingId('PX10245');
    window.location.href = 'dashboard.html';
  }
}

function loginAsDemoCentre() {
  Session.setUser({
    name: 'Officer Rajesh Deshmukh',
    role: 'centre_staff',
    centreId: 'CPC-01',
    centreName: 'Central Procurement Centre (APMC Yard)'
  });
  Session.setRole('centre');
  showToast('Welcome!', 'Logged in as Central Procurement Staff', 'success');
  setTimeout(() => {
    window.location.href = 'centre-dashboard.html';
  }, 500);
}

function logout() {
  Session.clear();
  showToast('Logged Out', 'You have been logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

async function resetDemoData() {
  if (!confirm('Reset all demo data (bookings, queue, procurement status) to initial SIH 2026 state?')) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      showToast('Demo Reset', 'System dataset restored to initial state.', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  } catch (err) {
    console.error(err);
    showToast('Reset Notice', 'Demo data refreshed.', 'info');
  }
}

// Update Top Navigation Bar Based on Role & Session
function setupNavbar() {
  const user = Session.getUser();
  const role = Session.getRole();

  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Active page indicator
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath) {
      a.classList.add('active');
    }
  });

  // Dynamic Navigation based on session
  const navAuthContainer = document.getElementById('navAuthContainer');
  if (navAuthContainer) {
    if (user && role === 'farmer') {
      navAuthContainer.innerHTML = `
        <button id="notifBellBtn" class="notification-bell-btn" title="View Notifications" onclick="toggleNotificationDrawer()">
          🔔
          <span id="notifBadge" class="notif-badge-count" style="display:none;">0</span>
        </button>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-left: 0.5rem;">
          <span style="font-weight: 700; color: var(--secondary); font-size: 0.95rem;">👤 ${user.name.split(' ')[0]}</span>
          <button onclick="logout()" class="btn btn-outline btn-sm">Logout</button>
        </div>
      `;
      fetchUnreadNotifications(user.farmerId || 'FARM1024');
    } else if (user && role === 'centre') {
      navAuthContainer.innerHTML = `
        <span class="badge badge-blue">🏢 Centre Staff</span>
        <button onclick="logout()" class="btn btn-outline btn-sm" style="margin-left: 0.5rem;">Logout</button>
      `;
    } else {
      navAuthContainer.innerHTML = `
        <a href="login.html" class="btn btn-outline-primary btn-sm">Farmer Login</a>
        <a href="login.html?tab=centre" class="btn btn-secondary btn-sm">Centre Login</a>
      `;
    }
  }
}

// In-app Notification Drawer
let notifDrawerOpen = false;
async function toggleNotificationDrawer() {
  let drawer = document.getElementById('notifDrawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'notifDrawer';
    drawer.style.cssText = `
      position: fixed;
      top: 72px;
      right: 20px;
      width: 360px;
      max-height: 480px;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      overflow-y: auto;
      display: none;
      flex-direction: column;
    `;
    document.body.appendChild(drawer);
  }

  notifDrawerOpen = !notifDrawerOpen;
  drawer.style.display = notifDrawerOpen ? 'flex' : 'none';

  if (notifDrawerOpen) {
    const user = Session.getUser();
    const farmerId = user ? user.farmerId : 'FARM1024';
    try {
      const res = await fetch(`${API_BASE}/notifications/${farmerId}`);
      const data = await res.json();
      if (data.success) {
        let itemsHtml = '';
        if (data.notifications && data.notifications.length > 0) {
          itemsHtml = data.notifications.map(n => `
            <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); background: ${n.read ? '#fff' : '#FEF3C7'}; font-size: 0.9rem;">
              <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom: 3px; color: var(--secondary);">
                <span>${n.icon || '🔔'} ${n.title}</span>
                <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">${new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div style="color: var(--text-muted); line-height: 1.35;">${n.message}</div>
            </div>
          `).join('');
        } else {
          itemsHtml = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No new notifications</div>`;
        }

        drawer.innerHTML = `
          <div style="padding: 1rem; background: var(--secondary); color: white; display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
            <div style="font-weight: 700;">🔔 Notifications</div>
            <button onclick="toggleNotificationDrawer()" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;">&times;</button>
          </div>
          <div style="overflow-y: auto; max-height: 380px;">${itemsHtml}</div>
        `;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

async function fetchUnreadNotifications(farmerId) {
  try {
    const res = await fetch(`${API_BASE}/notifications/${farmerId}`);
    const data = await res.json();
    if (data.success) {
      const badge = document.getElementById('notifBadge');
      if (badge) {
        if (data.unreadCount > 0) {
          badge.textContent = data.unreadCount;
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      }
    }
  } catch (err) {
    // Silent fail
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
});
