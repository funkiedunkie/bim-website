// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Only the full, indexable pages belong in the sitemap. Every other page
// is a noindex stub (see src/layouts/Stub.astro) and is excluded here.
const strip = (url) => url.replace(/\/$/, '')
const indexable = new Set(
  [
    '/',
    '/infant-toddler-care',
    '/preschool',
    '/after-school-care',
    '/camps',
    '/birthday-parties',
    '/parents-night-out',
    '/open-play',
  ].map((p) =>
    strip('https://www.bodiesinmotionidaho.com' + p),
  ),
)

export default defineConfig({
  site: 'https://www.bodiesinmotionidaho.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => indexable.has(strip(page)),
    }),
  ],
})
