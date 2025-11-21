
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, User, Calendar, Shield, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DownloadApp from "@/components/DownloadApp";
import { getSkillService } from "@/constants/skillServiceData";
import { useTranslation } from "react-i18next";

const SkillServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const service = getSkillService(i18n.language, id || "39");

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="text-2xl font-bold mb-4 text-red-500">{t("skillDetail.notFound")}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row gap-8">
        {/* 左侧主体 */}
        <div className="lg:w-3/4 flex flex-col">
          {/* 顶部标题与评分 */}
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{service.title}</h1>
              <Badge variant="outline" className="text-blue-600 border-blue-500">{service.mode}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 mt-2">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{service.location}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{service.timeRange}</span>
              <span className="flex items-center"><User className="w-4 h-4 mr-1" />{t("skillDetail.modeLabel")}: {service.mode}</span>
              <span className="flex items-center text-amber-500"><Star className="h-4 w-4 mr-1" fill="currentColor" />{service.provider.rating}</span>
            </div>
          </div>

          {/* 特色亮点 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">{t("skillDetail.highlights")}</h2>
            <div className="flex flex-wrap gap-2">
              {service.highlights.map((hl: string, i: number) => (
                <Badge key={i} className="bg-green-100 text-green-800">{hl}</Badge>
              ))}
            </div>
          </div>

          {/* 图片展示 */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            {service.images.map((src: string, i: number) => (
              <img
                src={src}
                alt={`${service.title} ${t("skillDetail.galleryAlt", { index: i + 1 })}`}
                className="w-full h-32 object-cover rounded-lg shadow"
                key={i}
              />
            ))}
          </div>

          {/* 详细介绍 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-brand-teal">{t("skillDetail.detailsTitle")}</h3>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>

          {/* 认证与FAQ */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{t("skillDetail.certifications")}</h3>
              <div className="flex flex-col gap-2">
                {service.provider.certifications?.map((c: string, i: number) => (
                  <Badge key={i} className="bg-blue-100 text-blue-700">{c}</Badge>
                ))}
                {service.provider.verified && (
                  <Badge className="bg-blue-500 text-white mt-2">
                    <Shield className="w-4 h-4 mr-1" />
                    {t("skillDetail.verified")}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{t("skillDetail.faq")}</h3>
              <ul>
                {service.faq?.map((item, i) => (
                  <li key={i} className="mb-2">
                    <strong>Q: {item.q}</strong>
                    <div className="text-gray-600">A: {item.a}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 客户评价 */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3 text-brand-teal">{t("skillDetail.reviews")}</h3>
            <div className="flex flex-col gap-6">
              {service.reviews.map((review, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex items-center mb-2 gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">{review.user}</span>
                      <span className="ml-2 text-sm text-gray-400">{review.date}</span>
                    </div>
                    <div className="ml-auto flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < review.rating ? "currentColor" : "none"}
                          color="#f59e42"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-700 ml-12">{review.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧信息栏 */}
        <aside className="lg:w-1/4">
          <div className="border rounded-xl p-6 shadow sticky top-24 bg-white">
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={service.provider.avatar} />
                <AvatarFallback>{service.provider.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{service.provider.name}</div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 mr-1" fill="currentColor" />
                  <span>{service.provider.rating}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-brand-teal">
                {(service.currencySymbol ?? "NZ$")}{service.price}
              </span>
              <span className="ml-1 text-gray-700">{service.priceUnit}</span>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-600 mb-1">{t("skillDetail.timeLabel")}:</div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-1 text-brand-teal" />
                <span>{service.timeRange}</span>
              </div>
            </div>
            <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white mb-3">
              {t("serviceDetail.bookNow")}
            </Button>
            <Button variant="outline" className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white flex items-center justify-center mb-2">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t("serviceDetail.messageProvider")}
            </Button>
          </div>
        </aside>
      </main>
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default SkillServiceDetail;
