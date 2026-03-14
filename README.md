<<<<<<< HEAD
# Daily Learning Streak Tracker

A web application designed to help students maintain a consistent learning habit. A streak-based system encourages students to continue their daily learning by tracking consecutive study days.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-informational?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-informational?style=for-the-badge&logo=tailwind-css)

## Features

- **Dashboard**: View current study streak, total study days, and last study date.
- **Mark Study**: Automatically tracks study per day with a beautifully designed UI.
- **Duplicate Prevention**: Prevents duplicate study claims on the same day.
- **Study History**: View all previously recorded study dates locally.

## Setup Instructions

Ensure you have Node.js (>= 18.x) installed on your system. 

1. **Clone the repository** (if not done yet).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Explanation of Streak Logic

The streak logic calculates your current learning streak by checking consecutive dates. 
When a user marks their study day, the data is pushed to a persistent local JSON file (`data.json`).
- If you logged study for today or yesterday, the system considers your streak active. Daily streaks increase by 1 for every consecutive study day going backwards.
- If the difference between the most recent study date and today is greater than 1 day, the current active streak drops to 0. Every subsequent consecutive study day is then counted normally when building up the streak again after the break.
- Duplicate inputs for the exact same local date will be rejected by the API endpoint, preventing multi-logging exploits per day.
=======
# Daily-Learning-streak-Tracker
The **Daily Learning Streak Tracker** is a web app that helps students maintain consistent study habits. Users can mark “I Studied Today,” track their current streak, view total study days, and see study history. Built with Next.js, TypeScript, and Tailwind CSS, it demonstrates basic full-stack development and streak logic.
>>>>>>> 2d259a4a234d9682137bf6f0c8a3a8ffe11e9d47
