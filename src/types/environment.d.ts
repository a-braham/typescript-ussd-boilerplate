declare global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production';
        readonly PORT?: string;
        readonly PWD: string;
        readonly DATABASE_URL: string;
        readonly DATABASE_URL_TEST: string;
        readonly JWT_SECRET_KEY: string;
      }
    }
  }
  
  export {};
  