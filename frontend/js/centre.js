// Require Centre Staff authentication
Session.requireCentreAuth('centre-dashboard.html');

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

  const currentLang = typeof I18N !== 'undefined' ? I18N.getLang() : 'en';

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
    const rowClass = isCurrentServing ? 'user-row' : '';

    const statusKey = 'status_' + item.status.toLowerCase();
    const translatedStatus = typeof I18N !== 'undefined' ? I18N.t(statusKey) : item.status;
    const viewText = typeof I18N !== 'undefined' ? I18N.t('btn_view') : 'View';
    const callText = typeof I18N !== 'undefined' ? I18N.t('btn_call') : 'Call';
    const completeText = typeof I18N !== 'undefined' ? I18N.t('btn_complete') : 'Complete';

    return `
      <tr class="${rowClass}">
        <td style="font-weight: 800; color: var(--secondary); font-size: 1.15rem;">#${item.queueNumber}</td>
        <td>
          <div style="font-weight: 700; color: var(--secondary);">
            ${item.farmerName}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${item.bookingId || 'PX-MANDI'}</div>
        </td>
        <td><code>${item.farmerId}</code></td>
        <td><strong>${item.commodity}</strong></td>
        <td>${item.slot}</td>
        <td><span class="badge ${badgeClass}">${icon} ${translatedStatus}</span></td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 0.4rem; justify-content: flex-end; flex-wrap: wrap;">
            <button onclick="viewFarmerDetails('${item.bookingId}', '${item.farmerName}', '${item.farmerId}', '${item.commodity}', ${item.queueNumber})" class="btn btn-outline btn-sm" title="View details">
              ${viewText}
            </button>
            ${item.status === 'Waiting' ? `
              <button onclick="handleDirectCall(${item.queueNumber}, '${item.farmerName}')" class="btn btn-accent btn-sm">
                ${callText}
              </button>
            ` : ''}
            ${item.status === 'Processing' ? `
              <button onclick="handleCompleteProcurement('${item.bookingId}')" class="btn btn-primary btn-sm">
                ${completeText}
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const countBadge = document.getElementById('centreQueueCountBadge');
  if (countBadge) {
    const vehText = typeof I18N !== 'undefined' ? I18N.t('vehicles_in_queue') : 'Vehicles in Queue';
    countBadge.textContent = `${queueList.length} ${vehText}`;
  }
  return;
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

// ==========================================
// QR Scanner & Pass Verification Module
// ==========================================
let qrCameraStream = null;
let qrScanAnimFrame = null;
let activeVerifiedBooking = null;

function openQrScannerModal() {
  const modal = document.getElementById('qrScannerModal');
  if (modal) modal.style.display = 'flex';
  switchScanTab('camera');
}

function closeQrScannerModal() {
  stopCameraStream();
  const modal = document.getElementById('qrScannerModal');
  if (modal) modal.style.display = 'none';
}

function switchScanTab(tabName) {
  const tabs = ['camera', 'upload', 'manual'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const panel = document.getElementById(`scanMode${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.style.display = (t === tabName) ? 'block' : 'none';
  });

  if (tabName === 'camera') {
    startCameraStream();
  } else {
    stopCameraStream();
  }

  if (tabName === 'manual') {
    setTimeout(() => {
      const input = document.getElementById('manualBookingInput');
      if (input) input.focus();
    }, 100);
  }
}

async function startCameraStream() {
  stopCameraStream();
  const video = document.getElementById('qrVideo');
  const statusOverlay = document.getElementById('cameraStatusOverlay');
  const statusMsg = document.getElementById('cameraStatusMsg');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusOverlay && statusMsg) {
      statusMsg.innerHTML = '⚠️ Camera not supported in this browser environment.<br><small style="color:#94A3B8;">Please use the "Upload Pass Image" or "Manual" tab above.</small>';
      statusOverlay.style.display = 'flex';
    }
    return;
  }

  try {
    if (statusOverlay) statusOverlay.style.display = 'none';
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
    });
    qrCameraStream = stream;
    if (video) {
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      await video.play();
      qrScanAnimFrame = requestAnimationFrame(scanVideoFrame);
    }
  } catch (err) {
    console.warn('Camera access issue:', err);
    if (statusOverlay && statusMsg) {
      statusMsg.innerHTML = `⚠️ Camera unavailable: ${err.name || 'Permission needed'}<br><small style="color:#94A3B8;">Please use the "Upload Pass Image" or "Manual" tab above.</small>`;
      statusOverlay.style.display = 'flex';
    }
  }
}

function stopCameraStream() {
  if (qrScanAnimFrame) {
    cancelAnimationFrame(qrScanAnimFrame);
    qrScanAnimFrame = null;
  }
  if (qrCameraStream) {
    qrCameraStream.getTracks().forEach(track => track.stop());
    qrCameraStream = null;
  }
  const video = document.getElementById('qrVideo');
  if (video) video.srcObject = null;
}

function restartCameraStream() {
  startCameraStream();
}

function scanVideoFrame() {
  const video = document.getElementById('qrVideo');
  const canvas = document.getElementById('qrCanvas');

  if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        console.log('QR Code scanned from camera:', code.data);
        playBeepTone();
        stopCameraStream();
        processPassQrPayload(code.data);
        return;
      }
    }
  }

  qrScanAnimFrame = requestAnimationFrame(scanVideoFrame);
}

// Upload & decode Pass photo
async function handlePassImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const feedback = document.getElementById('fileUploadFeedback');
  if (feedback) feedback.innerHTML = '<em>Reading pass image... ⏳</em>';

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (typeof jsQR !== 'undefined') {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });

        if (code && code.data) {
          if (feedback) feedback.innerHTML = '<span style="color: #059669; font-weight: 700;">✓ QR Code Decoded Successfully!</span>';
          playBeepTone();
          processPassQrPayload(code.data);
        } else {
          if (feedback) feedback.innerHTML = '<span style="color: #DC2626; font-weight: 600;">❌ No QR code detected in this image. Please upload a clear photo of the pass QR code.</span>';
        }
      } else {
        if (feedback) feedback.innerHTML = '<span style="color: #DC2626;">QR reader engine not loaded.</span>';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Manual or barcode gun verification
function handleManualPassVerify() {
  const input = document.getElementById('manualBookingInput');
  const val = input ? input.value.trim() : '';
  if (!val) {
    showToast('Input Required', 'Please enter a Booking ID (e.g. PX10245) or scan a QR barcode.', 'warning');
    return;
  }
  processPassQrPayload(val);
}

// Core processor for decoded QR string / URL / Booking ID
async function processPassQrPayload(payload) {
  try {
    let bookingId = String(payload).trim();

    // Check if payload is a URL or query string with ?id=
    const urlMatch = bookingId.match(/[?&]id=([A-Za-z0-9_-]+)/i);
    if (urlMatch) {
      bookingId = urlMatch[1];
    } else {
      const pxMatch = bookingId.match(/(PX[0-9]+)/i);
      if (pxMatch) {
        bookingId = pxMatch[1];
      }
    }

    // Call backend to verify pass
    const res = await fetch(`${API_BASE}/centre/scan-pass?bookingId=${encodeURIComponent(bookingId)}`);
    const data = await res.json();

    if (data.success && data.booking) {
      closeQrScannerModal();
      displayVerifiedPassModal(data);
      showToast('Pass Verified! 🎫', `Token #${data.booking.queueNumber} (${data.booking.farmerName}) verified at Mandi Gate.`, 'success');
    } else {
      showToast('Pass Not Found', data.message || `No valid appointment found for "${bookingId}".`, 'error');
    }
  } catch (err) {
    console.error('Error verifying pass payload:', err);
    showToast('Verification Error', 'Failed to communicate with Mandi Registry server.', 'error');
  }
}

// Populate and show the Verified Pass Modal
function displayVerifiedPassModal(data) {
  const b = data.booking;
  const proc = data.procurementStatus;
  activeVerifiedBooking = b;

  document.getElementById('verifiedBookingId').textContent = b.bookingId;
  document.getElementById('verifiedTokenNumber').textContent = `#${b.queueNumber}`;
  document.getElementById('verifiedFarmerName').textContent = b.farmerName;
  document.getElementById('verifiedFarmerId').textContent = b.farmerId;
  document.getElementById('verifiedFarmerMobile').textContent = `(${b.farmerMobile || '9876543210'})`;
  document.getElementById('verifiedCommodity').textContent = b.commodity;
  document.getElementById('verifiedQuantity').textContent = `${b.estimatedQuantity || 42.5} Qtl`;
  document.getElementById('verifiedDateSlot').textContent = `${b.date} • ${b.slot}`;
  
  const statusBadge = document.getElementById('verifiedStatusBadge');
  if (statusBadge) {
    statusBadge.textContent = b.status;
    statusBadge.className = 'badge ' + (b.status === 'Completed' ? 'badge-blue' : (b.status === 'Arrived' || b.status === 'In Progress' ? 'badge-green' : 'badge-yellow'));
  }

  if (proc && proc.moistureContent) {
    const moistureEl = document.getElementById('verifiedMoisture');
    if (moistureEl) moistureEl.textContent = proc.moistureContent;
  }

  const admitBtn = document.getElementById('btnAdmitFarmer');
  if (admitBtn) {
    if (b.status === 'Arrived' || b.status === 'In Progress' || b.status === 'Completed') {
      admitBtn.textContent = '✓ Already Admitted';
      admitBtn.disabled = true;
      admitBtn.style.opacity = '0.6';
    } else {
      admitBtn.textContent = '✓ Admit Farmer (Mark Arrived)';
      admitBtn.disabled = false;
      admitBtn.style.opacity = '1';
    }
  }

  const modal = document.getElementById('scannedPassVerifyModal');
  if (modal) modal.style.display = 'flex';
}

function closeVerifiedPassModal() {
  const modal = document.getElementById('scannedPassVerifyModal');
  if (modal) modal.style.display = 'none';
  activeVerifiedBooking = null;
}

// Action: Staff clicks "Admit Farmer (Mark Arrived)"
async function handleAdmitScannedFarmer() {
  if (!activeVerifiedBooking) return;
  const bookingId = activeVerifiedBooking.bookingId;

  try {
    const res = await fetch(`${API_BASE}/centre/admit-farmer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    });
    const data = await res.json();

    if (data.success) {
      showToast('Farmer Admitted! 🚜', `Gate clearance granted for ${activeVerifiedBooking.farmerName} (Token #${activeVerifiedBooking.queueNumber}).`, 'success');
      
      const statusBadge = document.getElementById('verifiedStatusBadge');
      if (statusBadge) {
        statusBadge.textContent = 'Arrived';
        statusBadge.className = 'badge badge-green';
      }
      const admitBtn = document.getElementById('btnAdmitFarmer');
      if (admitBtn) {
        admitBtn.textContent = '✓ Admitted at Gate';
        admitBtn.disabled = true;
      }

      await loadCentreDashboard();
    } else {
      showToast('Error', data.message || 'Could not update arrival status.', 'error');
    }
  } catch (err) {
    console.error(err);
    showToast('Network Error', 'Could not record arrival.', 'error');
  }
}

// Action: Staff clicks "Send to Weighbridge"
async function handleStartProcurementFromScan() {
  if (!activeVerifiedBooking) return;
  const bookingId = activeVerifiedBooking.bookingId;
  closeVerifiedPassModal();
  await handleStartProcurement(bookingId);
}

function playBeepTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  loadCentreDashboard();
  pollTimer = setInterval(loadCentreDashboard, 5000);
});

window.addEventListener('beforeunload', () => {
  if (pollTimer) clearInterval(pollTimer);
  stopCameraStream();
});

window.addEventListener('procurex-language-changed', () => {
  if (currentQueueData && currentQueueData.length > 0) {
    const servingEl = document.getElementById('centreCurrentlyServing');
    const serving = servingEl ? parseInt((servingEl.textContent || '0').replace('#', '')) || 0 : 0;
    renderCentreQueueTable(currentQueueData, serving);
  }
});

