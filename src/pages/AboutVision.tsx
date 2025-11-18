import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lightbulb, ShieldCheck, BarChart3, Users2 } from "lucide-react";

const revenueModel = [
  {
    title: "15% 交易佣金",
    detail: "每笔线下服务成交后，平台收取 15% 佣金，保障运营、客服与风控。"
  },
  {
    title: "VIP 订阅 · 9.9 美元/月",
    detail: "VIP 用户免佣下单、优先匹配、AI 对话下单；VIP 服务者则可自动接单与 AI 行程规划。"
  },
  {
    title: "第三方增值",
    detail: "与门票、租车、装备等第三方服务联动，在订单流程中推荐相关产品。"
  }
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "多层级认证",
    text: "根据服务类型要求不同级别的身份验证，从普通实名认证到无犯罪记录审查。"
  },
  {
    icon: Users2,
    title: "双向评价与徽章",
    text: "用户与服务者互评后才公开，配合成就系统与证书上传，构建长期信任。"
  },
  {
    icon: BarChart3,
    title: "实时风控监测",
    text: "订单取消、迟到、缺席等行为都会生成惩罚点，保障服务质量。"
  }
];

const AboutVision = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Guidew Vision
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">
              用可信赖的本地专家网络重构线下体验
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Guidew 关注旅客与城市居民在真实场景中遇到的“临时性技能缺口”——向导、翻译、舞蹈、医疗陪同、户外教练……
              我们打造一个既有即时响应速度，又能保证专业度与安全感的平台。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {revenueModel.map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <p className="text-sm uppercase text-brand-teal mb-2">{item.title}</p>
                <p className="text-gray-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-brand-darkBlue mb-10">信任与安全三大支柱</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {trustPillars.map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-6 rounded-2xl border border-brand-lightGray bg-brand-lightGray/40">
                  <Icon className="h-8 w-8 text-brand-teal mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">阶段性里程碑</h2>
            <ul className="space-y-4 text-white/90">
              <li>• 0-6 个月：交付 MVP，覆盖奥克兰/惠灵顿，验证 1,000 名真实用户。</li>
              <li>• 6-12 个月：上线 VIP 订阅、AI 行程规划与自动接单，目标 10,000 用户。</li>
              <li>• 13-24 个月：扩展至新西兰全国，形成 100,000 用户级别的供需网络。</li>
              <li>• 25 个月起：进入澳大利亚，同时准备多语言国际化与更多支付方式。</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutVision;
