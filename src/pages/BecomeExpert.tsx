import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useDownloadDialog } from '@/components/DownloadDialogProvider';
import {
  User,
  Globe,
  Star,
  ShieldCheck,
  Wallet,
  Sparkles,
  Clock,
  ClipboardCheck
} from 'lucide-react';

type Pillar = {
  title: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
  detailTitle: string;
  detailBody: string;
  bullets: string[];
};

type Benefit = {
  title: string;
  description: string;
};

const pillarIcons = [User, Globe, Star] as const;
const processIcons = [ShieldCheck, Sparkles, Clock, Wallet] as const;
const benefitIcons = [Wallet, Sparkles, Globe, ClipboardCheck] as const;

const BecomeExpert: React.FC = () => {
  const { t } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();
  const pillarsData = t('become.pillars', { returnObjects: true });
  const processData = t('become.processSteps', { returnObjects: true });
  const benefitsData = t('become.benefits', { returnObjects: true });
  const requirementsData = t('become.requirements', { returnObjects: true });

  const pillars = Array.isArray(pillarsData) ? (pillarsData as Pillar[]) : [];
  const processSteps = Array.isArray(processData) ? (processData as ProcessStep[]) : [];
  const benefits = Array.isArray(benefitsData) ? (benefitsData as Benefit[]) : [];
  const requirements = Array.isArray(requirementsData) ? (requirementsData as string[]) : [];
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const safeProcessIdx = processSteps.length > 0 ? Math.min(activeProcessIdx, processSteps.length - 1) : 0;
  const activeProcess = processSteps[safeProcessIdx];

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray/30">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="uppercase tracking-[0.4em] text-sm text-brand-teal mb-4">{t('become.title')}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">{t('become.heading')}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('become.subtitle')}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] ?? User;
              return (
                <div key={pillar.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">{pillar.title}</h3>
                  <p className="text-gray-600">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div className="text-center mb-4">
              <p className="uppercase tracking-[0.4em] text-sm text-brand-teal">{t('become.processTitle')}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue">{t('become.processSubtitle')}</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {processSteps.map((step, idx) => {
                const Icon = processIcons[idx] ?? ShieldCheck;
                const highlighted = idx === activeProcessIdx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveProcessIdx(idx)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      highlighted ? 'bg-brand-teal text-white border-brand-teal shadow-lg' : 'bg-white border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-3 opacity-70">
                      <span>{t('become.processStepLabel', { step: idx + 1 })}</span>
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div
                      className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                        highlighted ? 'bg-white/15' : 'bg-brand-teal/10'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${highlighted ? 'text-white' : 'text-brand-teal'}`} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${highlighted ? 'text-white' : 'text-brand-darkBlue'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${highlighted ? 'text-white/80' : 'text-gray-600'}`}>{step.description}</p>
                  </button>
                );
              })}
            </div>
            {activeProcess && (
              <div className="bg-brand-lightGray/60 border border-brand-lightGray rounded-3xl p-8 shadow-inner">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <p className="uppercase text-xs tracking-[0.4em] text-brand-teal mb-2">{t('become.processDetail')}</p>
                    <h3 className="text-2xl font-bold text-brand-darkBlue">{activeProcess.detailTitle}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {t('become.processCounter', { current: activeProcessIdx + 1, total: processSteps.length })}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{activeProcess.detailBody}</p>
                <ul className="grid md:grid-cols-3 gap-4 text-sm text-brand-darkBlue">
                  {activeProcess.bullets.map(point => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="uppercase tracking-[0.4em] text-sm text-brand-teal">{t('become.benefitsTitle')}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue">{t('become.benefitsSubtitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefitIcons[idx] ?? Sparkles;
                return (
                  <div key={benefit.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <p className="uppercase tracking-[0.4em] text-sm text-brand-teal">{t('become.requirementsTitle')}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue">{t('become.requirementsSubtitle')}</h2>
            </div>
            <div className="bg-brand-lightGray/70 rounded-3xl p-8 shadow-inner border border-brand-lightGray">
              <div className="grid md:grid-cols-2 gap-4">
                {requirements.map(item => (
                  <div key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <ShieldCheck className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4">{t('become.ctaTitle')}</h3>
            <p className="text-white/90 mb-8">{t('become.ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="inline-flex justify-center">
                <Button className="bg-white text-brand-teal hover:bg-white/90 px-8 py-3 text-lg">{t('become.cta')}</Button>
              </Link>
              <Button
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white px-8 py-3 text-lg"
                onClick={() => openDownloadDialog()}
              >
                {t('become.downloadCta')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeExpert;
