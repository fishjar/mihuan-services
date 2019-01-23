import path from 'path';
import fse from 'fs-extra';
import { NODE_ENV } from '../lib/env';
import developmentConfig from './config.development';
import testConfig from './config.test';
import productionConfig from './config.production';

const logDir = path.resolve(__dirname, '../log');
fse.ensureDirSync(logDir);

export const LOG_PATH = logDir;
export const EXPIRES_IN = '1h';
export const FEEDS_HOST = 'https://api.github.com/feeds';
export const WXAPP_HOST = 'http://localhost:3002';
export const WXACODE_URL = {
  'a': 'https://api.weixin.qq.com/wxa/getwxacode',
  'b': 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
  'c': 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
};
export const STATIC_DIR = path.resolve(__dirname, '../public');

const defaultConfig = {
  LOG_PATH,
  EXPIRES_IN,
  FEEDS_HOST,
  WXAPP_HOST,
  WXACODE_URL,
  STATIC_DIR,
};

const configMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};
const envConfig = configMap[NODE_ENV];

const config = { ...defaultConfig, ...envConfig };

export default config;