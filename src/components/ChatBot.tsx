import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Globe, AlertTriangle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { translations, type Language } from '@/lib/translations';

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

    if (normalizedMessage.includes('symptoms') || normalizedMessage.includes('लक्षण') || normalizedMessage.includes('లక్షణాలు')) {
      botResponse = translations[currentLang].symptoms
        .replace('[topic]', currentLang === 'hi' ? 'सर्दी' : currentLang === 'te' ? 'జలుబు' : 'cold')
        .replace('[symptom1]', currentLang === 'hi' ? 'बहती नाक' : currentLang === 'te' ? 'ముక్కు కారడం' : 'runny nose')
        .replace('[symptom2]', currentLang === 'hi' ? 'छींकना' : currentLang === 'te' ? 'తుమ్ములు' : 'sneezing')
        .replace('[symptom3]', currentLang === 'hi' ? 'गले में खराश' : currentLang === 'te' ? 'గొంతు నొప్పి' : 'sore throat');
    } else if (normalizedMessage.includes('vaccination') || normalizedMessage.includes('टीकाकरण') || normalizedMessage.includes('टीका') || normalizedMessage.includes('టీకా')) {
      botResponse = translations[currentLang].vaccination;
    } else if (normalizedMessage.includes('preventive') || normalizedMessage.includes('निवारक') || normalizedMessage.includes('నివారణ')) {
      botResponse = translations[currentLang].preventive;
    } else if (normalizedMessage.includes('outbreak') || normalizedMessage.includes('alert')) {
      botResponse = translations[currentLang].outbreak_alert;
    }

    return `${botResponse}<br><br><span class="text-xs text-muted-foreground italic">${translations[currentLang].disclaimer}</span>`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[85vh] flex flex-col shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        
        {/* Enhanced Header */}
        <div className="bg-white border-b border-slate-200 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Healthcare AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Your multilingual medical companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs">Online</span>
              </Badge>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={currentLang} onValueChange={(value: Language) => setCurrentLang(value)}>
                  <SelectTrigger className="w-28 h-8 border-slate-300 focus:border-primary">
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
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <Alert className="mx-4 mt-3 mb-2 border-amber-200 bg-amber-50 text-amber-800 animate-fadeInUp">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Health Alert:</strong> {translations[currentLang].outbreak_alert}
              <span className="block text-xs mt-1 opacity-75">
                {translations[currentLang].alert_disclaimer}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Enhanced Chat Window */}
        <div 
          ref={chatRef}
          className="flex-1 p-6 overflow-y-auto chat-scrollbar space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            >
              <div className="flex flex-col max-w-[75%]">
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md ml-auto'
                      : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
                  } shadow-sm`}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <span className={`text-xs text-muted-foreground mt-1 ${
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
              <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-md border border-slate-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className="p-6 bg-white border-t border-slate-200 rounded-b-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about symptoms, vaccinations, or preventive care..."
                className="h-12 pl-4 pr-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl"
                disabled={isTyping}
              />
              <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Powered by Healthcare AI • Multilingual Support</span>
            <span>Press Enter to send</span>
          </div>
        </div>
      </Card>
    </div>
  );
}