# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create an `.env.local` file based on [example.env](example.env) and set the required keys (`GEMINI_API_KEY`, `VITE_OPENAI_API_KEY`).
3. Run the app:
   `npm run dev`

## PDF → Modules met Leeruitkomsten

Het uploaden van een PDF is optioneel. Via **Upload PDF** kunt u desgewenst een kwalificatiedossier aanleveren. De tekst wordt uit het document gehaald en naar OpenAI gestuurd om modules met leeruitkomsten te genereren. De resultaten verschijnen in een overzichtelijke grid.
Wilt u alleen handmatig leerdoelen invoeren, dan kunt u de PDF-uploader overslaan.
