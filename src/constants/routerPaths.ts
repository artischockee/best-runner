/**
 * @author Artem Piskarev
 *
 * RouterPaths describes routes of the application.
 * Routes can be specified for all the pages in use.
 * One must specify routes [only] for pages (src/pages/).
 *
 * Format: 'key - value' (examples):
 * - examplePage: '/example'
 * - transactionPage: '/transactions/:transactionId/main'
 *
 * Keys (like ':someImportantVariable') are being processed in redirect function (not this file).
 *
 * Please proceed to router config (src/services/router/config.ts)
 * in order to finish configuring newly added paths.
 */

const RouterPaths = {
  indexPage: "/",
  page404: "*",
};

export default RouterPaths;
