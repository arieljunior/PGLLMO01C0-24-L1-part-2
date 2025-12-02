import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, User } from 'firebase/auth'

export interface LoginCredentials {
    email: string;
    password: string;
}

export const loginWithFirebase = async ({email, password}: LoginCredentials): Promise<string> => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    // const token = await user.getIdToken();
    return user.uid
};