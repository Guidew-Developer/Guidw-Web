
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Phone, MessageCircle, Clock, Shield } from 'lucide-react';

const DownloadApp: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-teal via-brand-gold/70 to-brand-orange text-white py-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('download.title')}
            </h2>
            <p className="text-xl mb-6 text-white/80">
              {t('download.subtitle')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 mt-1 text-white" />
                <div>
                  <h3 className="font-semibold">{t('download.features.instant')}</h3>
                  <p className="text-white/70 text-sm">
                    {t('useCase.localGuide.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-6 w-6 mt-1 text-white" />
                <div>
                  <h3 className="font-semibold">{t('download.features.chat')}</h3>
                  <p className="text-white/70 text-sm">
                    {t('useCase.translation.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 mt-1 text-white" />
                <div>
                  <h3 className="font-semibold">{t('download.features.secure')}</h3>
                  <p className="text-white/70 text-sm">
                    {t('useCase.emergency.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 mt-1 text-white" />
                <div>
                  <h3 className="font-semibold">{t('download.features.personalized')}</h3>
                  <p className="text-white/70 text-sm">
                    {t('useCase.travel.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-brand-teal hover:bg-white/90 flex items-center justify-center"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.7077 12.665C17.7065 10.67 19.1619 9.40944 19.231 9.34598C17.9044 7.58897 15.912 7.38729 15.1966 7.3701C13.4919 7.19615 11.8455 8.4076 10.9834 8.4076C10.1004 8.4076 8.75849 7.38729 7.32147 7.4129C5.46736 7.43851 3.7453 8.50382 2.80024 10.1649C0.84202 13.5435 2.29623 18.5715 4.16753 21.3389C5.10538 22.6947 6.18791 24.2254 7.60775 24.1743C8.98967 24.1176 9.51947 23.3022 11.1802 23.3022C12.8154 23.3022 13.3196 24.1743 14.7651 24.1431C16.2617 24.1176 17.1996 22.7618 18.1119 21.396C19.1875 19.8143 19.6406 18.2581 19.6661 18.1815C19.6406 18.1559 17.7142 17.4171 17.7077 15.4483C17.7013 13.7876 19.2234 12.8936 19.3001 12.8425C18.0114 10.9248 16.0043 10.7152 15.3933 10.6641C13.7326 10.5107 12.2104 11.5504 11.4972 11.5504C10.7583 11.5504 9.45944 10.7152 8.06313 10.7152C5.38671 10.7408 2.70904 12.8936 2.70904 17.0694C2.70904 21.2452 5.98011 25.5486 9.12851 25.5486C10.5483 25.5486 11.7347 24.6546 12.6287 24.6546C13.4919 24.6546 14.5699 25.5997 16.1417 25.5997C17.7134 25.5997 20.5574 24.1431 20.5574 24.1431L20.5702 24.1236C20.5574 24.1176 17.7134 22.8484 17.7077 12.665Z"/>
                </svg>
                {t('download.appStore')}
              </Button>
              
              <Button 
                variant="ghost"
                className="bg-white/10 text-white border border-white/70 hover:bg-white hover:text-brand-teal flex items-center justify-center"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.2751 0.395508C1.12995 0.549136 1.01416 0.736365 0.933906 0.942452C0.853651 1.14854 0.810579 1.36903 0.807617 1.59236V22.3938C0.810579 22.6172 0.853651 22.8376 0.933906 23.0437C1.01416 23.2498 1.12995 23.437 1.2751 23.5907L1.36272 23.6783L12.7651 12.2759L1.36272 0.87355L1.2751 0.395508Z"/>
                  <path d="M16.7864 8.33301L4.25879 1.06177L4.17117 1.14939L15.5735 12.5518L16.7864 8.33301Z"/>
                  <path d="M16.7864 16.7695L15.5735 12.5508L4.17117 23.9531L4.25879 24.0408L16.7864 16.7695Z"/>
                  <path d="M22.1082 10.9751L18.877 9.10962L17.4004 12.5517L18.877 15.9937L22.1082 14.1282C22.6322 13.8406 22.9199 13.2876 22.9199 12.5517C22.9199 11.8157 22.6322 11.2627 22.1082 10.9751Z"/>
                </svg>
                {t('download.googlePlay')}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-brand-orange/20 h-64 w-64 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1556741533-974f8e62a92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Guidew App" 
              className="mx-auto max-w-xs md:max-w-sm rounded-2xl shadow-xl border-8 border-white rotate-3"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/70 via-brand-gold/60 to-brand-orange/70 mix-blend-multiply"></div>
      <div className="absolute top-0 left-0 h-64 w-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default DownloadApp;
