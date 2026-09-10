import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BLOG_POSTS, formatBlogDate, getPostBySlug } from "@/lib/blog"
import { WHATSAPP_URL } from "@/lib/contact"

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(
    0,
    3
  )
  const relatedFallback =
    related.length > 0
      ? related
      : BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="min-h-screen text-plot-ink relative overflow-x-clip bg-plot-bg-soft">
      <Header />
      <>
        <article className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-16 px-4 sm:px-6">
          <div className="max-w-[860px] mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-plot-ink/55 hover:text-brand-orange transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <p
              className="text-[11px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ color: post.accent }}
            >
              {post.category} · {formatBlogDate(post.date)} · {post.readMinutes} min
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[0.95] text-plot-ink mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-plot-ink/70 font-medium leading-relaxed mb-8">{post.excerpt}</p>

            <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden border border-brand-navy/10 shadow-[0_24px_60px_-28px_rgba(26,30,56,0.3)] mb-10 bg-brand-navy">
              <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="mb-12 space-y-6">
              {post.content.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={`h2-${i}`}
                      className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-plot-ink pt-4"
                    >
                      {block.text}
                    </h2>
                  )
                }
                if (block.type === "h3") {
                  return (
                    <h3
                      key={`h3-${i}`}
                      className="text-lg sm:text-xl font-display uppercase tracking-tight text-plot-ink/90 pt-2"
                    >
                      {block.text}
                    </h3>
                  )
                }
                if (block.type === "ul") {
                  return (
                    <ul key={`ul-${i}`} className="space-y-2.5 pl-1">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-base sm:text-lg text-plot-ink/80 font-medium leading-relaxed"
                        >
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: post.accent }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={`q-${i}`}
                      className="rounded-2xl border-l-4 bg-white/90 border border-brand-navy/10 px-5 py-4 sm:px-6 sm:py-5 text-base sm:text-lg font-medium italic text-plot-ink/75 leading-relaxed"
                      style={{ borderLeftColor: post.accent }}
                    >
                      {block.text}
                    </blockquote>
                  )
                }
                return (
                  <p
                    key={`p-${i}`}
                    className="text-base sm:text-lg text-plot-ink/80 font-medium leading-relaxed"
                  >
                    {block.text}
                  </p>
                )
              })}
            </div>

            <div className="rounded-[1.5rem] bg-brand-navy text-white p-7 sm:p-9 mb-16">
              <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight mb-3">
                ¿Tenés un proyecto similar?
              </h2>
              <p className="text-white/70 font-medium mb-6 max-w-xl">
                Contanos qué necesitás y armamos una propuesta a medida.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full font-black px-8 py-3.5 text-sm uppercase tracking-wide text-plot-ink"
                style={{ background: post.accent }}
              >
                Hablar con Plot
              </a>
            </div>

            <div>
              <h3 className="text-xl font-display uppercase tracking-tight text-plot-ink mb-5">
                Seguí leyendo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedFallback.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group rounded-2xl overflow-hidden border border-brand-navy/10 bg-white/95 hover:-translate-y-1 transition-transform"
                  >
                    <div className="relative aspect-[16/10] bg-brand-navy overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p
                        className="text-[10px] font-black uppercase tracking-wider mb-1"
                        style={{ color: item.accent }}
                      >
                        {item.category}
                      </p>
                      <h4 className="text-sm font-display uppercase tracking-tight text-plot-ink leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </>
      <Footer />
    </main>
  )
}
