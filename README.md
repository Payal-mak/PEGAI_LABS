<<<<<<< HEAD
# Pathfinder — AI Career Counsellor

A one-file web application that gets career guidance from several distinct Gemini-powered counsellors.

## Run it

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `index.html` in a modern browser (or use VS Code Live Server).
3. Paste the key into the session-only key field, select one or more counsellors, ask a question, and choose **Get career advice**.

The API key is not included in this repository, is not stored in local storage, and is only used for the active browser tab.

## Assignment requirements covered

- Four differentiated personas: Technical, HR & Placement, Academic & Research, and Entrepreneurship.
- One or multiple persona selection.
- A single Gemini API request for all selected personas.
- Every persona uses all six Prompt Card fields: Role, Audience, Context, Format, Constraints, and Language.
- Separate, safely rendered response cards for each selected persona.
- Input, network, API, empty response, and malformed response error handling.
- All HTML, CSS, and JavaScript are contained in `index.html`; sections in the script separate persona data, UI rendering, prompt construction, Gemini integration, and the interaction controller.

## Demo checklist

For a short demonstration, show a question answered by one counsellor, then select several counsellors and show their different perspectives. Open the browser network panel if you need to demonstrate that the multi-persona interaction makes one `generateContent` request.
=======
# PEGAI_LABS
>>>>>>> 1976f2b2a268e035e969bdaee22d0e0fba9fbfd1
