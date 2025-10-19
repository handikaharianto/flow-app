import { Client, Account, TablesDB } from "node-appwrite";

async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.NEXT_PUBLIC_API_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
    get tablesDB() {
      return new TablesDB(client);
    },
  };
}

async function createSessionClient(sessionCookie?: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

  if (sessionCookie) {
    client.setSession(sessionCookie);
  }

  return {
    get account() {
      return new Account(client);
    },
    get tablesDB() {
      return new TablesDB(client);
    },
  };
}

export { createAdminClient, createSessionClient };
