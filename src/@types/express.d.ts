/**
 * Adicionando uma informação nova no Request
 * No arquivo ensureAuthenticated.ts, não conseguiremos enviar o user no
 * request caso nao fizermos isso
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
