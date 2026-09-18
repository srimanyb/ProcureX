# 🌾 ProcureX – Smart Agricultural Procurement Platform

**Smart India Hackathon 2026**  
**Problem Statement ID:** `SIH26032`  
**Problem Statement Title:** *"Farmers often face long waiting times, lack of information regarding procurement schedules, and uncertainty about procurement status."*  
**Theme:** Smart Automation  
**Category:** Software  

---

## 📌 Executive Summary

ProcureX is a farmer-first digital procurement scheduling and queue management platform designed to eliminate multi-day mandi delays, reduce avoidable transport bottlenecks, and provide a 100% transparent trail from initial booking to direct bank payment (DBT).

### 🎯 Core Capabilities
1. **Digital Slot Booking**: Farmers choose convenient intake time slots based on real-time mandi capacity.
2. **Live Queue Telemetry**: Live token tracking (#18, currently serving #11, ~35 min wait) with an interactive **Queue Movement Simulator**.
3. **Transparent 6-Stage Timeline**: Complete audit trail (Slot Booked &rarr; Farmer Arrived &rarr; Verification Completed &rarr; Procurement In Progress &rarr; Procurement Completed &rarr; Payment Processed).
4. **Direct MSP Payment Tracking**: Transparent MSP calculations (Quintals × Govt Rate) and Aadhaar-linked PFMS DBT ledger history.
5. **Procurement Centre Dashboard**: APMC yard staff portal to view today's bookings, call the next farmer, update procurement stages, and monitor hourly load analytics.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Modern Vanilla JavaScript (no heavy frontend framework dependencies for maximum performance and elderly farmer accessibility).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **Architecture**: Modular RESTful APIs with automated database seeding and local demo state management.

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (running locally on default port `27017`)

### 2. Installation
Open PowerShell or terminal in the project directory:
```bash
cd c:\Users\srima\OneDrive\Desktop\ProcureX
npm install
```

### 3. Seed Demo Data
To populate the database with realistic SIH 2026 data:
```bash
npm run seed
```

### 4. Run Server
```bash
npm start
```
The application will launch at: **`http://localhost:3000`**

---

## 👤 SIH 2026 Demo Credentials & Walkthrough

The platform includes **1-Click Demo Logins** directly on the landing and login pages:

### 1. Demo Farmer (Ramesh Kumar)
- **Farmer ID**: `FARM1024`
- **Mobile**: `9876543210`
- **Active Booking**: `PX10245`
- **Crop**: Rice (Paddy), 42.5 Quintals
- **Centre**: Central Procurement Centre (APMC Yard)
- **Demo Features to Test**:
  - Open **Live Queue** (`queue.html`) and click **"Simulate Queue Movement"** &rarr; watch the token advance from `18 → 15 → 12 → 8 → 5 → 2 → YOUR TURN!`.
  - Open **Procurement Status** (`procurement.html`) to view the 6-stage lifecycle.
  - Open **Payment Status** (`payment.html`) to view MSP settlement and past payouts.
  - Open **Book Slot** (`booking.html`) to experience the 4-step booking wizard with dynamic color availability indicators (🟢 Available, 🟡 Few Slots Left, 🔴 Full).

### 2. Demo Procurement Centre Staff
- **Mandi ID**: `CPC-01`
- **Centre**: Central Procurement Centre (APMC Yard)
- **Staff Officer**: Rajesh Deshmukh
- **Demo Features to Test**:
  - View real-time metrics: Today's Farmers (42), Completed (27), Waiting (15), Capacity (78%).
  - Click **[Call Next Farmer]** &rarr; notices the serving token change and pushes alerts.
  - Click **[Start Procurement]** &rarr; updates status to *Procurement In Progress*.
  - Click **[Complete Procurement]** &rarr; records weights and updates to *Procurement Completed*.
  - Click **[Update Payment]** &rarr; settles the DBT transaction to *Payment Processed*.
  - Inspect **Centre Load / Analytics** charts (Morning, Afternoon, Evening distribution & bottleneck monitors).

---

## 📁 Project Structure

```
ProcureX/
├── backend/
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── models/
│   │   ├── Farmer.js                # Farmer schema
│   │   ├── Booking.js               # Slot booking schema
│   │   ├── ProcurementCentre.js     # Centre metadata
│   │   ├── Queue.js                 # Live queue tracker
│   │   ├── ProcurementStatus.js     # 6-stage lifecycle
│   │   ├── Payment.js               # Payment record & history
│   │   └── Notification.js          # In-app notifications
│   ├── controllers/
│   │   ├── farmerController.js
│   │   ├── bookingController.js
│   │   ├── queueController.js
│   │   ├── procurementController.js
│   │   ├── paymentController.js
│   │   └── centreController.js
│   ├── routes/
│   │   ├── farmerRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── queueRoutes.js
│   │   ├── procurementRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── centreRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── demoRoutes.js
│   ├── seed/
│   │   └── seedData.js              # SIH 2026 baseline data
│   └── server.js                    # Express app root
├── frontend/
│   ├── index.html                   # Landing page
│   ├── login.html                   # Dual login portal
│   ├── register.html                # Farmer registration form
│   ├── dashboard.html               # Farmer dashboard
│   ├── booking.html                 # 4-step slot booking wizard
│   ├── confirmation.html            # Digital procurement appointment pass
│   ├── queue.html                   # Live queue & simulation engine
│   ├── procurement.html             # 6-stage lifecycle tracking
│   ├── payment.html                 # Payment status & history
│   ├── centre-dashboard.html        # Procurement centre operations dashboard
│   ├── css/
│   │   └── style.css                # Agriculture green & royal blue theme
│   └── js/
│       ├── main.js                  # Shared sessions & notification toasts
│       ├── booking.js               # Multi-step booking script
│       ├── queue.js                 # Queue telemetry & simulator
│       ├── procurement.js           # Timeline renderer
│       ├── payment.js               # Payment advice renderer
│       └── centre.js                # Centre controls & queue calls
├── package.json
└── README.md
```

---

## 📡 API Reference Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/farmers/register` | Register farmer profile |
| `POST` | `/api/farmers/login` | Login via mobile / Farmer ID |
| `GET` | `/api/bookings/slots/available` | Slot capacity query (Green/Yellow/Red) |
| `POST` | `/api/bookings` | Create new slot booking |
| `GET` | `/api/bookings/:id` | Fetch booking appointment pass |
| `GET` | `/api/queue/:bookingId` | Fetch live queue telemetry |
| `POST` | `/api/queue/simulate/:bookingId` | Advance queue simulation (18 &rarr; 15 &rarr; ... &rarr; YOUR TURN) |
| `POST` | `/api/queue/reset-simulation/:bookingId` | Reset queue simulation |
| `GET` | `/api/procurement/:bookingId` | Fetch 6-stage procurement timeline |
| `GET` | `/api/payment/:bookingId` | Fetch payment status & history |
| `GET` | `/api/centre/dashboard` | Fetch APMC yard metrics & queue list |
| `POST` | `/api/centre/call-next` | Advance serving token & alert next farmer |
| `POST` | `/api/centre/start-procurement` | Set status to *Procurement In Progress* |
| `POST` | `/api/centre/complete-procurement` | Set status to *Procurement Completed* |
| `POST` | `/api/centre/update-payment` | Trigger DBT settlement to *Payment Processed* |
| `POST` | `/api/demo/reset` | Reset demo state to original SIH baseline |

---

## 🏆 Smart India Hackathon Alignment

| Problem Statement Challenge | ProcureX Solution |
|---|---|
| **Long Waiting Times** | Digital slot booking distributes vehicle arrivals smoothly across hourly windows, reducing mandi queue dwell time from 8-12 hours to ~28 minutes. |
| **Lack of Schedule Information** | Live queue position (#18, currently serving #11, ~35 min wait) gives farmers full visibility before leaving their village. |
| **Procurement Uncertainty** | 6-stage transparent status trail and Aadhaar PFMS DBT ledger ensures zero ambiguity regarding weighment slips and payment credit. |

---
© 2026 Team ProcureX • Smart India Hackathon 2026
