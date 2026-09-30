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
    if (user) {
      localStorage.setItem('procurex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('procurex_user');
    }
  },
  getRole() {
    const user = this.getUser();
    return localStorage.getItem('procurex_role') || (user ? (user.role || 'farmer') : null);
  },
  setRole(role) {
    if (role) {
      localStorage.setItem('procurex_role', role);
    } else {
      localStorage.removeItem('procurex_role');
    }
  },
  getActiveBookingId() {
    return localStorage.getItem('procurex_booking_id') || null;
  },
  setActiveBookingId(id) {
    if (id) {
      localStorage.setItem('procurex_booking_id', id);
    } else {
      localStorage.removeItem('procurex_booking_id');
    }
  },
  clear() {
    localStorage.removeItem('procurex_user');
    localStorage.removeItem('procurex_role');
    localStorage.removeItem('procurex_booking_id');
    sessionStorage.removeItem('post_login_redirect');
  },
  isLoggedIn() {
    return !!this.getUser();
  },
  requireFarmerAuth(target) {
    const user = this.getUser();
    const role = this.getRole();
    if (!user || role !== 'farmer') {
      const current = target || (window.location.pathname.split('/').pop() || 'dashboard.html');
      sessionStorage.setItem('post_login_redirect', current);
      window.location.replace(`login.html?msg=login_required&redirect=${encodeURIComponent(current)}`);
      return null;
    }
    return user;
  },
  requireCentreAuth(target) {
    const user = this.getUser();
    const role = this.getRole();
    if (!user || role !== 'centre') {
      const current = target || (window.location.pathname.split('/').pop() || 'centre-dashboard.html');
      sessionStorage.setItem('post_login_redirect', current);
      window.location.replace(`login.html?tab=centre&msg=login_required&redirect=${encodeURIComponent(current)}`);
      return null;
    }
    return user;
  }
};

// In-memory / session notifications store
let localNotifications = [];

// Route notification directly to the Notifications Icon
function showToast(title, message, type = 'info') {
  const icon = type === 'success' ? '✅' : (type === 'urgent' || type === 'warning' ? '⚠️' : '🔔');
  const notifItem = {
    title,
    message,
    type,
    icon,
    createdAt: new Date().toISOString(),
    read: false
  };

  localNotifications.unshift(notifItem);

  // 1. Ring the notification bell icon
  const bellBtn = document.getElementById('notifBellBtn');
  if (bellBtn) {
    bellBtn.classList.remove('bell-ring');
    void bellBtn.offsetWidth; // trigger reflow
    bellBtn.classList.add('bell-ring');
  }

  // 2. Update badge count on notification icon
  const badge = document.getElementById('notifBadge');
  if (badge) {
    const currentCount = parseInt(badge.textContent || '0', 10) || 0;
    const newCount = currentCount + 1;
    badge.textContent = newCount;
    badge.style.display = 'flex';
  }

  // 3. Show notification attached directly to the Notifications Icon (NOT in bottom right)
  let bellContainer = document.getElementById('notifBellWrapper');
  if (!bellContainer && bellBtn) {
    bellContainer = bellBtn.parentElement;
  }

  if (bellContainer) {
    let existingPopover = document.getElementById('bellPopover');
    if (existingPopover) existingPopover.remove();

    const popover = document.createElement('div');
    popover.id = 'bellPopover';
    popover.className = 'notif-popover';
    popover.style.cssText = `
      position: absolute;
      top: 65px;
      right: 20px;
      width: 340px;
      background: #FFFFFF;
      border: 2px solid var(--primary);
      border-radius: var(--radius-lg);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      padding: 0.85rem 1rem;
      z-index: 2000;
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      animation: notifDropIn 0.25s ease;
      cursor: pointer;
    `;

    popover.innerHTML = `
      <div style="font-size: 1.4rem;">${icon}</div>
      <div style="flex: 1;" onclick="toggleNotificationDrawer()">
        <div style="font-weight: 700; font-size: 0.92rem; color: var(--secondary); margin-bottom: 2px;">${title}</div>
        <div style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.3;">${message}</div>
      </div>
      <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--text-light); font-size:1.2rem; cursor:pointer; line-height:1;">&times;</button>
    `;

    document.body.appendChild(popover);
    setTimeout(() => {
      if (popover && popover.parentElement) popover.remove();
    }, 4500);
  }
}

// Standard Authentication Actions
function logout() {
  Session.clear();
  showToast('Logged Out', 'You have been logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 400);
}


// Update Top Navigation Bar Based on Role & Session
function setupNavbar() {
  const user = Session.getUser();
  const role = Session.getRole();

  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    // Auto-close drawer when any link inside is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Dynamic Navigation Links based on session:
  // Anonymous/Unauthenticated users ONLY see public links (Home, How It Works).
  // Functional portal links (Book Slot, Live Queue, Procurement Status, Dashboard, Payment)
  // are ONLY visible and accessible after the user logs in!
  if (navLinks) {
    if (user && role === 'farmer') {
      navLinks.innerHTML = `
        <li><a href="index.html" data-i18n="nav_home">Home</a></li>
        <li><a href="dashboard.html" data-i18n="nav_dashboard">Dashboard</a></li>
        <li><a href="booking.html" data-i18n="nav_book_slot">Book Slot</a></li>
        <li><a href="queue.html" data-i18n="nav_live_queue">Live Queue</a></li>
        <li><a href="procurement.html" data-i18n="nav_procurement">Procurement</a></li>
        <li><a href="payment.html" data-i18n="nav_payment">Payment</a></li>
      `;
    } else if (user && role === 'centre') {
      navLinks.innerHTML = `
        <li><a href="centre-dashboard.html" data-i18n="nav_centre_dash">Centre Dashboard</a></li>
        <li><a href="centre-dashboard.html#queue-table-section" data-i18n="nav_curr_queue">Current Queue</a></li>
        <li><a href="centre-dashboard.html#analytics-section" data-i18n="nav_cap_analytics">Capacity Analytics</a></li>
      `;
    } else {
      // Unauthenticated / Guest: Only show public information links
      navLinks.innerHTML = `
        <li><a href="index.html" data-i18n="nav_home">Home</a></li>
        <li><a href="index.html#how-it-works" data-i18n="nav_how_it_works">How It Works</a></li>
      `;
    }
  }

  // Active page indicator
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (href && href.startsWith(currentPath) && currentPath !== 'index.html')) {
      a.classList.add('active');
    }
  });

  // Dynamic Navigation based on session
  const navAuthContainer = document.getElementById('navAuthContainer');
  const currentLang = typeof I18N !== 'undefined' ? I18N.getLang() : (localStorage.getItem('procurex_lang') || 'en');

  const langSelectorHtml = `
    <select class="lang-select-input" onchange="if(typeof I18N !== 'undefined') I18N.setLang(this.value)">
      <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🌐 English</option>
      <option value="hi" ${currentLang === 'hi' ? 'selected' : ''}>🌐 हिन्दी</option>
      <option value="te" ${currentLang === 'te' ? 'selected' : ''}>🌐 తెలుగు</option>
      <option value="mr" ${currentLang === 'mr' ? 'selected' : ''}>🌐 मराठी</option>
    </select>
  `;

  if (navAuthContainer) {
    if (user && role === 'farmer') {
      navAuthContainer.innerHTML = `
        ${langSelectorHtml}
        <button id="notifBellBtn" class="notification-bell-btn" title="View Notifications" onclick="toggleNotificationDrawer()">
          🔔
          <span id="notifBadge" class="notif-badge-count" style="display:none;">0</span>
        </button>
        <div class="nav-user-block">
          <span class="nav-user-name">👤 ${user.name.split(' ')[0]}</span>
          <button id="farmerLogoutBtn" onclick="logout()" class="btn btn-outline btn-sm nav-logout-btn" data-i18n="nav_logout">Logout</button>
        </div>
      `;
      fetchUnreadNotifications(user.farmerId || 'FARM1024');
    } else if (user && role === 'centre') {
      navAuthContainer.innerHTML = `
        ${langSelectorHtml}
        <button id="notifBellBtn" class="notification-bell-btn" title="View Notifications" onclick="toggleNotificationDrawer()">
          🔔
          <span id="notifBadge" class="notif-badge-count" style="display:none;">0</span>
        </button>
        <span class="badge badge-blue nav-user-name" data-i18n="centre_staff_badge">🏢 Centre Staff</span>
        <button id="centreLogoutBtn" onclick="logout()" class="btn btn-outline btn-sm nav-logout-btn" data-i18n="nav_logout">Logout</button>
      `;
    } else {
      navAuthContainer.innerHTML = `
        ${langSelectorHtml}
        <a href="login.html" id="farmerLoginBtn" class="btn btn-outline-primary btn-sm" data-i18n="nav_farmer_login">Farmer Login</a>
        <a href="login.html?tab=centre" id="centreLoginBtn" class="btn btn-secondary btn-sm" data-i18n="nav_centre_login">Centre Login</a>
      `;
    }
  }

  if (typeof I18N !== 'undefined') {
    I18N.apply();
  }
}

// In-app Notification Drawer
let notifDrawerOpen = false;
async function toggleNotificationDrawer() {
  let drawer = document.getElementById('notifDrawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'notifDrawer';
    drawer.className = 'notification-drawer';
    drawer.style.cssText = `
      position: fixed;
      top: 72px;
      right: 10px;
      width: min(360px, calc(100vw - 20px));
      max-height: 80vh;
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
    // Clear badge count when opened
    const badge = document.getElementById('notifBadge');
    if (badge) {
      badge.style.display = 'none';
      badge.textContent = '0';
    }

    const user = Session.getUser();
    const farmerId = user ? user.farmerId : 'FARM1024';
    let combined = [...localNotifications];
    try {
      const res = await fetch(`${API_BASE}/notifications/${farmerId}`);
      const data = await res.json();
      if (data.success && data.notifications) {
        combined = [...localNotifications, ...data.notifications];
      }
    } catch (e) {
      console.error(e);
    }

    let itemsHtml = '';
    if (combined.length > 0) {
      itemsHtml = combined.map(n => `
        <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); background: ${n.read ? '#fff' : '#FEF3C7'}; font-size: 0.9rem;">
          <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom: 3px; color: var(--secondary);">
            <span>${n.icon || '🔔'} ${n.title}</span>
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">${new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style="color: var(--text-muted); line-height: 1.35;">${n.message}</div>
        </div>
      `).join('');
    } else {
      itemsHtml = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No notifications</div>`;
    }

    drawer.innerHTML = `
      <div style="padding: 1rem; background: var(--secondary); color: white; display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
        <div style="font-weight: 700;">🔔 Notifications</div>
        <button onclick="toggleNotificationDrawer()" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;">&times;</button>
      </div>
      <div style="overflow-y: auto; max-height: 380px;">${itemsHtml}</div>
    `;
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

// Global click listener to close mobile drawer or notifications when tapping outside
document.addEventListener('click', (e) => {
  const navLinks = document.getElementById('navLinks');
  const toggleBtn = document.getElementById('mobileNavToggle');
  if (navLinks && navLinks.classList.contains('active')) {
    if (!navLinks.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
      navLinks.classList.remove('active');
    }
  }

  const drawer = document.getElementById('notifDrawer');
  const bell = document.getElementById('notifBellBtn');
  if (drawer && notifDrawerOpen) {
    if (!drawer.contains(e.target) && (!bell || !bell.contains(e.target))) {
      drawer.style.display = 'none';
      notifDrawerOpen = false;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
});
