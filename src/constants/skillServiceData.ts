
export const skillServiceData: Record<string, any> = {
  "39": {
    title: "瑜伽与冥想工作坊",
    description: "专业瑜伽导师带领的个性化瑜伽和冥想体验。提供一对一指导、团体课程和定制化的身心健康计划。",
    mode: "线下/线上可选",
    location: "上海、北京",
    price: 200,
    priceUnit: "每小时",
    timeRange: "周一至周日 8:00-20:00",
    highlights: ["专业瑜伽认证教练", "个性化课程定制", "放松减压", "身心健康提升"],
    images: [
      "https://images.unsplash.com/photo-1545389336-cf090694435e",
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
      "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
    ],
    provider: {
      name: "王教练",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      certifications: ["国际瑜伽联盟认证", "正念冥想导师认证"],
      verified: true
    },
    reviews: [
      {
        user: "张小姐",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 5,
        date: "2024-03-21",
        content: "非常专业的瑜伽指导，对改善我的睡眠质量帮助很大。"
      },
      {
        user: "李先生",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4,
        date: "2024-04-11",
        content: "教练很耐心，课程安排合理，身体状态有明显改善。"
      }
    ],
    faq: [
      { q: "需要准备什么装备？", a: "瑜伽垫和舒适的运动服装，其他装备现场提供。" },
      { q: "适合初学者吗？", a: "完全适合，课程会根据学员基础定制内容。"}
    ]
  },
  "40": {
    title: "陶艺创作工作室",
    description: "专业陶艺师指导的个性化陶艺课程。从基础技法到创意设计，体验手工创作的乐趣。",
    mode: "线下体验",
    location: "上海",
    price: 280,
    priceUnit: "每小时",
    timeRange: "周二至周日 10:00-18:00",
    highlights: ["专业陶艺设备", "作品烧制服务", "个性化指导", "材料提供"],
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
      "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
    ],
    provider: {
      name: "陈老师",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      rating: 4.8,
      certifications: ["国家级工艺美术师", "陶艺教育资格证"],
      verified: true
    },
    reviews: [
      {
        user: "王女士",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 5,
        date: "2024-03-25",
        content: "很棒的体验，老师教得很细致，做出了自己的第一个陶艺作品。"
      }
    ],
    faq: [
      { q: "可以带作品回家吗？", a: "可以，作品烧制后可以带回家。" },
      { q: "需要预约吗？", a: "建议提前预约，保证器材和材料准备充足。"}
    ]
  },
  // ... Continue with more services (41-50)
};
