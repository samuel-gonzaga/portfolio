// EmailJS Configuration
// Environment variables are loaded from apps/web/.env (VITE_EMAILJS_*)
// Get your credentials at https://dashboard.emailjs.com/admin

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAILJS_CONFIG = {
  SERVICE_ID,
  TEMPLATE_ID,
  PUBLIC_KEY,
};

export default EMAILJS_CONFIG;
