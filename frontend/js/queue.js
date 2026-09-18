/**
 * ProcureX - Live Queue Tracking & Interactive Simulation Engine
 */

let pollInterval = null;

async function fetchQueueTelemetry() {
  const bookingId = Session.getActiveBookingId() || 'PX10245';

  try {
    const res = await fetch(`${API_BASE}/queue/${bookingId}`);
    const data = await res.json();

    if (data.success) {
      renderQueueDisplay(data);
    }
  } catch (err) {
    console.error('Queue telemetry fetch error:', err);
  }
}

function renderQueueDisplay(data) {
  document.getElementById('qCentreName').textContent = data.centreName;
  document.getElementById('qCentreStatus').textContent = `🟢 ${data.centreStatus}`;
  document.getElementById('qLastUpdated').textContent = data.lastUpdated;
  document.getElementById('qYourNumber').textContent = `#${data.yourQueueNumber}`;
  document.getElementById('qCurrentPosition').textContent = data.currentPosition;
  document.getElementById('qFarmersAhead').textContent = String(data.farmersAhead).padStart(2, '0');
  document.getElementById('qCurrentlyServing').textContent = `#${data.currentlyServing}`;
  document.getElementById('qEstimatedWait').textContent = data.estimatedWaiting;

  // Progress Bar
  let progressPercent = 30;
  if (data.currentPosition === 'YOUR TURN' || data.farmersAhead === 0) {
    progressPercent = 100;
    document.getElementById('qProgressLabel').innerHTML = `<span style="color:var(--primary); font-weight:800;">🚨 YOUR TURN: Please proceed directly to Weighbridge Bay 3!</span>`;
    document.getElementById('qCurrentPosition').style.color = 'var(--primary)';
  } else {
    // scale between 20% and 90%
    const ahead = data.farmersAhead;
    progressPercent = Math.max(15, Math.min(95, 100 - (ahead * 10)));
    document.getElementById('qProgressLabel').textContent = `${progressPercent}% through queue pipeline`;
    document.getElementById('qCurrentPosition').style.color = 'var(--accent)';
  }

  const fill = document.getElementById('qProgressFill');
  if (fill) {
    fill.style.width = `${progressPercent}%`;
  }

  // Render Queue Table
  const tbody = document.getElementById('queueTableBody');
  if (tbody && data.queueList) {
    tbody.innerHTML = data.queueList.map(item => {
      const isYou = item.isCurrentUser;
      let badgeClass = 'badge-yellow';
      let icon = '⏳';

      if (item.status === 'Processing') {
        badgeClass = 'badge-green';
        icon = '⚙️';
      } else if (item.status === 'Completed') {
        badgeClass = 'badge-blue';
        icon = '✓';
      }

      const farmerDisplayName = isYou ? `${item.farmerName} <span class="badge badge-yellow" style="margin-left:6px;">YOU 🚜</span>` : item.farmerName;
      const rowClass = isYou ? 'user-row' : '';

      return `
        <tr class="${rowClass}">
          <td style="font-weight: 800; color: var(--secondary); font-size: 1.1rem;">#${item.queueNumber}</td>
          <td><strong style="color: var(--secondary);">${farmerDisplayName}</strong></td>
          <td>${item.commodity}</td>
          <td>${item.slot}</td>
          <td><span class="badge ${badgeClass}">${icon} ${item.status}</span></td>
          <td style="text-align: right; color: var(--text-muted); font-size: 0.88rem;">
            ${item.status === 'Processing' ? 'At Bay #3' : (item.status === 'Completed' ? 'Finished' : '~10 min')}
          </td>
        </tr>
      `;
    }).join('');

    const badgeCount = document.getElementById('qListSummaryBadge');
    if (badgeCount) {
      badgeCount.textContent = `${data.queueList.length} Farmers in Active Schedule`;
    }
  }
}

// Demo Simulation Button Trigger
async function triggerQueueSimulation() {
  const bookingId = Session.getActiveBookingId() || 'PX10245';
  const btn = document.getElementById('btnSimulate');
  if (btn) btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/queue/simulate/${bookingId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (data.success) {
      showToast(
        data.farmersAhead === 0 ? '🚨 YOUR TURN!' : `Queue Advanced: ${data.currentPosition}`,
        data.note,
        data.farmersAhead === 0 ? 'urgent' : 'success'
      );
      // Refresh display
      await fetchQueueTelemetry();
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Reset Queue Simulation
async function resetQueueSimulation() {
  const bookingId = Session.getActiveBookingId() || 'PX10245';
  try {
    const res = await fetch(`${API_BASE}/queue/reset-simulation/${bookingId}`, {
      method: 'POST'
    });
    const data = await res.json();
    if (data.success) {
      showToast('Queue Reset', 'Restored to baseline queue position #08', 'info');
      await fetchQueueTelemetry();
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchQueueTelemetry();
  // Poll queue telemetry every 5 seconds for live multi-window synchronization
  pollInterval = setInterval(fetchQueueTelemetry, 5000);
});

window.addEventListener('beforeunload', () => {
  if (pollInterval) clearInterval(pollInterval);
});
