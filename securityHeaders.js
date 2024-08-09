module.exports = [
  {
    key: 'Permissions-Policy', // none on root
    value: 'microphone=(), camera=()', // Disable sensitive features that we know we're unlikely to use
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin', // Don't share the referrer URL to other domains
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff', // Instruct browsers not to override our stated MIME types
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN', // Don't allow other browsers to put us in a frame
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload', // Ensures the site is accessed over HTTPS
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block', // Instructs browsers to block cross-site scripting attacks, activates the browser’s built-in XSS protection.
  },
];
