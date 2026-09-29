import React, { useState } from 'react';
import { HardHat, Search, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export const LeadGenCard: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState('full-landscaping');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 my-10 border border-stone-800 shadow-md">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
          <HardHat className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Licensed Contractor Network
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-2">
          Need a Professional Landscaping Quote?
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm mb-6 leading-relaxed">
          Compare free estimates from pre-screened, insured local landscaping contractors in your area. No obligation, free on-site design consultations.
        </p>

        {submitted ? (
          <div className="bg-emerald-950/70 border border-emerald-600/60 rounded-xl p-4 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-100">
                Landscaping pros inquiry registered for ZIP {zipCode}!
              </p>
              <p className="text-stone-300 mt-1">
                In a live production rollout, certified local contractors will reach out with verified license numbers and portfolio references.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="full-landscaping">Full Backyard & Patio</option>
              <option value="pavers">Paver Walkway / Driveway</option>
              <option value="retaining-wall">Retaining Wall</option>
              <option value="lawn-sod">Lawn Installation / Sod</option>
              <option value="mulch-beds">Flower Beds & Mulching</option>
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                maxLength={5}
                placeholder="Enter 5-digit US ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Find Landscaping Pros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-4 flex items-center gap-4 text-[11px] text-stone-400">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            No spam guarantee
          </span>
          <span>&bull;</span>
          <span>100% Free estimates</span>
          <span>&bull;</span>
          <span>Verified insurance & licenses</span>
        </div>
      </div>
    </div>
  );
};
