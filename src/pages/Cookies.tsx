import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cookieSections = [
  {
    title: "1. 什么是 Cookie？",
    bullets: [
      "Cookie 是存储在您设备上的小型文本文件，用于记住偏好、会话与使用习惯。",
      "Guidew 还会使用本地存储和类似技术来保存登录状态、语言选择与筛选器。"
    ]
  },
  {
    title: "2. 我们使用的类型",
    bullets: [
      "必要型：保持登录、处理支付、检测欺诈。这些 Cookie 无法被关闭。",
      "性能分析：统计访问量、订单转化、地图加载情况，用于优化体验。",
      "功能型：记住语言、城市或最近浏览的服务类别。",
      "营销与第三方：仅在获得同意后启用，用于推送 Guidew 最新活动或合作推荐。"
    ]
  },
  {
    title: "3. 管理方式",
    bullets: [
      "浏览器设置：可删除或阻止 Cookie，但可能影响登录和个性化体验。",
      "偏好中心：我们会在支持地区提供 Cookie 偏好管理模块，可随时调整。",
      "退订营销：邮件或通知中的退订入口不会影响必要 Cookie。"
    ]
  },
  {
    title: "4. 数据共享",
    bullets: [
      "与分析、广告或支付服务商共享 Cookie 数据时，会遵循严格的合规要求。",
      "我们不会在未经同意的情况下出售或出租个人可识别信息。"
    ]
  }
];

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">Cookie Policy</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">Cookie 政策</h1>
            <p className="text-lg text-gray-600">
              本政策解释 Guidew 如何使用 Cookie 及类似技术，以确保产品安全、便捷且具备个性化体验。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {cookieSections.map(section => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{section.title}</h2>
                <ul className="space-y-3 text-gray-600">
                  {section.bullets.map(text => (
                    <li key={text}>• {text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg font-semibold mb-3">Cookie 偏好</p>
            <p className="text-white/90 mb-6">
              我们将在后续版本中提供可视化的 Cookie 偏好中心。若需手动请求，请发送邮件至 privacy@guidew.app。
            </p>
            <p className="text-sm text-white/80">最近更新：2024 年 12 月</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
