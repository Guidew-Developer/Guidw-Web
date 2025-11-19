import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Calendar, Coffee, Search, MessageSquare, ShieldCheck, Wallet, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useDownloadDialog } from '@/components/DownloadDialogProvider';

const stepsIcons = [Search, MapPin, MessageSquare, Calendar, Coffee] as const;
const safetyIcons = [ShieldCheck, Wallet, Users] as const;

const ensureArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return (value as unknown[]).map(item => String(item));
  }
  return value ? [String(value)] : [];
};

const InfoCard = ({
  icon: Icon,
  title,
  description,
  highlighted
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  highlighted?: boolean;
}) => (
  <div
    className={`rounded-2xl border p-6 transition ${
      highlighted ? 'bg-brand-teal text-white border-brand-teal shadow-lg' : 'bg-white border-gray-100 shadow-sm'
    }`}
  >
    <div
      className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
        highlighted ? 'bg-white/15' : 'bg-brand-teal/10'
      }`}
    >
      <Icon className={`h-6 w-6 ${highlighted ? 'text-white' : 'text-brand-teal'}`} />
    </div>
    <h3 className={`text-lg font-semibold mb-2 ${highlighted ? 'text-white' : 'text-brand-darkBlue'}`}>{title}</h3>
    <p className={`text-sm leading-relaxed ${highlighted ? 'text-white/80' : 'text-gray-600'}`}>{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeSafetyIdx, setActiveSafetyIdx] = useState(0);

  const journey = stepsIcons.map((Icon, index) => ({
    Icon,
    title: t(`how.steps.${index}.title`),
    description: t(`how.steps.${index}.description`),
    detailTitle: t(`how.steps.${index}.detailTitle`),
    detailBody: t(`how.steps.${index}.detailBody`),
    bullets: ensureArray(t(`how.steps.${index}.bullets`, { returnObjects: true }))
  }));

  const safety = safetyIcons.map((Icon, index) => ({
    Icon,
    title: t(`how.safety.${index}.title`),
    description: t(`how.safety.${index}.description`),
    detailTitle: t(`how.safety.${index}.detailTitle`),
    detailBody: t(`how.safety.${index}.detailBody`),
    bullets: ensureArray(t(`how.safety.${index}.bullets`, { returnObjects: true }))
  }));

  const activeStep = journey[activeStepIdx];
  const activeSafety = safety[activeSafetyIdx];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-brand-lightGray/40">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="uppercase tracking-[0.4em] text-sm text-brand-teal mb-4">{t('how.title')}</p>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-4">{t('how.heading')}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('how.subtitle')}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div className="grid md:grid-cols-5 gap-6">
              {journey.map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => setActiveStepIdx(index)}
                  className={`rounded-3xl p-6 border flex flex-col text-left transition ${
                    activeStepIdx === index
                      ? 'bg-brand-teal text-white border-brand-teal shadow-lg'
                      : 'bg-white border-gray-100 shadow-sm hover:border-brand-teal/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm mb-3 opacity-70">
                    <span>{t('how.stepLabel', { step: index + 1 })}</span>
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <div
                    className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                      activeStepIdx === index ? 'bg-white/15' : 'bg-brand-teal/10'
                    }`}
                  >
                    <step.Icon className={`h-6 w-6 ${activeStepIdx === index ? 'text-white' : 'text-brand-teal'}`} />
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      activeStepIdx === index ? 'text-white' : 'text-brand-darkBlue'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      activeStepIdx === index ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="uppercase text-xs tracking-[0.5em] text-brand-teal mb-2">{t('how.detailLabel')}</p>
                  <h3 className="text-2xl font-bold text-brand-darkBlue">{activeStep.detailTitle}</h3>
                </div>
                <span className="text-sm text-gray-400">
                  {t('how.stepCounter', { current: activeStepIdx + 1, total: journey.length })}
                </span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{activeStep.detailBody}</p>
              <ul className="grid md:grid-cols-3 gap-4">
                {activeStep.bullets.map(point => (
                  <li key={point} className="flex items-start gap-2 text-sm text-brand-darkBlue">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {safety.map((item, idx) => (
                <button key={item.title} onClick={() => setActiveSafetyIdx(idx)}>
                  <InfoCard icon={item.Icon} title={item.title} description={item.description} highlighted={activeSafetyIdx === idx} />
                </button>
              ))}
            </div>
            <div className="bg-brand-lightGray/70 border border-brand-lightGray rounded-3xl p-8 shadow-inner">
              <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">{activeSafety.detailTitle}</h3>
              <p className="text-gray-600 mb-4">{activeSafety.detailBody}</p>
              <ul className="grid md:grid-cols-3 gap-4 text-sm text-brand-darkBlue">
                {activeSafety.bullets.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4">{t('how.ctaTitle')}</h3>
            <p className="text-white/90 mb-8">{t('how.ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-brand-teal hover:bg-white/90" onClick={() => openDownloadDialog()}>
                {t('how.downloadBtn')}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/20 hover:text-white"
                onClick={() => openDownloadDialog()}
              >
                {t('how.learnBtn')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
