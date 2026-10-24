import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// One markdown file per migrated Weebly post, same slug as the old /blog/<slug> URL.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        /** Optional shorter <title>; defaults to "<title> | Bodies in Motion Boise". */
        seoTitle: z.string().optional(),
        description: z.string().min(50).max(165),
        /** Original Weebly publish date. */
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date(),
        heroImage: image().optional(),
        heroAlt: z.string().optional(),
        /** Program page paths this post links to; the first one drives the end-of-post call to action. */
        relatedPages: z.array(z.string().startsWith('/')).min(1),
        /** Internal review flags for Duncan; never rendered. Mirrored in TODO.md. */
        reviewNotes: z.string().optional(),
      })
      .refine((p) => !p.heroImage || !!p.heroAlt, { message: 'heroAlt is required when heroImage is set', path: ['heroAlt'] }),
})

export const collections = { blog }
