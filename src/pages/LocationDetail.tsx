import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cityProfiles } from "@/constants/siteContent";
import { ArrowLeft, MapPinned, Route } from "lucide-react";

const LocationDetail = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city = useMemo(() => cityProfiles.find(item => item.id === cityId), [cityId]);

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-lightGray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-3">Guidew Locations</p>
            <h1 className="text-3xl font-bold text-brand-darkBlue mb-3">尚未上线的城市</h1>
            <p className="text-gray-600 mb-6">我们正在扩展更多目的地，敬请期待。</p>
            <Link to="/locations" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-teal text-white">
              <ArrowLeft className="h-4 w-4" />
              返回 Locations
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/locations" className="inline-flex items-center text-sm text-brand-teal mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              所有城市
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <MapPinned className="text-brand-teal" />
              <p className="text-xs uppercase tracking-[0.4em] text-brand-teal">{city.focus}</p>
            </div>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-4">{city.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{city.hero.headline}</p>
            <p className="text-gray-500">{city.hero.subtext}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-2xl p-6 border border-brand-lightGray">
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">为什么用户选择这里</h2>
              <ul className="space-y-4 text-gray-600">
                {city.experiences.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Route className="h-5 w-5 text-brand-teal mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-brand-lightGray">
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">运营要点</h2>
              <ul className="space-y-4 text-gray-600">
                {city.logistics.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好体验 {city.name} 吗？</h2>
            <p className="text-white/90 mb-6">立即在 Guidew App 中发出需求，或者加入成为服务提供者，共同打造可信赖的城市网络。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
                浏览服务
              </Link>
              <Link to="/become-expert" className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold">
                加入服务者网络
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationDetail;
