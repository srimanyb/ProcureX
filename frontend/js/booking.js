/**
 * ProcureX - Slot Booking Logic
 */

let bookingState = {
  commodity: 'Rice',
  centre: 'Central Procurement Centre (APMC Yard)',
  date: '19 September 2026',
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

  if (step === 4) {
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

function selectDate(dateStr, note, element) {
  bookingState.date = dateStr;
  document.querySelectorAll('#stepSection3 .select-card').forEach(c => c.classList.remove('selected'));
  if (element) element.classList.add('selected');
  updateSummary();
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
            <div style="font-size: 0.78rem; color: var(--text-muted);">${s.estimatedWait} wait</div>
          </div>
        `;
      }).join('');
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

  document.getElementById('sumCentre').textContent = bookingState.centre;
  document.getElementById('sumCommodity').textContent = `${bookingState.commodity} (~${bookingState.quantity} Qtl)`;
  document.getElementById('sumDate').textContent = bookingState.date;
  document.getElementById('sumSlot').textContent = bookingState.slot;
  document.getElementById('sumEstQueue').textContent = `~#${bookingState.estimatedQueue}`;
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
  updateSummary();
  const qtyInput = document.getElementById('inputQuantity');
  if (qtyInput) {
    qtyInput.addEventListener('input', updateSummary);
  }
});
