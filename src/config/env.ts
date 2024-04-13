import { config } from 'dotenv'
config()

export enum Environment {
    Development = 'development',
    Production = 'production'
}

const getEnvVar = (key: string, required = true): string => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key) && required) {
        throw new Error(`${key} does not exist on process.env`)
    }

    return process.env[key]!
}

export const PORT = getEnvVar('PORT', false) ?? 4000
export const DB_NAME = getEnvVar('DB_NAME')
export const TOKEN_SECRET = getEnvVar('TOKEN_SECRET')
export const REFRESH_TOKEN_SECRET = getEnvVar('REFRESH_TOKEN_SECRET')
export const TOKEN_EXPIRES_IN = getEnvVar('TOKEN_EXPIRES_IN')
export const REFRESH_TOKEN_EXPIRES_IN = getEnvVar('REFRESH_TOKEN_EXPIRES_IN')
export const NODE_ENV = getEnvVar('NODE_ENV') as Environment
export const DB_PREFIX = getEnvVar('DB_PREFIX')
export const DB_USERNAME = getEnvVar('DB_USERNAME')
export const DB_PASSWORD = getEnvVar('DB_PASSWORD')
export const DB_HOST = getEnvVar('DB_HOST')
export const DB_URI_QUERY = getEnvVar('DB_URI_QUERY')

