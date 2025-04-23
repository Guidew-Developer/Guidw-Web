
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, User, Calendar, Shield, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DownloadApp from "@/components/DownloadApp";

const skillServiceData: Record<string, any> = {
  "1": {
    title: "全栈开发技能提升",
    description: "涵盖前端、后端、DevOps。1对1实战带教，项目实例演练，辅导职业生涯规划。",
    mode: "线下/线上可选",
    location: "上海、北京、深圳",
    price: 300,
    priceUnit: "每小时",
    timeRange: "周一至周五 18:00-22:00，周末 10:00-18:00",
    highlights: ["实战项目带教", "名企工程师辅导", "可定制学习内容", "技术路线规划"],
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    ],
    provider: {
      name: "张老师",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      certifications: ["阿里云专家认证", "微软MVP"],
      verified: true
    },
    rating: 4.9,
    reviews: [
      {
        user: "小李",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 5,
        date: "2024-03-21",
        content: "非常用心的讲解，全流程项目实操，对我找工作帮助很大。"
      },
      {
        user: "王同学",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4,
        date: "2024-04-11",
        content: "针对需求定制，让我零基础也能快速上手。"
      }
    ],
    faq: [
      { q: "可远程服务吗？", a: "支持上海、北京、深圳线下，其他城市远程视频。" },
      { q: "每节课是多长时间？", a: "每节60分钟，可根据学员需求灵活调整。"}
    ]
  },
  // 以相同结构继续为其他服务添加如"2": { ... }, "3": { ... }
};

const SkillServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = skillServiceData[id || "1"];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="text-2xl font-bold mb-4 text-red-500">未找到该服务详情</div>
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
              <span className="flex items-center"><User className="w-4 h-4 mr-1" />服务方式：{service.mode}</span>
              <span className="flex items-center text-amber-500"><Star className="h-4 w-4 mr-1" fill="currentColor" />{service.rating}</span>
            </div>
          </div>

          {/* 特色亮点 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">服务特色</h2>
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
                alt={service.title + "-图片" + (i + 1)}
                className="w-full h-32 object-cover rounded-lg shadow"
                key={i}
              />
            ))}
          </div>

          {/* 详细介绍 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-brand-teal">服务详情介绍</h3>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>

          {/* 认证与FAQ */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">服务认证</h3>
              <div className="flex flex-col gap-2">
                {service.provider.certifications?.map((c: string, i: number) => (
                  <Badge key={i} className="bg-blue-100 text-blue-700">{c}</Badge>
                ))}
                {service.provider.verified && (
                  <Badge className="bg-blue-500 text-white mt-2">
                    <Shield className="w-4 h-4 mr-1" />已实名认证
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">常见问题</h3>
              <ul>
                {service.faq?.map((item: any, i: number) => (
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
            <h3 className="text-lg font-semibold mb-3 text-brand-teal">用户评价</h3>
            <div className="flex flex-col gap-6">
              {service.reviews.map((review: any, idx: number) => (
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
                ¥{service.price}
              </span>
              <span className="ml-1 text-gray-700">{service.priceUnit}</span>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-600 mb-1">可约时间：</div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-1 text-brand-teal" />
                <span>{service.timeRange}</span>
              </div>
            </div>
            <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white mb-3">
              立即预约
            </Button>
            <Button variant="outline" className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white flex items-center justify-center mb-2">
              <MessageCircle className="h-4 w-4 mr-2" />
              联系服务方
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

