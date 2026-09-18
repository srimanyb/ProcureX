/**
 * ProcureX - Payment Status & History Renderer
 */

async function loadPaymentDetails() {
  const bookingId = Session.getActiveBookingId() || 'PX10245';

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
