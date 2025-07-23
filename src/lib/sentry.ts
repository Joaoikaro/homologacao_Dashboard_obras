import * as Sentry from '@sentry/react'

Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: 'https://3211b79d436ef50216f88c83b28c1613@o4508795066318848.ingest.us.sentry.io/4508795711324160',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^https:\/\/gerentemax\.azurewebsites\.net\/api\/v1/],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
})
