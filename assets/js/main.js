/**
 * Main JavaScript File for Astronomy Club Website
 * Handles: Theme Toggle, Shared Components (Header/Footer), Global Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadComponents();
});

/* --- Theme Management --- */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const isRTL = localStorage.getItem('rtl') === 'true';
    if (isRTL) document.documentElement.setAttribute('dir', 'rtl');
}

function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRTL) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('rtl', 'false');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
    }
}

function toggleTheme(mode) {
    // Mode can be 'light', 'dark', 'red'
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = mode;

    if (!mode) {
        // Cycle if no specific mode passed: dark -> light -> red -> dark
        if (currentTheme === 'dark') newTheme = 'light';
        else if (currentTheme === 'light') newTheme = 'red';
        else newTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    // Logic to update icon in navbar will go here after navbar is loaded
    const iconBtn = document.getElementById('theme-toggle-icon');
    if (!iconBtn) return;

    // Reset classes
    iconBtn.className = 'fas';

    if (theme === 'light') iconBtn.classList.add('fa-sun');
    else if (theme === 'red') iconBtn.classList.add('fa-eye'); // Red eye for night mode
    else iconBtn.classList.add('fa-moon'); // Default dark
}

/* --- Shared Component Loader --- */
async function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Determine if we are on a login/dashboard page where we might NOT want headers
    const isLoginPage = document.body.classList.contains('page-login');
    const isDashboard = document.body.classList.contains('page-dashboard');

    if (headerPlaceholder && !isLoginPage) {
        // In a real build, we'd fetch an HTML file. Here we render the string for simplicity in a static environment without CORS issues for local files.
        headerPlaceholder.innerHTML = getNavbarHTML();
        initNavbarLogic();
    }

    if (footerPlaceholder && !isLoginPage && !isDashboard) {
        footerPlaceholder.innerHTML = getFooterHTML();
    }
}

function getNavbarHTML() {
    // Determine active page for highlighting
    const currentPath = window.location.pathname;
    const isActive = (path) => currentPath.includes(path) ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-200 hover:text-white transition-colors';

    return `
    <nav class="navbar fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 transition-all duration-300">
        <div class="container mx-auto px-4 h-full flex items-center justify-between">
            <!-- Brand -->
            <a href="index.html" class="flex items-center gap-3 group">
                <i class="fas fa-meteor text-3xl text-purple-500 group-hover:rotate-12 transition-transform"></i>
                <span class="text-2xl font-orbitron font-bold text-white tracking-wider">ASTRO<span class="text-purple-500">CLUB</span></span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-5">
                <a href="index.html" class="${isActive('index.html')} py-2">Home</a>
                <a href="index-v2.html" class="${isActive('index-v2.html')} py-2">Home v2</a>
                <a href="dashboard-member.html" class="${isActive('dashboard-member.html')} py-2">Dashboard</a>
                <a href="events.html" class="${isActive('events.html')} py-2">Events</a>
                <a href="observations.html" class="${isActive('observations.html')} py-2">Observations</a>
                <a href="gallery.html" class="${isActive('gallery.html')} py-2">Gallery</a>
                <a href="resources.html" class="${isActive('resources.html')} py-2">Learn</a>
            </div>

            <!-- Right Actions -->
            <div class="hidden lg:flex items-center gap-3">
                <button onclick="toggleRTL()" class="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center justify-center font-bold text-xs" title="Toggle RTL">
                    RTL
                </button>
                <button onclick="toggleTheme()" class="w-10 h-10 rounded-full bg-slate-800 text-amber-300 hover:bg-slate-700 transition-colors flex items-center justify-center">
                    <i id="theme-toggle-icon" class="fas fa-moon"></i>
                </button>
                <a href="login.html" class="btn-primary h-10 px-6 rounded-full flex items-center gap-2 text-sm">
                    <i class="fas fa-user"></i> Login
                </a>
            </div>

            <!-- Mobile Toggle -->
            <button id="mobile-menu-btn" class="lg:hidden text-white text-2xl focus:outline-none">
                <i class="fas fa-bars"></i>
            </button>
        </div>

        <!-- Mobile Menu (Hidden by default) -->
        <div id="mobile-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-900 transform -translate-x-full transition-transform duration-300 ease-in-out shadow-2xl lg:hidden z-50 overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-between mb-8">
                    <span class="text-xl font-orbitron font-bold text-white">MENU</span>
                    <button id="close-menu-btn" class="text-slate-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <a href="index.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Home</a>
                    <a href="index-v2.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Home v2</a>
                    <a href="dashboard-member.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Dashboard</a>
                    <a href="events.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Events</a>
                    <a href="observations.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Observations</a>
                    <a href="gallery.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Gallery</a>
                    <a href="resources.html" class="text-slate-200 hover:text-purple-400 py-2 border-b border-slate-800">Learn</a>
                    <div class="mt-4 pt-4 flex items-center justify-between">
                        <span class="text-sm text-slate-400">Settings</span>
                        <div class="flex gap-4">
                            <button onclick="toggleRTL()" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">
                                RTL
                            </button>
                            <button onclick="toggleTheme()" class="w-8 h-8 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center">
                                <i class="fas fa-adjust"></i>
                            </button>
                        </div>
                    </div>
                    <a href="login.html" class="mt-4 w-full btn-primary text-center py-3 rounded-lg">Member Login</a>
                </div>
            </div>
        </div>
        <!-- Overlay -->
        <div id="menu-overlay" class="fixed inset-0 bg-black/50 hidden lg:hidden z-40 backdrop-blur-sm"></div>
    </nav>
    <div class="h-[80px] lg:h-[80px]"></div> <!-- Spacer to prevent overlap -->
    `;
}

function getFooterHTML() {
    return `
    <footer class="bg-slate-950 border-t border-slate-800 pt-16 pb-8 text-slate-300 mt-20 relative overflow-hidden">
        <!-- Background Decor -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        
        <div class="container mx-auto px-4 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <!-- Brand Col -->
                <div>
                    <a href="#" class="flex items-center gap-3 mb-6">
                        <i class="fas fa-meteor text-2xl text-purple-500"></i>
                        <span class="text-xl font-orbitron font-bold text-white tracking-wider">ASTRO<span class="text-purple-500">CLUB</span></span>
                    </a>
                    <p class="text-sm leading-relaxed mb-6 text-slate-400">
                        Join our community of stargazers. We explore the cosmos, share observations, and learn together under the night sky.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="index.html" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Home</a></li>
                        <li><a href="events.html" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Events Calendar</a></li>
                        <li><a href="observations.html" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Observations</a></li>
                        <li><a href="gallery.html" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Gallery</a></li>
                        <li><a href="join.html" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Join the Club</a></li>
                    </ul>
                </div>

                <!-- Resources -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Learning Center</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="#" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> New to Astronomy?</a></li>
                        <li><a href="#" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Telescope Guide</a></li>
                        <li><a href="#" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Sky Maps</a></li>
                        <li><a href="#" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Astrophotography</a></li>
                        <li><a href="#" class="hover:text-purple-400 transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-slate-600"></i> Weather Tools</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-map-marker-alt mt-1 text-purple-500"></i>
                            <span>123 Starry Way, Dark Sky Park,<br>Cosmos City, SP 90210</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fas fa-envelope text-purple-500"></i>
                            <a href="mailto:contact@astroclub.com" class="hover:text-white">contact@astroclub.com</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fas fa-phone-alt text-purple-500"></i>
                            <span>(555) 123-4567</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>&copy; 2026 Astronomy Club. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" class="hover:text-white transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
    `;
}

function initNavbarLogic() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');

    if (mobileBtn && mobileMenu && overlay) {
        function toggleMenu() {
            const isClosed = mobileMenu.classList.contains('-translate-x-full');
            if (isClosed) {
                mobileMenu.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }

        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // Initialize correct theme icon
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);
}
