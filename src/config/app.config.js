const baseConfig = {
  API_ENDPOINT: 'https://breko-hub.herokuapp.com/api',
  PORT: process.env.PORT || 9001,
}

export default {
  production: baseConfig,
  local: {
    ...baseConfig,
    API_ENDPOINT: '/api',
  },
  test: {
    ...baseConfig,
    API_ENDPOINT: 'https://breko-hub-test.com/api',
  },
  development: {
    ...baseConfig,
    API_ENDPOINT: '/api',
  },
  staging: {
    ...baseConfig,
    API_ENDPOINT: '/api',
  },
}[process.env.CONFIG_ENV]
