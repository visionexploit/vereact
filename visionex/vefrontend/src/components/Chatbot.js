import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm your VisionExploit AI Assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: botResponse,
          sender: 'bot'
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    // Simple response generation logic
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('hello') || userInputLower.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (userInputLower.includes('course') || userInputLower.includes('program')) {
      return "We offer a variety of courses and programs. Would you like specific information about any particular program?";
    } else if (userInputLower.includes('service')) {
      return "Our services include personalized tutoring, group classes, workshop sessions, and online learning resources. What specific service are you interested in?";
    } else if (userInputLower.includes('contact') || userInputLower.includes('reach')) {
      return "You can reach us at contact@example.com or call us at (123) 456-7890. Our office hours are Monday to Friday, 9 AM to 5 PM.";
    } else if (userInputLower.includes('location') || userInputLower.includes('address')) {
      return "We're located at 123 Education Street, Learning City. Would you like directions?";
    } else if (userInputLower.includes('admission') || userInputLower.includes('apply')) {
      return "Our admissions process is straightforward. You can apply online through our website. Would you like me to guide you through the steps?";
    } else if (userInputLower.includes('cost') || userInputLower.includes('fee') || userInputLower.includes('price') || userInputLower.includes('pricing')) {
      return "Our pricing varies depending on the program. Please visit our pricing page for detailed information, or I can provide a general overview if you'd prefer.";
    } else if (userInputLower.includes('sign up') || userInputLower.includes('register')) {
      return "You can sign up by clicking the 'Sign Up' button in the navigation menu, or I can help guide you through the process. Would you like to know more?";
    } else if (userInputLower.includes('login') || userInputLower.includes('sign in')) {
      return "You can sign in by clicking the 'Sign In' button in the navigation menu. If you're having trouble accessing your account, I can help with that too.";
    } else if (userInputLower.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "Thank you for your message. If you have specific questions about our programs, services, or anything else, please let me know. I'm here to help!";
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle" 
        onClick={toggleChatbot}
        aria-label="Toggle chat support"
      >
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
      </button>
      
      {/* Chatbot Interface */}
      {isOpen && (
        <div className="chatbot-interface">
          <div className="chatbot-header">
            <h3>Support Chat</h3>
            <button className="minimize-button" onClick={toggleChatbot} aria-label="Minimize chat">
              −
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;