import { get } from 'env-var';

const env = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
}

export default env;
