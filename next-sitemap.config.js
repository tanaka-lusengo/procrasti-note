/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.PRODUCTION_BASE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
};
