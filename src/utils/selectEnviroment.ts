export const getBaseUrl = () => {
  const enviroment = process.env.NODE_ENV
  if (enviroment === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://offroad-next.vercel.app'
  }
}
