/**
 * sync.js
 * Servicio de sincronización bidireccional entre almacenamiento local (StorageService) y Firebase Firestore.
 */

const Sync = {
    db: null,
    userId: null,
    isSyncing: false,

    // Colección de claves sincronizables
    SYNC_KEYS: [
        'exam_history_v2',
        'fallos_v2',
        'spaced_rep_v1',
        'mastery_v1',
        'daily_activity_v1',
        'libreta_errores_v1'
    ],

    /**
     * Inicializa el sistema de sincronización con la instancia de Firestore y el UID del usuario
     * @param {Object} db
     * @param {string} userId
     */
    init(db, userId) {
        this.db = db;
        this.userId = userId;
        console.log('[Sync] Inicializado para el usuario:', userId);
    },

    /**
     * Guarda un dato en la caché local y, si el usuario está autenticado, en Firestore
     * @param {string} key
     * @param {*} value
     */
    async set(key, value) {
        // Almacenamiento local mediante StorageService
        if (typeof StorageService !== 'undefined') {
            StorageService.set(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }

        // Sincronización remota
        if (this.db && this.userId && this.SYNC_KEYS.includes(key)) {
            try {
                const docRef = this.db.collection('users').doc(this.userId).collection('data').doc(key);
                await docRef.set({
                    data: value,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error(`[Sync] Error sincronizando ${key} en Firestore:`, error);
            }
        }
    },

    /**
     * Recupera un valor desde la caché local con valor por defecto
     * @param {string} key
     * @param {*} defaultValue
     * @returns {*}
     */
    get(key, defaultValue = null) {
        if (typeof StorageService !== 'undefined') {
            return StorageService.get(key, defaultValue);
        }
        const local = localStorage.getItem(key);
        if (!local) return defaultValue;
        try {
            return JSON.parse(local);
        } catch {
            return defaultValue;
        }
    },

    /**
     * Elimina un dato tanto en local como en la nube
     * @param {string} key
     */
    async remove(key) {
        if (typeof StorageService !== 'undefined') {
            StorageService.remove(key);
        } else {
            localStorage.removeItem(key);
        }

        if (this.db && this.userId && this.SYNC_KEYS.includes(key)) {
            try {
                await this.db.collection('users').doc(this.userId).collection('data').doc(key).delete();
            } catch (error) {
                console.error(`[Sync] Error eliminando ${key} de Firestore:`, error);
            }
        }
    },

    /**
     * Descarga y fusiona todos los datos del usuario desde Firestore
     * @returns {Promise<Object|null>}
     */
    async pullAll() {
        if (!this.db || !this.userId) return null;

        console.log('[Sync] Descargando datos desde Firestore...');
        try {
            const snapshot = await this.db.collection('users').doc(this.userId).collection('data').get();
            const cloudData = {};
            snapshot.forEach(doc => {
                cloudData[doc.id] = doc.data().data;
            });

            // Actualizar caché local
            for (const key of this.SYNC_KEYS) {
                if (cloudData[key] !== undefined) {
                    if (typeof StorageService !== 'undefined') {
                        StorageService.set(key, cloudData[key]);
                    } else {
                        localStorage.setItem(key, JSON.stringify(cloudData[key]));
                    }
                }
            }
            return cloudData;
        } catch (error) {
            console.error('[Sync] Error al descargar datos de Firestore:', error);
            return null;
        }
    },

    /**
     * Sube todos los datos locales existentes a Firestore (usado en migraciones o primer inicio)
     */
    async pushAll() {
        if (!this.db || !this.userId) return;

        console.log('[Sync] Subiendo datos locales a Firestore...');
        const batch = this.db.batch();
        let hasData = false;

        for (const key of this.SYNC_KEYS) {
            const localValue = this.get(key, null);
            if (localValue !== null) {
                const docRef = this.db.collection('users').doc(this.userId).collection('data').doc(key);
                batch.set(docRef, {
                    data: localValue,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                hasData = true;
            }
        }

        if (hasData) {
            try {
                await batch.commit();
                if (typeof Toast !== 'undefined') {
                    Toast.success('Progreso sincronizado en la nube correctamente');
                }
            } catch (err) {
                console.error('[Sync] Error en batch commit de subida:', err);
            }
        }
    }
};

if (typeof window !== 'undefined') {
    window.Sync = Sync;
}
