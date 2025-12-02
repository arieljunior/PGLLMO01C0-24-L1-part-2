import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "@app/token"

export async function saveUid(value: string) {
    await AsyncStorage.setItem(TOKEN_KEY, value);
}

export async function getUid() {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeUid() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}