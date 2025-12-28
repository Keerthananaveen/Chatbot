

export const botReply = (msg) => {
  msg = msg.toLowerCase();
  if (msg.includes("hello")) return "Hello! 👋";
  if (msg.includes("price")) return "Check our pricing page.";
  if (msg.includes("support")) return "I can escalate this for you.";
  return "I'm not sure. Can you rephrase?";
};

export const userGreeting = (name) => `Hi ${name}! How can I assist you today?`;
export const escalateToHuman = () => "Connecting you to a human agent. Please wait...";
export const thankUser = () => "Thank you for your feedback!";
export const endChatMessage = () => "Thank you for chatting with us. Have a great day!";
export const invalidInputMessage = () => "I'm sorry, I didn't understand that. Could you please clarify?";
export const feedbackPrompt = () => "We value your feedback. Please let us know how we did.";
export const chatStartedMessage = () => "Your chat session has started. How can we help you?";
export const chatEndedMessage = () => "Your chat session has ended. Feel free to reach out again!";
export const messageSentConfirmation = () => "Your message has been sent successfully.";
export const messageReceivedAcknowledgment = () => "We have received your message and will respond shortly.";
export const typingIndicator = () => "The agent is typing...";
export const waitForResponseMessage = () => "Please wait while we process your request.";
export const sessionTimeoutMessage = () => "Your session has timed out due to inactivity. Please start a new chat.";
export const proactiveHelpOffer = () => "It seems you might need assistance. How can I help you?";
export const faqResponse = (question) => `Here is the information we have regarding your question: "${question}". Please visit our FAQ page for more details.`;
export const followUpMessage = () => "Just checking in to see if you need any further assistance.";
export const apologyMessage = () => "We apologize for any inconvenience caused. How can we make it right?";
export const closingMessage = () => "Thank you for choosing our service. Goodbye!";
export const welcomeBackMessage = (name) => `Welcome back, ${name}! How can we assist you today?`;
export const unavailableMessage = () => "All our agents are currently busy. Please hold on or try again later.";
export const escalationAcknowledgment = () => "Your request has been escalated to a human agent. They will be with you shortly.";
export const surveyInvitation = () => "We would love to hear your thoughts! Please take a moment to complete our survey.";
export const feedbackReceivedMessage = () => "Your feedback has been received. Thank you for helping us improve!";
export const chatHistorySummary = (chatId) => `Here is a summary of your chat session with ID: ${chatId}.`;
