import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [systemContent, setSystemContent] = useState('');
  const [recentQuestions, setRecentQuestions] = useState([]); // Store recent questions


  const chatContainerRef = useRef(null);
  const router = useRouter();
  const session = useSession();
  if (session.status === 'unauthenticated') {
    router?.push('/dashboard/login');
  }

  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const OPENAI_API_KEY = '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';

  const prompts = [
    {
      text: 'Schedule Appointment',
      action: () => {
        router.push('/appointment');
        setQuestion('');
      },
    },
    {
      text: 'Get Weather Updates',
      action: () => {
        router.push('/weathers');
        setQuestion('');
      },
    },
    {
      text: 'Ask general question',
      action: () => {
        setShowOptions(false);
      },
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const savedChatHistory = Cookies.get('chatHistory');
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  useEffect(() => {
    Cookies.set('chatHistory', JSON.stringify(chatHistory), { expires: 30 });
  }, [chatHistory]);

  useEffect(() => {
    // Load system content from the text file
    fetch('/initial_system_context.txt')
      .then((response) => response.text())
      .then((data) => {
        setSystemContent(data);
      })
      .catch((error) => {
        console.error('Error loading system content:', error);
      });
  }, []);

  async function callOpenAIAPI(messageContent) {
    try {
      setLoading(true);

      const APIBody = {
        messages: [
          {
            role: 'system',
            content: systemContent,
          },
          {
            role: 'user',
            content: messageContent,
          },
        ],
        model: 'gpt-3.5-turbo',
      };

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(APIBody),
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error('API request failed.');
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content.trim();
      const newMessage = { text: messageContent, role: 'user' };
      const systemResponse = { text: botMessage, role: 'bot' };

      setMessages([...messages, newMessage, systemResponse]);
      setChatHistory([...chatHistory, newMessage, systemResponse]);

      // Send both question and answer to the server here
      try {
        const email = session.data?.user?.email;
        
        const serverResponse = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: messageContent, answer: botMessage, email }),
        });


        if (serverResponse.status === 201) {
            console.log('Data sent successfully to the server');
          } else if (serverResponse.status === 200) {
            console.log('Data is "hi" or "hello," so it was not sent to the database');
          } else {
            console.error('Error sending data to the server');
          }
          
      } catch (serverError) {
        console.error('Error sending data to the server:', serverError);
      }

      if (
        (messageContent.toLowerCase() === 'hi' ||
          messageContent.toLowerCase() === 'hello' ||
          messageContent.toLowerCase() === 'questions' ||
          messageContent.toLowerCase() === 'appointment' ||
          messageContent.toLowerCase() === 'question' ||
          messageContent.toLowerCase() === 'appointments' ||
          messageContent.toLowerCase() === 'weathers' ||
          messageContent.toLowerCase() === 'weather update' ||
          messageContent.toLowerCase() === 'weathers update' ||
          messageContent.toLowerCase() === 'weather updates' ||
          messageContent.toLowerCase() === 'events' ||
          messageContent.toLowerCase() === 'event' ||
          messageContent.toLowerCase() === 'prompts' ||
          messageContent.toLowerCase() === 'prompt' ||
          messageContent.toLowerCase() === 'weather') &&
        !showOptions
      ) {
        setShowOptions(true);
      }
      
    } catch (error) {
      setLoading(false);
      setError('Something went wrong while fetching data. Please try again.');
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const fetchChatHistory = async () => {
    // Make a GET request to fetch recent questions from the database
    try {
      if (session && session.data?.user.email) {
        const response = await fetch(`/api/chatbot?email=${session.data.user.email}`);

        if (!response.ok) {
          console.error('Error fetching chathistory data:', response.statusText);
          return; // Exit early if there's an error
        }
        
        const data = await response.json();
        setRecentQuestions(data);

      
        // Filter the recent questions based on the user's email
      }
        
      }
      catch (error) {
        console.error('Error fetching recent questions:', error);
      }
    }
    fetchChatHistory();
  },[session]);


  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (!question.trim()) {
        setError('Please enter a question.');
        return;
      }

      callOpenAIAPI(question);
      setQuestion('');
    }
  };

  const handlePromptClick = (prompt) => {
    prompt.action();
  };

  const handleNewChat = () => {
    setMessages([]);
    setShowOptions(false);
    scrollToBottom();
  };

  const toggleChatHistory = () => {
    setShowChatHistory(!showChatHistory);
  };

  const goToHomePage = () => {
    router.push('/'); // Replace '/' with the actual path to your home page
  };

  const selectMessageForEdit = (index) => {
    setSelectedMessageIndex(index);
    setEditedMessage(messages[index].text);
  };

  const saveEditedMessage = () => {
    if (selectedMessageIndex !== null) {
      const editedUserMessage = { text: editedMessage, role: 'user' };

      callOpenAIAPI(editedMessage);

      const updatedMessages = [
        ...messages.slice(0, selectedMessageIndex),
        editedUserMessage,
        ...messages.slice(selectedMessageIndex + 1),
      ];
      setMessages(updatedMessages);
      setChatHistory([...chatHistory, editedUserMessage]);

      setSelectedMessageIndex(null);
      setEditedMessage('');
    }
  };
  const handleEditClick = (index) => {
    // Retrieve the question and answer to edit
    const questionToEdit = recentQuestions[index].question;
    callOpenAIAPI(questionToEdit);
  }
  
  if (session.status === "authenticated") {
    console.log('Email:', session.data?.user?.email);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        margin: '0',
        padding: '0',
        color: '#ffffff', // Updated text color
      }}>
        <p>welcome {session.data?.user?.name}</p>
        <h1 style={{
          fontSize: '2rem', // Updated font size
          marginBottom: '20px',
        }}>Chat with PAC</h1>
        <div style={{
          width: '80%',
          maxHeight: '400px',
          overflowY: 'auto',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Added box shadow
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
        }} ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                padding: '5px',
                margin: '5px 0',
                borderRadius: '5px',
                // color: '#ffffff',
                backgroundColor: message.role === 'user' ? '#a19999' : '#403939', // Updated message background color
              }}
            >
              {message.role === 'user' && selectedMessageIndex === index ? (
                <div>
                  <input style={{ width: '100%' }}
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    placeholder="Edit your message"
                  />
                  <button onClick={saveEditedMessage}>Save</button>
                </div>
              ) : (
                <div>
                  {message.text}
                  {message.role === 'user' && (
                    <button style={{padding: '5px', marginLeft:'5px'}} onClick={() => selectMessageForEdit(index)}>Edit Message</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{
          width: '80%',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {showOptions ? (
            <div>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '10px',
              }}>Choose your option below or ask me general questions:</div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    style={{
                      padding: '10px',
                      margin: '5px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError('');
            }}
            onKeyPress={handleInputKeyPress}
            placeholder='Say hi to see functions or ask a general question...'
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              resize: 'none',
            }}
            cols={100}
            rows={10}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
          }}>
            <button onClick={handleNewChat} style={{
              backgroundColor: '#dc3545',
              color: '#ffffff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              New Chat
            </button>
            <button style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }} onClick={toggleChatHistory}>
              {showChatHistory ? 'Hide recent' : 'Show recent questions'}
            </button>
            <button onClick={goToHomePage} style={{
              backgroundColor: '#dc3545',
              color: '#ffffff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Exit
            </button>
          </div>
          {showChatHistory && (
            <div style={{
              width: '80%',
              backgroundColor: 'white',
              border: '1px solid black',
              padding: '10px',
              borderRadius: '5px',
              overflowY: 'auto',
              maxHeight: '300px',
              marginTop: '20px',
            }}>
              <h2>Recent chat on web</h2>
              <ul style={{
                listStyleType: 'none',
                padding: 0,
              }}>
                {recentQuestions.slice().reverse().map((question, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: '10px',
                      backgroundColor: 'white)',
                      borderRadius: '5px',
                      padding: '10px',
                      color: 'black',
                    }}
                  >
                    <strong>Question:</strong> {question.question}
                    <button onClick={() => handleEditClick(recentQuestions.length - 1 - index)}>move up to edit</button>
                    <br />
                    <strong>Answer:</strong> {question.answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
    
          }}

export default ChatBot;
