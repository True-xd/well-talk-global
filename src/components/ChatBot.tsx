import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

    // Show alert after 1 second
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 1000);

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

    return `${botResponse}<br><br><span class="text-xs font-light opacity-80">${translations[currentLang].disclaimer}</span>`;
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

    // Bot response after delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background font-cyber">
      <div className="bg-card border-2 border-primary rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col h-[90vh] shadow-glow">
        
        {/* Header */}
        <div className="bg-muted p-6 flex justify-between items-center border-b-2 border-primary">
          <h1 className="text-2xl font-bold text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
            HEALTHCARE AI
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Language:</span>
            <Select value={currentLang} onValueChange={(value: Language) => setCurrentLang(value)}>
              <SelectTrigger className="w-32 bg-input border-2 border-primary text-foreground shadow-glow focus:shadow-glow-intense">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert className="m-4 bg-accent/20 border-accent text-accent-foreground animate-fadeInUp">
            <AlertDescription>
              {translations[currentLang].outbreak_alert} ({translations[currentLang].alert_disclaimer})
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Window */}
        <div 
          ref={chatRef}
          className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-card scrollbar-thumb-primary"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--primary)) hsl(var(--card))',
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            >
              <div
                className={`p-4 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-secondary text-secondary-foreground shadow-glow-secondary rounded-3xl rounded-br-lg'
                    : 'bg-muted text-foreground border border-primary shadow-glow rounded-3xl rounded-bl-lg'
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-2 border-primary bg-card flex items-center space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-grow bg-input border-2 border-primary text-foreground placeholder:text-muted-foreground shadow-glow focus:shadow-glow-intense transition-all duration-200"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="p-3 bg-primary text-primary-foreground shadow-glow hover:shadow-glow-intense hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            <Send className="h-6 w-6 rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  );
}