/** @type {import('next').NextConfig} */
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/todos/:path*',
        destination: 'http://localhost:5000/todos/:path*',
      }
    ]
  },
}
