import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async store(value: T) {
    await AsyncStorage.setItem(this.key, JSON.stringify(value));
  }

  async read(): Promise<T | null> {
    const item = await AsyncStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  async clear() {
    await AsyncStorage.removeItem(this.key);
  }
}
