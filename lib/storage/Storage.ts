import { MMKV } from 'react-native-mmkv'

interface Config {
  expire: number; // in ms
}

interface StoredData {
  value: boolean | string | number | Uint8Array;
  expireAt?: Date;
}

/**
* expireAt from json.PARSE is a string. need to parse it to date manually
*/
interface ParsedStoredData {
  value: boolean | string | number | Uint8Array;
  expireAt?: string;
}

// export the functions for easier replacement
const storage = new MMKV()

export function set(
  key: string,
  value: boolean | string | number | Uint8Array,
  config?: Config,
) {
  const data: StoredData = {
      value: value,
      expireAt: config?.expire
          ? new Date(Date.now() + config.expire)
          : undefined,
  };

  storage.set(key, JSON.stringify(data));
}

function get<T = boolean | string | number | Uint8Array>(key: string) {
  const dataStr = storage.getString(key);
  if (dataStr) {
      const parsedData = JSON.parse(dataStr) as ParsedStoredData;
      const value = parsedData.value;
      const expireAt = parsedData.expireAt
          ? new Date(parsedData.expireAt)
          : undefined;

      if (expireAt && expireAt.getTime() < new Date().getTime()) {
          storage.delete(key);
          return;
      }

      return value as T;
  }
}

export function remove(key: string) {
  storage.delete(key);
}

export function getString(key: string) {
  return get<string>(key);
}

export function getBoolean(key: string) {
  return !!get<boolean>(key);
}

export function getNumber(key: string) {
  return get<number>(key);
}
