export interface ModelType {
  email: string | null;
  password: string | null;
  reenteredPassword: string | null;
}

export type CredentialsUser = Pick<ModelType, 'email' | 'password'>;
