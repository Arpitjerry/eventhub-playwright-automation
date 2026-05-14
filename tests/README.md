EventHub QA Automation Suite 🎭
A professional end-to-end testing framework built with Playwright to validate the event management lifecycle on the Rahul Shetty Academy EventHub platform.

📌 Project Overview
This project automates the "Happy Path" for an event management system. It covers everything from administrative event setup to user-side booking and data integrity verification.

🚀 Key Features
End-to-End Workflow: Automates Admin Event Creation → Event Search → User Booking → Reference ID Capture.

Seat Inventory Logic: Dynamically extracts seat counts from the UI and verifies that the count decrements accurately after a successful booking.

Resilient Locators: Uses stable data-testid attributes and dynamic text filtering to interact with a modern, reactive UI.

Asynchronous Handling: Efficiently manages transient "Toast" notifications and page redirects using Web-First assertions.

📊 Reporting
The suite is integrated with Allure Report to provide high-level execution analytics and visual proof of testing.

How to Generate Reports:
Run the tests:
npx playwright test

Serve the Allure Dashboard:
npx allure serve allure-results

🛠 Tech Stack
Framework: Playwright (Node.js)

Language: JavaScript

Reporting: Allure Playwright

Utilities: Regular Expressions for data parsing, Timestamp-based unique IDs

🏃 Setup & Execution
Clone the repository:
git clone [your-repo-url]

Install dependencies:
npm install

Run the automation suite:
npx playwright test

Developed as part of the Playwright Automation Assignment.