/**
 * ProcureX - Slot Booking Logic
 */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const WEEKDAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function getUpcomingDate(daysAhead = 1) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d;
}

function formatDateString(d) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateShort(d) {
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

let bookingState = {
  commodity: 'Rice',
  centre: 'Central Procurement Centre (APMC Yard)',
  date: formatDateString(getUpcomingDate(1)),
  slot: '11:00 AM',
  quantity: 40,
  estimatedQueue: 19
};

let currentStep = 1;

function goToStep(step) {
  if (step < 1 || step > 4) return;
  currentStep = step;

  // Update step sections
  for (let i = 1; i <= 4; i++) {
    const section = document.getElementById(`stepSection${i}`);
    const col = document.getElementById(`stepCol${i}`);
    const circle = document.getElementById(`circle${i}`);

    if (section && col) {
      if (i === step) {
        section.classList.add('active');
        col.classList.add('active');
        col.classList.remove('done');
      } else if (i < step) {
        section.classList.remove('active');
        col.classList.remove('active');
        col.classList.add('done');
        circle.innerHTML = '✓';
      } else {
        section.classList.remove('active');
        col.classList.remove('active');
        col.classList.remove('done');
        circle.innerHTML = i;
      }
    }
  }

  if (step === 3) {
    renderDateGrid();
  } else if (step === 4) {
    loadTimeSlots();
  }
}

function selectCommodity(commodity, mspText, element) {
  bookingState.commodity = commodity;
  document.querySelectorAll('#stepSection1 .select-card').forEach(c => c.classList.remove('selected'));
  if (element) element.classList.add('selected');
  updateSummary();
}

function selectCentre(centreName, loc, element) {
  bookingState.centre = centreName;
  document.querySelectorAll('#stepSection2 .select-card').forEach(c => c.classList.remove('selected'));
  if (element) element.classList.add('selected');
  updateSummary();
}

function renderDateGrid() {
  const container = document.getElementById('dynamicDateGrid');
  if (!container) return;

  const datesConfig = [
    { offset: 1, isRecommended: true },
    { offset: 2 },
    { offset: 3 },
    { offset: 4 }
  ];

  let isAnyQuickCardSelected = false;

  let html = '';
  datesConfig.forEach(item => {
    const d = getUpcomingDate(item.offset);
    const fullDate = formatDateString(d);
    const shortDate = formatDateShort(d);
    const dayOfWeek = WEEKDAY_NAMES[d.getDay()];
    const isSelected = bookingState.date === fullDate;
    if (isSelected) isAnyQuickCardSelected = true;

    let subHtml = '';
    if (item.isRecommended) {
      const recText = typeof I18N !== 'undefined' ? I18N.t('recommended') || 'Recommended' : 'Recommended';
      subHtml = `<span class="badge badge-green" style="font-size:0.7rem; padding:0.12rem 0.35rem;" data-i18n="recommended">${recText}</span>`;
    } else {
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      let label = isWeekend 
        ? (typeof I18N !== 'undefined' ? I18N.t('weekend_window') || 'Weekend Window' : 'Weekend Window') 
        : (typeof I18N !== 'undefined' ? I18N.t(dayOfWeek.toLowerCase()) || dayOfWeek : dayOfWeek);
      subHtml = `<span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${label}</span>`;
    }

    const translatedShortDate = typeof I18N !== 'undefined' ? I18N.translateDate(shortDate) : shortDate;

    html += `
      <div class="select-card ${isSelected ? 'selected' : ''}" onclick="selectDate('${fullDate}', '${item.isRecommended ? 'Recommended' : dayOfWeek}', this)">
        <div class="icon">📅</div>
        <div class="title">${translatedShortDate}</div>
        <div class="sub">${subHtml}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Custom date picker min/max and selection state
  const customInput = document.getElementById('customDateInput');
  const customBox = document.querySelector('.custom-date-box');
  if (customInput) {
    const tomorrow = getUpcomingDate(1);
    const maxDate = getUpcomingDate(30);
    customInput.min = formatDateISO(tomorrow);
    customInput.max = formatDateISO(maxDate);

    if (!isAnyQuickCardSelected && bookingState.date) {
      if (customBox) {
        customBox.style.borderColor = 'var(--primary)';
        customBox.style.backgroundColor = 'var(--primary-subtle)';
      }
    } else {
      if (customBox) {
        customBox.style.borderColor = 'var(--border)';
        customBox.style.backgroundColor = 'var(--bg-main)';
      }
    }
  }
}

function selectDate(dateStr, note, element) {
  bookingState.date = dateStr;
  document.querySelectorAll('#stepSection3 .select-card').forEach(c => c.classList.remove('selected'));
  if (element) {
    element.classList.add('selected');
    const customBox = document.querySelector('.custom-date-box');
    if (customBox) {
      customBox.style.borderColor = 'var(--border)';
      customBox.style.backgroundColor = 'var(--bg-main)';
    }
  }
  updateSummary();
}

function handleCustomDateChange(val) {
  if (!val) return;
  const parts = val.split('-');
  if (parts.length !== 3) return;
  const year = parseInt(parts[0], 10);
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, monthIdx, day);

  const fullDateStr = formatDateString(d);
  bookingState.date = fullDateStr;

  // Deselect quick date cards
  document.querySelectorAll('#stepSection3 .select-card').forEach(c => c.classList.remove('selected'));

  // Highlight custom date box
  const customBox = document.querySelector('.custom-date-box');
  if (customBox) {
    customBox.style.borderColor = 'var(--primary)';
    customBox.style.backgroundColor = 'var(--primary-subtle)';
  }

  updateSummary();
  if (typeof showToast === 'function') {
    const localized = typeof I18N !== 'undefined' ? I18N.translateDate(fullDateStr) : fullDateStr;
    showToast('Date Selected', localized, 'info');
  }
}

function selectSlot(timeStr, status, element) {
  if (status === 'Full') {
    showToast('Slot Full', 'This slot is at maximum capacity. Please choose another time.', 'warning');
    return;
  }
  bookingState.slot = timeStr;
  document.querySelectorAll('.slot-item').forEach(c => c.classList.remove('selected'));
  if (element) element.classList.add('selected');
  updateSummary();
}

async function loadTimeSlots() {
  const container = document.getElementById('slotsContainer');
  if (!container) return;

  container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Loading live slot availability...</div>`;

  try {
    const res = await fetch(`${API_BASE}/bookings/slots/available?centre=${encodeURIComponent(bookingState.centre)}&commodity=${encodeURIComponent(bookingState.commodity)}&date=${encodeURIComponent(bookingState.date)}`);
    const data = await res.json();

    if (data.success && data.slots) {
      container.innerHTML = data.slots.map(s => {
        let badgeClass = 'badge-green';
        let icon = '🟢';
        let isDisabled = s.status === 'Full';

        if (s.status === 'Few Slots Left') {
          badgeClass = 'badge-yellow';
          icon = '🟡';
        } else if (s.status === 'Full') {
          badgeClass = 'badge-red';
          icon = '🔴';
        }

        const isSelected = s.time === bookingState.slot && !isDisabled;

        return `
          <div class="slot-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}" 
               onclick="selectSlot('${s.time}', '${s.status}', this)">
            <div class="slot-time">${s.time}</div>
            <div style="margin-bottom: 0.5rem;">
              <span class="badge ${badgeClass}">${icon} ${s.status}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${typeof I18N !== 'undefined' ? I18N.translateDuration(s.estimatedWait + ' wait') : s.estimatedWait + ' wait'}</div>
          </div>
        `;
      }).join('');
      if (typeof I18N !== 'undefined') I18N.apply();
    }
  } catch (err) {
    console.error(err);
  }
}

function updateSummary() {
  const qtyInput = document.getElementById('inputQuantity');
  if (qtyInput) {
    bookingState.quantity = parseFloat(qtyInput.value) || 40;
  }

  document.getElementById('sumCentre').textContent = typeof I18N !== 'undefined' ? I18N.translateText(bookingState.centre) : bookingState.centre;
  document.getElementById('sumCommodity').textContent = `${typeof I18N !== 'undefined' ? I18N.translateCommodity(bookingState.commodity) : bookingState.commodity} (~${bookingState.quantity} Qtl)`;
  document.getElementById('sumDate').textContent = typeof I18N !== 'undefined' ? I18N.translateDate(bookingState.date) : bookingState.date;
  document.getElementById('sumSlot').textContent = bookingState.slot;
  document.getElementById('sumEstQueue').textContent = `~#${bookingState.estimatedQueue}`;
  if (typeof I18N !== 'undefined') I18N.apply();
}

// Require farmer login before accessing booking page
const currentFarmer = Session.requireFarmerAuth('booking.html');

async function confirmSlotBooking() {
  const user = Session.getUser();
  if (!user) {
    Session.requireFarmerAuth('booking.html');
    return;
  }

  const payload = {
    farmerId: user.farmerId,
    farmerName: user.name,
    farmerMobile: user.mobile,
    commodity: bookingState.commodity,
    centre: bookingState.centre,
    date: bookingState.date,
    slot: bookingState.slot,
    estimatedQuantity: bookingState.quantity
  };

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success && data.booking) {
      Session.setActiveBookingId(data.booking.bookingId);
      showToast('Booking Confirmed!', `Booking ID: ${data.booking.bookingId}`, 'success');
      setTimeout(() => {
        window.location.href = `confirmation.html?id=${data.booking.bookingId}`;
      }, 700);
    } else {
      showToast('Booking Error', data.message, 'warning');
    }
  } catch (err) {
    console.error(err);
    showToast('Error', 'Could not complete booking', 'warning');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (currentFarmer) {
    if (currentFarmer.commodity) bookingState.commodity = currentFarmer.commodity;
    if (currentFarmer.preferredCentre) bookingState.centre = currentFarmer.preferredCentre;
  }
  renderDateGrid();
  updateSummary();
  const qtyInput = document.getElementById('inputQuantity');
  if (qtyInput) {
    qtyInput.addEventListener('input', updateSummary);
  }
});

window.addEventListener('procurex-language-changed', () => {
  renderDateGrid();
  updateSummary();
  if (currentStep === 4) {
    loadTimeSlots();
  }
});
