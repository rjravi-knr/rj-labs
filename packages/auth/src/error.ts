export class AuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class AuthorizationError extends AuthError {
  constructor(message = "Unauthorized") {
    super("UNAUTHORIZED", message);
  }
}
