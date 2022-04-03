export function getEnvOrError (envName: string): string {
  if (!(envName in process.env)) {
    throw new Error(`Expected environment variable ${envName} to be defined.`);
  }
  return process.env[envName] as string;
}
