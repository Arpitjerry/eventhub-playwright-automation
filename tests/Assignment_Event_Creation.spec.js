const {test, expect} = require('@playwright/test');
const GMAIL_USER = { email: "AT01010@gmail.com", password: "At@12345678" };

let Event_Title = "Test Event"+Date.now();
const BASE_URL = "https://eventhub.rahulshettyacademy.com"
async function loginAs(page,user)
{
   await page.goto("https://eventhub.rahulshettyacademy.com/login") 
   await page.locator("#email").fill(user.email);
   await page.locator("#password").fill(user.password)
   await page.locator("#login-btn").click();
   await page.locator("#event-card").last().waitFor();

}

async function getFutureDateTime(days, hours) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(d.getHours() + hours);

    // YYYY-MM-DD
    const datePart = d.toISOString().split('T')[0];
    
    // HH:mm (in 24-hour format)
    const timePart = d.toTimeString().slice(0, 5);

    // Combine with a 'T' in the middle
    return `${datePart}T${timePart}`; 
    // Example Result: "2026-05-21T14:30"
}

test("Create A New Event", async({page})=>
{
const combinedValue = await getFutureDateTime(7, 2);
await loginAs(page, GMAIL_USER);
await page.getByText('Admin').click();
await page.getByRole('navigation').locator('a[href="/admin/events"]').click();
await page.locator("#event-title-input").fill(Event_Title);
await page.getByPlaceholder('Describe the event…').fill("Test");
await page.locator("#city").fill("Pune");
await page.locator("#venue").fill("Bantara Bhavan");
await page.getByLabel('Event Date & Time*').fill(combinedValue);
await page.getByLabel('Price ($)').fill("100")
await page.locator('#total-seats').fill("50")
await page.locator('#add-event-btn').click();
await expect(page.getByText('Event created!')).toBeVisible();
await page.locator('#nav-events').click();
await page.locator('#event-card').first().waitFor();
await page.getByPlaceholder('Search events, venues…').fill(Event_Title);
await expect(page.getByText(Event_Title)).toBeVisible({timeout: 5000})
const eventCard = await page.locator('#event-card').filter({ hasText: Event_Title });
const seatElement = await eventCard.locator('span').filter({ hasText: /seats/i });
const seatText = await seatElement.textContent()
console.log(seatText)
const seatsBeforeBooking = parseInt(seatText.split(' ')[0]);
console.log(seatsBeforeBooking);
//await eventCard.locator('#book-now-btn').waitFor();
const toast = page.getByText('Event created!');
await expect(toast).toBeVisible();
await toast.waitFor({ state: 'hidden' });
await eventCard.locator('[data-testid="book-now-btn"]').click();
await page.getByText(Event_Title).waitFor();
const ticketCount=await page.locator("#ticket-count").textContent();
await expect(ticketCount).toEqual("1");
await page.locator("#customerName").fill('Arpit Jain')
await page.locator("#customer-email").fill('Ajain@gmail.com')
await page.getByPlaceholder("+91 98765 43210").fill('+91 9827200000')
await page.locator(".confirm-booking-btn").click();
await expect(page.getByText("Booking Confirmed!")).toBeVisible();
const refId=await page.locator(".booking-ref").textContent()
console.log(refId);
await page.getByText("View My Bookings").click()
await expect(page).toHaveURL(BASE_URL+"/bookings");
const allBookings=await page.locator("#booking-card")
await expect(allBookings.first()).toBeVisible({timeout : 5000});
const current_booking=await allBookings.filter({hasText: refId})
await expect(current_booking).toBeVisible();
await expect(current_booking).toContainText(Event_Title);
await page.locator('#nav-events').click();
await page.locator('#event-card').first().waitFor();
const Event_Card=await page.locator("#event-card").filter({hasText:Event_Title})
await expect(Event_Card).toBeVisible();
const seatsAfterBooking=await Event_Card.getByText(' seats available').textContent();
console.log(seatsAfterBooking);
const s2=parseInt(seatsAfterBooking.split(' ')[0])
console.log(s2)
await expect(s2).toBe(seatsBeforeBooking-1);



})


