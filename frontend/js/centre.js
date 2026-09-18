/**
 * ProcureX - Procurement Centre Management & Queue Control
 */

let pollTimer = null;
let currentQueueData = [];

async function loadCentreDashboard() {
  try {
    const res = await fetch(`${API_BASE}/centre/dashboard`);
    const data = await res.json();

    if (data.success) {
      currentQueueData = data.queue || [];

      // Update Header & Stats
      document.getElementById('centreCurrentlyServing').textContent = `#${data.currentlyServing}`;
      document.getElementById('statTodayFarmers').textContent = data.stats.todayFarmers;
      document.getElementById('statCompleted').textContent = data.stats.completed;
      document.getElementById('statWaiting').textContent = data.stats.waiting;
      document.getElementById('statProcessing').textContent = String(data.stats.processing).padStart(2, '0');
      document.getElementById('statAvgWait').textContent = data.stats.averageWaitTime;
      document.getElementById('statCapacity').textContent = data.stats.capacityUtilization;

      renderCentreQueueTable(data.queue, data.currentlyServing);
    }
  } catch (err) {
    console.error('Centre dashboard fetch error:', err);
  }
}

function renderCentreQueueTable(queueList, currentlyServing) {
  const tbody = document.getElementById('centreQueueTbody');
  if (!tbody || !queueList) return;

  tbody.innerHTML = queueList.map(item => {
    let badgeClass = 'badge-yellow';
    let icon = '⏳';

    if (item.status === 'Processing') {
      badgeClass = 'badge-green';
      icon = '⚙️';
    } else if (item.status === 'Completed') {
      badgeClass = 'badge-blue';
      icon = '✓';
    } else if (item.status === 'Called') {
      badgeClass = 'badge-red';
      icon = '📢';
    }

    const isCurrentServing = item.queueNumber === currentlyServing;
    const isRamesh = item.farmerId === 'FARM1024';
    const rowClass = isCurrentServing ? 'user-row' : (isRamesh ? 'user-row' : '');

    return `
      <tr class="${rowClass}">
        <td style="font-weight: 800; color: var(--secondary); font-size: 1.15rem;">#${item.queueNumber}</td>
        <td>
          <div style="font-weight: 700; color: var(--secondary);">
            ${item.farmerName} ${isRamesh ? '<span class="badge badge-green" style="font-size:0.72rem;">Demo Farmer</span>' : ''}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${item.bookingId || 'PX-MANDI'}</div>
        </td>
        <td><code>${item.farmerId}</code></td>
        <td><strong>${item.commodity}</strong></td>
        <td>${item.slot}</td>
        <td><span class="badge ${badgeClass}">${icon} ${item.status}</span></td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 0.4rem; justify-content: flex-end; flex-wrap: wrap;">
            <button onclick="viewFarmerDetails('${item.bookingId}', '${item.farmerName}', '${item.farmerId}', '${item.commodity}', ${item.queueNumber})" class="btn btn-outline btn-sm" title="View details">
              View
            </button>
            ${item.status === 'Waiting' ? `
              <button onclick="handleDirectCall(${item.queueNumber}, '${item.farmerName}')" class="btn btn-accent btn-sm">
                Call
              </button>
            ` : ''}
            ${item.status === 'Processing' ? `
              <button onclick="handleCompleteProcurement('${item.bookingId}')" class="btn btn-primary btn-sm">
                Complete
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const countBadge = document.getElementById('centreQueueCountBadge');
  if (countBadge) {
    countBadge.textContent = `${queueList.length} Vehicles in Queue`;
  }
}

// Call Next Farmer button action
async function handleCallNextFarmer() {
  const btn = document.getElementById('btnCallNext');
  if (btn) btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/centre/call-next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (data.success) {
      showToast(
        'Next Farmer Called! 📢',
        data.calledFarmer ? `Token #${data.calledFarmer.queueNumber} (${data.calledFarmer.farmerName}) alerted for Bay #3.` : `Serving token advanced to #${data.currentlyServing}`,
        'urgent'
      );
      await loadCentreDashboard();
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Direct Call specific farmer
async function handleDirectCall(queueNum, farmerName) {
  showToast('Farmer Alerted', `Token #${queueNum} (${farmerName}) notified to approach weighbridge.`, 'info');
  handleCallNextFarmer();
}

// Start Procurement
async function handleStartProcurement(bookingId = 'PX10245') {
  try {
    const res = await fetch(`${API_BASE}/centre/start-procurement`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Procurement Started', `Booking ${bookingId} produce is now on weighbridge. Status: Procurement In Progress`, 'success');
      await loadCentreDashboard();
    }
  } catch (err) {
    console.error(err);
  }
}

// Complete Procurement
async function handleCompleteProcurement(bookingId = 'PX10245') {
  const actualWeight = 42.5;
  const grade = 'FAQ Grade-A Paddy';

  try {
    const res = await fetch(`${API_BASE}/centre/complete-procurement`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, actualWeight, grade })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Procurement Completed! 🎉', `Booking ${bookingId} verified: ${actualWeight} Qtl (${grade}). Status: Procurement Completed`, 'success');
      await loadCentreDashboard();
    }
  } catch (err) {
    console.error(err);
  }
}

// Update Payment
async function handleUpdatePayment(bookingId = 'PX10245') {
  try {
    const res = await fetch(`${API_BASE}/centre/update-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Payment Settled (PFMS DBT)', `Status: Payment Processed. ₹${data.payment.totalAmount.toLocaleString('en-IN')} deposited.`, 'success');
      await loadCentreDashboard();
    }
  } catch (err) {
    console.error(err);
  }
}

// Farmer Details Modal
function viewFarmerDetails(bookingId, name, farmerId, commodity, token) {
  document.getElementById('modalFarmerName').textContent = name;
  document.getElementById('modalFarmerId').textContent = farmerId;
  document.getElementById('modalCommodity').textContent = commodity;
  document.getElementById('modalToken').textContent = `#${token}`;
  document.getElementById('modalFarmerTitle').textContent = `Inspection: ${name}`;

  document.getElementById('farmerDetailModal').style.display = 'flex';
}

function openCustomFarmerModal() {
  viewFarmerDetails('PX10245', 'Ramesh Kumar', 'FARM1024', 'Rice', 18);
}

function closeFarmerModal() {
  document.getElementById('farmerDetailModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  loadCentreDashboard();
  pollTimer = setInterval(loadCentreDashboard, 5000);
});

window.addEventListener('beforeunload', () => {
  if (pollTimer) clearInterval(pollTimer);
});
