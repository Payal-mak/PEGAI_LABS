# Specflow AI

An AI-ready requirement elicitation and IEEE-style SRS demo for the Premium Learner Assignment (Question 4).

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create a production bundle in `dist/`.

## AI integration

The working demo uses a predictable local reply provider in `src/services/requirementsAssistant.js`, so no API key is needed. A production integration should call an authenticated backend endpoint from this service and keep the model API key on the server.
