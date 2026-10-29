// @ts-check
import { readdirSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Only the full, indexable pages belong in the sitemap. Every other page
// is a noindex stub (see src/layouts/Stub.astro) and is excluded here.
const strip = (url) => url.replace(/\/$/, '')

// /blog and every post come from the blog content collection (one markdown file per post), not a hardcoded list.
const blogPaths = [
  '/blog',
  ...readdirSync('./src/content/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => '/blog/' + f.replace(/\.md$/, '')),
]
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
    '/ninja-warrior',
    '/fitness-classes',
    '/ropes-course',
    '/pickleball',
    '/trunk-or-treat',
    '/team-building',
    '/about',
    '/hours',
    '/reviews',
    '/contact',
    '/jobs',
    '/waiver',
    '/privacy',
    ...blogPaths,
  ].map((p) =>
    strip('https://bodiesinmotionidaho.com' + p),
  ),
)

export default defineConfig({
  site: 'https://bodiesinmotionidaho.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => indexable.has(strip(page)),
      // Build-time lastmod for all indexable URLs (AEO/SEO freshness signal).
      lastmod: new Date(),
    }),
  ],
})
