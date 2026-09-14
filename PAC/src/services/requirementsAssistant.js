/**
 * Provider boundary for requirement analysis.
 * Replace this local implementation with a server-side LLM call when an API key is available.
 * Keeping keys on a server (never in VITE_ variables) protects client data and credentials.
 */
export const demoReply = () =>
  "Noted. I’ve mapped that to the relevant requirements and updated the project context. Would you like to define the acceptance criteria next?";

export const initialConversation = [
  { role: 'ai', text: "Hi Maya — I’m Nova, your requirements analyst. I’ll turn this conversation into a clear, reviewable SRS. What are we building today?" },
  { role: 'user', text: 'A platform that helps university students discover and register for campus events.' },
  { role: 'ai', text: 'Great. I’ve recorded the core product goal. Who are the main people who will use it, besides students?' },
  { role: 'user', text: 'Students, event organizers from clubs, and university administrators.' },
  { role: 'ai', text: 'Perfect — I’ve identified three user roles. I found two details we should clarify before approving the scope.' }
];
