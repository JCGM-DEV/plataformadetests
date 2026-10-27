/**
 * notification.service.js
 * Sistema moderno de notificaciones Toast y diálogos de confirmación sin bloqueo.
 * Sustituye llamadas nativas de alert() y confirm() por componentes accesibles y con estética Glassmorphism.
 */

const Toast = (() => {
    let container = null;

    function getContainer() {
        if (!container || !document.body.contains(container)) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 380px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
        return container;
    }

    function show(message, type = 'info', duration = 3500) {
        const cont = getContainer();
        const toast = document.createElement('div');
        toast.className = `toast-card toast-${type}`;
        toast.style.cssText = `
            pointer-events: auto;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-left: 4px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#6366f1'};
            color: #f8fafc;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transform: translateY(15px);
            transition: all 0.25s ease-out;
        `;

        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
        toast.innerHTML = `
            <span style="font-size: 1.2rem;">${icon}</span>
            <div style="flex: 1; line-height: 1.4;">${message}</div>
            <button style="background: transparent; border: none; color: #94a3b8; font-size: 1.1rem; cursor: pointer; padding: 0 4px;" onclick="this.parentElement.remove()">&times;</button>
        `;

        cont.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(15px)';
                setTimeout(() => toast.remove(), 250);
            }, duration);
        }
    }

    return {
        success: (msg, duration) => show(msg, 'success', duration),
        error: (msg, duration) => show(msg, 'error', duration || 4500),
        warning: (msg, duration) => show(msg, 'warning', duration),
        info: (msg, duration) => show(msg, 'info', duration)
    };
})();

if (typeof window !== 'undefined') {
    window.Toast = Toast;
}
