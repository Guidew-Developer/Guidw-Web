import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Shield, Sparkles, Layers } from "lucide-react";

const differentiators = [
  {
    title: "超越本地向导",
    description: "Guidew 提供的服务范围从城市陪同、语言翻译到舞蹈教学与私人行程策划，远超传统向导或单一技能市场。"
  },
  {
    title: "面向双边市场",
    description: "任何人注册后即可成为服务提供者，通过简介、视频与证书展示自己的专长，并以小时费率和最低时长透明报价。"
  },
  {
    title: "AI 与 VIP 赋能",
    description: "VIP 用户可使用 AI 对话提交需求并获得智能匹配，VIP 服务者可启用自动接单与 AI 行程规划，显著提升效率。"
  },
  {
    title: "安全与合规",
    description: "分级身份验证、证书上传、聊天下单、双向评价和争议流程，确保在陌生城市也能安心体验本地生活。"
  }
];

const growthPlan = [
  { phase: "Phase 1 · 0-6 个月", goal: "打造 MVP，聚焦奥克兰与惠灵顿，获取 1,000 名测试用户。" },
  { phase: "Phase 2 · 6-12 个月", goal: "完善产品体验，在两座城市间获得 5,000-10,000 名深度用户。" },
  { phase: "Phase 3 · 第 2 年", goal: "扩展至新西兰全国，累计 100,000 名用户，建立服务标准。" },
  { phase: "Phase 4 · 25 个月+", goal: "进入澳大利亚主要城市，累计 200,000 名用户，形成跨国网络。" },
  { phase: "Phase 5 · 第 5 年", goal: "走向全球市场，提供多语言支持与本地化运营体系。" }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm tracking-widest text-brand-teal uppercase mb-4">About Guidew</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue leading-tight mb-6">
              让陌生城市也能拥有“本地朋友”
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Guidew 是一个类似 Uber 的技能共享平台，但我们链接的是线下的本地技能与体验。
              无论是抵达奥克兰的商务旅客，还是想在惠灵顿学习 Bachata 的舞者，都能通过 Guidew
              呼叫可信赖的本地专家，获得个性化的陪伴、翻译、行程策划以及更多独特体验。
            </p>
            <div className="mt-8">
              <Link
                to="/about/vision"
                className="inline-flex items-center px-6 py-3 rounded-full bg-brand-teal text-white font-semibold hover:bg-brand-teal/90 transition"
              >
                深入了解我们的愿景 →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {differentiators.map((item, index) => {
              const Icon = [Users, Sparkles, Layers, Shield][index];
              return (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm p-6 border border-brand-lightGray">
                  <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
                    <Icon className="text-brand-teal h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">五年扩张蓝图</h2>
            <p className="text-white/90 mb-10 max-w-3xl">
              我们以奥克兰和惠灵顿为起点，逐步扩展到新西兰全境、澳大利亚再到全球主要城市，并提供多语言支持。
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {growthPlan.map(step => (
                <div key={step.phase} className="bg-white/10 rounded-xl p-5 border border-white/20">
                  <p className="text-sm uppercase tracking-wider text-white/80 mb-2">{step.phase}</p>
                  <p className="text-lg font-semibold">{step.goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
