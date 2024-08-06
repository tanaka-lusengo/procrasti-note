/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.FRONTEND_BASE_URL_PROD || 'http://localhost:3000',
  generateRobotsTxt: true,
};
