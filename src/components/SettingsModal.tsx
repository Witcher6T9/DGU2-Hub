/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Layout,
  Palette,
  Check,
  Volume2,
  VolumeX,
  BellRing,
  Play,
  Shield,
  Factory,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ThemeType, DashboardLayout, FactoryIndustryProfile } from '../types';
import { playWipAlertSound, playBottleneckAlertSound } from '../utils/audioAlert';

export type SettingsTab = 'themes' | 'alerts' | 'layout';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeType;
  onSelectTheme: (theme: ThemeType) => void;
  layout: DashboardLayout;
  onUpdateLayout: (layout: DashboardLayout) => void;
  auditoryAlertsEnabled?: boolean;
  onToggleAuditoryAlerts?: (enabled: boolean) => void;
  onOpenPrivacySecurity?: () => void;
  initialTab?: SettingsTab;
  onNavigate?: (tab: string, lineNo?: string) => void;
  factoryProfile?: FactoryIndustryProfile;
  onUpdateFactoryProfile?: (updated: FactoryIndustryProfile) => void;
  savedFactories?: FactoryIndustryProfile[];
  onSaveFactoryList?: (list: FactoryIndustryProfile[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  layout,
  onUpdateLayout,
  auditoryAlertsEnabled = false,
  onToggleAuditoryAlerts,
  onOpenPrivacySecurity,
  initialTab = 'themes',
  onNavigate,
  factoryProfile
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [playingTestSound, setPlayingTestSound] = useState<'wip' | 'bottleneck' | null>(null);

  // Sync initial tab when opened
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleTestSound = (type: 'wip' | 'bottleneck') => {
    setPlayingTestSound(type);
    if (type === 'wip') {
      playWipAlertSound(true);
    } else {
      playBottleneckAlertSound(true);
    }
    setTimeout(() => {
      setPlayingTestSound(null);
    }, 700);
  };

  const handleToggleAudio = () => {
    if (onToggleAuditoryAlerts) {
      const nextState = !auditoryAlertsEnabled;
      onToggleAuditoryAlerts(nextState);
      if (nextState) {
        playWipAlertSound(true);
      }
    }
  };

  const themes: { id: ThemeType; label: string; desc: string; previewClass: string }[] = [
    {
      id: 'light',
      label: 'Standard Warm Cream (Default)',
      desc: 'Eye-comfortable warm neutral canvas optimized for long shift operations',
      previewClass: 'bg-[#f5f3ec] border-[#176f78] text-[#17343a]'
    },
    {
      id: 'dark',
      label: 'Night Shift Darkroom',
      desc: 'Low-glare high contrast slate theme for evening shifts and dimmer monitoring rooms',
      previewClass: 'bg-[#182026] border-teal-500 text-slate-100'
    },
    {
      id: 'forest',
      label: 'Lean Emerald Kaizen',
      desc: 'Crisp green hues highlighting continuous improvement and zero-defect focus',
      previewClass: 'bg-[#f0f7f3] border-emerald-700 text-emerald-950'
    },
    {
      id: 'sunset',
      label: 'Amber Production Floor',
      desc: 'Warm amber tones designed for high-density line management and urgent alerting',
      previewClass: 'bg-[#fffaf2] border-amber-600 text-amber-950'
    },
    {
      id: 'industrial',
      label: 'Industrial Monolith',
      desc: 'Technical steel and graphite theme inspired by modern Japanese sewing equipment',
      previewClass: 'bg-[#eef2f5] border-slate-700 text-slate-900'
    }
  ];

  const layoutToggles: { key: keyof DashboardLayout; label: string; desc: string }[] = [
    {
      key: 'showHero',
      label: 'Executive Overview Header Card',
      desc: 'Top summary banner with live date and real-time operational status badge'
    },
    {
      key: 'showStats',
      label: 'KPI Metrics & Attainment Strip',
      desc: '6 core factory indicators: Factory Eff %, Target vs Achieved, WIP buffer, Attendance'
    },
    {
      key: 'showQuickActions',
      label: 'Frontline Quick Actions Bar',
      desc: 'Fast shortcuts for checklist logging, daily report downloads, and team setup'
    },
    {
      key: 'showAbsents',
      label: 'Operator & Helper Absenteeism Breakdown',
      desc: 'Floor-by-floor manpower attendance rates with shortage impact analysis'
    },
    {
      key: 'showBalancingGraph',
      label: 'Line Balancing Loss & Bottleneck Alerts',
      desc: 'Real-time bottleneck warnings, cycle time deviations, and balancing status'
    },
    {
      key: 'showIO',
      label: 'Input / Output (I/O) Production Flow',
      desc: 'Hourly pacing tracking input vs output pieces with WIP threshold monitoring'
    },
    {
      key: 'showUpcoming',
      label: 'Upcoming Style Transitions & Changeover',
      desc: 'Notice board for next scheduled style inputs and pre-production sample readiness'
    },
    {
      key: 'showQuickReports',
      label: 'Quick Reports & Executive Rollup Widget',
      desc: 'Instant 3-pillar summary of plant efficiency, WIP count, and manpower across all active lines with export'
    }
  ];

  const handleToggleLayout = (key: keyof DashboardLayout) => {
    onUpdateLayout({
      ...layout,
      [key]: !layout[key]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#fbfaf6] border border-[#d9d2c2] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#e7e1d5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#176f78] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base sm:text-lg font-bold uppercase text-[#17343a]">
                  System Settings &amp; Configuration
                </h2>
                {factoryProfile?.unitName && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#176f78]/10 text-[#176f78] border border-[#176f78]/20 font-mono">
                    {factoryProfile.unitName}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#527078]">
                Configure operational themes, auditory floor alerts, and dashboard layout widgets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#527078] hover:text-[#17343a] hover:bg-[#f1eee6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar (Factory & Industry Name completely relocated to Floor & Setup) */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 border-b border-[#e7e1d5] bg-[#f5f3ec] overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('themes')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'themes'
                ? 'bg-[#176f78] text-white shadow-xs'
                : 'text-[#17343a] hover:bg-white/80'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Themes &amp; Styling</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'alerts'
                ? 'bg-[#176f78] text-white shadow-xs'
                : 'text-[#17343a] hover:bg-white/80'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Auditory Alerts</span>
            {auditoryAlertsEnabled && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('layout')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'layout'
                ? 'bg-[#176f78] text-white shadow-xs'
                : 'text-[#17343a] hover:bg-white/80'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Dashboard Layout</span>
          </button>
        </div>

        {/* Scrollable Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: THEMES & STYLING */}
          {activeTab === 'themes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#17343a]">
                <Palette className="w-4 h-4 text-[#176f78]" />
                <span>Color Atmosphere &amp; Visual Theme</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {themes.map(t => {
                  const isSelected = currentTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTheme(t.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#176f78] bg-[#dceceb]/30 ring-2 ring-[#176f78]/30 shadow-xs'
                          : 'border-[#d9d2c2] bg-white hover:border-[#176f78]/40 hover:bg-[#fbfaf6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border shadow-2xs ${t.previewClass}`} />
                          <span className="font-bold text-xs text-[#17343a]">{t.label}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#176f78] text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#527078] leading-relaxed">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: AUDITORY PRODUCTION ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <BellRing className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Acoustic warnings alert frontline Industrial Engineers when floor limits are exceeded (e.g. line WIP &gt; 3,500 pcs or major bottleneck severity).
                </p>
              </div>

              {/* Master Audio Toggle */}
              <div className="p-4 rounded-2xl bg-white border border-[#d9d2c2] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      auditoryAlertsEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {auditoryAlertsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17343a]">Master Auditory Sound Alerts</h4>
                    <p className="text-[11px] text-[#527078]">
                      {auditoryAlertsEnabled ? 'Floor alerts are active and audible' : 'Acoustic alerts are muted'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    auditoryAlertsEnabled
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {auditoryAlertsEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Sound Test Samples */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#527078]">
                  Auditory Signal Preview
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#d9d2c2] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#17343a]">High WIP Buffer Chime</div>
                      <div className="text-[10px] text-[#527078]">Triggered when WIP exceeds target limit</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTestSound('wip')}
                      disabled={playingTestSound === 'wip'}
                      className="px-3 py-1.5 rounded-xl border border-[#176f78] text-[#176f78] hover:bg-[#176f78] hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{playingTestSound === 'wip' ? 'Playing...' : 'Test'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#d9d2c2] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#17343a]">Bottleneck Alert Tone</div>
                      <div className="text-[10px] text-[#527078]">Urgent dual-tone for critical flow stoppages</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTestSound('bottleneck')}
                      disabled={playingTestSound === 'bottleneck'}
                      className="px-3 py-1.5 rounded-xl border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{playingTestSound === 'bottleneck' ? 'Playing...' : 'Test'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DASHBOARD LAYOUT TOGGLES */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#17343a] flex items-center gap-2">
                    <Layout className="w-4 h-4 text-[#176f78]" />
                    <span>Widget Visibility Controls</span>
                  </h4>
                  <p className="text-[11px] text-[#527078]">
                    Show or hide dashboard modules to suit your tablet screen size or production role
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {layoutToggles.map(item => {
                  const isChecked = !!layout[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleLayout(item.key)}
                      className="p-3 rounded-2xl bg-white border border-[#d9d2c2] flex items-center justify-between cursor-pointer hover:border-[#176f78]/40 transition-colors select-none"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#17343a]">{item.label}</div>
                        <div className="text-[10px] text-[#527078]">{item.desc}</div>
                      </div>

                      <div
                        className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center ${
                          isChecked ? 'bg-[#176f78]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            isChecked ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Security Banner */}
          {onOpenPrivacySecurity && (
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl border border-teal-200 bg-teal-50/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#176f78] text-white flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17343a]">Data Privacy &amp; Terminal Security</div>
                    <p className="text-[10px] text-[#527078]">
                      Configure privacy blur shields, PIN protection, and terminal timeout
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPrivacySecurity();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#176f78] text-white text-xs font-bold hover:bg-[#12555c] transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  Configure
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Floor & Setup link */}
        <div className="px-6 py-3.5 border-t border-[#e7e1d5] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#527078] flex items-center gap-1.5 flex-wrap">
            <span>Plant Identity:</span>
            <strong className="text-[#17343a]">
              {factoryProfile?.name || 'Debonair LTD'} ({factoryProfile?.unitName || 'Unit-02'})
            </strong>
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('floor-plan', 'factory');
                }}
                className="text-xs font-bold text-[#176f78] hover:underline flex items-center gap-1 cursor-pointer ml-1"
              >
                <span>• Managed in Floor &amp; Setup 🏭</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#176f78] text-white text-xs font-bold hover:bg-[#12555c] transition-colors cursor-pointer shadow-xs"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
