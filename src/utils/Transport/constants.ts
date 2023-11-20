export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum WSEvents {
  OPEN = 'open',
  ERROR = 'error',
  MESSAGE = 'message',
  CLOSE = 'close'
}

export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES = `${API_URL}/resources/`;
export const WS_URL = 'wss://ya-praktikum.tech/ws';
