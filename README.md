# BFM Carwash Website

*As the website is under devlopment its gonna constantly change*

A modern, responsive website built for BFM Carwash, a local car wash and valet business based in Dundalk, Ireland.

The project was built from scratch using SvelteKit and TypeScript, with a focus on creating a clean, professional website while gradually introducing backend functionality such as enquiry handling and, eventually, online bookings.

---

## 🚗 Project Overview

BFM Carwash needed a modern online presence where customers could:

- Learn about the business
- View available car wash and valet services
- See pricing
- Browse examples of completed work
- Read customer reviews
- Find the business location
- Send an enquiry
- Book a service online

The goal was to create something that felt professional and trustworthy while keeping the experience simple for customers.

This project is also being used as a practical development project to improve my skills with modern web development, backend functionality, APIs, Git and deployment.

---

## 🛠️ Tech Stack

### Frontend

- SvelteKit
- TypeScript
- Tailwind CSS
- HTML
- CSS

### Backend

- SvelteKit server routes
- Resend API
- PostgreSQL *(planned)*
- Drizzle ORM *(planned)*

### Tools & Services

- Git
- GitHub
- Resend
- Vercel *(planned for deployment)*

---

# 📅 Development Progress

## Day 1 — Homepage

The first stage of the project focused on building the homepage and establishing the overall visual identity of the website.

### Built

- Responsive navigation bar
- BFM Carwash branding
- Hero section
- Large vehicle photography
- Blue/black visual theme
- Call-to-action sections
- Responsive layouts for different screen sizes

### Focus

The main goal was to create a strong first impression and make the website immediately feel like a professional business website rather than a basic template.

I experimented with different hero layouts, image positioning and typography before settling on the final design.

---

## Day 2 — Services & Pricing

The next stage was building the services and pricing sections.

### Built

- Services page
- Car Wash service section
- Valet service section
- Pricing cards
- Vehicle categories
- Clear pricing hierarchy
- Booking call-to-action buttons

The pricing currently reflects the information available from the business.

### Car Wash

| Vehicle | Price |
|---|---:|
| Car | €15 |
| Jeep + Small Van | €20 |
| Large Van | €30 |

### Valet

| Service | Price |
|---|---:|
| Mini Valet | €45 |
| Full Valet | €65 |

The design was kept deliberately simple so customers can quickly understand the available services and prices.

---

## Day 3 — Gallery & Location

The next stage focused on showing the quality of the work visually.

### Gallery

I added a dedicated gallery using photographs of vehicles that had been worked on by BFM Carwash.

The gallery includes different types of vehicles and different photography styles to give visitors a better idea of the work carried out by the business.

### Location

A Google Maps embed was also added to the website so customers can easily see where BFM Carwash is located.

**Location:**

Dundalk Retail Park  
Inner Relief Road  
Marshes Upper  
Dundalk, Ireland

---

## Day 4 — Reviews

The homepage was expanded with a customer reviews section.

Rather than creating fictional testimonials, the section uses genuine Google reviews from the business.

The reviews help provide social proof and give potential customers an idea of the experience other customers have had.

The section also includes a link/button allowing visitors to view the business's other Google reviews.

---

## Day 5 — Contact Page

The contact page was then built to allow customers to send enquiries directly through the website.

### Built

- Contact form
- Name field
- Email field
- Phone field
- Message field
- Form validation
- Error handling
- Success/error states
- Server-side form processing

The form submits to a SvelteKit server action rather than sending the request directly from the browser.

---

## 📧 Resend Integration

The contact form was connected to the Resend API.

When a customer submits an enquiry:

Customer
   ↓
Contact Form
   ↓
SvelteKit Server Action
   ↓
Resend API
   ↓
Email Inbox


Day 6 - Booking Page

Currently building the booking page
