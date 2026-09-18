/**
 * ProcureX - Internationalization (i18n) Engine
 * Supported Languages:
 *   'en' - English
 *   'hi' - Hindi (हिन्दी)
 *   'te' - Telugu (తెలుగు)
 *   'mr' - Marathi (मराठी)
 */

const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_how_it_works: "How It Works",
    nav_dashboard: "Dashboard",
    nav_book_slot: "Book Slot",
    nav_live_queue: "Live Queue",
    nav_procurement: "Procurement",
    nav_payment: "Payment",
    nav_farmer_login: "Farmer Login",
    nav_centre_login: "Centre Login",
    nav_logout: "Logout",

    // Registration
    reg_title: "Farmer Registration",
    reg_subtitle: "Enter your farming and crop details to begin digital slot booking.",
    reg_lang_label: "Preferred Website Language *",
    reg_name: "Full Name *",
    reg_mobile: "Mobile Number *",
    reg_farmer_id: "Farmer ID (Aadhaar / Krishi ID) *",
    reg_village: "Village / Town *",
    reg_district: "District *",
    reg_centre: "Nearest Procurement Centre *",
    reg_commodity: "Primary Commodity to Sell *",
    reg_submit: "Complete Registration & Go to Dashboard 🚜",

    // Dashboard
    dash_welcome: "Welcome, Farmer",
    dash_profile_tag: "Verified Farmer Profile",
    dash_upcoming_slot: "Upcoming Slot",
    dash_queue_pos: "Queue Position",
    dash_proc_status: "Procurement",
    dash_pay_status: "Payment",
    dash_btn_book: "Book New Slot",
    dash_btn_queue: "View Live Queue",
    dash_btn_track: "Track Procurement",
    dash_btn_payment: "Payment History",
    dash_current_booking: "Your Current Booking",
    dash_token_number: "Token Number",
    dash_change_lang: "Website Language Preference",
    dash_save_lang: "Update Language",

    // Live Queue
    queue_title: "Live Mandi Queue",
    queue_telemetry: "LIVE TELEMETRY",
    queue_centre_status: "Operational",
    queue_your_number: "Your Queue Token",
    queue_current_pos: "Current Position",
    queue_farmers_ahead: "Farmers Ahead",
    queue_serving: "Currently Serving",
    queue_est_wait: "Estimated Waiting",
    queue_sim_btn: "Simulate Queue Movement 🚜",
    queue_reset_btn: "Reset",
    queue_list_title: "Procurement Staging Queue List",

    // Procurement Status
    proc_title: "Procurement Status",
    proc_subtitle: "Complete step-by-step audit trail from gate entry to produce acceptance and bank payment credit.",
    proc_produce: "Produce",
    proc_quantity: "Quantity",
    proc_grade: "Quality Grade",
    proc_moisture: "Moisture Content",

    // Payment Status
    pay_title: "Payment Status & History",
    pay_subtitle: "Direct DBT credit tracking with transparent rate calculations and complete past transaction history.",
    pay_advice: "DBT Payment Advice Slip",
    pay_status_processing: "🟡 Processing",
    pay_status_completed: "🟢 Payment Credited (Completed)",
    pay_rate: "Govt MSP Rate",
    pay_total: "Total Procurement Value",
    pay_history_title: "Previous Procurement Payment History",

    // Booking
    book_title: "Book a Procurement Slot",
    book_step1: "Select Commodity",
    book_step2: "Select Centre",
    book_step3: "Select Date",
    book_step4: "Select Available Time Slot",
    book_summary: "Booking Summary",
    book_confirm: "Confirm Slot 🚜"
  },

  hi: {
    // Navigation
    nav_home: "मुख्य पृष्ठ",
    nav_how_it_works: "यह कैसे काम करता है",
    nav_dashboard: "डैशबोर्ड",
    nav_book_slot: "स्लॉट बुक करें",
    nav_live_queue: "लाइव कतार",
    nav_procurement: "खरीद स्थिति",
    nav_payment: "भुगतान स्थिति",
    nav_farmer_login: "किसान लॉगिन",
    nav_centre_login: "केन्द्र लॉगिन",
    nav_logout: "लॉगआउट",

    // Registration
    reg_title: "किसान पंजीकरण",
    reg_subtitle: "डिजिटल स्लॉट बुकिंग शुरू करने के लिए अपना कृषि और फसल विवरण दर्ज करें।",
    reg_lang_label: "वेबसाइट की पसंदीदा भाषा *",
    reg_name: "पूरा नाम *",
    reg_mobile: "मोबाइल नंबर *",
    reg_farmer_id: "किसान आईडी (आधार / कृषि आईडी) *",
    reg_village: "गाँव / कस्बा *",
    reg_district: "ज़िला *",
    reg_centre: "निकटतम खरीद केन्द्र *",
    reg_commodity: "बेचने हेतु मुख्य फसल *",
    reg_submit: "पंजीकरण पूरा करें और डैशबोर्ड पर जाएं 🚜",

    // Dashboard
    dash_welcome: "स्वागत है, किसान",
    dash_profile_tag: "सत्यापित किसान प्रोफ़ाइल",
    dash_upcoming_slot: "आगामी स्लॉट",
    dash_queue_pos: "कतार में स्थान",
    dash_proc_status: "खरीद प्रगति",
    dash_pay_status: "भुगतान स्थिति",
    dash_btn_book: "नया स्लॉट बुक करें",
    dash_btn_queue: "लाइव कतार देखें",
    dash_btn_track: "खरीद ट्रैक करें",
    dash_btn_payment: "भुगतान इतिहास",
    dash_current_booking: "आपकी वर्तमान बुकिंग",
    dash_token_number: "टोकन नंबर",
    dash_change_lang: "वेबसाइट भाषा प्राथमिकता",
    dash_save_lang: "भाषा बदलें",

    // Live Queue
    queue_title: "लाइव मंडी कतार",
    queue_telemetry: "लाइव टेलीमेट्री",
    queue_centre_status: "संचालित (चालू)",
    queue_your_number: "आपका कतार टोकन",
    queue_current_pos: "वर्तमान स्थान",
    queue_farmers_ahead: "आगे किसान",
    queue_serving: "वर्तमान सेवा में",
    queue_est_wait: "अनुमानित प्रतीक्षा",
    queue_sim_btn: "कतार गति अनुकरण करें 🚜",
    queue_reset_btn: "रीसेट करें",
    queue_list_title: "मंडी कतार सूची",

    // Procurement Status
    proc_title: "खरीद स्थिति",
    proc_subtitle: "गेट प्रवेश से लेकर उपज स्वीकृति और बैंक खाते में भुगतान तक का संपूर्ण विवरण।",
    proc_produce: "फसल / उपज",
    proc_quantity: "मात्रा",
    proc_grade: "गुणवत्ता श्रेणी",
    proc_moisture: "नमी की मात्रा",

    // Payment Status
    pay_title: "भुगतान स्थिति एवं इतिहास",
    pay_subtitle: "पारदर्शी एमएसपी दर और सीधे बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT)।",
    pay_advice: "डीबीटी भुगतान परामर्श पर्ची",
    pay_status_processing: "🟡 प्रक्रिया में है",
    pay_status_completed: "🟢 भुगतान जमा हुआ (सफल)",
    pay_rate: "सरकारी एमएसपी दर",
    pay_total: "कुल खरीद मूल्य",
    pay_history_title: "पिछला भुगतान इतिहास",

    // Booking
    book_title: "खरीद स्लॉट बुक करें",
    book_step1: "फसल चुनें",
    book_step2: "खरीद केन्द्र चुनें",
    book_step3: "तारीख चुनें",
    book_step4: "उपलब्ध समय स्लॉट चुनें",
    book_summary: "बुकिंग सारांश",
    book_confirm: "स्लॉट पक्का करें 🚜"
  },

  te: {
    // Navigation
    nav_home: "హోమ్",
    nav_how_it_works: "ఇది ఎలా పనిచేస్తుంది",
    nav_dashboard: "డ్యాష్‌బోర్డ్",
    nav_book_slot: "స్లాట్ బుక్ చేయండి",
    nav_live_queue: "లైవ్ క్యూ",
    nav_procurement: "సేకరణ స్థితి",
    nav_payment: "చెల్లింపు స్థితి",
    nav_farmer_login: "రైతు లాగిన్",
    nav_centre_login: "కేంద్రం లాగిన్",
    nav_logout: "లాగౌట్",

    // Registration
    reg_title: "రైతు నమోదు",
    reg_subtitle: "డిజిటల్ స్లాట్ బుకింగ్ ప్రారంభించడానికి మీ వ్యవసాయ మరియు పంట వివరాలను నమోదు చేయండి.",
    reg_lang_label: "ఇష్టపడే వెబ్‌సైట్ భాష *",
    reg_name: "పూర్తి పేరు *",
    reg_mobile: "మొబైల్ నంబర్ *",
    reg_farmer_id: "రైతు ID (ఆధార్ / కృషి ID) *",
    reg_village: "గ్రామం / పట్టణం *",
    reg_district: "జిల్లా *",
    reg_centre: "సమీప సేకరణ కేంద్రం *",
    reg_commodity: "అమ్మకానికి ప్రధాన పంట *",
    reg_submit: "నమోదు పూర్తి చేసి డ్యాష్‌బోర్డ్‌కు వెళ్లండి 🚜",

    // Dashboard
    dash_welcome: "స్వాగతం, రైతు",
    dash_profile_tag: "ధృవీకరించబడిన రైతు ప్రొఫైల్",
    dash_upcoming_slot: "రాబోయే స్లాట్",
    dash_queue_pos: "క్యూ స్థానం",
    dash_proc_status: "సేకరణ స్థితి",
    dash_pay_status: "చెల్లింపు స్థితి",
    dash_btn_book: "కొత్త స్లాట్ బుక్ చేయండి",
    dash_btn_queue: "లైవ్ క్యూ చూడండి",
    dash_btn_track: "సేకరణ ట్రాక్ చేయండి",
    dash_btn_payment: "చెల్లింపు చరిత్ర",
    dash_current_booking: "మీ ప్రస్తుత బుకింగ్",
    dash_token_number: "టోకెన్ సంఖ్య",
    dash_change_lang: "వెబ్‌సైట్ భాష ప్రాధాన్యత",
    dash_save_lang: "భాషను మార్చండి",

    // Live Queue
    queue_title: "లైవ్ మార్కెట్ క్యూ",
    queue_telemetry: "లైవ్ టెలిమెట్రీ",
    queue_centre_status: "కార్యాచరణలో ఉంది",
    queue_your_number: "మీ క్యూ టోకెన్",
    queue_current_pos: "ప్రస్తుత స్థానం",
    queue_farmers_ahead: "ముందున్న రైతులు",
    queue_serving: "ప్రస్తుతం సేవలు పొందుతున్నది",
    queue_est_wait: "అంచనా నిరీక్షణ సమయం",
    queue_sim_btn: "క్యూ కదలికను అనుకరించండి 🚜",
    queue_reset_btn: "రీసెట్ చేయండి",
    queue_list_title: "మార్కెట్ క్యూ జాబితా",

    // Procurement Status
    proc_title: "సేకరణ స్థితి",
    proc_subtitle: "గేట్ ప్రవేశం నుండి పంట ఆమోదం మరియు బ్యాంక్ చెల్లింపు వరకు పూర్తి వివరాలు.",
    proc_produce: "పంట ఉత్పత్తులు",
    proc_quantity: "పరిమాణం",
    proc_grade: "నాణ్యత గ్రేడ్",
    proc_moisture: "తేమ శాతం",

    // Payment Status
    pay_title: "చెల్లింపు స్థితి & చరిత్ర",
    pay_subtitle: "పారదర్శక కనీస మద్దతు ధర (MSP) మరియు ఖాతాలో ప్రత్యక్ష నగదు బదిలీ (DBT).",
    pay_advice: "DBT చెల్లింపు సలహా పత్రం",
    pay_status_processing: "🟡 ప్రాసెసింగ్‌లో ఉంది",
    pay_status_completed: "🟢 చెల్లింపు జమయింది (పూర్తయింది)",
    pay_rate: "ప్రభుత్వ MSP ధర",
    pay_total: "మొత్తం సేకరణ విలువ",
    pay_history_title: "మునుపటి చెల్లింపు చరిత్ర",

    // Booking
    book_title: "సేకరణ స్లాట్‌ను బుక్ చేయండి",
    book_step1: "పంటను ఎంచుకోండి",
    book_step2: "సేకరణ కేంద్రాన్ని ఎంచుకోండి",
    book_step3: "తేదీని ఎంచుకోండి",
    book_step4: "అందుబాటులో ఉన్న సమయ స్లాట్‌ను ఎంచుకోండి",
    book_summary: "బుకింగ్ సారాంశం",
    book_confirm: "స్లాట్‌ను నిర్ధారించండి 🚜"
  },

  mr: {
    // Navigation
    nav_home: "मुख्यपृष्ठ",
    nav_how_it_works: "हे कसे कार्य करते",
    nav_dashboard: "डॅशबोर्ड",
    nav_book_slot: "स्लॉट बुक करा",
    nav_live_queue: "थेट रांग",
    nav_procurement: "खरेदी स्थिती",
    nav_payment: "पेमेंट स्थिती",
    nav_farmer_login: "शेतकरी लॉगिन",
    nav_centre_login: "केंद्र लॉगिन",
    nav_logout: "लॉगआउट",

    // Registration
    reg_title: "शेतकरी नोंदणी",
    reg_subtitle: "डिजिटल स्लॉट बुकिंग सुरू करण्यासाठी तुमचे शेती आणि पीक तपशील प्रविष्ट करा.",
    reg_lang_label: "पसंतीची वेबसाइट भाषा *",
    reg_name: "पूर्ण नाव *",
    reg_mobile: "मोबाईल नंबर *",
    reg_farmer_id: "शेतकरी आयडी (आधार / कृषी आयडी) *",
    reg_village: "गाव / शहर *",
    reg_district: "जिल्हा *",
    reg_centre: "जवळचे खरेदी केंद्र *",
    reg_commodity: "विक्रीसाठी मुख्य पीक *",
    reg_submit: "नोंदणी पूर्ण करा आणि डॅशबोर्डवर जा 🚜",

    // Dashboard
    dash_welcome: "स्वागत आहे, शेतकरी",
    dash_profile_tag: "सत्यापित शेतकरी प्रोफाइल",
    dash_upcoming_slot: "आगामी स्लॉट",
    dash_queue_pos: "रांगेतील स्थान",
    dash_proc_status: "खरेदी स्थिती",
    dash_pay_status: "पेमेंट स्थिती",
    dash_btn_book: "नवीन स्लॉट बुक करा",
    dash_btn_queue: "थेट रांग पहा",
    dash_btn_track: "खरेदी ट्रॅक करा",
    dash_btn_payment: "पेमेंट इतिहास",
    dash_current_booking: "तुमची सध्याची बुकिंग",
    dash_token_number: "टोकन क्रमांक",
    dash_change_lang: "वेबसाइट भाषा प्राधान्य",
    dash_save_lang: "भाषा बदला",

    // Live Queue
    queue_title: "थेट कृषी उत्पन्न बाजार रांग",
    queue_telemetry: "थेट माहिती (टेलीमेट्री)",
    queue_centre_status: "सुरू (चालू)",
    queue_your_number: "तुमचा रांग टोकन",
    queue_current_pos: "सध्याचे स्थान",
    queue_farmers_ahead: "पुढील शेतकरी",
    queue_serving: "सध्या सेवा घेत असलेले",
    queue_est_wait: "अंदाजे प्रतीक्षा",
    queue_sim_btn: "रांगेतील हालचाल सिम्युलेट करा 🚜",
    queue_reset_btn: "रीसेट करा",
    queue_list_title: "खरेदी रांग यादी",

    // Procurement Status
    proc_title: "खरेदी स्थिती",
    proc_subtitle: "गेट नोंदणीपासून ते पीक स्वीकृती आणि बँक खात्यात पैसे जमा होईपर्यंतची संपूर्ण माहिती.",
    proc_produce: "पीक उत्पादन",
    proc_quantity: "प्रमाण (वजन)",
    proc_grade: "गुणवत्ता प्रत",
    proc_moisture: "ओलावा प्रमाण",

    // Payment Status
    pay_title: "पेमेंट स्थिती आणि इतिहास",
    pay_subtitle: "पारदर्शक हमीभाव दर आणि थेट बँक खात्यात थेट लाभ हस्तांतरण (DBT).",
    pay_advice: "DBT पेमेंट पावती",
    pay_status_processing: "🟡 प्रक्रियेत आहे",
    pay_status_completed: "🟢 पेमेंट जमा झाले (पूर्ण)",
    pay_rate: "सरकारी हमीभाव (MSP)",
    pay_total: "एकूण खरेदी मूल्य",
    pay_history_title: "मागील पेमेंट इतिहास",

    // Booking
    book_title: "खरेदी स्लॉट बुक करा",
    book_step1: "पीक निवडा",
    book_step2: "खरेदी केंद्र निवडा",
    book_step3: "तारीख निवडा",
    book_step4: "उपलब्ध वेळ स्लॉट निवडा",
    book_summary: "बुकिंग सारांश",
    book_confirm: "स्लॉट निश्चित करा 🚜"
  }
};

const I18N = {
  getLang() {
    const user = typeof Session !== 'undefined' ? Session.getUser() : null;
    return localStorage.getItem('procurex_lang') || (user && user.language) || 'en';
  },

  async setLang(lang) {
    if (!translations[lang]) return;
    localStorage.setItem('procurex_lang', lang);

    // If user is logged in, update session & backend
    if (typeof Session !== 'undefined') {
      const user = Session.getUser();
      if (user) {
        user.language = lang;
        Session.setUser(user);
        try {
          await fetch(`/api/farmers/${user.farmerId}/language`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: lang })
          });
        } catch (e) {
          console.warn('Backend language sync note:', e);
        }
      }
    }

    this.apply();
  },

  t(key) {
    const lang = this.getLang();
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || key;
  },

  apply() {
    const lang = this.getLang();
    document.documentElement.lang = lang;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // Translate all placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Update any language selectors in DOM to active value
    document.querySelectorAll('.lang-select-input').forEach(select => {
      select.value = lang;
    });

    // Dispatch event if any page wants custom re-rendering
    window.dispatchEvent(new CustomEvent('procurex-language-changed', { detail: { lang } }));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  I18N.apply();
});
