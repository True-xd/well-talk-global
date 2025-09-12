export type Language = 'en' | 'hi' | 'te';

export const translations = {
  en: {
    initial: "Hello! I am HEALTHCARE AI, your personal healthcare assistant. I can provide information on preventive care, common disease symptoms, and vaccination schedules. How can I help you today? Please note, I am not a substitute for a medical professional.",
    disclaimer: "Disclaimer: This is a conceptual chatbot for educational purposes and is not connected to real-time government databases. Always consult a healthcare professional for accurate medical advice.",
    symptoms: "Common symptoms for [topic] include: [symptom1], [symptom2], and [symptom3]. Please consult a doctor for a proper diagnosis.",
    vaccination: "Vaccination is key to preventing diseases. Please check with your local health center for the latest vaccination schedule for you and your family.",
    preventive: "Preventive healthcare includes practices like regular hand washing, eating a balanced diet, and staying active. These habits can significantly reduce the risk of many diseases.",
    outbreak_alert: "Simulated Alert: A minor outbreak of seasonal flu has been reported in a nearby region. Please take extra precautions and practice good hygiene.",
    unrecognized: "I'm sorry, I don't have information on that topic. Please try asking about 'symptoms', 'vaccination', or 'preventive care'.",
    alert_disclaimer: "Alerts are simulated for demonstration purposes.",
  },
  hi: {
    initial: "नमस्ते! मैं HEALTHCARE AI हूँ, आपका व्यक्तिगत स्वास्थ्य सहायक। मैं आपको निवारक देखभाल, सामान्य बीमारी के लक्षणों और टीकाकरण की जानकारी दे सकता हूँ। मैं आपकी कैसे मदद कर सकता हूँ? कृपया ध्यान दें, मैं किसी चिकित्सक का स्थान नहीं हूँ।",
    disclaimer: "अस्वीकरण: यह एक वैचारिक चैटबॉट है और वास्तविक सरकारी डेटाबेस से जुड़ा नहीं है। सही चिकित्सा सलाह के लिए हमेशा एक स्वास्थ्य पेशेवर से परामर्श करें।",
    symptoms: "[topic] के सामान्य लक्षणों में शामिल हैं: [symptom1], [symptom2], और [symptom3]। उचित निदान के लिए कृपया डॉक्टर से परामर्श करें।",
    vaccination: "टीकाकरण बीमारियों को रोकने के लिए महत्वपूर्ण है। अपने और अपने परिवार के लिए नवीनतम टीकाकरण अनुसूची के लिए अपने स्थानीय स्वास्थ्य केंद्र से संपर्क करें।",
    preventive: "निवारक स्वास्थ्य देखभाल में नियमित रूप से हाथ धोना, संतुलित आहार लेना और सक्रिय रहना जैसी आदतें शामिल हैं। ये आदतें कई बीमारियों के जोखिम को काफी कम कर सकती हैं।",
    outbreak_alert: "सिमुलेटेड अलर्ट: पास के क्षेत्र में मौसमी फ्लू का एक छोटा प्रकोप दर्ज किया गया है। कृपया अतिरिक्त सावधानी बरतें और अच्छी स्वच्छता का अभ्यास करें।",
    unrecognized: "मुझे खेद है, मेरे पास उस विषय पर जानकारी नहीं है। कृपया 'लक्षण', 'टीकाकरण' या 'निवारक देखभाल' के बारे में पूछने का प्रयास करें।",
    alert_disclaimer: "अलर्ट केवल प्रदर्शन उद्देश्यों के लिए हैं।",
  },
  te: {
    initial: "నమస్కారం! నేను HEALTHCARE AI, మీ వ్యక్తిగత ఆరోగ్య సహాయకుడిని. నేను నివారణ సంరక్షణ, సాధారణ వ్యాధుల లక్షణాలు మరియు టీకా షెడ్యూల్‌ల గురించి సమాచారం అందించగలను. నేను మీకు ఎలా సహాయం చేయగలను? దయచేసి గమనించండి, నేను వైద్య నిపుణుడికి ప్రత్యామ్నాయం కాదు.",
    disclaimer: "నిరాకరణ: ఇది ఒక భావనాత్మక చాట్‌బాట్ మరియు నిజ-సమయ ప్రభుత్వ డేటాబేస్‌లకు అనుసంధానించబడలేదు. సరైన వైద్య సలహా కోసం ఎల్లప్పుడూ ఆరోగ్య నిపుణుడిని సంప్రదించండి.",
    symptoms: "[topic] యొక్క సాధారణ లక్షణాలు: [symptom1], [symptom2] మరియు [symptom3]. దయచేసి సరైన నిర్ధారణ కోసం వైద్యుడిని సంప్రదించండి.",
    vaccination: "వ్యాధులను నివారించడానికి టీకా చాలా ముఖ్యమైనది. దయచేసి మీ మరియు మీ కుటుంబం కోసం తాజా టీకా షెడ్యూల్ కోసం మీ స్థానిక ఆరోగ్య కేంద్రాన్ని సంప్రదించండి.",
    preventive: "నివారణ ఆరోగ్య సంరక్షణలో క్రమం తప్పకుండా చేతులు కడుక్కోవడం, సమతుల్య ఆహారం తీసుకోవడం మరియు చురుకుగా ఉండటం వంటి పద్ధతులు ఉన్నాయి. ఈ అలవాట్లు అనేక వ్యాధుల ప్రమాదాన్ని గణనీయంగా తగ్గించగలవు.",
    outbreak_alert: "సిమ్యులేటెడ్ హెచ్చరిక: సమీప ప్రాంతంలో కాలానుగుణ ఫ్లూ యొక్క చిన్నపాటి వ్యాప్తి నమోదైంది. దయచేసి అదనపు జాగ్రత్తలు తీసుకోండి మరియు మంచి పరిశుభ్రతను పాటించండి.",
    unrecognized: "క్షమించండి, ఆ అంశంపై నా వద్ద సమాచారం లేదు. దయచేసి 'లక్షణాలు', 'టీకా' లేదా 'నివారణ సంరక్షణ' గురించి అడగడానికి ప్రయత్నించండి.",
    alert_disclaimer: "హెచ్చరికలు కేవలం ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే.",
  },
} as const;