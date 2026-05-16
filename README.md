# EventHub QA Automation Suite 🎭

A professional, production-grade end-to-end testing framework built with **Playwright** and **JavaScript** to validate core business workflows, state transitions, and dynamic logical engines on the Rahul Shetty Academy EventHub platform.

## 📌 Project Overview
This repository contains a resilient automation suite engineered to validate an event management ecosystem. The architecture utilizes modern QA patterns, including reusable helper functions, localized DOM tree scoping, and web-first assertions to handle data mutations, inventory drops, and conditional validation loops across two major testing matrices.

---

## 🧪 Automated Test Suites & Scenarios

### 📦 Suite 1: Event Lifecycle & Inventory Verification (Assignment 1)
* **File:** `tests/Assignment_Event_Creation.spec.js`
* **Objective:** Validate the entire creation-to-consumption pipeline, ensuring transactional data integrity and real-time backend-to-UI seat count inventory logic.
* **Core Workflow Steps:**
    1. **Custom Authentication:** Logs in via a structural helper function, locating credentials using native placeholder and label selectors, asserting a successful landing page redirection.
    2. **Dynamic Admin Setup:** Navigates to `/admin/events` and drafts a brand new event utilizing a unique timestamp signature (`Test Event ${Date.now()}`) and a future-dated calendar helper.
    3. **Baseline Capturing:** Filters through all live event cards (`data-testid="event-card"`) to locate the newly generated title. Parses the raw inner text layout to extract and store the integer value of `seatsBeforeBooking` (Default: 50).
    4. **Checkout Injection:** Executes the booking sequence using a default ticket quantity of 1, capturing the unique string via the `.booking-ref` element wrapper.
    5. **Profile Synchronization:** Navigates to `/bookings` to confirm that the generated record accurately registers under the correct user history, matches the exact text signature of the `bookingRef`, and links cleanly back to the unique `eventTitle`.
    6. **State Reduction Assertion:** Returns to the public `/events` directory, re-isolates the custom event card, extracts the updated seat metrics (`seatsAfterBooking`), and mathematically asserts that:
       $$\text{seatsAfterBooking} = \text{seatsBeforeBooking} - 1$$

---

### 📦 Suite 2: Advanced Booking & Refund Eligibility Engine (Assignment 2)
* **File:** `tests/Assignment_Booking_Refund_Check.spec.js`
* **Objective:** Validate the business logic layers enforcing return constraints by examining single-ticket purchases vs. bulk group restrictions.
* **Core Workflow Scenarios:**
    * **Scenario A: Single-Ticket Refund Path (Eligible)**
        * Books the first available event with a default single ticket allocation.
        * **Data Integrity Check:** Extracts the dynamic header reference array from the layout breadcrumbs (`main nav`) and asserts that the first character of the parsed string matches the first letter of the `<h1>` event title header.
        * **Performance State Tracking:** Triggers the return eligibility check and asserts that the transient asynchronous loading element (`#refund-spinner`) pops into view immediately and cleanly resolves/hides within a strict **6-second window**.
        * **Outcome Assertion:** Confirms that the output layout element (`#refund-result`) successfully manifests and populates with `"Eligible for refund"`.
    * **Scenario B: Group-Ticket Refund Path (Restricted)**
        * Targets the interactive ticket allocation grid using strict role-specific locators (`getByRole('button', { name: '+' })`) to completely decouple clicks from surrounding background text elements.
        * Clicks the control **twice** to cleanly increment the transaction size to **3 tickets**.
        * **Outcome Assertion:** Follows the identical asynchronous spinner execution cycle but verifies that the engine successfully blocks group refund access, displaying `"Not eligible for refund"` and `"Group bookings (3 tickets) are non-refundable"`.

---

## 🛠 Architectural Highlights & Best Practices
* **Resilient Element Isolation:** Completely eliminates structural selector brittle-ness by adopting strict-mode safe Playwright role-filtering, localized relative scoping (`main nav`), and dedicated `data-testid` tracking.
* **Asynchronous Web-First Assertions:** Handles transient UI state animations, event messaging toast alerts, and dynamic content re-renders without adding flaky, hard-coded timeouts.
* **Data-Driven Sanitization:** Integrates strict JavaScript `.trim()` configurations and array-based text validation sweeps (`toContainText([...])`) to manage inconsistent developer spacing or line breaks inside the HTML layout layer.

## 📊 Reporting & Analytics
The execution cycle hooks directly into **Allure Report** to compile high-fidelity execution metrics, analytical error call logs, and visual step proofing.

### Executing the Suite Locally:
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
