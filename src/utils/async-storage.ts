import AsyncStorage from '@react-native-async-storage/async-storage';

export async function save(key: string, value: string){
    await AsyncStorage.setItem(key, value);
}

export async function get(key: string){
    return await AsyncStorage.getItem(key);
}