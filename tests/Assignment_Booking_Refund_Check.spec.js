const {test, expect} = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com"
const GMAIL_USER = { email: "AT01010@gmail.com", password: "At@12345678" };


async function loginAs(page,user)
{
   await page.goto("https://eventhub.rahulshettyacademy.com/login") 
   await page.locator("#email").fill(user.email);
   await page.locator("#password").fill(user.password)
   await page.locator("#login-btn").click();
   await page.locator("#event-card").last().waitFor();

}

test("Verify Single ticket booking is eligible for refund", async({page})=>
{
await loginAs(page,GMAIL_USER);
await page.locator('#nav-events').click();
await page.locator('#event-card').first().waitFor();
await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();
await page.locator("#customerName").fill('Arpit Jain')
await page.locator("#customer-email").fill('Ajain@gmail.com')
await page.getByPlaceholder("+91 98765 43210").fill('+91 9827200000')
await page.locator(".confirm-booking-btn").click();
await expect(page.getByText("Booking Confirmed!")).toBeVisible();
await page.getByText("View My Bookings").click()
await expect(page).toHaveURL(BASE_URL+"/bookings");
const first_booking = await page.locator('[data-testid=booking-card]').first()
await first_booking.getByText("View Details").click();
await expect(page.getByText("Booking Information")).toBeVisible();
const t1=await page.locator("main nav").textContent();
console.log(t1);
const splitText=t1.split("/")
console.log(splitText[1].trim());
let eventTitle =await page.locator(".items-start h1").textContent();
eventTitle=eventTitle.trim();
await expect(splitText[1].charAt(0)).toBe(eventTitle.charAt(0));
await page.locator("#check-refund-btn").click();
await expect(page.locator("#refund-spinner")).toBeVisible();
await expect(page.locator("#refund-spinner")).toBeHidden({timeout: 6000});
const refund_Element=await page.locator("#refund-result")
await expect(refund_Element).toBeVisible();
await expect(refund_Element).toContainText("Eligible for refund")
await expect(refund_Element).toContainText("Single-ticket bookings qualify for a full refund")
//await page.pause();
})


test("Verify Group ticket booking is NOT eligible for refund", async({page})=>
{
await loginAs(page,GMAIL_USER);
await page.locator('#nav-events').click();
await page.locator('#event-card').first().waitFor();
await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();
const increment_button = await page.getByRole('button',{name: "+"})
await increment_button.click();
await increment_button.click();
await page.locator("#customerName").fill('Arpit Jain')
await page.locator("#customer-email").fill('Ajain@gmail.com')
await page.getByPlaceholder("+91 98765 43210").fill('+91 9827200000')
await page.locator(".confirm-booking-btn").click();
await expect(page.getByText("Booking Confirmed!")).toBeVisible();
await page.getByText("View My Bookings").click()
await expect(page).toHaveURL(BASE_URL+"/bookings");
const first_booking = await page.locator('[data-testid=booking-card]').first()
await first_booking.getByText("View Details").click();
await expect(page.getByText("Booking Information")).toBeVisible();
const t1=await page.locator("main nav").textContent();
console.log(t1);
const splitText=t1.split("/")
console.log(splitText[1].trim());
let eventTitle =await page.locator(".items-start h1").textContent();
eventTitle=eventTitle.trim();
await expect(splitText[1].charAt(0)).toBe(eventTitle.charAt(0));
await page.locator("#check-refund-btn").click();
await expect(page.locator("#refund-spinner")).toBeVisible();
await expect(page.locator("#refund-spinner")).toBeHidden({timeout: 6000});
const refund_Element=await page.locator("#refund-result")
await expect(refund_Element).toBeVisible();
await expect(refund_Element).toContainText("Not eligible for refund")
await expect(refund_Element).toContainText("Group bookings (3 tickets) are non-refundable")
//await page.pause();
})