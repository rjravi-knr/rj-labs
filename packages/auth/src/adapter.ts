import { User, Session, Account } from "./types";

export interface Adapter {
  createSession(session: Session): Promise<Session>;
  getSession(token: string): Promise<{ session: Session; user: User } | null>;
  deleteSession(token: string): Promise<void>;
  updateSession(token: string, data: Partial<Session>): Promise<Session>;
  
  createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  
  createAccount(account: Account): Promise<Account>;
  getAccount(providerId: string, accountId: string): Promise<Account | null>;
}
