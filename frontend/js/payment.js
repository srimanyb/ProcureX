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
      document.getElementById('payCommodity').textContent = p.commodity;
      document.getElementById('payQuantity').textContent = `${p.quantityQuintals} Quintals`;
      document.getElementById('payRate').textContent = `₹${p.mspRatePerQuintal.toLocaleString('en-IN')} / Qtl`;
      document.getElementById('payTotalAmount').textContent = `₹${p.totalAmount.toLocaleString('en-IN')}`;
      document.getElementById('payAccountInfo').textContent = `Aadhaar Linked: ${p.bankAccountMasked} • Mode: ${p.paymentMode}`;
      document.getElementById('payExpectedDate').textContent = p.processedDate || 'Within 24-48 Hours';

      const badge = document.getElementById('payStatusBadge');
      if (p.status === 'Completed') {
        badge.className = 'badge badge-green';
        badge.textContent = '🟢 Payment Credited (Completed)';
      } else {
        badge.className = 'badge badge-yellow';
        badge.textContent = '🟡 Settlement Processing';
      }

      // Populate history table
      const tbody = document.getElementById('paymentHistoryTableBody');
      if (tbody && p.history) {
        tbody.innerHTML = p.history.map(item => `
          <tr>
            <td style="font-weight: 700; color: var(--secondary);">${item.date}</td>
            <td><span class="badge badge-blue">${item.bookingId}</span></td>
            <td>${item.commodity}</td>
            <td>${item.quantity} Qtl</td>
            <td style="font-weight: 800; color: var(--primary);">₹${item.amount.toLocaleString('en-IN')}</td>
            <td><span class="badge badge-green">✓ ${item.status}</span></td>
            <td style="text-align: right; font-family: monospace; font-size: 0.85rem; color: var(--text-muted);">${item.reference}</td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {
    console.error('Payment error:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadPaymentDetails);

