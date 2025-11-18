import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Download, Image, FileText, Video } from "lucide-react";

const assets = [
  {
    icon: Image,
    title: "品牌标识",
    description: "包含 APP LOGO、渐变字标、常规/反白版本及安全留白说明。",
    link: "/APP_LOGO.jpeg"
  },
  {
    icon: FileText,
    title: "产品概览",
    description: "介绍 Guidew 定位、商业模式、城市运营计划与核心功能。",
    link: "#"
  },
  {
    icon: Video,
    title: "应用界面快照",
    description: "首页、Discover、How it Works 与 APP 下载模块的高分辨率截图。",
    link: "#"
  }
];

const PressKit = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">Media Kit</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">下载 Guidew 品牌素材</h1>
            <p className="text-lg text-gray-600">
              我们准备了 LOGO、产品简介与应用截图，方便媒体报道与合作伙伴宣传使用。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {assets.map(asset => {
              const Icon = asset.icon;
              return (
                <div key={asset.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-brand-teal h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{asset.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
                  <a
                    href={asset.link}
                    className="inline-flex items-center gap-2 text-brand-teal font-semibold text-sm"
                    download={asset.link !== "#" ? true : undefined}
                  >
                    <Download className="h-4 w-4" />
                    下载
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-semibold mb-3">需要采访或更多素材？</p>
            <p className="text-white/90 mb-6">请联系我们的媒体团队，我们会在 24 小时内响应请求。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:press@guidew.app" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
                press@guidew.app
              </a>
              <Link to="/press" className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold">
                返回 Press 页面
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PressKit;
