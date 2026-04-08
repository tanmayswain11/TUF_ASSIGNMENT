# Interactive Wall Calendar Component

A polished, highly interactive React calendar component built to carefully mirror a realistic physical wall calendar experience. The focus of this application is exclusively on the frontend, featuring a beautiful UI, a responsive layout, and satisfying 3D "page-flipping" physics animations.

## Live Link : https://asthetic-wall-calender.netlify.app/

## Key Features

- **Physical Wall Calendar Aesthetic**: Achieved with high-quality CSS including a textured wall background, metallic anchor, hanging twine rope, and realistic shadows.
- **Pure JavaScript & JSX**: Transpiled purely for direct Javascript compatibility (Zero TypeScript overhead). Modular layout separated into extremely clean atomic structures (CalendarHeader, CalendarGrid, CalendarNotes). 
- **Dynamic 12-Month Unique Themes**: Each of the 12 months operates on a distinct UI theme with its own specific high-resolution cover photography reflecting its respective season.
- **3D Page Flip Animation**: Advanced CSS 3D transforms (`rotateX`) mimic the feeling of ripping a physical paper up and causing it to gracefully vanish smoothly!
- **Indian National Holidays Tracking**: Programmed exactly for the year 2026, featuring precise automatic naming for holidays (Diwali, Holi, Dussehra, Republic Day, and more).
- **Date Range Selector**: Clean and interactive start/end date selection directly on the calendar grid, with clear visual states and gorgeous color selection masks.
- **Intelligent Real-World 'Today' Highlighter**: Auto-tracks system time completely updating the date layout day-to-day to outline and pinpoint the current live-time date correctly.
- **Integrated Notes System**: A functional, persistent "ruled-paper" style notes section specific to each month leveraging `localStorage`, featuring a responsive delete mechanic.

> **⚠️ Important Note Regarding Asset Loading**
> Currently, the calendar fetches massive high-resolution uncompressed Unsplash photography directly via URL links during initialization to map uniquely onto the 12 months. **Due to fetching massive external image links across the web, the initial load duration of the calendar and the image reloading transitions may experience a noticeable lag / speed reduction**. This depends greatly on Unsplash CDN speed routing—but they gracefully pre-load to prevent tearing!

## How to Run Locally

Since this project has been optimized exclusively for **bun** (as requested), please ensure you have it installed. Execute the following commands in the project directory:

```bash
# 1. Install dependencies effortlessly using bun
bun install

# 2. Start the Vite React development server
bun run dev
```

Then, open the provided `http://localhost:5173/` link inside a chromium-based browser to view the beautiful component.

## Implementation Details

- **Responsive Architecture**: Designed using sophisticated CSS Grid mathematics for the calendar grids and Flexbox abstractions for the broader structures. The layout collapses fluidly for mobile interactions.
- **No Heavy Date Libraries**: The application relies securely on lightweight utility logic to calculate and render month-by-month transitions using entirely vanilla native JS `Date` objects. No heavy imports or payload dependencies like Moment/Date-FNS!
