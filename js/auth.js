/**
 * auth.js
 * Sistema de Autenticación y Gestión de Sesión de Usuario (Firebase Auth).
 */

const Auth = {
    auth: null,
    db: null,
    currentUser: null,
    isAppInitialized: false,
    mode: 'login',

    /**
     * Inicializa Firebase Auth y los listeners de estado
     */
    async init() {
        if (typeof firebase === 'undefined') {
            console.warn('[Auth] Firebase SDK no detectado. Modo offline / local activo.');
            if (typeof init === 'function' && !this.isAppInitialized) {
                this.isAppInitialized = true;
                init();
            }
            return;
        }

        const config = window.FIREBASE_CONFIG || {
            apiKey: "AIzaSyBnevCDXEbV7TdPtsW-gaO3XabkQUsAKi0",
            authDomain: "examenes.firebaseapp.com",
            projectId: "examenes",
            storageBucket: "examenes.firebasestorage.app",
            messagingSenderId: "255739838703",
            appId: "1:255739838703:web:512555d95445e14f821b1a"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();

        // Listener del estado de autenticación
        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                console.log('[Auth] Usuario autenticado:', user.email);

                // Inicializar sistema de sincronización
                if (typeof Sync !== 'undefined') {
                    Sync.init(this.db, user.uid);
                    const cloudData = await Sync.pullAll();
                    this.checkMigration(cloudData);
                }

                this.hideAuthModal();
                this.updateUserUI();

                // Inicializar la aplicación principal una sola vez
                if (typeof init === 'function' && !this.isAppInitialized) {
                    this.isAppInitialized = true;
                    init();
                }
            } else {
                this.currentUser = null;
                console.log('[Auth] Sin sesión activa. Modo Invitado / Local activado.');
                this.hideAuthModal();
                this.updateUserUI();

                // Inicializar la aplicación principal para modo invitado
                if (typeof init === 'function' && !this.isAppInitialized) {
                    this.isAppInitialized = true;
                    init();
                }
            }
        });
    },

    async login(email, password) {
        const btn = document.getElementById('auth-submit-btn');
        try {
            if (btn) btn.disabled = true;
            await this.auth.signInWithEmailAndPassword(email, password);
            if (typeof Toast !== 'undefined') Toast.success('¡Sesión iniciada correctamente!');
        } catch (error) {
            const msg = error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password'
                ? 'Credenciales inválidas. Revisa email y contraseña.'
                : error.message;
            if (typeof Toast !== 'undefined') {
                Toast.error(msg);
            } else {
                alert('Error al iniciar sesión: ' + msg);
            }
        } finally {
            if (btn) btn.disabled = false;
        }
    },

    async signup(email, password) {
        const btn = document.getElementById('auth-submit-btn');
        try {
            if (btn) btn.disabled = true;
            await this.auth.createUserWithEmailAndPassword(email, password);
            if (typeof Toast !== 'undefined') Toast.success('¡Cuenta creada con éxito!');
        } catch (error) {
            const msg = error.code === 'auth/email-already-in-use'
                ? 'Este correo ya está registrado. Prueba a iniciar sesión.'
                : error.message;
            if (typeof Toast !== 'undefined') {
                Toast.error(msg);
            } else {
                alert('Error al registrarse: ' + msg);
            }
        } finally {
            if (btn) btn.disabled = false;
        }
    },

    async logout() {
        if (confirm('¿Cerrar sesión? Los datos locales se mantendrán pero no se sincronizarán hasta que vuelvas a entrar.')) {
            sessionStorage.removeItem('course_chosen_session');
            await this.auth.signOut();
            window.location.reload();
        }
    },

    checkMigration(cloudData) {
        const localHistory = localStorage.getItem('exam_history_v2');
        const hasLocalData = localHistory && JSON.parse(localHistory).length > 0;
        const hasCloudData = cloudData && cloudData['exam_history_v2'] && cloudData['exam_history_v2'].length > 0;

        if (hasLocalData && !hasCloudData) {
            if (confirm('Hemos detectado datos locales en este dispositivo. ¿Deseas subirlos a tu cuenta en la nube?')) {
                if (typeof Sync !== 'undefined') Sync.pushAll();
            }
        }
    },

    showAuthModal() {
        let overlay = document.getElementById('auth-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'auth-overlay';
            overlay.className = 'auth-overlay';
            overlay.onclick = (e) => {
                if (e.target === overlay) Auth.hideAuthModal();
            };
            overlay.innerHTML = `
                <div class="auth-card">
                    <button type="button" class="auth-modal-close" onclick="Auth.hideAuthModal()" title="Cerrar modal">&times;</button>
                    <div class="auth-header">
                        <span class="logo-icon">🎓</span>
                        <h2>App<span>Sync</span></h2>
                        <p id="auth-subtitle">Inicia sesión para sincronizar tu progreso</p>
                    </div>
                    <form id="auth-form" onsubmit="event.preventDefault(); Auth.handleAuthSubmit();">
                        <div class="auth-field">
                            <label>Email</label>
                            <input type="email" id="auth-email" required placeholder="tu@email.com" autocomplete="email">
                        </div>
                        <div class="auth-field">
                            <label>Contraseña</label>
                            <input type="password" id="auth-password" required placeholder="••••••••" autocomplete="current-password">
                        </div>
                        <button type="submit" id="auth-submit-btn" class="auth-btn">Iniciar Sesión</button>
                    </form>
                    <button type="button" class="btn-guest-continue" onclick="Auth.hideAuthModal()">Continuar en modo local (Invitado)</button>
                    <div class="auth-footer">
                        <span id="auth-switch-text">¿No tienes cuenta?</span>
                        <a href="javascript:void(0)" id="auth-switch-link" onclick="Auth.toggleAuthMode()">Regístrate</a>
                    </div>
                    <div class="auth-notice">
                        <p>Tus exámenes, notas y estadísticas se mantendrán sincronizados entre tus dispositivos.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
    },

    hideAuthModal() {
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.classList.remove('active');
    },

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
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        if (!email || !password) return;
        if (this.mode === 'login') {
            this.login(email, password);
        } else {
            this.signup(email, password);
        }
    },

    updateUserUI() {
        let userNav = document.querySelector('.user-nav') || document.querySelector('.top-bar-actions');
        if (!userNav) return;

        const existingInfo = document.getElementById('user-profile-info');
        if (existingInfo) existingInfo.remove();
        const existingGuest = document.getElementById('btn-auth-trigger-guest');
        if (existingGuest) existingGuest.remove();

        if (this.currentUser) {
            const userInfo = document.createElement('div');
            userInfo.id = 'user-profile-info';
            userInfo.className = 'user-profile-info';
            const emailPrefix = this.currentUser.email ? this.currentUser.email.split('@')[0] : 'Usuario';
            const safeEmail = typeof AppHelpers !== 'undefined' ? AppHelpers.esc(emailPrefix) : emailPrefix;
            userInfo.innerHTML = `
                <div class="user-details">
                    <span class="user-email" title="${typeof AppHelpers !== 'undefined' ? AppHelpers.esc(this.currentUser.email) : ''}">👤 ${safeEmail}</span>
                    <button onclick="Auth.logout()" class="logout-btn" title="Cerrar sesión">🚪</button>
                </div>
            `;
            userNav.appendChild(userInfo);
        } else {
            const guestBtn = document.createElement('button');
            guestBtn.id = 'btn-auth-trigger-guest';
            guestBtn.className = 'btn-auth-trigger';
            guestBtn.onclick = () => this.showAuthModal();
            guestBtn.title = 'Inicia sesión para sincronizar tus notas en la nube';
            guestBtn.innerHTML = `<span>☁️ Sincronizar</span>`;
            userNav.appendChild(guestBtn);
        }
    },

    clearUserUI() {
        this.updateUserUI();
    }
};

// Auto-inicialización segura una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Si Firebase ya está presente, inicializar directamente, si no, esperar brevemente
    if (typeof firebase !== 'undefined') {
        Auth.init();
    } else {
        setTimeout(() => Auth.init(), 200);
    }
});

if (typeof window !== 'undefined') {
    window.Auth = Auth;
}
