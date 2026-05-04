# Waitlist (Email + SMS) Setup

This repo is configured to use **Netlify Forms** for the waitlist — no API keys, no Google account, and no `.env` needed.

## Netlify Forms (recommended)

1) Deploy the site to Netlify (or ensure it’s already connected)
2) In Netlify: **Site settings → Forms**
3) Enable form notifications to your business email (optional)
4) After the first deploy containing the form, Netlify will detect a form named `satokey-waitlist`

You can view submissions in: **Netlify → Forms → satokey-waitlist**

## Optional (later): Google Sheets + Twilio

If you later want to push signups into Google Sheets and send confirmation SMS automatically, you can switch the frontend to post to a Google Apps Script endpoint (and use Twilio inside Apps Script).

The simplest end-to-end setup that works with a Google Business (Google Workspace) email is:

- Store signups in Google Sheets
- Send you an email notification from your Workspace account (optional)
- Send a confirmation SMS via Twilio (optional)

## 1) Create the Google Sheet

Create a sheet named `Satokey Waitlist` and add these columns in row 1:

- `timestamp`
- `email`
- `phone`
- `smsConsent`
- `source`
- `userAgent`

## 2) Create an Apps Script Web App

From the sheet: **Extensions → Apps Script**

Create a file `Code.gs` with:

```js
// === Config ===
const SHEET_NAME = "Sheet1"; // change if your sheet tab has a different name

// Optional: set these via Apps Script Project Settings → Script Properties
// TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, NOTIFY_EMAIL

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const email = String(payload.email || "").trim().toLowerCase();
    const phone = String(payload.phone || "").trim();
    const smsConsent = Boolean(payload.smsConsent);
    const source = String(payload.source || "satokeyweb").trim();
    const userAgent = String(payload.userAgent || "").trim();

    if (!email || !email.includes("@")) return json_({ ok: false, error: "Invalid email" }, 400);
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) return json_({ ok: false, error: "Invalid phone (E.164 required)" }, 400);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    sheet.appendRow([new Date(), email, phone, smsConsent, source, userAgent]);

    // Optional email notification (sent from your Google Workspace account)
    const notifyEmail = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL");
    if (notifyEmail) {
      MailApp.sendEmail(
        notifyEmail,
        "New Satokey waitlist signup",
        `Email: ${email}\nPhone: ${phone}\nSMS consent: ${smsConsent}\nSource: ${source}`
      );
    }

    // Optional SMS confirmation (Twilio)
    if (smsConsent) {
      const sid = PropertiesService.getScriptProperties().getProperty("TWILIO_ACCOUNT_SID");
      const token = PropertiesService.getScriptProperties().getProperty("TWILIO_AUTH_TOKEN");
      const from = PropertiesService.getScriptProperties().getProperty("TWILIO_FROM_NUMBER");

      if (sid && token && from) {
        const body =
          "Satokey: You’re on the waitlist. We’ll notify you when we launch. Reply STOP to unsubscribe.";
        twilioSendSms_(sid, token, from, phone, body);
      }
    }

    return json_({ ok: true }, 200);
  } catch (err) {
    return json_({ ok: false, error: String(err) }, 500);
  }
}

function twilioSendSms_(accountSid, authToken, fromNumber, toNumber, messageBody) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const payload = {
    From: fromNumber,
    To: toNumber,
    Body: messageBody,
  };

  const options = {
    method: "post",
    payload,
    muteHttpExceptions: true,
    headers: {
      Authorization: "Basic " + Utilities.base64Encode(accountSid + ":" + authToken),
    },
  };

  const res = UrlFetchApp.fetch(url, options);
  const code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("Twilio SMS failed: " + res.getContentText());
  }
}

function json_(obj, status) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

### Deploy

**Deploy → New deployment → Web app**

- Execute as: **Me**
- Who has access: **Anyone**

Copy the Web App URL and set it as `VITE_WAITLIST_ENDPOINT` in `satokeyweb/.env` (only if you switch off Netlify Forms and back to Apps Script).

## 3) Configure secrets (recommended)

In Apps Script: **Project Settings → Script Properties**

- `NOTIFY_EMAIL`: your Google Business email (e.g. `hello@satokey.com`)
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER` (E.164, e.g. `+15551234567`)

## Notes

- The website UI collects explicit SMS consent text.
- For SMS marketing, ensure your Terms/Privacy pages cover SMS/email and local compliance requirements.

