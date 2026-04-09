/**
 * TechHub Euroformac — Auth System
 * Manages Firebase Authentication and Login UI
 */

const Auth = {
    // 🔥 CONFIGURACIÓN DE FIREBASE
    // El usuario debe reemplazar esto con su propia configuración de la consola de Firebase
    config: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    },

    auth: null,
    db: null,
    currentUser: null,

    async init() {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.config);
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();

        // Listen for auth state changes
        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                console.log('User signed in:', user.email);
                
                // Initialize Sync system
                Sync.init(this.db, user.uid);
                
                // Pull data from cloud
                const cloudData = await Sync.pullAll();
                
                // Check if we should migrate local data (only if cloud is empty and local isn't)
                this.checkMigration(cloudData);

                // Update UI: Hide auth modal, show user info
                this.hideAuthModal();
                this.updateUserUI();
                
                // Initialize the main app if not already
                if (typeof init === 'function') {
                    // Note: init() in app.js uses localStorage, which is now updated by Sync.pullAll()
                    // We might need to refresh the dashboard if it's already rendered
                    init(); 
                }
            } else {
                this.currentUser = null;
                console.log('No user signed in.');
                this.showAuthModal();
                this.clearUserUI();
            }
        });
    },

    async login(email, password) {
        try {
            const btn = document.getElementById('auth-submit-btn');
            if (btn) btn.disabled = true;
            await this.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.message);
            const btn = document.getElementById('auth-submit-btn');
            if (btn) btn.disabled = false;
        }
    },

    async signup(email, password) {
        try {
            const btn = document.getElementById('auth-submit-btn');
            if (btn) btn.disabled = true;
            await this.auth.createUserWithEmailAndPassword(email, password);
            // Upon creation, the onAuthStateChanged listener will handle the rest
        } catch (error) {
            alert('Error al registrarse: ' + error.message);
            const btn = document.getElementById('auth-submit-btn');
            if (btn) btn.disabled = false;
        }
    },

    async logout() {
        if (confirm('¿Cerrar sesión? Los datos locales se mantendrán pero no se sincronizarán hasta que vuelvas a entrar.')) {
            await this.auth.signOut();
            window.location.reload(); // Hard reload to clear app state
        }
    },

    checkMigration(cloudData) {
        // Simple logic: if cloud has no history but local does, offer to push
        const localHistory = localStorage.getItem('exam_history_v2');
        const hasLocalData = localHistory && JSON.parse(localHistory).length > 0;
        const hasCloudData = cloudData && cloudData['exam_history_v2'] && cloudData['exam_history_v2'].length > 0;

        if (hasLocalData && !hasCloudData) {
            if (confirm('Hemos detectado datos locales en este dispositivo. ¿Quieres subirlos a tu nueva cuenta en la nube para verlos en otros dispositivos?')) {
                Sync.pushAll();
            }
        }
    },

    showAuthModal() {
        // Create modal if it doesn't exist
        if (!document.getElementById('auth-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'auth-overlay';
            overlay.className = 'auth-overlay';
            overlay.innerHTML = `
                <div class="auth-card">
                    <div class="auth-header">
                        <span class="logo-icon">🎓</span>
                        <h2>TechHub<span>Sync</span></h2>
                        <p id="auth-subtitle">Inicia sesión para sincronizar tu progreso</p>
                    </div>
                    <form id="auth-form" onsubmit="event.preventDefault(); Auth.handleAuthSubmit();">
                        <div class="auth-field">
                            <label>Email</label>
                            <input type="email" id="auth-email" required placeholder="tu@email.com">
                        </div>
                        <div class="auth-field">
                            <label>Contraseña</label>
                            <input type="password" id="auth-password" required placeholder="••••••••">
                        </div>
                        <button type="submit" id="auth-submit-btn" class="auth-btn">Iniciar Sesión</button>
                    </form>
                    <div class="auth-footer">
                        <span id="auth-switch-text">¿No tienes cuenta?</span>
                        <a href="javascript:void(0)" id="auth-switch-link" onclick="Auth.toggleAuthMode()">Regístrate</a>
                    </div>
                    <div class="auth-notice">
                        <p>Los datos se guardarán de forma segura en la nube para que puedas acceder desde cualquier dispositivo.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        document.getElementById('auth-overlay').classList.add('active');
    },

    hideAuthModal() {
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.classList.remove('active');
    },

    mode: 'login',
    toggleAuthMode() {
        this.mode = this.mode === 'login' ? 'signup' : 'login';
        const title = document.getElementById('auth-subtitle');
        const btn = document.getElementById('auth-submit-btn');
        const switchText = document.getElementById('auth-switch-text');
        const switchLink = document.getElementById('auth-switch-link');

        if (this.mode === 'signup') {
            title.textContent = 'Crea tu cuenta gratuita';
            btn.textContent = 'Crear Cuenta';
            switchText.textContent = '¿Ya tienes cuenta?';
            switchLink.textContent = 'Inicia sesión';
        } else {
            title.textContent = 'Inicia sesión para sincronizar tu progreso';
            btn.textContent = 'Iniciar Sesión';
            switchText.textContent = '¿No tienes cuenta?';
            switchLink.textContent = 'Regístrate';
        }
    },

    handleAuthSubmit() {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        if (this.mode === 'login') {
            this.login(email, password);
        } else {
            this.signup(email, password);
        }
    },

    updateUserUI() {
        // Find or create user info area in header
        let userNav = document.querySelector('.user-nav');
        if (userNav) {
            // Check if user info already exists
            if (!document.getElementById('user-profile-info')) {
                const userInfo = document.createElement('div');
                userInfo.id = 'user-profile-info';
                userInfo.className = 'user-profile-info';
                userInfo.innerHTML = `
                    <div class="user-details">
                        <span class="user-email">${this.currentUser.email.split('@')[0]}</span>
                        <button onclick="Auth.logout()" class="logout-btn" title="Cerrar sesión">🚪</button>
                    </div>
                `;
                userNav.appendChild(userInfo);
            }
        }
    },

    clearUserUI() {
        const userInfo = document.getElementById('user-profile-info');
        if (userInfo) userInfo.remove();
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Firebase scripts to load if they are at the end
    setTimeout(() => Auth.init(), 500);
});
