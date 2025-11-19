import { useMemo } from "react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PenSquare, MapPinned, Languages, Music3, Compass } from "lucide-react";
import { getBlogPosts } from "@/constants/siteContent";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, ElementType> = {
  map: MapPinned,
  language: Languages,
  music: Music3,
  compass: Compass
};

const Blog = () => {
  const { t, i18n } = useTranslation();
  const posts = useMemo(() => getBlogPosts(i18n.language), [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-brand-teal uppercase tracking-[0.2em] text-xs mb-4">
              <PenSquare className="h-4 w-4" />
              {t("blog.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{t("blog.hero.title")}</h1>
            <p className="text-lg text-gray-600">{t("blog.hero.description")}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {posts.map(post => {
              const Icon = iconMap[post.icon] ?? MapPinned;
              return (
                <article key={post.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-brand-teal mb-3">
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {post.iconLabel}
                    </span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-brand-darkBlue">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.summary}</p>
                  <Link to={`/blog/${post.id}`} className="text-brand-teal font-semibold text-sm">
                    {t("blog.list.readStory")}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
