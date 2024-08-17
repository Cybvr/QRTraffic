// Mock Firebase Auth
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Simulate a logged-in user
    setTimeout(() => callback({ email: 'test@example.com' }), 100);
    return () => {}; // Unsubscribe function
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Simulate successful login
    return { user: { email } };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    // Simulate successful registration
    return { user: { email } };
  },
  signOut: async () => {
    // Simulate sign out
    return Promise.resolve();
  }
};

export { auth };

// Commented out real Firebase implementation
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
*/