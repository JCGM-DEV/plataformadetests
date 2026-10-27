/**
 * storage.service.js
 * Capa de abstracción para persistencia en LocalStorage y SessionStorage.
 * Proporciona serialización segura y manejo centralizado de excepciones de cuota o parseo.
 */

const StorageService = {
    /**
     * Obtiene un valor desde localStorage parseado como JSON
     * @param {string} key Clave a buscar
     * @param {*} defaultValue Valor por defecto si no existe o falla el parseo
     * @returns {*}
     */
    get(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null || raw === undefined) return defaultValue;
            return JSON.parse(raw);
        } catch (err) {
            console.warn(`[StorageService] Error parseando clave "${key}":`, err);
            return defaultValue;
        }
    },

    /**
     * Guarda un valor en localStorage serializado como JSON
     * @param {string} key
     * @param {*} value
     * @returns {boolean} True si se guardó con éxito
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (err) {
            console.error(`[StorageService] Error guardando clave "${key}":`, err);
            if (typeof Toast !== 'undefined') {
                Toast.error('Espacio de almacenamiento local lleno o no disponible');
            }
            return false;
        }
    },

    /**
     * Elimina una clave de localStorage
     * @param {string} key
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.warn(`[StorageService] Error eliminando clave "${key}":`, err);
        }
    },

    /**
     * Acceso rápido a SessionStorage con parseo seguro
     */
    session: {
        get(key, defaultValue = null) {
            try {
                const raw = sessionStorage.getItem(key);
                if (raw === null) return defaultValue;
                return JSON.parse(raw);
            } catch {
                return defaultValue;
            }
        },
        set(key, value) {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
            } catch (err) {
                console.warn(`[StorageService.session] Error guardando clave "${key}":`, err);
            }
        },
        remove(key) {
            try {
                sessionStorage.removeItem(key);
            } catch {}
        }
    }
};

if (typeof window !== 'undefined') {
    window.StorageService = StorageService;
}
