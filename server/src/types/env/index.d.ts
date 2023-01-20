declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URI: string;
            CLIENT_URL: string;
            JWT_KEY: string;
        }
    }
}

export { }