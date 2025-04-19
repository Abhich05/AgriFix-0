# AgriFix-0

## Project Overview
AgriFix is a modern web application for connecting farmers, buyers, and market stakeholders to buy and sell agricultural produce efficiently. It features real-time market prices, region-aware features, secure authentication, and a responsive user interface.

## Live Demo
The app is live at: [https://Agri-fix-0.vercel.app](https://Agri-fix-0.vercel.app)

## Features
- Buyer and Admin login with secure authentication
- Responsive design for mobile and desktop
- Live market ticker by region
- Product catalogue, cart, and order tracking
- Refer & Earn via WhatsApp
- Multi-language support
- Admin dashboard for managing products and orders

## Admin Login Credentials
To access the admin dashboard, use the following credentials:

- **Email:** admin@agrofix.com
- **Password:** admin123

## Tech Stack
- **Frontend:** React.js, Material-UI, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** Google Cloud PostgreSQL instance
- **APIs:** Custom REST APIs hosted on Render
- **Deployment:** GitHub, Render, Google Cloud, Vercel (for frontend)

## Environment & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Abhich05/AgriFix-0.git
   ```
2. Install dependencies in the frontend and backend folders:
   ```bash
   cd agrofix-frontend
   npm install
   # (repeat for backend if available)
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The app runs at `http://localhost:3000` by default.

## Usage Notes
- **Live App:** [https://Agri-fix-0.vercel.app](https://Agri-fix-0.vercel.app)
- **Admin Dashboard:** `/admin` (login required)
- **Buyer Dashboard:** `/buyer-dashboard` (login required)
- **Refer & Earn:** Use the WhatsApp button in the navigation menu (mobile) or top bar (desktop)
- **Region Selection:** Home page hero section

## Database
- The application uses a Google Cloud PostgreSQL instance for persistent storage of users, products, and orders.
- **Note:** If you are using the free Neon database service for development or testing, be aware that the Neon instance may become idle after about 5 minutes of inactivity. You may need to wait a few seconds for it to wake up on the next request.

## Demo Accounts
- **Admin:** See credentials above
- **Buyers:** Register via `/buyer-register` or use demo accounts if provided by the admin

## Security
- Passwords are securely handled and never exposed in the frontend.
- Tokens are stored in localStorage after login for session management.

## Contact & Support
For issues, suggestions, or contributions, please open an issue or contact the maintainer via GitHub.

---
Made with ❤️ for Indian farmers.
