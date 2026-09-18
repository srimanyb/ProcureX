/**
 * ProcureX - Advanced Internationalization (i18n) Engine
 * Full support for English (en), Telugu (te), Hindi (hi), Marathi (mr)
 */

const translations = {
  en: {
    book_engine_badge: 'Digital Appointment Engine',
    book_subtitle: 'Reserve your designated weighbridge window to skip long mandi queues.',
    step_name_1: '1. Commodity',
    step_name_2: '2. Centre',
    step_name_3: '3. Date',
    step_name_4: '4. Time Slot',
    step1_sub: 'Choose crop to deliver for government MSP procurement:',
    step2_sub: 'Select authorized APMC procurement mandi in your district:',
    step3_sub: 'Choose procurement delivery appointment date:',
    step4_sub: 'Choose an hourly intake window with live capacity:',
    crop_rice: 'Rice (Paddy)',
    crop_wheat: 'Wheat',
    crop_maize: 'Maize',
    crop_cotton: 'Cotton',
    crop_soybean: 'Soybean',
    crop_pulses: 'Pulses (Arhar)',
    est_qty_label: 'Estimated Quantity (Quintals):',
    sum_centre_label: 'Procurement Centre',
    sum_crop_label: 'Selected Crop & Quota',
    sum_date_label: 'Delivery Date',
    sum_slot_label: 'Time Window',
    est_token_label: 'Estimated Queue Token',
    brand_title: 'ProcureX',
    brand_sub: 'Smart Agricultural Procurement',
    brand_centre: 'ProcureX Centre',
    brand_centre_sub: 'Operations & Queue Management',
    nav_home: 'Home',
    nav_how_it_works: 'How It Works',
    nav_dashboard: 'Dashboard',
    nav_book_slot: 'Book Slot',
    nav_live_queue: 'Live Queue',
    nav_procurement: 'Procurement Status',
    nav_payment: 'Payment Status',
    nav_farmer_login: 'Farmer Login',
    nav_centre_login: 'Centre Login',
    nav_logout: 'Logout',
    nav_centre_dash: 'Centre Dashboard',
    nav_curr_queue: 'Current Queue',
    nav_cap_analytics: 'Capacity Analytics',
    nav_farmer_view: 'Farmer View',
    centre_staff_badge: 'Centre Staff',

    // Centre Dashboard
    centre_gates_open: 'Mandi Gates Operational',
    centre_title: 'Central Procurement Centre Dashboard',
    centre_subtitle: 'Location: Badnera Road, Grain Market Complex • Max Intake: 100 Farmers/Day',
    centre_serving_token: 'Currently Serving Token',
    stat_today_farmers: 'Today\'s Farmers',
    stat_total_bookings: 'Total Scheduled Bookings',
    stat_completed: 'Completed',
    stat_weighed_approved: 'Weighed & Approved',
    stat_waiting_yard: 'Waiting in Yard',
    stat_staged_bays: 'Staged in Arrival Bays',
    stat_currently_processing: 'Currently Processing',
    stat_bays_active: 'Bays 1, 2 & 3 Active',
    stat_avg_wait_label: 'Average Waiting Time',
    stat_avg_wait_sub: '⚡ Down from traditional 8-12 hours wait',
    stat_capacity_label: 'Centre Capacity Utilization',
    stat_capacity_sub: '78 / 100 daily quota allocated',
    centre_actions_title: '⚡ Centre Actions:',
    btn_call_next: '📢 Call Next Farmer',
    btn_start_proc: '⚖️ Start Procurement',
    btn_complete_proc: '✅ Complete Procurement',
    btn_update_pay: '💰 Update Payment (PFMS DBT)',
    btn_view_farmer_details: '🔍 View Farmer Details',
    queue_table_title: 'Current Mandi Queue & Staging',
    queue_table_sub: 'Real-time vehicle sequence at APMC Gate 2.',
    queue_active_badge: 'Active Queue',
    th_queue_no: 'Queue No.',
    th_farmer_name: 'Farmer Name',
    th_farmer_id: 'Farmer ID',
    th_commodity: 'Commodity',
    th_slot_time: 'Slot Time',
    th_status: 'Status',
    th_action_controls: 'Action Controls',
    btn_view: 'View',
    btn_call: 'Call',
    btn_complete: 'Complete',
    status_waiting: 'Waiting',
    status_processing: 'Processing',
    status_completed: 'Completed',
    status_called: 'Called',
    vehicles_in_queue: 'Vehicles in Queue',

    // Analytics
    analytics_tag: 'Queue Telemetry & Utilization',
    analytics_title: 'Centre Load & Operational Analytics',
    analytics_desc: 'Visual distribution of procurement volume, bottleneck detection, and waiting trends.',
    load_card_title: 'Today\'s Centre Load',
    slot_morning: 'Morning (08:30 AM - 12:00 PM)',
    slot_afternoon: 'Afternoon (12:00 PM - 03:30 PM)',
    slot_evening: 'Evening (03:30 PM - 05:30 PM)',
    load_hint: '💡 Smart scheduling balances peak morning arrivals into afternoon slots.',
    bottleneck_title: 'Queue Bottleneck Monitor',
    bay3_title: 'Weighbridge Bay 3',
    bay3_sub: 'Gross & tare weighment',
    lab_title: 'Moisture Testing Lab',
    lab_sub: 'Calibrated digital meters',
    desk_title: 'Voucher & Receipt Desk',
    desk_sub: 'Digital certificate sign-off',
    trends_title: 'Waiting Trends by Hour',
    dwell_time: 'Average mandi dwell time: 28.4 minutes',

    // Modal
    modal_gate_record: 'Mandi Gate Record',
    modal_farmer_title: 'Farmer Inspection Sheet',
    modal_fname: 'Farmer Name',
    modal_fid: 'Farmer ID',
    modal_crop: 'Commodity',
    modal_token: 'Queue Token',
    modal_land: 'Land Record (7/12)',
    modal_moist: 'Moisture Content',
    modal_close: 'Close',
    modal_process: 'Process Produce',

    // Registration
    reg_title: 'Farmer Registration',
    reg_subtitle: 'Enter your farming and crop details to begin digital slot booking.',
    reg_lang_label: 'Preferred Website Language *',
    reg_name: 'Full Name *',
    reg_mobile: 'Mobile Number *',
    reg_farmer_id: 'Farmer ID (Aadhaar / Krishi ID) *',
    reg_village: 'Village / Town *',
    reg_district: 'District *',
    reg_centre: 'Nearest Procurement Centre *',
    reg_commodity: 'Primary Commodity to Sell *',
    reg_submit: 'Complete Registration & Go to Dashboard 🚜',

    // Dashboard
    dash_welcome: 'Welcome, Farmer',
    dash_profile_tag: 'Verified Farmer Profile',
    dash_upcoming_slot: 'Upcoming Slot',
    dash_queue_pos: 'Queue Position',
    dash_proc_status: 'Procurement',
    dash_pay_status: 'Payment',
    dash_btn_book: 'Book New Slot',
    dash_btn_queue: 'View Live Queue',
    dash_btn_track: 'Track Procurement',
    dash_btn_payment: 'Payment History',
    dash_current_booking: 'Your Current Booking',
    dash_token_number: 'Token Number',
    dash_change_lang: 'Website Language Preference',
    dash_save_lang: 'Update Language',

    // Live Queue
    queue_title: 'Live Mandi Queue',
    queue_telemetry: 'LIVE TELEMETRY',
    queue_centre_status: 'Operational',
    queue_your_number: 'Your Queue Token',
    queue_current_pos: 'Current Position',
    queue_farmers_ahead: 'Farmers Ahead',
    queue_serving: 'Currently Serving',
    queue_est_wait: 'Estimated Waiting',
    queue_sim_btn: 'Simulate Queue Movement 🚜',
    queue_reset_btn: 'Reset',
    queue_list_title: 'Procurement Staging Queue List',

    // Procurement Status
    proc_title: 'Procurement Status',
    proc_subtitle: 'Complete step-by-step audit trail from gate entry to produce acceptance and bank payment credit.',
    proc_produce: 'Produce',
    proc_quantity: 'Quantity',
    proc_grade: 'Quality Grade',
    proc_moisture: 'Moisture Content',

    // Payment Status
    pay_title: 'Payment Status & History',
    pay_subtitle: 'Direct DBT credit tracking with transparent rate calculations and complete past transaction history.',
    pay_advice: 'DBT Payment Advice Slip',
    pay_status_processing: '🟡 Processing',
    pay_status_completed: '🟢 Payment Credited (Completed)',
    pay_rate: 'Govt MSP Rate',
    pay_total: 'Total Procurement Value',
    pay_history_title: 'Previous Procurement Payment History',

    // Booking
    book_title: 'Book a Procurement Slot',
    book_step1: 'Select Commodity',
    book_step2: 'Select Centre',
    book_step3: 'Select Date',
    book_step4: 'Select Available Time Slot',
    book_summary: 'Booking Summary',
    book_confirm: 'Confirm Slot 🚜'
  },

  te: {
    book_engine_badge: 'డిజిటల్ అపాయింట్‌మెంట్ ఇంజిన్',
    book_subtitle: 'మార్కెట్ నిరీక్షణ సమయాన్ని నివారించడానికి వేబ్రిడ్జ్ స్లాట్‌ను రిజర్వ్ చేసుకోండి.',
    step_name_1: '1. పంట',
    step_name_2: '2. కేంద్రం',
    step_name_3: '3. తేదీ',
    step_name_4: '4. సమయ స్లాట్',
    step1_sub: 'ప్రభుత్వ మద్దతు ధర సేకరణ కోసం పంటను ఎంచుకోండి:',
    step2_sub: 'మీ జిల్లాలోని అధీకృత మార్కెట్ కేంద్రాన్ని ఎంచుకోండి:',
    step3_sub: 'సేకరణ డెలివరీ నియామక తేదీని ఎంచుకోండి:',
    step4_sub: 'అందుబాటులో ఉన్న గంటల సమయ స్లాట్‌ను ఎంచుకోండి:',
    crop_rice: 'వరి (ధాన్యం)',
    crop_wheat: 'గోధుమలు',
    crop_maize: 'మొక్కజొన్న',
    crop_cotton: 'పత్తి',
    crop_soybean: 'సోయాబీన్',
    crop_pulses: 'పప్పుధాన్యాలు (కందులు)',
    est_qty_label: 'అంచనా పరిమాణం (క్వింటాళ్ళు):',
    sum_centre_label: 'సేకరణ కేంద్రం',
    sum_crop_label: 'ఎంచుకున్న పంట & పరిమాణం',
    sum_date_label: 'డెలివరీ తేదీ',
    sum_slot_label: 'సమయ స్లాట్',
    est_token_label: 'అంచనా క్యూ టోకెన్',
    brand_title: 'ప్రొక్యూర్ ఎక్స్',
    brand_sub: 'స్మార్ట్ వ్యవసాయ సేకరణ వేదిక',
    brand_centre: 'ప్రొక్యూర్ ఎక్స్ కేంద్రం',
    brand_centre_sub: 'కార్యకలాపాలు & క్యూ నిర్వహణ',
    nav_home: 'హోమ్',
    nav_how_it_works: 'ఇది ఎలా పనిచేస్తుంది',
    nav_dashboard: 'డ్యాష్‌బోర్డ్',
    nav_book_slot: 'స్లాట్ బుక్ చేయండి',
    nav_live_queue: 'లైవ్ క్యూ',
    nav_procurement: 'సేకరణ స్థితి',
    nav_payment: 'చెల్లింపు స్థితి',
    nav_farmer_login: 'రైతు లాగిన్',
    nav_centre_login: 'కేంద్రం లాగిన్',
    nav_logout: 'లాగౌట్',
    nav_centre_dash: 'కేంద్ర డ్యాష్‌బోర్డ్',
    nav_curr_queue: 'ప్రస్తుత క్యూ',
    nav_cap_analytics: 'సామర్థ్య విశ్లేషణ',
    nav_farmer_view: 'రైతు వీక్షణ',
    centre_staff_badge: 'కేంద్ర సిబ్బంది',

    centre_gates_open: 'మార్కెట్ గేట్లు ప్రారంభంలో ఉన్నాయి',
    centre_title: 'కేంద్ర సేకరణ కేంద్రం డ్యాష్‌బోర్డ్',
    centre_subtitle: 'ప్రదేశం: బద్నేరా రోడ్, ధాన్య మార్కెట్ కాంప్లెక్స్ • గరిష్ట పరిమితి: 100 రైతులు/రోజు',
    centre_serving_token: 'ప్రస్తుతం సేవలు పొందుతున్న టోకెన్',
    stat_today_farmers: 'నేటి రైతులు',
    stat_total_bookings: 'మొత్తం షెడ్యూల్డ్ బుకింగ్‌లు',
    stat_completed: 'పూర్తయినవి',
    stat_weighed_approved: 'తూకం & ఆమోదించబడినవి',
    stat_waiting_yard: 'యార్డులో నిరీక్షణ',
    stat_staged_bays: 'ఆగమన బేలలో నిలిచినవి',
    stat_currently_processing: 'ప్రస్తుతం ప్రక్రియలో ఉన్నవి',
    stat_bays_active: 'బేస్ 1, 2 & 3 చురుకుగా ఉన్నాయి',
    stat_avg_wait_label: 'సగటు నిరీక్షణ సమయం',
    stat_avg_wait_sub: '⚡ సాధారణ 8-12 గంటల నిరీక్షణ కంటే తక్కువ',
    stat_capacity_label: 'కేంద్ర సామర్థ్య వినియోగం',
    stat_capacity_sub: '78 / 100 రోజువారీ కోటా కేటాయించబడింది',
    centre_actions_title: '⚡ కేంద్ర చర్యలు:',
    btn_call_next: '📢 తదుపరి రైతును పిలవండి',
    btn_start_proc: '⚖️ సేకరణ ప్రారంభించండి',
    btn_complete_proc: '✅ సేకరణ పూర్తి చేయండి',
    btn_update_pay: '💰 చెల్లింపు నవీకరించండి (PFMS DBT)',
    btn_view_farmer_details: '🔍 రైతు వివరాలు చూడండి',
    queue_table_title: 'ప్రస్తుత మార్కెట్ క్యూ & నిరీక్షణ',
    queue_table_sub: 'APMC గేట్ 2 వద్ద నిజ-సమయ వాహనాల వరుస.',
    queue_active_badge: 'క్రియాశీల క్యూ',
    th_queue_no: 'క్యూ సంఖ్య',
    th_farmer_name: 'రైతు పేరు',
    th_farmer_id: 'రైతు ID',
    th_commodity: 'పంట',
    th_slot_time: 'స్లాట్ సమయం',
    th_status: 'స్థితి',
    th_action_controls: 'చర్య నియంత్రణలు',
    btn_view: 'చూడండి',
    btn_call: 'పిలవండి',
    btn_complete: 'పూర్తి చేయండి',
    status_waiting: 'వేచి ఉంది',
    status_processing: 'ప్రాసెసింగ్',
    status_completed: 'పూర్తయింది',
    status_called: 'పిలువబడింది',
    vehicles_in_queue: 'క్యూలోని వాహనాలు',

    analytics_tag: 'క్యూ టెలిమెట్రీ & వినియోగం',
    analytics_title: 'కేంద్ర లోడ్ & కార్యాచరణ విశ్లేషణ',
    analytics_desc: 'సేకరణ పరిమాణం, అడ్డంకులు మరియు నిరీక్షణ ధోరణుల పంపిణీ.',
    load_card_title: 'నేటి కేంద్ర లోడ్',
    slot_morning: 'ఉదయం (08:30 AM - 12:00 PM)',
    slot_afternoon: 'మధ్యాహ్నం (12:00 PM - 03:30 PM)',
    slot_evening: 'సాయంత్రం (03:30 PM - 05:30 PM)',
    load_hint: '💡 స్మార్ట్ షెడ్యూలింగ్ రద్దీని సమర్థవంతంగా సమతుల్యం చేస్తుంది.',
    bottleneck_title: 'క్యూ అడ్డంకుల పర్యవేక్షణ',
    bay3_title: 'వేబ్రిడ్జ్ బే 3',
    bay3_sub: 'స్థూల & నికర తూకం',
    lab_title: 'తేమ పరీక్ష ప్రయోగశాల',
    lab_sub: 'క్యాలిబ్రేటెడ్ డిజిటల్ మీటర్లు',
    desk_title: 'రసీదు డెస్క్',
    desk_sub: 'డిజిటల్ ధృవీకరణ పత్రం జారీ',
    trends_title: 'గంటల వారీగా నిరీక్షణ ధోరణులు',
    dwell_time: 'సగటు మార్కెట్ నిరీక్షణ సమయం: 28.4 నిమిషాలు',

    modal_gate_record: 'మార్కెట్ గేట్ రికార్డు',
    modal_farmer_title: 'రైతు తనిఖీ పత్రం',
    modal_fname: 'రైతు పేరు',
    modal_fid: 'రైతు ID',
    modal_crop: 'పంట',
    modal_token: 'క్యూ టోకెన్',
    modal_land: 'భూమి రికార్డు (7/12)',
    modal_moist: 'తేమ శాతం',
    modal_close: 'మూసివేయి',
    modal_process: 'పంటను ప్రాసెస్ చేయండి',

    reg_title: 'రైతు నమోదు',
    reg_subtitle: 'డిజిటల్ స్లాట్ బుకింగ్ ప్రారంభించడానికి మీ వ్యవసాయ మరియు పంట వివరాలను నమోదు చేయండి.',
    reg_lang_label: 'ఇష్టపడే వెబ్‌సైట్ భాష *',
    reg_name: 'పూర్తి పేరు *',
    reg_mobile: 'మొబైల్ నంబర్ *',
    reg_farmer_id: 'రైతు ID (ఆధార్ / కృషి ID) *',
    reg_village: 'గ్రామం / పట్టణం *',
    reg_district: 'జిల్లా *',
    reg_centre: 'సమీప సేకరణ కేంద్రం *',
    reg_commodity: 'అమ్మకానికి ప్రధాన పంట *',
    reg_submit: 'నమోదు పూర్తి చేసి డ్యాష్‌బోర్డ్‌కు వెళ్లండి 🚜',

    dash_welcome: 'స్వాగతం, రైతు',
    dash_profile_tag: 'ధృవీకరించబడిన రైతు ప్రొఫైల్',
    dash_upcoming_slot: 'రాబోయే స్లాట్',
    dash_queue_pos: 'క్యూ స్థానం',
    dash_proc_status: 'సేకరణ స్థితి',
    dash_pay_status: 'చెల్లింపు స్థితి',
    dash_btn_book: 'కొత్త స్లాట్ బుక్ చేయండి',
    dash_btn_queue: 'లైవ్ క్యూ చూడండి',
    dash_btn_track: 'సేకరణ ట్రాక్ చేయండి',
    dash_btn_payment: 'చెల్లింపు చరిత్ర',
    dash_current_booking: 'మీ ప్రస్తుత బుకింగ్',
    dash_token_number: 'టోకెన్ సంఖ్య',
    dash_change_lang: 'వెబ్‌సైట్ భాష ప్రాధాన్యత',
    dash_save_lang: 'భాషను మార్చండి',

    queue_title: 'లైవ్ మార్కెట్ క్యూ',
    queue_telemetry: 'లైవ్ టెలిమెట్రీ',
    queue_centre_status: 'కార్యాచరణలో ఉంది',
    queue_your_number: 'మీ క్యూ టోకెన్',
    queue_current_pos: 'ప్రస్తుత స్థానం',
    queue_farmers_ahead: 'ముందున్న రైతులు',
    queue_serving: 'ప్రస్తుతం సేవలు పొందుతున్నది',
    queue_est_wait: 'అంచనా నిరీక్షణ సమయం',
    queue_sim_btn: 'క్యూ కదలికను అనుకరించండి 🚜',
    queue_reset_btn: 'రీసెట్ చేయండి',
    queue_list_title: 'మార్కెట్ క్యూ జాబితా',

    proc_title: 'సేకరణ స్థితి',
    proc_subtitle: 'గేట్ ప్రవేశం నుండి పంట ఆమోదం మరియు బ్యాంక్ చెల్లింపు వరకు పూర్తి వివరాలు.',
    proc_produce: 'పంట ఉత్పత్తులు',
    proc_quantity: 'పరిమాణం',
    proc_grade: 'నాణ్యత గ్రేడ్',
    proc_moisture: 'తేమ శాతం',

    pay_title: 'చెల్లింపు స్థితి & చరిత్ర',
    pay_subtitle: 'పారదర్శక కనీస మద్దతు ధర (MSP) మరియు ఖాతాలో ప్రత్యక్ష నగదు బదిలీ (DBT).',
    pay_advice: 'DBT చెల్లింపు సలహా పత్రం',
    pay_status_processing: '🟡 ప్రాసెసింగ్‌లో ఉంది',
    pay_status_completed: '🟢 చెల్లింపు జమయింది (పూర్తయింది)',
    pay_rate: 'ప్రభుత్వ MSP ధర',
    pay_total: 'మొత్తం సేకరణ విలువ',
    pay_history_title: 'మునుపటి చెల్లింపు చరిత్ర',

    book_title: 'సేకరణ స్లాట్‌ను బుక్ చేయండి',
    book_step1: 'పంటను ఎంచుకోండి',
    book_step2: 'సేకరణ కేంద్రాన్ని ఎంచుకోండి',
    book_step3: 'తేదీని ఎంచుకోండి',
    book_step4: 'అందుబాటులో ఉన్న సమయ స్లాట్‌ను ఎంచుకోండి',
    book_summary: 'బుకింగ్ సారాంశం',
    book_confirm: 'స్లాట్‌ను నిర్ధారించండి 🚜'
  },

  hi: {
    book_engine_badge: 'डिजिटल अपॉइंटमेंट इंजन',
    book_subtitle: 'मंडी में कतार व प्रतीक्षा समाप्त करने हेतु वेब्रिज विंडो आरक्षित करें।',
    step_name_1: '1. फसल',
    step_name_2: '2. केन्द्र',
    step_name_3: '3. तारीख',
    step_name_4: '4. समय स्लॉट',
    step1_sub: 'सरकारी एमएसपी खरीद हेतु फसल चुनें:',
    step2_sub: 'अपने ज़िले में अधिकृत एपीएमसी खरीद केन्द्र चुनें:',
    step3_sub: 'खरीद डिलीवरी अपॉइंटमेंट तारीख चुनें:',
    step4_sub: 'उपलब्ध प्रति घंटा समय स्लॉट चुनें:',
    crop_rice: 'धान (चावल)',
    crop_wheat: 'गेहूं',
    crop_maize: 'मक्का',
    crop_cotton: 'कपास',
    crop_soybean: 'सोयाबीन',
    crop_pulses: 'दालें (अरहर)',
    est_qty_label: 'अनुमानित मात्रा (क्विंटल):',
    sum_centre_label: 'खरीद केन्द्र',
    sum_crop_label: 'चयनित फसल एवं कोटा',
    sum_date_label: 'डिलीवरी तारीख',
    sum_slot_label: 'समय विंडो',
    est_token_label: 'अनुमानित कतार टोकन',
    brand_title: 'प्रोक्योरएक्स',
    brand_sub: 'स्मार्ट कृषि खरीद मंच',
    brand_centre: 'प्रोक्योरएक्स केन्द्र',
    brand_centre_sub: 'संचालन एवं कतार प्रबंधन',
    nav_home: 'मुख्य पृष्ठ',
    nav_how_it_works: 'यह कैसे काम करता है',
    nav_dashboard: 'डैशबोर्ड',
    nav_book_slot: 'स्लॉट बुक करें',
    nav_live_queue: 'लाइव कतार',
    nav_procurement: 'खरीद स्थिति',
    nav_payment: 'भुगतान स्थिति',
    nav_farmer_login: 'किसान लॉगिन',
    nav_centre_login: 'केन्द्र लॉगिन',
    nav_logout: 'लॉगआउट',
    nav_centre_dash: 'केन्द्र डैशबोर्ड',
    nav_curr_queue: 'वर्तमान कतार',
    nav_cap_analytics: 'क्षमता विश्लेषण',
    nav_farmer_view: 'किसान दृश्य',
    centre_staff_badge: 'केन्द्र कर्मचारी',

    centre_gates_open: 'मंडी गेट संचालित हैं',
    centre_title: 'केंद्रीय खरीद केन्द्र डैशबोर्ड',
    centre_subtitle: 'स्थान: बडनेरा रोड, अनाज मंडी परिसर • अधिकतम क्षमता: 100 किसान/दिन',
    centre_serving_token: 'वर्तमान सेवा टोकन',
    stat_today_farmers: 'आज के किसान',
    stat_total_bookings: 'कुल निर्धारित बुकिंग',
    stat_completed: 'पूर्ण हुआ',
    stat_weighed_approved: 'तौला और स्वीकृत',
    stat_waiting_yard: 'यार्ड में प्रतीक्षारत',
    stat_staged_bays: 'आगमन बे में उपस्थित',
    stat_currently_processing: 'वर्तमान प्रक्रियाधीन',
    stat_bays_active: 'बे 1, 2 और 3 सक्रिय',
    stat_avg_wait_label: 'औसत प्रतीक्षा समय',
    stat_avg_wait_sub: '⚡ पारंपरिक 8-12 घंटे से बहुत कम',
    stat_capacity_label: 'केन्द्र क्षमता उपयोग',
    stat_capacity_sub: '78 / 100 दैनिक कोटा आवंटित',
    centre_actions_title: '⚡ केन्द्र कार्य:',
    btn_call_next: '📢 अगले किसान को बुलाएं',
    btn_start_proc: '⚖️ खरीद शुरू करें',
    btn_complete_proc: '✅ खरीद पूर्ण करें',
    btn_update_pay: '💰 भुगतान अद्यतन करें (PFMS DBT)',
    btn_view_farmer_details: '🔍 किसान विवरण देखें',
    queue_table_title: 'वर्तमान मंडी कतार एवं यार्ड',
    queue_table_sub: 'एपीएमसी गेट 2 पर वास्तविक समय वाहन अनुक्रम।',
    queue_active_badge: 'सक्रिय कतार',
    th_queue_no: 'कतार सं.',
    th_farmer_name: 'किसान का नाम',
    th_farmer_id: 'किसान आईडी',
    th_commodity: 'फसल',
    th_slot_time: 'स्लॉट समय',
    th_status: 'स्थिति',
    th_action_controls: 'कार्रवाई नियंत्रण',
    btn_view: 'देखें',
    btn_call: 'बुलाएं',
    btn_complete: 'पूर्ण करें',
    status_waiting: 'प्रतीक्षारत',
    status_processing: 'प्रक्रियाधीन',
    status_completed: 'पूर्ण',
    status_called: 'बुलाया गया',
    vehicles_in_queue: 'कतार में वाहन',

    analytics_tag: 'कतार टेलीमेट्री एवं उपयोग',
    analytics_title: 'केन्द्र भार एवं संचालन विश्लेषण',
    analytics_desc: 'खरीद मात्रा, बाधाओं और प्रतीक्षा प्रवृत्तियों का दृश्य वितरण।',
    load_card_title: 'आज का केन्द्र भार',
    slot_morning: 'सुबह (08:30 AM - 12:00 PM)',
    slot_afternoon: 'दोपहर (12:00 PM - 03:30 PM)',
    slot_evening: 'शाम (03:30 PM - 05:30 PM)',
    load_hint: '💡 स्मार्ट शेड्यूलिंग सुबह की भीड़ को दोपहर के स्लॉट में संतुलित करती है।',
    bottleneck_title: 'कतार बाधा मॉनिटर',
    bay3_title: 'वेब्रिज बे 3',
    bay3_sub: 'सकल एवं शुद्ध तौल',
    lab_title: 'नमी परीक्षण प्रयोगशाला',
    lab_sub: 'कैलिब्रेटेड डिजिटल मीटर',
    desk_title: 'रसीद काउंटर',
    desk_sub: 'डिजिटल प्रमाणपत्र हस्ताक्षर',
    trends_title: 'प्रति घंटा प्रतीक्षा रुझान',
    dwell_time: 'औसत मंडी प्रतीक्षा समय: 28.4 मिनट',

    modal_gate_record: 'मंडी गेट रिकॉर्ड',
    modal_farmer_title: 'किसान निरीक्षण पत्रक',
    modal_fname: 'किसान का नाम',
    modal_fid: 'किसान आईडी',
    modal_crop: 'फसल',
    modal_token: 'कतार टोकन',
    modal_land: 'भूमि रिकॉर्ड (7/12)',
    modal_moist: 'नमी की मात्रा',
    modal_close: 'बंद करें',
    modal_process: 'उपज प्रक्रिया करें',

    reg_title: 'किसान पंजीकरण',
    reg_subtitle: 'डिजिटल स्लॉट बुकिंग शुरू करने के लिए अपना कृषि और फसल विवरण दर्ज करें।',
    reg_lang_label: 'वेबसाइट की पसंदीदा भाषा *',
    reg_name: 'पूरा नाम *',
    reg_mobile: 'मोबाइल नंबर *',
    reg_farmer_id: 'किसान आईडी (आधार / कृषि आईडी) *',
    reg_village: 'गाँव / कस्बा *',
    reg_district: 'ज़िला *',
    reg_centre: 'निकटतम खरीद केन्द्र *',
    reg_commodity: 'बेचने हेतु मुख्य फसल *',
    reg_submit: 'पंजीकरण पूरा करें और डैशबोर्ड पर जाएं 🚜',

    dash_welcome: 'स्वागत है, किसान',
    dash_profile_tag: 'सत्यापित किसान प्रोफ़ाइल',
    dash_upcoming_slot: 'आगामी स्लॉट',
    dash_queue_pos: 'कतार में स्थान',
    dash_proc_status: 'खरीद प्रगति',
    dash_pay_status: 'भुगतान स्थिति',
    dash_btn_book: 'नया स्लॉट बुक करें',
    dash_btn_queue: 'लाइव कतार देखें',
    dash_btn_track: 'खरीद ट्रैक करें',
    dash_btn_payment: 'भुगतान इतिहास',
    dash_current_booking: 'आपकी वर्तमान बुकिंग',
    dash_token_number: 'टोकन नंबर',
    dash_change_lang: 'वेबसाइट भाषा प्राथमिकता',
    dash_save_lang: 'भाषा बदलें',

    queue_title: 'लाइव मंडी कतार',
    queue_telemetry: 'लाइव टेलीमेट्री',
    queue_centre_status: 'संचालित (चालू)',
    queue_your_number: 'आपका कतार टोकन',
    queue_current_pos: 'वर्तमान स्थान',
    queue_farmers_ahead: 'आगे किसान',
    queue_serving: 'वर्तमान सेवा में',
    queue_est_wait: 'अनुमानित प्रतीक्षा',
    queue_sim_btn: 'कतार गति अनुकरण करें 🚜',
    queue_reset_btn: 'रीसेट करें',
    queue_list_title: 'मंडी कतार सूची',

    proc_title: 'खरीद स्थिति',
    proc_subtitle: 'गेट प्रवेश से लेकर उपज स्वीकृति और बैंक खाते में भुगतान तक का संपूर्ण विवरण।',
    proc_produce: 'फसल / उपज',
    proc_quantity: 'मात्रा',
    proc_grade: 'गुणवत्ता श्रेणी',
    proc_moisture: 'नमी की मात्रा',

    pay_title: 'भुगतान स्थिति एवं इतिहास',
    pay_subtitle: 'पारदर्शी एमएसपी दर और सीधे बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT)।',
    pay_advice: 'डीबीटी भुगतान परामर्श पर्ची',
    pay_status_processing: '🟡 प्रक्रिया में है',
    pay_status_completed: '🟢 भुगतान जमा हुआ (सफल)',
    pay_rate: 'सरकारी एमएसपी दर',
    pay_total: 'कुल खरीद मूल्य',
    pay_history_title: 'पिछला भुगतान इतिहास',

    book_title: 'खरीद स्लॉट बुक करें',
    book_step1: 'फसल चुनें',
    book_step2: 'खरीद केन्द्र चुनें',
    book_step3: 'तारीख चुनें',
    book_step4: 'उपलब्ध समय स्लॉट चुनें',
    book_summary: 'बुकिंग सारांश',
    book_confirm: 'स्लॉट पक्का करें 🚜'
  },

  mr: {
    book_engine_badge: 'डिजिटल अपॉइंटमेंट इंजिन',
    book_subtitle: 'बाजार प्रतीक्षा वेळ टाळण्यासाठी वेब्रिज वेळ स्लॉट राखीव करा.',
    step_name_1: '1. पीक',
    step_name_2: '2. केंद्र',
    step_name_3: '3. तारीख',
    step_name_4: '4. वेळ स्लॉट',
    step1_sub: 'हमीभाव खरेदीसाठी पीक निवडा:',
    step2_sub: 'आपल्या जिल्ह्यातील अधिकृत एपीएमसी खरेदी केंद्र निवडा:',
    step3_sub: 'खरेदी डिलिव्हरी अपॉइंटमेंट तारीख निवडा:',
    step4_sub: 'उपलब्ध प्रति तास वेळ स्लॉट निवडा:',
    crop_rice: 'भात (धान)',
    crop_wheat: 'गहू',
    crop_maize: 'मका',
    crop_cotton: 'कापूस',
    crop_soybean: 'सोयाबीन',
    crop_pulses: 'डाळी (तूर)',
    est_qty_label: 'अंदाजे प्रमाण (क्विंटल):',
    sum_centre_label: 'खरेदी केंद्र',
    sum_crop_label: 'निवडलेले पीक आणि कोटा',
    sum_date_label: 'डिलिव्हरी तारीख',
    sum_slot_label: 'वेळ विंडो',
    est_token_label: 'अंदाजे रांग टोकन',
    brand_title: 'प्रोक्योरएक्स',
    brand_sub: 'स्मार्ट कृषी खरेदी व्यासपीठ',
    brand_centre: 'प्रोक्योरएक्स केंद्र',
    brand_centre_sub: 'ऑपरेशन्स आणि रांग व्यवस्थापन',
    nav_home: 'मुख्यपृष्ठ',
    nav_how_it_works: 'हे कसे कार्य करते',
    nav_dashboard: 'डॅशबोर्ड',
    nav_book_slot: 'स्लॉट बुक करा',
    nav_live_queue: 'थेट रांग',
    nav_procurement: 'खरेदी स्थिती',
    nav_payment: 'पेमेंट स्थिती',
    nav_farmer_login: 'शेतकरी लॉगिन',
    nav_centre_login: 'केंद्र लॉगिन',
    nav_logout: 'लॉगआउट',
    nav_centre_dash: 'केंद्र डॅशबोर्ड',
    nav_curr_queue: 'सध्याची रांग',
    nav_cap_analytics: 'क्षमता विश्लेषण',
    nav_farmer_view: 'शेतकरी दृश्य',
    centre_staff_badge: 'केंद्र कर्मचारी',

    centre_gates_open: 'मार्केट गेट सुरू आहेत',
    centre_title: 'केंद्रीय खरेदी केंद्र डॅशबोर्ड',
    centre_subtitle: 'स्थान: बडनेरा रोड, धान्य मार्केट कॉम्प्लेक्स • कमाल क्षमता: 100 शेतकरी/दिवस',
    centre_serving_token: 'सध्या सेवा घेत असलेला टोकन',
    stat_today_farmers: 'आजचे शेतकरी',
    stat_total_bookings: 'एकूण नियोजित बुकिंग',
    stat_completed: 'पूर्ण झाले',
    stat_weighed_approved: 'वजन व मंजूर',
    stat_waiting_yard: 'यार्डमध्ये प्रतीक्षेत',
    stat_staged_bays: 'आगमन वेअरहाऊसमध्ये',
    stat_currently_processing: 'सध्या प्रक्रियेत',
    stat_bays_active: 'बे 1, 2 आणि 3 सक्रिय',
    stat_avg_wait_label: 'सरासरी प्रतीक्षा वेळ',
    stat_avg_wait_sub: '⚡ पारंपरिक 8-12 तासांपेक्षा कमी',
    stat_capacity_label: 'केंद्र क्षमता वापर',
    stat_capacity_sub: '78 / 100 दैनिक कोटा वाटप',
    centre_actions_title: '⚡ केंद्र कृती:',
    btn_call_next: '📢 पुढील शेतकऱ्याला बोलवा',
    btn_start_proc: '⚖️ खरेदी सुरू करा',
    btn_complete_proc: '✅ खरेदी पूर्ण करा',
    btn_update_pay: '💰 पेमेंट अपडेट करा (PFMS DBT)',
    btn_view_farmer_details: '🔍 शेतकरी तपशील पहा',
    queue_table_title: 'सध्याची कृषी उत्पन्न बाजार रांग',
    queue_table_sub: 'एपीएमसी गेट 2 वर रिअल-टाइम वाहन क्रम.',
    queue_active_badge: 'सक्रिय रांग',
    th_queue_no: 'रांग क्र.',
    th_farmer_name: 'शेतकऱ्याचे नाव',
    th_farmer_id: 'शेतकरी आयडी',
    th_commodity: 'पीक',
    th_slot_time: 'वेळ स्लॉट',
    th_status: 'स्थिती',
    th_action_controls: 'कृती नियंत्रणे',
    btn_view: 'पहा',
    btn_call: 'बोलवा',
    btn_complete: 'पूर्ण करा',
    status_waiting: 'प्रतीक्षेत',
    status_processing: 'प्रक्रियेत',
    status_completed: 'पूर्ण',
    status_called: 'बोलावले',
    vehicles_in_queue: 'रांगेतील वाहने',

    analytics_tag: 'रांग टेलीमेट्री आणि वापर',
    analytics_title: 'केंद्र भार आणि परिचालन विश्लेषण',
    analytics_desc: 'खरेदी प्रमाण, अडचणी आणि प्रतीक्षा ट्रेंडचे दृश्य वितरण.',
    load_card_title: 'आजचा केंद्र भार',
    slot_morning: 'सकाळ (08:30 AM - 12:00 PM)',
    slot_afternoon: 'दुपार (12:00 PM - 03:30 PM)',
    slot_evening: 'संध्याकाळ (03:30 PM - 05:30 PM)',
    load_hint: '💡 स्मार्ट शेड्यूलिंग सकाळची गर्दी दुपारच्या स्लॉटमध्ये संतुलित करते.',
    bottleneck_title: 'रांग अडथळा मॉनिटर',
    bay3_title: 'वेब्रिज बे 3',
    bay3_sub: 'एकूण आणि निव्वळ वजन',
    lab_title: 'ओलावा चाचणी प्रयोगशाळा',
    lab_sub: 'कॅलिब्रेटेड डिजिटल मीटर',
    desk_title: 'पावती काउंटर',
    desk_sub: 'डिजिटल प्रमाणपत्र स्वाक्षरी',
    trends_title: 'तासांनुसार प्रतीक्षा ट्रेंड',
    dwell_time: 'सरासरी कृषी उत्पन्न बाजार वेळ: 28.4 मिनिटे',

    modal_gate_record: 'मार्केट गेट नोंद',
    modal_farmer_title: 'शेतकरी तपासणी पत्रक',
    modal_fname: 'शेतकऱ्याचे नाव',
    modal_fid: 'शेतकरी आयडी',
    modal_crop: 'पीक',
    modal_token: 'रांग टोकन',
    modal_land: 'जमीन नोंद (7/12)',
    modal_moist: 'ओलावा प्रमाण',
    modal_close: 'बंद करा',
    modal_process: 'माल प्रक्रिया करा',

    reg_title: 'शेतकरी नोंदणी',
    reg_subtitle: 'डिजिटल स्लॉट बुकिंग सुरू करण्यासाठी तुमचे शेती आणि पीक तपशील प्रविष्ट करा.',
    reg_lang_label: 'पसंतीची वेबसाइट भाषा *',
    reg_name: 'पूर्ण नाव *',
    reg_mobile: 'मोबाईल नंबर *',
    reg_farmer_id: 'शेतकरी आयडी (आधार / कृषी आयडी) *',
    reg_village: 'गाव / शहर *',
    reg_district: 'जिल्हा *',
    reg_centre: 'जवळचे खरेदी केंद्र *',
    reg_commodity: 'विक्रीसाठी मुख्य पीक *',
    reg_submit: 'नोंदणी पूर्ण करा आणि डॅशबोर्डवर जा 🚜',

    dash_welcome: 'स्वागत आहे, शेतकरी',
    dash_profile_tag: 'सत्यापित शेतकरी प्रोफाइल',
    dash_upcoming_slot: 'आगामी स्लॉट',
    dash_queue_pos: 'रांगेतील स्थान',
    dash_proc_status: 'खरेदी स्थिती',
    dash_pay_status: 'पेमेंट स्थिती',
    dash_btn_book: 'नवीन स्लॉट बुक करा',
    dash_btn_queue: 'थेट रांग पहा',
    dash_btn_track: 'खरेदी ट्रॅक करा',
    dash_btn_payment: 'पेमेंट इतिहास',
    dash_current_booking: 'तुमची सध्याची बुकिंग',
    dash_token_number: 'टोकन क्रमांक',
    dash_change_lang: 'वेबसाइट भाषा प्राधान्य',
    dash_save_lang: 'भाषा बदला',

    queue_title: 'थेट कृषी उत्पन्न बाजार रांग',
    queue_telemetry: 'थेट माहिती (टेलीमेट्री)',
    queue_centre_status: 'सुरू (चालू)',
    queue_your_number: 'तुमचा रांग टोकन',
    queue_current_pos: 'सध्याचे स्थान',
    queue_farmers_ahead: 'पुढील शेतकरी',
    queue_serving: 'सध्या सेवा घेत असलेले',
    queue_est_wait: 'अंदाजे प्रतीक्षा',
    queue_sim_btn: 'रांगेतील हालचाल सिम्युलेट करा 🚜',
    queue_reset_btn: 'रीसेट करा',
    queue_list_title: 'खरेदी रांग यादी',

    proc_title: 'खरेदी स्थिती',
    proc_subtitle: 'गेट नोंदणीपासून ते पीक स्वीकृती आणि बँक खात्यात पैसे जमा होईपर्यंतची संपूर्ण माहिती.',
    proc_produce: 'पीक उत्पादन',
    proc_quantity: 'प्रमाण (वजन)',
    proc_grade: 'गुणवत्ता प्रत',
    proc_moisture: 'ओलावा प्रमाण',

    pay_title: 'पेमेंट स्थिती आणि इतिहास',
    pay_subtitle: 'पारदर्शक हमीभाव दर आणि थेट बँक खात्यात थेट लाभ हस्तांतरण (DBT).',
    pay_advice: 'DBT पेमेंट पावती',
    pay_status_processing: '🟡 प्रक्रियेत आहे',
    pay_status_completed: '🟢 पेमेंट जमा झाले (पूर्ण)',
    pay_rate: 'सरकारी हमीभाव (MSP)',
    pay_total: 'एकूण खरेदी मूल्य',
    pay_history_title: 'मागील पेमेंट इतिहास',

    book_title: 'खरेदी स्लॉट बुक करा',
    book_step1: 'पीक निवडा',
    book_step2: 'खरेदी केंद्र निवडा',
    book_step3: 'तारीख निवडा',
    book_step4: 'उपलब्ध वेळ स्लॉट निवडा',
    book_summary: 'बुकिंग सारांश',
    book_confirm: 'स्लॉट निश्चित करा 🚜'
  }
};

// Phrase Map for Universal Auto-Translation across ANY text node
const phraseMap = [
  {
    en: 'Central Procurement Centre Dashboard',
    te: 'కేంద్ర సేకరణ కేంద్రం డ్యాష్‌బోర్డ్',
    hi: 'केंद्रीय खरीद केन्द्र डैशबोर्ड',
    mr: 'केंद्रीय खरेदी केंद्र डॅशबोर्ड'
  },
  {
    en: 'Location: Badnera Road, Grain Market Complex • Max Intake: 100 Farmers/Day',
    te: 'ప్రదేశం: బద్నేరా రోడ్, ధాన్య మార్కెట్ కాంప్లెక్స్ • గరిష్ట పరిమితి: 100 రైతులు/రోజు',
    hi: 'स्थान: बडनेरा रोड, अनाज मंडी परिसर • अधिकतम क्षमता: 100 किसान/दिन',
    mr: 'स्थान: बडनेरा रोड, धान्य मार्केट कॉम्प्लेक्स • कमाल क्षमता: 100 शेतकरी/दिवस'
  },
  {
    en: 'Mandi Gates Operational',
    te: 'మార్కెట్ గేట్లు ప్రారంభంలో ఉన్నాయి',
    hi: 'मंडी गेट संचालित हैं',
    mr: 'मार्केट गेट सुरू आहेत'
  },
  {
    en: 'Currently Serving Token',
    te: 'ప్రస్తుతం సేవలు పొందుతున్న టోకెన్',
    hi: 'वर्तमान सेवा टोकन',
    mr: 'सध्या सेवा घेत असलेला टोकन'
  },
  {
    en: "Today's Farmers",
    te: 'నేటి రైతులు',
    hi: 'आज के किसान',
    mr: 'आजचे शेतकरी'
  },
  {
    en: 'Total Scheduled Bookings',
    te: 'మొత్తం షెడ్యూల్డ్ బుకింగ్‌లు',
    hi: 'कुल निर्धारित बुकिंग',
    mr: 'एकूण नियोजित बुकिंग'
  },
  {
    en: 'Completed',
    te: 'పూర్తయినవి',
    hi: 'पूर्ण हुआ',
    mr: 'पूर्ण झाले'
  },
  {
    en: 'Weighed & Approved',
    te: 'తూకం & ఆమోదించబడినవి',
    hi: 'तौला और स्वीकृत',
    mr: 'वजन व मंजूर'
  },
  {
    en: 'Waiting in Yard',
    te: 'యార్డులో నిరీక్షణ',
    hi: 'यार्ड में प्रतीक्षारत',
    mr: 'यार्डमध्ये प्रतीक्षेत'
  },
  {
    en: 'Staged in Arrival Bays',
    te: 'ఆగమన బేలలో నిలిచినవి',
    hi: 'आगमन बे में उपस्थित',
    mr: 'आगमन बे मध्ये उपस्थित'
  },
  {
    en: 'Currently Processing',
    te: 'ప్రస్తుతం ప్రక్రియలో ఉన్నవి',
    hi: 'वर्तमान प्रक्रियाधीन',
    mr: 'सध्या प्रक्रियेत'
  },
  {
    en: 'Bays 1, 2 & 3 Active',
    te: 'బేస్ 1, 2 & 3 చురుకుగా ఉన్నాయి',
    hi: 'बे 1, 2 और 3 सक्रिय',
    mr: 'बे 1, 2 आणि 3 सक्रिय'
  },
  {
    en: 'Average Waiting Time',
    te: 'సగటు నిరీక్షణ సమయం',
    hi: 'औसत प्रतीक्षा समय',
    mr: 'सरासरी प्रतीक्षा वेळ'
  },
  {
    en: 'Down from traditional 8-12 hours wait',
    te: 'సాధారణ 8-12 గంటల నిరీక్షణ కంటే తక్కువ',
    hi: 'पारंपरिक 8-12 घंटे से बहुत कम',
    mr: 'पारंपरिक 8-12 तासांपेक्षा कमी'
  },
  {
    en: 'Centre Capacity Utilization',
    te: 'కేంద్ర సామర్థ్య వినియోగం',
    hi: 'केन्द्र क्षमता उपयोग',
    mr: 'केंद्र क्षमता वापर'
  },
  {
    en: '78 / 100 daily quota allocated',
    te: '78 / 100 రోజువారీ కోటా కేటాయించబడింది',
    hi: '78 / 100 दैनिक कोटा आवंटित',
    mr: '78 / 100 दैनिक कोटा वाटप'
  },
  {
    en: 'Centre Actions:',
    te: 'కేంద్ర చర్యలు:',
    hi: 'केन्द्र कार्य:',
    mr: 'केंद्र कृती:'
  },
  {
    en: 'Call Next Farmer',
    te: 'తదుపరి రైతును పిలవండి',
    hi: 'अगले किसान को बुलाएं',
    mr: 'पुढील शेतकऱ्याला बोलवा'
  },
  {
    en: 'Start Procurement',
    te: 'సేకరణ ప్రారంభించండి',
    hi: 'खरीद शुरू करें',
    mr: 'खरेदी सुरू करा'
  },
  {
    en: 'Complete Procurement',
    te: 'సేకరణ పూర్తి చేయండి',
    hi: 'खरीद पूर्ण करें',
    mr: 'खरेदी पूर्ण करा'
  },
  {
    en: 'Update Payment (PFMS DBT)',
    te: 'చెల్లింపు నవీకరించండి (PFMS DBT)',
    hi: 'भुगतान अद्यतन करें (PFMS DBT)',
    mr: 'पेमेंट अपडेट करा (PFMS DBT)'
  },
  {
    en: 'View Farmer Details',
    te: 'రైతు వివరాలు చూడండి',
    hi: 'किसान विवरण देखें',
    mr: 'शेतकरी तपशील पहा'
  },
  {
    en: 'Current Mandi Queue & Staging',
    te: 'ప్రస్తుత మార్కెట్ క్యూ & నిరీక్షణ',
    hi: 'वर्तमान मंडी कतार एवं यार्ड',
    mr: 'सध्याची कृषी उत्पन्न बाजार रांग'
  },
  {
    en: 'Real-time vehicle sequence at APMC Gate 2.',
    te: 'APMC గేట్ 2 వద్ద నిజ-సమయ వాహనాల వరుస.',
    hi: 'एपीएमसी गेट 2 पर वास्तविक समय वाहन अनुक्रम।',
    mr: 'एपीएमसी गेट 2 वर रिअल-टाइम वाहन क्रम.'
  },
  {
    en: 'Active Queue',
    te: 'క్రియాశీల క్యూ',
    hi: 'सक्रिय कतार',
    mr: 'सक्रिय रांग'
  },
  {
    en: 'Queue No.',
    te: 'క్యూ సంఖ్య',
    hi: 'कतार सं.',
    mr: 'रांग क्र.'
  },
  {
    en: 'Farmer Name',
    te: 'రైతు పేరు',
    hi: 'किसान का नाम',
    mr: 'शेतकऱ्याचे नाव'
  },
  {
    en: 'Farmer ID',
    te: 'రైతు ID',
    hi: 'किसान आईडी',
    mr: 'शेतकरी आयडी'
  },
  {
    en: 'Commodity',
    te: 'పంట',
    hi: 'फसल',
    mr: 'पीक'
  },
  {
    en: 'Slot Time',
    te: 'స్లాట్ సమయం',
    hi: 'स्लॉट समय',
    mr: 'वेळ स्लॉट'
  },
  {
    en: 'Status',
    te: 'స్థితి',
    hi: 'स्थिति',
    mr: 'स्थिती'
  },
  {
    en: 'Action Controls',
    te: 'చర్య నియంత్రణలు',
    hi: 'कार्रवाई नियंत्रण',
    mr: 'कृती नियंत्रणे'
  },
  {
    en: 'Queue Telemetry & Utilization',
    te: 'క్యూ టెలిమెట్రీ & వినియోగం',
    hi: 'कतार टेलीमेट्री एवं उपयोग',
    mr: 'रांग टेलीमेट्री आणि वापर'
  },
  {
    en: 'Centre Load & Operational Analytics',
    te: 'కేంద్ర లోడ్ & కార్యాచరణ విశ్లేషణ',
    hi: 'केन्द्र भार एवं संचालन विश्लेषण',
    mr: 'केंद्र भार आणि परिचालन विश्लेषण'
  },
  {
    en: 'Visual distribution of procurement volume, bottleneck detection, and waiting trends.',
    te: 'సేకరణ పరిమాణం, అడ్డంకులు మరియు నిరీక్షణ ధోరణుల పంపిణీ.',
    hi: 'खरीद मात्रा, बाधाओं और प्रतीक्षा प्रवृत्तियों का दृश्य वितरण।',
    mr: 'खरेदी प्रमाण, अडचणी आणि प्रतीक्षा ट्रेंडचे दृश्य वितरण.'
  },
  {
    en: "Today's Centre Load",
    te: 'నేటి కేంద్ర లోడ్',
    hi: 'आज का केन्द्र भार',
    mr: 'आजचा केंद्र भार'
  },
  {
    en: 'Queue Bottleneck Monitor',
    te: 'క్యూ అడ్డంకుల పర్యవేక్షణ',
    hi: 'कतार बाधा मॉनिटर',
    mr: 'रांग अडथळा मॉनिटर'
  },
  {
    en: 'Waiting Trends by Hour',
    te: 'గంటల వారీగా నిరీక్షణ ధోరణులు',
    hi: 'प्रति घंटा प्रतीक्षा रुझान',
    mr: 'तासांनुसार प्रतीक्षा ट्रेंड'
  },
  {
    en: 'Weighbridge Bay 3',
    te: 'వేబ్రిడ్జ్ బే 3',
    hi: 'वेब्रिज बे 3',
    mr: 'वेब्रिज बे 3'
  },
  {
    en: 'Gross & tare weighment',
    te: 'స్థూల & నికర తూకం',
    hi: 'सकल एवं शुद्ध तौल',
    mr: 'एकूण आणि निव्वळ वजन'
  },
  {
    en: 'Moisture Testing Lab',
    te: 'తేమ పరీక్ష ప్రయోగశాల',
    hi: 'नमी परीक्षण प्रयोगशाला',
    mr: 'ओलावा चाचणी प्रयोगशाळा'
  },
  {
    en: 'Calibrated digital meters',
    te: 'క్యాలిబ్రేటెడ్ డిజిటల్ మీటర్లు',
    hi: 'कैलिब्रेटेड डिजिटल मीटर',
    mr: 'कॅलिब्रेटेड डिजिटल मीटर'
  },
  {
    en: 'Voucher & Receipt Desk',
    te: 'రసీదు డెస్క్',
    hi: 'रसीद काउंटर',
    mr: 'पावती काउंटर'
  },
  {
    en: 'Digital certificate sign-off',
    te: 'డిజిటల్ ధృవీకరణ పత్రం జారీ',
    hi: 'डिजिटल प्रमाणपत्र हस्ताक्षर',
    mr: 'डिजिटल प्रमाणपत्र स्वाक्षरी'
  },
  {
    en: 'Centre Dashboard',
    te: 'కేంద్ర డ్యాష్‌బోర్డ్',
    hi: 'केन्द्र डैशबोर्ड',
    mr: 'केंद्र डॅशबोर्ड'
  },
  {
    en: 'Current Queue',
    te: 'ప్రస్తుత క్యూ',
    hi: 'वर्तमान कतार',
    mr: 'सध्याची रांग'
  },
  {
    en: 'Capacity Analytics',
    te: 'సామర్థ్య విశ్లేషణ',
    hi: 'क्षमता विश्लेषण',
    mr: 'क्षमता विश्लेषण'
  },
  {
    en: 'Farmer View',
    te: 'రైతు వీక్షణ',
    hi: 'किसान दृश्य',
    mr: 'शेतकरी दृश्य'
  },
  {
    en: 'Centre Staff',
    te: 'కేంద్ర సిబ్బంది',
    hi: 'केन्द्र कर्मचारी',
    mr: 'केंद्र कर्मचारी'
  },
  {
    en: 'Logout',
    te: 'లాగౌట్',
    hi: 'लॉगआउट',
    mr: 'लॉगआउट'
  },
  {
    en: 'Operations & Queue Management',
    te: 'కార్యకలాపాలు & క్యూ నిర్వహణ',
    hi: 'संचालन एवं कतार प्रबंधन',
    mr: 'ऑपरेशन्स आणि रांग व्यवस्थापन'
  },
  {
    en: 'ProcureX Centre',
    te: 'ప్రొక్యూర్ ఎక్స్ కేంద్రం',
    hi: 'प्रोक्योरएक्स केन्द्र',
    mr: 'प्रोक्योरएक्स केंद्र'
  },
  {
    en: 'Dashboard',
    te: 'డ్యాష్‌బోర్డ్',
    hi: 'डैशबोर्ड',
    mr: 'डॅशबोर्ड'
  },
  {
    en: 'Book Slot',
    te: 'స్లాట్ బుక్ చేయండి',
    hi: 'स्लॉट बुक करें',
    mr: 'स्लॉट बुक करा'
  },
  {
    en: 'Live Queue',
    te: 'లైవ్ క్యూ',
    hi: 'लाइव कतार',
    mr: 'थेट रांग'
  },
  {
    en: 'Procurement',
    te: 'సేకరణ',
    hi: 'खरीद',
    mr: 'खरेदी'
  },
  {
    en: 'Payment',
    te: 'చెల్లింపు',
    hi: 'भुगतान',
    mr: 'पेमेंट'
  },
  {
    en: 'Farmer Login',
    te: 'రైతు లాగిన్',
    hi: 'किसान लॉगिन',
    mr: 'शेतकरी लॉगिन'
  },
  {
    en: 'Centre Login',
    te: 'కేంద్రం లాగిన్',
    hi: 'केन्द्र लॉगिन',
    mr: 'केंद्र लॉगिन'
  },
  {
    en: 'Home',
    te: 'హోమ్',
    hi: 'मुख्य पृष्ठ',
    mr: 'मुख्यपृष्ठ'
  },
  {
    en: 'How It Works',
    te: 'ఇది ఎలా పనిచేస్తుంది',
    hi: 'यह कैसे काम करता है',
    mr: 'हे कसे कार्य करते'
  },
  {
    en: 'View',
    te: 'చూడండి',
    hi: 'देखें',
    mr: 'पहा'
  },
  {
    en: 'Call',
    te: 'పిలవండి',
    hi: 'बुलाएं',
    mr: 'बोलवा'
  },
  {
    en: 'Complete',
    te: 'పూర్తి చేయండి',
    hi: 'पूर्ण करें',
    mr: 'पूर्ण करा'
  },
  {
    en: 'Waiting',
    te: 'వేచి ఉంది',
    hi: 'प्रतीक्षारत',
    mr: 'प्रतीक्षेत'
  },
  {
    en: 'Processing',
    te: 'ప్రాసెసింగ్',
    hi: 'प्रक्रियाधीन',
    mr: 'प्रक्रियेत'
  },
  {
    en: 'Called',
    te: 'పిలువబడింది',
    hi: 'बुलाया गया',
    mr: 'बोलावले'
  },
  {
    en: 'Verified Farmer Profile',
    te: 'ధృవీకరించబడిన రైతు ప్రొఫైల్',
    hi: 'सत्यापित किसान प्रोफ़ाइल',
    mr: 'सत्यापित शेतकरी प्रोफाइल'
  },
  {
    en: 'Welcome, Farmer',
    te: 'స్వాగతం, రైతు',
    hi: 'स्वागत है, किसान',
    mr: 'स्वागत आहे, शेतकरी'
  },
  {
    en: 'Website Language Preference',
    te: 'వెబ్‌సైట్ భాష ప్రాధాన్యత',
    hi: 'वेबसाइट भाषा प्राथमिकता',
    mr: 'वेबसाइट भाषा प्राधान्य'
  },
  {
    en: 'Book New Slot',
    te: 'కొత్త స్లాట్ బుక్ చేయండి',
    hi: 'नया स्लॉट बुक करें',
    mr: 'नवीन स्लॉट बुक करा'
  },
  {
    en: 'View Live Queue',
    te: 'లైవ్ క్యూ చూడండి',
    hi: 'लाइव कतार देखें',
    mr: 'थेट रांग पहा'
  },
  {
    en: 'Track Procurement',
    te: 'సేకరణ ట్రాక్ చేయండి',
    hi: 'खरीद ट्रैक करें',
    mr: 'खरेदी ट्रॅक करा'
  },
  {
    en: 'Payment History',
    te: 'చెల్లింపు చరిత్ర',
    hi: 'भुगतान इतिहास',
    mr: 'पेमेंट इतिहास'
  },
  {
    en: 'Upcoming Slot',
    te: 'రాబోయే స్లాట్',
    hi: 'आगामी स्लॉट',
    mr: 'आगामी स्लॉट'
  },
  {
    en: 'Queue Position',
    te: 'క్యూ స్థానం',
    hi: 'कतार में स्थान',
    mr: 'रांगेतील स्थान'
  },
  {
    en: 'Your Current Booking',
    te: 'మీ ప్రస్తుత బుకింగ్',
    hi: 'आपकी वर्तमान बुकिंग',
    mr: 'तुमची सध्याची बुकिंग'
  },
  {
    en: 'Token Number',
    te: 'టోకెన్ సంఖ్య',
    hi: 'टोकन नंबर',
    mr: 'टोकन क्रमांक'
  },
  {
    en: 'Live Mandi Queue',
    te: 'లైవ్ మార్కెట్ క్యూ',
    hi: 'लाइव मंडी कतार',
    mr: 'थेट कृषी उत्पन्न बाजार रांग'
  },
  {
    en: 'LIVE TELEMETRY',
    te: 'లైవ్ టెలిమెట్రీ',
    hi: 'लाइव टेलीमेट्री',
    mr: 'थेट टेलीमेट्री'
  },
  {
    en: 'Your Queue Token',
    te: 'మీ క్యూ టోకెన్',
    hi: 'आपका कतार टोकन',
    mr: 'तुमचा रांग टोकन'
  },
  {
    en: 'Current Position',
    te: 'ప్రస్తుత స్థానం',
    hi: 'वर्तमान स्थान',
    mr: 'सध्याचे स्थान'
  },
  {
    en: 'Farmers Ahead',
    te: 'ముందున్న రైతులు',
    hi: 'आगे किसान',
    mr: 'पुढील शेतकरी'
  },
  {
    en: 'Currently Serving',
    te: 'ప్రస్తుతం సేవలు పొందుతున్నది',
    hi: 'वर्तमान सेवा में',
    mr: 'सध्या सेवा घेत असलेले'
  },
  {
    en: 'Estimated Waiting',
    te: 'అంచనా నిరీక్షణ సమయం',
    hi: 'अनुमानित प्रतीक्षा',
    mr: 'अंदाजे प्रतीक्षा'
  },
  {
    en: 'Simulate Queue Movement',
    te: 'క్యూ కదలికను అనుకరించండి',
    hi: 'कतार गति अनुकरण करें',
    mr: 'रांगेतील हालचाल सिम्युलेट करा'
  },
  {
    en: 'Reset',
    te: 'రీసెట్ చేయండి',
    hi: 'रीसेट करें',
    mr: 'రీసెట్ చేయండి'
  },
  {
    en: 'Live Queue Movement Simulator',
    te: 'లైవ్ క్యూ కదలిక సిమ్యులేటర్',
    hi: 'लाइव कतार गति सिम्युलेटर',
    mr: 'थेट रांग हालचाल सिम्युलेटर'
  },
  {
    en: 'Hackathon Demo Tool',
    te: 'డెమో సాధనం',
    hi: 'डेमो टूल',
    mr: 'डेमो टूल'
  },
  {
    en: 'Book a Procurement Slot',
    te: 'సేకరణ స్లాట్‌ను బుక్ చేయండి',
    hi: 'खरीद स्लॉट बुक करें',
    mr: 'खरेदी स्लॉट बुक करा'
  },
  {
    en: 'Step 1: Select Commodity',
    te: 'దశ 1: పంటను ఎంచుకోండి',
    hi: 'चरण 1: फसल चुनें',
    mr: 'टप्पा 1: पीक निवडा'
  },
  {
    en: 'Step 2: Select Procurement Centre',
    te: 'దశ 2: సేకరణ కేంద్రాన్ని ఎంచుకోండి',
    hi: 'चरण 2: खरीद केन्द्र चुनें',
    mr: 'टप्पा 2: खरेदी केंद्र निवडा'
  },
  {
    en: 'Step 3: Select Date',
    te: 'దశ 3: తేదీని ఎంచుకోండి',
    hi: 'चरण 3: तारीख चुनें',
    mr: 'टप्पा 3: तारीख निवडा'
  },
  {
    en: 'Step 4: Select Available Time Slot',
    te: 'దశ 4: సమయ స్లాట్‌ను ఎంచుకోండి',
    hi: 'चरण 4: समय स्लॉट चुनें',
    mr: 'टप्पा 4: वेळ स्लॉट निवडा'
  },
  {
    en: 'Booking Summary',
    te: 'బుకింగ్ సారాంశం',
    hi: 'बुकिंग सारांश',
    mr: 'बुकिंग सारांश'
  },
  {
    en: 'Confirm Slot',
    te: 'స్లాట్‌ను నిర్ధారించండి',
    hi: 'स्लॉट पक्का करें',
    mr: 'स्लॉट निश्चित करा'
  },
  {
    en: 'Farmer Registration',
    te: 'రైతు నమోదు',
    hi: 'किसान पंजीकरण',
    mr: 'शेतकरी नोंदणी'
  },
  {
    en: 'Preferred Website Language',
    te: 'ఇష్టపడే వెబ్‌సైట్ భాష',
    hi: 'वेबसाइट की पसंदीदा भाषा',
    mr: 'पसंतीची वेबसाइट भाषा'
  },
  {
    en: 'Full Name',
    te: 'పూర్తి పేరు',
    hi: 'पूरा नाम',
    mr: 'पूर्ण नाव'
  },
  {
    en: 'Mobile Number',
    te: 'మొబైల్ నంబర్',
    hi: 'मोबाइल नंबर',
    mr: 'मोबाईल नंबर'
  },
  {
    en: 'Farmer ID (Aadhaar / Krishi ID)',
    te: 'రైతు ID (ఆధార్ / కృషి ID)',
    hi: 'किसान आईडी (आधार / कृषि आईडी)',
    mr: 'शेतकरी आयडी (आधार / कृषी आयडी)'
  },
  {
    en: 'Village / Town',
    te: 'గ్రామం / పట్టణం',
    hi: 'गाँव / कस्बा',
    mr: 'गाव / शहर'
  },
  {
    en: 'District',
    te: 'జిల్లా',
    hi: 'ज़िला',
    mr: 'जिल्हा'
  },
  {
    en: 'Nearest Procurement Centre',
    te: 'సమీప సేకరణ కేంద్రం',
    hi: 'निकटतम खरीद केन्द्र',
    mr: 'जवळचे खरेदी केंद्र'
  },
  {
    en: 'Primary Commodity to Sell',
    te: 'అమ్మకానికి ప్రధాన పంట',
    hi: 'बेचने हेतु मुख्य फसल',
    mr: 'विक्रीसाठी मुख्य पीक'
  },
  {
    en: 'Complete Registration & Go to Dashboard',
    te: 'నమోదు పూర్తి చేసి డ్యాష్‌బోర్డ్‌కు వెళ్లండి',
    hi: 'पंजीकरण पूरा करें और डैशबोर्ड पर जाएं',
    mr: 'नोंदणी पूर्ण करा आणि डॅशबोर्डवर जा'
  },
  {
    en: 'Farmer Inspection Sheet',
    te: 'రైతు తనిఖీ పత్రం',
    hi: 'किसान निरीक्षण पत्रक',
    mr: 'शेतकरी तपासणी पत्रक'
  },
  {
    en: 'Mandi Gate Record',
    te: 'మార్కెట్ గేట్ రికార్డు',
    hi: 'मंडी गेट रिकॉर्ड',
    mr: 'मार्केट गेट नोंद'
  },
  {
    en: 'Land Record (7/12)',
    te: 'భూమి రికార్డు (7/12)',
    hi: 'भूमि रिकॉर्ड (7/12)',
    mr: 'जमीन नोंद (7/12)'
  },
  {
    en: 'Moisture Content',
    te: 'తేమ శాతం',
    hi: 'नमी की मात्रा',
    mr: 'ओलावा प्रमाण'
  },
  {
    en: 'Close',
    te: 'మూసివేయి',
    hi: 'बंद करें',
    mr: 'बंद करा'
  },
  {
    en: 'Process Produce',
    te: 'పంటను ప్రాసెస్ చేయండి',
    hi: 'उपज प्रक्रिया करें',
    mr: 'माल प्रक्रिया करा'
  }
];

// Build multi-directional lookup index (lowercased trimmed -> phrase object)
const lookupIndex = new Map();
phraseMap.forEach(item => {
  ['en', 'te', 'hi', 'mr'].forEach(lang => {
    if (item[lang]) {
      lookupIndex.set(item[lang].trim().toLowerCase(), item);
    }
  });
});

const I18N = {
  getLang() {
    const user = typeof Session !== 'undefined' ? Session.getUser() : null;
    return localStorage.getItem('procurex_lang') || (user && user.language) || 'en';
  },

  async setLang(lang) {
    if (!translations[lang]) return;
    localStorage.setItem('procurex_lang', lang);

    // If logged in as farmer, persist to backend
    if (typeof Session !== 'undefined') {
      const user = Session.getUser();
      if (user) {
        user.language = lang;
        Session.setUser(user);
        if (user.farmerId) {
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
    }

    this.apply();
  },

  t(key) {
    const lang = this.getLang();
    const dict = translations[lang] || translations.en;
    if (dict && dict[key]) return dict[key];
    if (translations.en && translations.en[key]) return translations.en[key];
    return null;
  },

  translateString(str, targetLang) {
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    // Direct lookup
    const directHit = lookupIndex.get(trimmed.toLowerCase());
    if (directHit && directHit[targetLang]) {
      return directHit[targetLang];
    }

    // Split leading/trailing emojis/punctuation
    const match = str.match(/^([\s\p{Extended_Pictographic}\u2600-\u27BF\uFE0F⚡📢⚖️✅💰🔍🚜🔄📅🔢🟢🟡🔴⚙️⏱️📊🌾🌿🌽☁️🌱🥣👤🏢✓•]+)?(.*?)([\s\p{Extended_Pictographic}\u2600-\u27BF\uFE0F⚡📢⚖️✅💰🔍🚜🔄📅🔢🟢🟡🔴⚙️⏱️📊🌾🌿🌽☁️🌱🥣👤🏢✓•]+)?$/u);
    if (match) {
      const prefix = match[1] || '';
      const core = (match[2] || '').trim();
      const suffix = match[3] || '';

      if (core) {
        const coreHit = lookupIndex.get(core.toLowerCase());
        if (coreHit && coreHit[targetLang]) {
          return prefix + coreHit[targetLang] + suffix;
        }
      }
    }

    return null;
  },

  autoTranslateDOM(targetLang) {
    const selectors = 'h1, h2, h3, h4, h5, p, span, a, button, label, th, td, .stat-label, .stat-subtext, .section-tag, .badge, strong, b, em';
    document.querySelectorAll(selectors).forEach(el => {
      if (el.hasAttribute('data-i18n')) return;

      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const original = node.textContent;
          const translated = this.translateString(original, targetLang);
          if (translated !== null && translated !== original) {
            node.textContent = translated;
          }
        }
      });
    });
  },

  apply() {
    const lang = this.getLang();
    document.documentElement.lang = lang;

    // 1. Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && typeof translation === 'string' && translation !== key) {
        el.textContent = translation;
      }
    });

    // 2. Translate all placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    // 3. Auto-translate visible text nodes across the entire page
    this.autoTranslateDOM(lang);

    // 4. Synchronize all language selector dropdowns
    document.querySelectorAll('.lang-select-input').forEach(select => {
      select.value = lang;
    });

    // 5. Dispatch language change event for dynamic script listeners
    window.dispatchEvent(new CustomEvent('procurex-language-changed', { detail: { lang } }));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  I18N.apply();
});

if (typeof window !== 'undefined') {
  window.I18N = I18N;
}
