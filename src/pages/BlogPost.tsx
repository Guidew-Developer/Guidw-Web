import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/constants/siteContent";
import { ArrowLeft, PenSquare } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => blogPosts.find(item => item.id === slug), [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-lightGray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <PenSquare className="mx-auto text-brand-teal mb-4" size={32} />
            <h1 className="text-3xl font-bold text-brand-darkBlue mb-3">文章未找到</h1>
            <p className="text-gray-600 mb-6">请返回博客，查看最新的本地故事与产品更新。</p>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-teal text-white">
              <ArrowLeft className="h-4 w-4" />
              返回 Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center text-sm text-brand-teal mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              所有文章
            </Link>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-3">{post.iconLabel}</p>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-3">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700 leading-relaxed">
            {post.sections.map(section => (
              <article key={section.heading}>
                <h2 className="text-2xl font-semibold text-brand-darkBlue mb-3">{section.heading}</h2>
                <p>{section.content}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-lg font-medium mb-3">喜欢这篇文章？</p>
            <p className="text-white/90 mb-6">在 Guidew App 中体验真实的本地服务，或关注我们的下一篇城市故事。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
                浏览服务
              </Link>
              <Link to="/become-expert" className="px-6 py-3 rounded-full border border-white/60 text-white font-semibold">
                成为服务者
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
