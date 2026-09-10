"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog"

const CATEGORIES = ["Todos", "Novedades", "Trabajos Plot", "Sector", "Eventos"] as const

export default function BlogPage() {
  return (
    <main className="min-h-screen text-plot-ink relative overflow-x-clip bg-plot-bg-soft">
      <Header />
      <>
        <section className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-10 px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-5 font-medium flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-brand-orange" />
              Novedades
              <span className="w-8 h-px bg-brand-cyan" />
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase leading-[0.95] mb-5 tracking-tight text-plot-ink">
              Blog <span className="text-brand-orange">Plot</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto leading-relaxed">
              Novedades del sector, trabajos de Plot Center y miradas sobre comunicación visual,
              minería, eventos y desarrollo digital.
            </p>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 pb-8">
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-brand-navy/10 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-plot-ink/70"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 pb-20 md:pb-28">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.45 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-[1.5rem] overflow-hidden bg-white border border-brand-navy/10 shadow-[0_20px_50px_-24px_rgba(26,30,56,0.22)] transition-[box-shadow,border-color] duration-300 hover:border-brand-navy/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-navy">
                    <img
                      src={post.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
                    <span
                      className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-plot-ink"
                      style={{ background: post.accent }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-plot-ink/45 mb-2">
                      {formatBlogDate(post.date)} · {post.readMinutes} min
                    </p>
                    <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-plot-ink mb-3 leading-tight group-hover:text-brand-navy">
                      {post.title}
                    </h2>
                    <p className="text-sm text-plot-ink/65 font-medium leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide"
                      style={{ color: post.accent }}
                    >
                      Leer nota
                      <span
                        className="w-6 h-6 rounded-full inline-flex items-center justify-center text-plot-ink transition-transform group-hover:translate-x-1"
                        style={{ background: post.accent }}
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </>
      <Footer />
    </main>
  )
}
