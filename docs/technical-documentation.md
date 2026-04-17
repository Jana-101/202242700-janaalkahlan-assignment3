# Technical Documentation – Assignment 3

## Project Overview

This project is an advanced version of a personal portfolio website.
It builds on previous assignments by introducing dynamic data handling, improved interactivity, and enhanced user experience.

The system allows users to explore projects, interact with content, and view real-time data from external sources.

---

## File Structure

* `index.html`
  Contains the full structure of the website including all sections and UI components.

* `css/styles.css`
  Defines layout, visual design, responsiveness, themes, and UI enhancements.

* `js/script.js`
  Handles all interactivity, dynamic rendering, API integration, and state management.

* `docs/`
  Contains technical and AI documentation.

---

## System Architecture Overview

The application is a **client-side web application** structured into:

* **Presentation Layer (HTML + CSS)**
  Responsible for layout, design, and responsiveness.

* **Logic Layer (JavaScript)**
  Handles user interactions, data processing, and dynamic updates.

* **External Data Layer (GitHub API)**
  Fetches live repository data.

---

## HTML Structure

The website uses semantic structure with clear sections:

* Navigation → links + theme toggle
* Hero → introduction and call-to-action
* About → personal details
* Projects → interactive project cards
* GitHub → dynamically loaded repositories
* Skills → categorized skills
* Contact → interactive form

Each section is clearly separated to improve readability and navigation.

---

## CSS Styling and Responsiveness

Key design features:

* CSS variables for consistent theming
* Grid and Flexbox for layout
* Media queries for responsiveness
* Smooth transitions and animations
* Light/Dark theme using `data-theme`

The design focuses on:

* readability
* clear hierarchy
* consistent spacing
* user-friendly visuals

---

## JavaScript Functionality

### 1. Navigation & UI

* Hamburger menu for mobile navigation
* Theme toggle stored in `localStorage`

---

### 2. Projects System

#### Filtering

* Uses `data-category`
* Updates visible projects dynamically

#### Search

* Matches project title and description
* Updates results in real time

#### Sorting

* Options:

  * Default
  * Name A–Z
  * Name Z–A
  * Category
* Works together with filtering and search

---

### 3. GitHub API Integration

* Fetches repositories using:
  `https://api.github.com/users/Jana-101/repos`

* Displays:

  * Repository name
  * Description
  * Language
  * Star count

* Includes:

  * Loading state
  * Error handling
  * Retry functionality

---

### 4. Form Validation

* Validates:

  * Name (not empty)
  * Email (valid format)
  * Message (not empty)

* Shows:

  * Inline error messages
  * Success message after submission

* Errors update in real-time while typing

---

## 🧭 User Interaction Flow

### Example User Journey

1. User opens the website
2. Navigates using the top menu
3. Goes to Projects section:

   * Searches for a project
   * Applies filters
   * Sorts results
4. Scrolls to GitHub section:

   * Views live repositories
5. Interacts with UI:

   * Changes theme
   * Views animations
6. Goes to Contact section:

   * Fills form
   * Fixes inline errors if needed
   * Submits successfully

---

## State Management

Uses `localStorage` to store:

* Theme preference
* Last selected filter
* Search query
* User name

This ensures persistence across sessions.

---

## Additional Features

* Session timer showing time spent on site
* Personalized welcome message
* “How to Use” guide for user clarity

---

## Error Handling

* Form validation errors (inline)
* API failure fallback message
* Empty search results message

---

## Summary

This project demonstrates:

* Advanced frontend interactivity
* Integration with external APIs
* Improved user experience and usability
* Structured and maintainable code
* Effective use of state management

It reflects a complete and interactive frontend application.

