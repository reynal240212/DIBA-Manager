import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://wdnlqfiwuocmmcdowjyw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbmxxZml3dW9jbW1jZG93anl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjY1ODAsImV4cCI6MjA2NDEwMjU4MH0.4SCS_NRDIYLQJ1XouqW111BxkMOlwMWOjje9gFTgW_Q';

/**
 * Instancia única del cliente de Supabase para toda la aplicación.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Verifica si un usuario está autenticado (vía Supabase o localStorage).
 * Si no lo está, redirige a la página de login.
 */
export async function protectRoute() {
    const { data: { session } } = await supabase.auth.getSession();
    const usuario = localStorage.getItem("usuario"); // Soporte para el login manual
    if (!session && !usuario) {
        window.location.href = "/public/login.html"; // Usar ruta absoluta para evitar errores
    }
}

/**
 * Cierra la sesión del usuario y lo redirige a la página de login.
 */
export async function handleLogout() {
    localStorage.removeItem("usuario");
    await supabase.auth.signOut();
    window.location.href = "/public/login.html"; // Usar ruta absoluta
}
