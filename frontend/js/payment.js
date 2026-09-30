// Require farmer authentication
Session.requireFarmerAuth('payment.html');

async function loadPaymentDetails() {
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
    document.getElementById('payTxnId').textContent = 'None';
    document.getElementById('payCommodity').textContent = user.commodity || 'Produce';
    document.getElementById('payQuantity').textContent = '0 Quintals';
    document.getElementById('payRate').textContent = 'MSP Benchmark';
    document.getElementById('payTotalAmount').textContent = '₹0.00';
    document.getElementById('payAccountInfo').textContent = 'Aadhaar / DBT Linked Account';
    document.getElementById('payExpectedDate').textContent = 'Pending Slot Completion';
    const badge = document.getElementById('payStatusBadge');
    if (badge) {
      badge.className = 'badge';
      badge.textContent = '⚪ No Active Payment Due';
    }
    const tbody = document.getElementById('paymentHistoryTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">
            No procurement payment records found for this account.
          </td>
        </tr>
      `;
    }
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/payment/${bookingId}`);
    const data = await res.json();

    if (data.success && data.payment) {
      const p = data.payment;

      document.getElementById('payTxnId').textContent = p.transactionId;
      document.getElementById('payCommodity').textContent = I18N.translateCommodity(p.commodity);
      document.getElementById('payQuantity').textContent = `${p.quantityQuintals} ${I18N.translateText('Quintals')}`;
      document.getElementById('payRate').textContent = `₹${p.mspRatePerQuintal.toLocaleString('en-IN')} / Qtl`;
      document.getElementById('payTotalAmount').textContent = `₹${p.totalAmount.toLocaleString('en-IN')}`;
      document.getElementById('payAccountInfo').textContent = `${I18N.translateText('Aadhaar Linked')}: ${p.bankAccountMasked} • ${I18N.translateText('Mode')}: ${I18N.translatePaymentMode(p.paymentMode)}`;
      document.getElementById('payExpectedDate').textContent = I18N.translateDate(p.processedDate || 'Within 24-48 Hours');

      const badge = document.getElementById('payStatusBadge');
      if (p.status === 'Completed') {
        badge.className = 'badge badge-green';
        badge.textContent = `🟢 ${I18N.translateText('Payment Credited (Completed)')}`;
      } else {
        badge.className = 'badge badge-yellow';
        badge.textContent = `🟡 ${I18N.translateText('Settlement Processing')}`;
      }

      // Populate history table
      const tbody = document.getElementById('paymentHistoryTableBody');
      const histBadge = document.getElementById('payHistoryBadge');
      if (tbody) {
        if (p.history && p.history.length > 0) {
          if (histBadge) {
            histBadge.textContent = `${p.history.length} Past Payouts Recorded`;
            histBadge.className = 'badge badge-green';
          }
          tbody.innerHTML = p.history.map(item => `
            <tr>
              <td style="font-weight: 700; color: var(--secondary);">${I18N.translateDate(item.date)}</td>
              <td><span class="badge badge-blue">${item.bookingId}</span></td>
              <td>${I18N.translateCommodity(item.commodity)}</td>
              <td>${item.quantity} Qtl</td>
              <td style="font-weight: 800; color: var(--primary);">₹${item.amount.toLocaleString('en-IN')}</td>
              <td><span class="badge badge-green">✓ ${I18N.translateStatus(item.status)}</span></td>
              <td style="text-align: right; font-family: monospace; font-size: 0.85rem; color: var(--text-muted);">${item.reference}</td>
            </tr>
          `).join('');
        } else {
          if (histBadge) {
            histBadge.textContent = '0 Past Payouts Recorded';
            histBadge.className = 'badge badge-yellow';
          }
          tbody.innerHTML = `
            <tr>
              <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                📋 No past payment settlements on record yet. Payout advice for active booking will be credited within 24-48 hours after weighbridge verification.
              </td>
            </tr>
          `;
        }
      }
    }
  } catch (err) {
    console.error('Payment error:', err);
  }

  I18N.apply();
}

document.addEventListener('DOMContentLoaded', loadPaymentDetails);
window.addEventListener('procurex-language-changed', () => {
  loadPaymentDetails();
});

