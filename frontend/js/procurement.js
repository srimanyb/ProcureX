/**
 * ProcureX - Procurement Timeline Renderer
 */

// Require farmer authentication
Session.requireFarmerAuth('procurement.html');

async function loadProcurementTimeline() {
  const user = Session.getUser();
  if (!user) return;

  let bookingId = Session.getActiveBookingId();
  if (!bookingId) {
    try {
      const profRes = await fetch(`${API_BASE}/farmers/profile/${user.farmerId}`);
      const profData = await profRes.json();
      if (profData.success && profData.latestBooking) {
        bookingId = profData.latestBooking.bookingId;
        Session.setActiveBookingId(bookingId);
      }
    } catch (e) {}
  }

  if (!bookingId) {
    const container = document.getElementById('timelineContainer');
    if (container) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚜</div>
          <h3 style="font-weight: 800; color: var(--secondary);">No Active Procurement In Progress</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">You do not have an active mandi procurement appointment yet.</p>
          <a href="booking.html" class="btn btn-primary">Book a Procurement Slot Now</a>
        </div>
      `;
    }
    document.getElementById('procCommodity').textContent = user.commodity || 'Not Selected';
    document.getElementById('procWeight').textContent = '--';
    document.getElementById('procGrade').textContent = 'Pending Inspection';
    document.getElementById('procMoisture').textContent = '--';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/procurement/${bookingId}`);
    const data = await res.json();

    if (data.success && data.procurement) {
      const p = data.procurement;

      document.getElementById('procCommodity').textContent = p.commodity;
      document.getElementById('procWeight').textContent = `${p.weightQuintals || 42.5} Quintals`;
      document.getElementById('procGrade').textContent = p.qualityGrade || 'FAQ Grade-A';
      document.getElementById('procMoisture').textContent = p.moistureContent || '13.2%';

      const container = document.getElementById('timelineContainer');
      if (container && p.stages) {
        container.innerHTML = p.stages.map((stage, index) => {
          let stateClass = stage.status; // 'completed', 'in-progress', 'pending'
          let iconChar = '○';
          let badgeHtml = '<span class="badge" style="background:#F1F5F9; color:#64748B;">Pending</span>';

          if (stateClass === 'completed') {
            iconChar = '✓';
            badgeHtml = '<span class="badge badge-green">✓ Completed</span>';
          } else if (stateClass === 'in-progress') {
            iconChar = '●';
            badgeHtml = '<span class="badge badge-yellow"><span class="pulse-dot"></span> In Progress</span>';
          }

          return `
            <div class="timeline-item ${stateClass}">
              <div class="timeline-icon">${iconChar}</div>
              <div class="timeline-card">
                <div class="timeline-card-header">
                  <div class="timeline-title">${stage.title}</div>
                  <div>${badgeHtml}</div>
                </div>
                <div class="timeline-desc">${stage.description}</div>
                <div style="display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 0.82rem; color: var(--text-light); border-top: 1px dashed var(--border); padding-top: 0.5rem;">
                  <span>Timestamp: <strong style="color:var(--text-muted);">${stage.timestamp}</strong></span>
                  <span>${stage.officer ? `Officer: <strong>${stage.officer}</strong>` : ''}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  } catch (err) {
    console.error('Procurement status error:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProcurementTimeline);
