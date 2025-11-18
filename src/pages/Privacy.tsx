import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const privacySections = [
  {
    title: "1. 收集什么信息",
    bullets: [
      "账号资料：姓名、邮箱、语言偏好；服务者需补充简介、证书、照片与可用时间。",
      "位置与行程：用于展示附近服务者、估算交通时间与提醒下一单。",
      "交易与沟通：订单记录、聊天内容、评价与支付凭证，用于风控和客服。"
    ]
  },
  {
    title: "2. 如何使用这些信息",
    bullets: [
      "撮合与推荐：根据技能标签、距离、可用时间和 VIP 权益匹配最合适的服务者。",
      "安全合规：进行身份验证、风险监测、争议处理、支付结算与税务申报。",
      "产品优化：分析匿名化数据，改进 AI 推荐、自动接单、地图体验与 UI 设计。"
    ]
  },
  {
    title: "3. 信息共享",
    bullets: [
      "服务者或用户的必要信息将在下单过程中互相可见，以便沟通与履约。",
      "与支付、云服务、身份验证、客服系统的第三方共享数据时，会严格遵循最小化原则。",
      "依据法律要求或监管机关指令，Guidew 可能披露特定账号信息。"
    ]
  },
  {
    title: "4. 控制与选择",
    bullets: [
      "您可在账户设置中更新资料、设置隐私偏好，或请求导出/删除数据（受法定保存要求限制）。",
      "可选择开启/关闭定位授权，但停用定位可能影响附近服务与交通时间计算。",
      "营销邮件或推送通知可随时退订；重要的安全或交易通知仍会发送。"
    ]
  },
  {
    title: "5. 数据保留与保护",
    bullets: [
      "我们使用加密、访问控制与审计日志保护个人信息，敏感数据仅限最少人员访问。",
      "按照当地法规保存交易与税务信息，通常为 7 年；其他数据会在目的达成后删除或匿名化。",
      "若发生数据安全事件，将在合理期限内通知受影响用户与主管机构。"
    ]
  }
];

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">Privacy Policy</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">隐私政策</h1>
            <p className="text-lg text-gray-600">
              Guidew 致力于保护您的个人信息。本政策说明我们如何收集、使用、共享并保护您的数据。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
            {privacySections.map(section => (
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

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg font-medium mb-3">如何联系我们？</p>
            <p className="text-white/90 mb-4">
              若您对隐私政策有疑问，可发送邮件至 privacy@guidew.app，我们将在 30 天内回复。
            </p>
            <p className="text-sm text-white/80">最近更新：2024 年 12 月</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
