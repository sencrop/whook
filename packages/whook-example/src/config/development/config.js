import COMMON_CONFIG from '../common/config';

const CONFIG = {
  ...COMMON_CONFIG,
  DEV_ACCESS_TOKEN: '1-admin',
  DEFAULT_MECHANISM: 'fake',
  // This allows you to map service names depending on
  // the targetted environment. Here, for dev, we don't send SMS
  // but instead log them to slack.
  SERVICE_NAME_MAP: {
    sendSMS: 'logSMS',
  },
};

export default CONFIG;
