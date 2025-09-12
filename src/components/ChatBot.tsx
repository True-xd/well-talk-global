import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Globe, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Language = 'en' | 'hi' | 'te';

const translations = {
  en: {
    initial: "Hello! I am HEALTHCARE AI, your personal healthcare assistant. I can provide information on preventive care, common disease symptoms, and vaccination schedules. How can I help you today? Please note, I am not a substitute for a medical professional.",
    disclaimer: "Disclaimer: This is a conceptual chatbot for educational purposes and is not a substitute for a medical professional. Always consult a healthcare provider for accurate medical advice.",
    symptoms: {
      cold: { name: 'cold', symptoms: ['runny nose', 'sneezing', 'sore throat'] },
      flu: { name: 'flu', symptoms: ['fever', 'body aches', 'fatigue'] },
      covid: { name: 'COVID-19', symptoms: ['cough', 'loss of taste/smell', 'shortness of breath'] }
    },
    vaccination: "Vaccination is key to preventing diseases. Please check with your local health center for the latest vaccination schedule for you and your family.",
    preventive: "Preventive healthcare includes practices like regular hand washing, eating a balanced diet, and staying active. These habits can significantly reduce the risk of many diseases.",
    outbreak_alert: "Simulated Alert: A minor outbreak of seasonal flu has been reported in a nearby region. Please take extra precautions and practice good hygiene.",
    unrecognized: "I'm sorry, I don't have information on that topic. Please try asking about 'symptoms', 'vaccination', or 'preventive care'. You can also ask about symptoms for 'flu' or 'COVID'.",
    alert_disclaimer: "Alerts are simulated for demonstration purposes.",
    typing: "Typing...",
    placeholder: "Ask about symptoms, vaccinations, or preventive care..."
  },
  hi: {
    initial: "नमस्ते! मैं हेल्थकेयर AI हूँ, आपका व्यक्तिगत स्वास्थ्य सहायक। मैं आपको निवारक देखभाल, सामान्य बीमारी के लक्षणों और टीकाकरण की जानकारी दे सकता हूँ। मैं आपकी कैसे मदद कर सकता हूँ? कृपया ध्यान दें, मैं किसी चिकित्सक का स्थान नहीं हूँ।",
    disclaimer: "अस्वीकरण: यह एक वैचारिक चैटबॉट है और किसी चिकित्सक का स्थान नहीं है। सही चिकित्सा सलाह के लिए हमेशा एक स्वास्थ्य पेशेवर से परामर्श करें।",
    symptoms: {
      cold: { name: 'सर्दी', symptoms: ['बहती नाक', 'छींकना', 'गले में खराश'] },
      flu: { name: 'फ्लू', symptoms: ['बुखार', 'शरीर में दर्द', 'थकान'] },
      covid: { name: 'कोविड-19', symptoms: ['खांसी', 'स्वाद/गंध का जाना', 'सांस लेने में तकलीफ'] }
    },
    vaccination: "टीकाकरण बीमारियों को रोकने के लिए महत्वपूर्ण है। अपने और अपने परिवार के लिए नवीनतम टीकाकरण अनुसूची के लिए अपने स्थानीय स्वास्थ्य केंद्र से संपर्क करें।",
    preventive: "निवारक स्वास्थ्य देखभाल में नियमित रूप से हाथ धोना, संतुलित आहार लेना और सक्रिय रहना जैसी आदतें शामिल हैं। ये आदतें कई बीमारियों के जोखिम को काफी कम कर सकती हैं।",
    outbreak_alert: "सिमुलेटेड अलर्ट: पास के क्षेत्र में मौसमी फ्लू का एक छोटा प्रकोप दर्ज किया गया है। कृपया अतिरिक्त सावधानी बरतें और अच्छी स्वच्छता का अभ्यास करें।",
    unrecognized: "मुझे खेद है, मेरे पास उस विषय पर जानकारी नहीं है। कृपया 'लक्षण', 'टीकाकरण' या 'निवारक देखभाल' के बारे में पूछने का प्रयास करें। आप 'फ्लू' या 'कोविड' के लक्षणों के बारे में भी पूछ सकते हैं।",
    alert_disclaimer: "अलर्ट केवल प्रदर्शन उद्देश्यों के लिए हैं।",
    typing: "टाइपिंग...",
    placeholder: "लक्षण, टीकाकरण, या निवारक देखभाल के बारे में पूछें..."
  },
  te: {
    initial: "నమస్కారం! నేను హెల్త్‌కేర్ AIను, మీ వ్యక్తిగత ఆరోగ్య సహాయకుడిని. నేను నివారణ సంరక్షణ, సాధారణ వ్యాధుల లక్షణాలు మరియు టీకా షెడ్యూల్‌ల గురించి సమాచారం అందించగలను. నేను మీకు ఎలా సహాయం చేయగలను? దయచేసి గమనించండి, నేను వైద్య నిపుణుడికి ప్రత్యామ్నాయం కాదు।",
    disclaimer: "నిరాకరణ: ఇది ఒక భావనాత్మక చాట్‌బాట్ మరియు వైద్య నిపుణుడికి ప్రత్యామ్నాయం కాదు. సరైన వైద్య సలహా కోసం ఎల్లప్పుడూ ఆరోగ్య నిపుణుడిని సంప్రదించండి।",
    symptoms: {
      cold: { name: 'జలుబు', symptoms: ['ముక్కు కారడం', 'తుమ్ములు', 'గొంతు నొప్పి'] },
      flu: { name: 'ఫ్లూ', symptoms: ['జ్వరం', 'శరీరం నొప్పులు', 'అలసట'] },
      covid: { name: 'కోవిడ్-19', symptoms: ['దగ్గు', 'రుచి/వాసన కోల్పోవడం', 'ఊపిరి ఆడకపోవడం'] }
    },
    vaccination: "వ్యాధులను నివారించడానికి టీకా చాలా ముఖ్యమైనది. దయచేసి మీ మరియు మీ కుటుంబం కోసం తాజా టీకా షెడ్యూల్ కోసం మీ స్థానిక ఆరోగ్య కేంద్రాన్ని సంప్రదించండి।",
    preventive: "నివారణ ఆరోగ్య సంరక్షణలో క్రమం తప్పకుండా చేతులు కడుక్కోవడం, సమతుల్య ఆహారం తీసుకోవడం మరియు చురుకుగా ఉండటం వంటి పద్ధతులు ఉన్నాయి. ఈ అలవాట్లు అనేక వ్యాధుల ప్రమాదాన్ని గణనీయంగా తగ్గించగలవు।",
    outbreak_alert: "సిమ్యులేటెడ్ హెచ్చరిక: సమీప ప్రాంతంలో కాలానుగుణ ఫ్లూ యొక్క చిన్నపాటి వ్యాప్తి నమోదైంది. దయచేసి అదనపు జాగ్రత్తలు తీసుకోండి మరియు మంచి పరిశుభ్రతను పాటించండి।",
    unrecognized: "క్షమించండి, ఆ అంశంపై నా వద్ద సమాచారం లేదు। దయచేసి 'లక్షణాల', 'టీకా' లేదా 'నివారణ సంరక్షణ' గురించి అడగడానికి ప్రయత్నించండి। మీరు 'ఫ్లూ' లేదా 'కోవిడ్' యొక్క లక్షణాల గురించి కూడా అడగవచ్చు।",
    alert_disclaimer: "హెచ్చరికలు కేవలం ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే।",
    typing: "టైపింగ్...",
    placeholder: "లక్షణాలు, టీకాలు లేదా నివారణ సంరక్షణ గురించి అడగండి..."
  }
};

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [showAlert, setShowAlert] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      sender: 'bot',
      text: translations[currentLang].initial,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    // Show alert after 2 seconds
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update welcome message when language changes
    setMessages([{
      id: '1',
      sender: 'bot',
      text: translations[currentLang].initial,
      timestamp: new Date(),
    }]);
  }, [currentLang]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    let botResponse: string = translations[currentLang].unrecognized;

    const keywords = {
      symptoms: ['symptoms', 'symptom', 'लक्षण', 'లక్షణాలు'],
      vaccination: ['vaccination', 'vaccine', 'टीकाकरण', 'टीका', 'టీకా'],
      preventive: ['preventive', 'prevention', 'निवारक', 'నివారణ'],
      outbreak: ['outbreak', 'alert', 'प्रकोप', 'హెచ్చరిక'],
      cold: ['cold', 'सर्दी', 'జలుబు'],
      flu: ['flu', 'फ्लू'],
      covid: ['covid', 'कोविड', 'కోవిడ్']
    };

    if (keywords.covid.some(k => normalizedMessage.includes(k))) {
      const disease = translations[currentLang].symptoms.covid;
      botResponse = `Common symptoms for **${disease.name}** include: ${disease.symptoms.map(s => `**${s}**`).join(', ')}.`;
    } else if (keywords.flu.some(k => normalizedMessage.includes(k))) {
      const disease = translations[currentLang].symptoms.flu;
      botResponse = `Common symptoms for **${disease.name}** include: ${disease.symptoms.map(s => `**${s}**`).join(', ')}.`;
    } else if (keywords.cold.some(k => normalizedMessage.includes(k))) {
      const disease = translations[currentLang].symptoms.cold;
      botResponse = `Common symptoms for **${disease.name}** include: ${disease.symptoms.map(s => `**${s}**`).join(', ')}.`;
    } else if (keywords.symptoms.some(k => normalizedMessage.includes(k))) {
      const diseasesList = Object.values(translations[currentLang].symptoms).map(d => `**${d.name}**`).join(', ');
      botResponse = `What symptoms are you looking for? I can provide information on ${diseasesList}.`;
    } else if (keywords.vaccination.some(k => normalizedMessage.includes(k))) {
      botResponse = translations[currentLang].vaccination;
    } else if (keywords.preventive.some(k => normalizedMessage.includes(k))) {
      botResponse = translations[currentLang].preventive;
    } else if (keywords.outbreak.some(k => normalizedMessage.includes(k))) {
      botResponse = translations[currentLang].outbreak_alert;
    }

    return `${botResponse}<br><br><span class="text-xs opacity-75">${translations[currentLang].disclaimer}</span>`;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Bot response after delay with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col shadow-xl overflow-hidden bg-white rounded-3xl">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500 rounded-full">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Healthcare AI Assistant</h1>
              <p className="text-sm text-gray-500">Your multilingual medical companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-600">Online</span>
            </div>
            <Select value={currentLang} onValueChange={(value: Language) => setCurrentLang(value)}>
              <SelectTrigger className="w-28 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <Alert className="mx-6 my-4 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded-lg animate-fadeInUp">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="text-sm">
              <strong className="font-semibold flex items-center mb-1">
                Health Alert:
              </strong>
              <p>{translations[currentLang].outbreak_alert}</p>
              <span className="text-xs mt-1 block opacity-75">
                {translations[currentLang].alert_disclaimer}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Window */}
        <div 
          ref={chatRef}
          className="flex-grow p-6 overflow-y-auto space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            >
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-3xl rounded-br-lg'
                      : 'bg-gray-100 text-gray-900 rounded-3xl rounded-bl-lg border border-gray-200 shadow-sm'
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <span className={`text-xs text-gray-500 mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeInUp">
              <div className="bg-gray-100 p-4 rounded-3xl rounded-bl-lg border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="relative flex items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translations[currentLang].placeholder}
              className="flex-grow py-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full shadow-md text-white ml-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Press Enter to send</p>
        </div>
      </Card>
    </div>
  );
}