declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    NODE_ENV: string;
    ClOUDINARY_CLOUD_NAME: string;
    ClOUDINARY_API_KEY: string;
    ClOUDINARY_API_SECERT: string;
  }
}
