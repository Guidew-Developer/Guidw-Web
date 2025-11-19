import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCareerOpenings } from "@/constants/siteContent";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CareerDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { i18n } = useTranslation();
  const openings = useMemo(() => getCareerOpenings(i18n.language), [i18n.language]);
  const role = useMemo(() => openings.find(item => item.id === roleId), [openings, roleId]);

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-lightGray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-4">Guidew Careers</p>
            <h1 className="text-3xl font-bold text-brand-darkBlue mb-3">职位已关闭</h1>
            <p className="text-gray-600 mb-6">请关注我们的招聘页面，第一时间获取新机会。</p>
            <Link to="/careers" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-teal text-white">
              <ArrowLeft className="h-4 w-4" />
              返回 Careers
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/careers" className="inline-flex items-center text-sm text-brand-teal mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              查看所有职位
            </Link>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-4">Open Role</p>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-3">{role.title}</h1>
            <p className="text-gray-500 mb-6">{role.location}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {role.tags.map(tag => (
                <span key={tag} className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-brand-lightGray text-brand-teal border border-brand-teal/30">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-600">{role.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">岗位职责</h2>
              <ul className="space-y-3 text-gray-600">
                {role.responsibilities.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">任职资格</h2>
              <ul className="space-y-3 text-gray-600">
                {role.requirements.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">你将获得</h2>
            <div className="flex flex-wrap gap-3">
              {role.perks.map(perk => (
                <span key={perk} className="px-4 py-2 rounded-full bg-brand-lightGray text-brand-darkBlue text-sm">
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">准备加入 Guidew？</h2>
            <p className="text-white/90 mb-6">发送作品集或简历至 careers@guidew.app，并说明你为什么适合这个角色。</p>
            <a href="mailto:careers@guidew.app" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
              careers@guidew.app
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDetail;
