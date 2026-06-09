import Link from "next/link";
import type { Post } from "@/lib/posts";

/** Posts relacionados no fim do artigo — mantém o leitor no site. */
export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
        Continue lendo
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="glass glass-hover block p-5">
            {p.tags?.[0] && (
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-light">
                {p.tags[0]}
              </span>
            )}
            <h3 className="mt-2 font-semibold leading-snug text-paper">{p.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-paper/55">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
