export type Token = string;

export interface IUserServices {
  login(email: string, password: string): Promise<Token | null>;
  getRole(id: number): Promise<string>;
}
