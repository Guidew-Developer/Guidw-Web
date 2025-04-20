
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Discover: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">发现服务</h1>
        <p className="text-center text-gray-600 mb-12">
          浏览并预订来自世界各地的本地专家服务
        </p>
        {/* TODO: Add search and filter components */}
        <div className="text-center">
          <Button>开始搜索</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
