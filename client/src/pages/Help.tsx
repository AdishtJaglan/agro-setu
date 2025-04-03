import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send, Loader2, Sprout, Mic, Plus, AudioLines } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Leaf, Tractor } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listen, setListen] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      (
        window as typeof window & {
          SpeechRecognition?: typeof SpeechRecognition;
          webkitSpeechRecognition?: typeof SpeechRecognition;
        }
      ).SpeechRecognition ||
      (
        window as typeof window & {
          SpeechRecognition?: typeof SpeechRecognition;
          webkitSpeechRecognition?: typeof SpeechRecognition;
        }
      ).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Browser does not support Speech Recognition API");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setInput((prev) => prev + finalTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setListen(false);
    };

    recognition.onend = () => {
      setListen(false);
    };
  }, []);

  const fetchGeminiResponse = async (userMessage: string): Promise<void> => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: `${import.meta.env.VITE_API_KEY}` });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
      });

      const aiResponse = response.text || "I'm not sure how to respond.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now() * Math.random()}`,
          text: aiResponse,
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching response:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          text: "Sorry, there was an error processing your request.",
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);

      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    fetchGeminiResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !listen) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listen) {
      recognitionRef.current.stop();
    }
  };

  const handleSpeechToText = () => {
    setListen(!listen);

    if (!listen) {
      console.log("listening");
      startListening();
    } else {
      stopListening();
    }
  };

  const handleFileAdd = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
    }
  };

  const MarkdownComponents = {
    code({
      inline,
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-green-50 to-green-100">
        {/* Header with Agricultural Theme */}
        <div className="bg-green-600 p-4 shadow-lg flex items-center">
          <div className="flex items-center space-x-2 w-full">
            <img
              src="/me.jpeg"
              alt="Farm Assistant"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">
                Farm AI Assistant
              </h1>
              <p className="text-xs text-green-200">Agricultural Advisor</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-green-500 p-2 rounded-full hover:bg-green-400 transition">
                <Leaf className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Background Pattern and Chat Container */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 relative"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url("data-uri-of-subtle-agricultural-pattern")',
            backgroundRepeat: "repeat",
          }}
        >
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <Tractor className="w-24 h-24 text-green-300 mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Welcome to Farm AI
              </h2>
              <p className="text-green-600 mb-4">
                Ask questions about crop management, farming techniques, or
                agricultural challenges
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-700"
                >
                  Crop Advice
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-700"
                >
                  Weather Impact
                </Button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                max-w-[80%] p-3 rounded-2xl shadow-sm
                ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-900 border border-green-100"
                }
              `}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown
                      components={MarkdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white p-3 rounded-xl flex items-center border border-green-100 shadow-sm">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-green-500" />
                  <span className="text-green-500">Analyzing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area with Enhanced Design */}
        <div className="p-4 bg-white border-green-100 shadow-up rounded-t-3xl">
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1 border border-gray-300 py-6 px-3 rounded-3xl"
              placeholder=" Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
          </div>
          <div className="flex w-full justify-between items-center gap-4 mt-3">
            <div className="flex justify-start items-center gap-4">
              <div
                onClick={() => handleFileAdd()}
                className="cursor-pointer flex items-center justify-center border border-gray-300 p-2 rounded-full"
              >
                <Plus className="text-gray-600" />
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={() => handleFileChange()}
                className="hidden"
                multiple // remove if you want single file selection
              />
              <button className="flex items-center font-bold text-gray-600 justify-between gap-2 rounded-full px-3 border border-gray-300 p-2">
                <Sprout className="text-gray-600" />
                Detect
              </button>
            </div>
            <div className="flex w-full justify-end gap-4">
              <button
                className={`${
                  !listen
                    ? "border border-gray-300 rounded-full"
                    : "bg-gray-600 rounded-full"
                } flex items-center justify-center`}
                onClick={() => handleSpeechToText()}
              >
                {listen ? (
                  <AudioLines className="h-10 w-10 p-2 text-white animate-pulse" />
                ) : (
                  <Mic className="h-10 w-10 p-2 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="bg-gray-600 rounded-full p-2 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 p-0.5 animate-spin text-white" />
                ) : (
                  <Send className="h-6 w-6 p-0.5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
