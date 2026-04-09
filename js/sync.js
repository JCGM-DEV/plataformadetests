/**
 * TechHub Euroformac — Sync System
 * Handles synchronization between localStorage and Firebase Firestore
 */

const Sync = {
    db: null,
    userId: null,
    isSyncing: false,

    // Keys that will be synced to Firestore
    SYNC_KEYS: [
        'exam_history_v2',
        'fallos_v2',
        'spaced_rep_v1',
        'mastery_v1',
        'daily_activity_v1',
        'libreta_errores_v1'
    ],

    init(db, userId) {
        this.db = db;
        this.userId = userId;
        console.log('Sync system initialized for user:', userId);
    },

    /**
     * Set data locally and in the cloud
     */
    async set(key, value) {
        // Save to localStorage (cache)
        localStorage.setItem(key, JSON.stringify(value));

        // If authenticated, save to Firestore
        if (this.db && this.userId && this.SYNC_KEYS.includes(key)) {
            try {
                const docRef = this.db.collection('users').doc(this.userId).collection('data').doc(key);
                await docRef.set({
                    data: value,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error(`Error syncing ${key} to Firestore:`, error);
            }
        }
    },

    /**
     * Get data (prefers local cache for speed, but auth.js will handle initial pull)
     */
    get(key, defaultValue = null) {
        const local = localStorage.getItem(key);
        return local ? JSON.parse(local) : defaultValue;
    },

    /**
     * Remove data
     */
    async remove(key) {
        localStorage.removeItem(key);
        if (this.db && this.userId && this.SYNC_KEYS.includes(key)) {
            try {
                await this.db.collection('users').doc(this.userId).collection('data').doc(key).delete();
            } catch (error) {
                console.error(`Error removing ${key} from Firestore:`, error);
            }
        }
    },

    /**
     * Full pull from cloud (called after login)
     */
    async pullAll() {
        if (!this.db || !this.userId) return;

        console.log('Pulling all data from Firestore...');
        try {
            const snapshot = await this.db.collection('users').doc(this.userId).collection('data').get();
            const cloudData = {};
            snapshot.forEach(doc => {
                cloudData[doc.id] = doc.data().data;
            });

            // Update localStorage with cloud data
            for (const key of this.SYNC_KEYS) {
                if (cloudData[key]) {
                    localStorage.setItem(key, JSON.stringify(cloudData[key]));
                }
            }
            return cloudData;
        } catch (error) {
            console.error('Error pulling data from Firestore:', error);
            return null;
        }
    },

    /**
     * Push all local data to cloud (called on first registration or manual migration)
     */
    async pushAll() {
        if (!this.db || !this.userId) return;

        console.log('Pushing all local data to Firestore...');
        const batch = this.db.batch();
        let hasData = false;

        for (const key of this.SYNC_KEYS) {
            const localValue = localStorage.getItem(key);
            if (localValue) {
                const docRef = this.db.collection('users').doc(this.userId).collection('data').doc(key);
                batch.set(docRef, {
                    data: JSON.parse(localValue),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                hasData = true;
            }
        }

        if (hasData) {
            await batch.commit();
        }
    }
};
