import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const termSections = [
  {
    title: "1. 资格与注册",
    bullets: [
      "注册 Guidew 即代表您已年满 18 岁并具备签约能力。",
      "所有人需先成为普通用户，完成邮箱或第三方登录验证后才能申请成为服务提供者。",
      "服务提供者必须保证资料真实、可验证，并根据服务类型上传必要的证书或证明。"
    ]
  },
  {
    title: "2. 平台使用",
    bullets: [
      "Guidew 连接需要线下技能/体验的用户与服务提供者，但并不是服务的雇主或承包方。",
      "任何订单需由服务提供者点击接受后才算生效，VIP 服务者可选择自动接单功能。",
      "用户应在服务开始前支付全额费用，并在 7 天内完成反馈；服务者可在 7 天后提现。"
    ]
  },
  {
    title: "3. 费用与订阅",
    bullets: [
      "平台对每笔成交额收取 15% 佣金，用于支付支付通道、风控与客服等成本。",
      "VIP 用户每月 9.9 美元，可享免佣订单、AI 对话下单、优先匹配等权益。",
      "VIP 服务者可启用自动接单、AI 行程规划等进阶工具。"
    ]
  },
  {
    title: "4. 取消与争议",
    bullets: [
      "服务开始前 3 小时双方取消不收取费用；1-3 小时内取消用户退 50%、服务者得 25%。",
      "服务开始后取消或缺席将按照规则扣除费用并记录惩罚点，用于限制违规行为。",
      "双方可在服务结束 7 天内提出争议或互评，3 天后评价自动公开。"
    ]
  },
  {
    title: "5. 安全与合规",
    bullets: [
      "涉及入户、儿童照护等敏感服务必须完成高级身份验证（如无犯罪记录证明）。",
      "Guidew 可能要求服务者上传视频/照片/证书以证明技能，并有权复核或下架内容。",
      "任何违反当地法律的行为将导致账号终止，必要时会向监管机构配合调查。"
    ]
  }
];

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">Terms of Service</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">Guidew 服务条款</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              本条款适用于使用 Guidew 产品的所有用户与服务提供者。继续使用即表示您同意遵守以下约束。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
            {termSections.map(section => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{section.title}</h2>
                <ul className="space-y-3 text-gray-600">
                  {section.bullets.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-medium mb-3">更新日期：2024 年 12 月</p>
            <p className="text-white/90">
              Guidew 有权随时更新这些条款，并通过站内通知或电子邮件提醒用户。持续使用即默认接受最新条款。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
