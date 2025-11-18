import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Megaphone, Newspaper, PhoneCall, Globe } from "lucide-react";

const highlights = [
  { label: "15% 平台佣金", detail: "透明的交易结构，鼓励服务者和用户长期合作。" },
  { label: "9.9 美元 VIP", detail: "提供 AI 匹配、免佣订单与优先分发，让高频用户更放心。" },
  { label: "双应用体验", detail: "普通用户与服务提供者拥有不同的核心界面与功能集合。" }
];

const mediaNotes = [
  {
    title: "产品阶段",
    content: "MVP 聚焦奥克兰与惠灵顿，目标 1,000 名测试用户；12 个月内扩展到 5,000-10,000 名种子用户。"
  },
  {
    title: "典型场景",
    content: "陌生城市陪同、商务翻译、课程上门、户外指南、活动协助等，强调线下可信赖的陪伴服务。"
  },
  {
    title: "技术亮点",
    content: "AI 智能推荐、自动接单、行程规划、聊天与钱包系统、地图与列表自由切换。"
  }
];

const Press = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-brand-teal uppercase tracking-[0.2em] text-xs mb-4">
              <Megaphone className="h-4 w-4" />
              Press & Media
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">Guidew 最新动态与媒体资料</h1>
            <p className="text-lg text-gray-600">
              Guidew 正在搭建一个全球化的本地技能网络，我们欢迎媒体、合作伙伴与投资机构了解我们的使命、技术路线与阶段性成果。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {highlights.map(item => (
              <div key={item.label} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <p className="text-sm uppercase text-brand-teal mb-2">{item.label}</p>
                <p className="text-gray-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {mediaNotes.map(note => (
              <div key={note.title} className="border border-brand-lightGray rounded-2xl p-6 bg-brand-lightGray/40">
                <h3 className="text-xl font-semibold mb-3 text-brand-darkBlue">{note.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Newspaper className="h-7 w-7" />
              媒体采访与合作
            </h2>
            <p className="text-white/90 mb-6">
              欢迎了解我们的城市运营数据、VIP 增值服务、AI 赋能计划与全球扩张路线。我们期待与旅游、出行、生活方式与科技媒体合作。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:hello@guidew.com" className="px-6 py-3 bg-white text-brand-teal rounded-full font-semibold">
                <PhoneCall className="inline-block mr-2 h-4 w-4" />
                hello@guidew.com
              </a>
              <Link to="/press/kit" className="px-6 py-3 border border-white/60 rounded-full text-white font-semibold">
                <Globe className="inline-block mr-2 h-4 w-4" />
                Download Media Kit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
