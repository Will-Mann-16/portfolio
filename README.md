# Will Mann — portfolio

Personal site: projects, writing, and the copy that presents them. Content lives in `content/` as Markdown and YAML; Next.js reads it at build time.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Images under `content/images/` are copied to `public/images/` on `predev` / `prebuild`.

## Content

| Path | What |
| --- | --- |
| `content/about.md` | Home About section |
| `content/contact.md` | Home Contact body |
| `content/projects/<slug>.md` | Project pages at `/projects/<slug>` |
| `content/blog/<slug>.md` | Posts at `/blog/<slug>` |
| `content/technologies.yaml` | Home technology cards |
| `content/images/` | Source images (not served from here) |

Public routes: `/`, `/blog`, `/blog/<slug>`, `/projects/<slug>`.
