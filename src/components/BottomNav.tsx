/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Activity,
  CheckSquare,
  Clock,
  Layers,
  Wrench,
  Calendar,
  FileSpreadsheet,
  MoreHorizontal,
  X,
  Database,
  Settings,
  Bell,
  UserCheck,
  ShieldCheck,
  ChevronUp,
  Sliders,
  Building2,
  LayoutGrid,
  Upload,
  MessageSquare,
  Network,
  TrendingUp,
  Smartphone,
  Lock
} from 'lucide-react';
import { AndroidLogoIcon } from './AndroidLogoIcon';
import { UserProfile } from '../types';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  checklistProgress: number;
  pendingTodosCount: number;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenDatabase: (tab?: 'backup' | 'csv-import') => void;
  onOpenSettings: () => void;
  onOpenUserModal: (tab?: 'profile' | 'roles') => void;
  onOpenChat?: () => void;
  onOpenAndroidPackage?: () => void;
  onOpenAuth?: () => void;
  profile: UserProfile;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  checklistProgress,
  pendingTodosCount,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenDatabase,
  onOpenSettings,
  onOpenUserModal,
  onOpenChat,
  onOpenAndroidPackage,
  onOpenAuth,
  profile
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // All Core Tabs (Floor Plan & Line Setup merged)
  const allTabs = [
    {
      id: 'dashboard',
      label: 'Home',
      fullLabel: 'Production Dashboard',
      icon: Activity,
      badge: undefined
    },
    {
      id: 'linedata',
      label: 'Lines',
      fullLabel: 'Workstation & Line Balancing',
      icon: Layers,
      badge: undefined
    },
    {
      id: 'floor-plan',
      label: 'Floor & Setup',
      fullLabel: 'Visual Sewing Floor Plan & Line Setup',
      icon: LayoutGrid,
      badge: 'MAP'
    },
    {
      id: 'simulator',
      label: 'Simulator',
      fullLabel: 'IE Line Setup & Flow Simulator',
      icon: Sliders,
      badge: 'PRO'
    },
    {
      id: 'checklist',
      label: 'Activity Track',
      fullLabel: 'IE Daily Activity Tracking',
      icon: CheckSquare,
      badge: `${checklistProgress}%`
    },
    {
      id: 'todo-schedule',
      label: 'To-Do',
      fullLabel: 'Floor Tasks & Shift Timeline',
      icon: Clock,
      badge: pendingTodosCount > 0 ? String(pendingTodosCount) : undefined
    },
    {
      id: 'lean-toolkit',
      label: 'Lean WCM',
      fullLabel: 'Lean 13 Methods & Kaizens',
      icon: Wrench,
      badge: undefined
    },
    {
      id: 'monthly',
      label: 'Monthly',
      fullLabel: 'Monthly Efficiency Analytics',
      icon: Calendar,
      badge: undefined
    },
    {
      id: 'reports',
      label: 'Reports',
      fullLabel: 'Shift Audit Reports & CSV',
      icon: FileSpreadsheet,
      badge: undefined
    },
    {
      id: 'line-history',
      label: 'Line History',
      fullLabel: 'Line Production History & Efficiency Chart',
      icon: TrendingUp,
      badge: 'CHART'
    },
    {
      id: 'roles',
      label: 'IE Org',
      fullLabel: 'Debonair Unit-02 IE Org & Roles',
      icon: Network,
      badge: 'DEBONAIR'
    }
  ];

  const isTabActive = (tabId: string) =>
    currentTab === tabId ||
    (tabId === 'line-history' && (currentTab === 'history' || currentTab === 'production-history')) ||
    (tabId === 'floor-plan' && (currentTab === 'line-management' || currentTab === 'floorplan'));

  // Secondary items handled in the "More" drawer on smaller mobile viewports
  const secondaryTabIds = ['line-history', 'floor-plan', 'line-management', 'todo-schedule', 'lean-toolkit', 'monthly', 'reports', 'roles'];
  const isSecondaryActive = secondaryTabIds.includes(currentTab);
  const activeSecondaryTab = allTabs.find(t => isTabActive(t.id));

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Slide-Up Bottom Drawer for "More" Navigation & Utilities */}
      {isMoreOpen && (
        <div
          id="bottom-nav-backdrop"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fadeIn"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            id="bottom-nav-drawer"
            className="w-full max-w-lg bg-[#fbfaf6] border-t border-x border-[#d9d2c2] rounded-t-3xl p-4 sm:p-5 shadow-2xl space-y-4 mb-0 animate-slideUp cockpit-drawer max-h-[85vh] overflow-y-auto overscroll-contain pb-[calc(1.5rem+env(safe-area-inset-bottom,1rem))]"
            onClick={e => e.stopPropagation()}
          >
            {/* Native Mobile Sheet Drag Handle */}
            <div className="w-12 h-1.5 bg-[#d9d2c2] rounded-full mx-auto mb-1 opacity-70" />

            <div className="flex items-center justify-between border-b border-[#e7e1d5] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#176f78] text-white flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="bottom-nav-drawer-title"
                    className="font-display text-base font-bold uppercase text-[#17343a]"
                  >
                    All IE Navigation Modules
                  </h3>
                  <p className="text-[11px] text-[#527078]">
                    Garment Floor Control System
                  </p>
                </div>
              </div>
              <button
                id="bottom-nav-drawer-close-btn"
                onClick={() => setIsMoreOpen(false)}
                className="w-9 h-9 rounded-xl hover:bg-[#e7e1d5] active:bg-[#ded6c7] text-slate-500 hover:text-[#17343a] flex items-center justify-center transition-colors cursor-pointer touch-manipulation active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Grid in Drawer */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#527078]">
                Modules & Tools
              </span>
              <div className="grid grid-cols-2 gap-2">
                {allTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = isTabActive(tab.id);
                  return (
                    <button
                      key={tab.id}
                      id={`drawer-nav-item-${tab.id}`}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex items-center gap-2.5 p-3 min-h-[52px] rounded-2xl border text-left transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                        isActive
                          ? 'border-[#176f78] bg-[#dceceb]/50 text-[#176f78] font-bold shadow-2xs ring-1 ring-[#176f78]/30'
                          : 'border-[#d9d2c2] bg-white hover:bg-[#f1eee6] text-[#17343a]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#176f78] text-white'
                            : 'bg-[#f1eee6] text-[#527078]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">
                          {tab.label}
                        </div>
                        <div className="text-[10px] text-[#527078] truncate">
                          {tab.badge ? `Status: ${tab.badge}` : tab.fullLabel.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Floor Chat Module & IE AI Advisor Button in Modules & Tools */}
                {onOpenChat && (
                  <button
                    id="drawer-module-floor-chat-btn"
                    onClick={() => {
                      setIsMoreOpen(false);
                      onOpenChat();
                    }}
                    className="flex items-center gap-2.5 p-3 min-h-[52px] rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 hover:from-emerald-100 hover:to-teal-100/80 text-[#17343a] text-left transition-all shadow-2xs group cursor-pointer relative touch-manipulation active:scale-[0.98]"
                    title="Open Floor Chat & AI Industrial Engineering Advisor"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <span>Floor Chat</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-emerald-800/80 truncate">
                        Comms &amp; AI Advisor
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-900 border border-emerald-500/30 font-bold shrink-0">
                      LIVE
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions & Preferences Row */}
            <div className="pt-2 border-t border-[#e7e1d5] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#527078]">
                Quick Utilities
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                <button
                  id="drawer-utility-notifications-btn"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenNotifications();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-white border border-[#d9d2c2] hover:bg-[#f1eee6] transition-colors relative cursor-pointer touch-manipulation active:scale-95"
                >
                  <Bell className="w-4 h-4 text-[#176f78]" />
                  <span className="text-[10px] font-bold text-[#17343a] mt-1">Alerts</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white font-bold text-[8px] flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                <button
                  id="drawer-utility-import-btn"
                  type="button"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenDatabase('csv-import');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer touch-manipulation active:scale-95"
                  title="Import Excel or CSV Line Data"
                >
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span className="text-[10px] font-bold text-emerald-800 mt-1">Import Data</span>
                </button>

                <button
                  id="drawer-utility-database-btn"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenDatabase('backup');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-white border border-[#d9d2c2] hover:bg-[#f1eee6] transition-colors cursor-pointer touch-manipulation active:scale-95"
                >
                  <Database className="w-4 h-4 text-[#176f78]" />
                  <span className="text-[10px] font-bold text-[#17343a] mt-1">Backup</span>
                </button>

                <button
                  id="drawer-utility-settings-btn"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenSettings();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-white border border-[#d9d2c2] hover:bg-[#f1eee6] transition-colors cursor-pointer touch-manipulation active:scale-95"
                >
                  <Settings className="w-4 h-4 text-[#176f78]" />
                  <span className="text-[10px] font-bold text-[#17343a] mt-1">Settings</span>
                </button>

                <button
                  id="drawer-utility-profile-btn"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenUserModal('roles');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-white border border-[#d9d2c2] hover:bg-[#f1eee6] transition-colors cursor-pointer touch-manipulation active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-[#176f78]" />
                  <span className="text-[10px] font-bold text-[#17343a] mt-1">Roles & Tiers</span>
                </button>

                {onOpenAuth && (
                  <button
                    id="drawer-utility-signin-btn"
                    onClick={() => {
                      setIsMoreOpen(false);
                      onOpenAuth();
                    }}
                    className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-[#176f78]/10 border border-[#176f78]/30 hover:bg-[#176f78] hover:text-white transition-all cursor-pointer touch-manipulation active:scale-95 group"
                    title="Sign In / Switch Operator Session"
                  >
                    <Lock className="w-4 h-4 text-[#176f78] group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-bold text-[#176f78] group-hover:text-white mt-1 transition-colors">Sign In</span>
                  </button>
                )}

                {onOpenAndroidPackage && (
                  <button
                    id="drawer-utility-android-btn"
                    onClick={() => {
                      setIsMoreOpen(false);
                      onOpenAndroidPackage();
                    }}
                    className="flex flex-col items-center justify-center p-2.5 min-h-[56px] rounded-2xl bg-[#e8f7ee] border border-[#a3e6be] hover:bg-[#d6f0df] transition-colors cursor-pointer touch-manipulation active:scale-95"
                    title="Install or Package Android App (com.debonair.iedailycontrol)"
                  >
                    <AndroidLogoIcon className="w-4 h-4 text-[#107c41]" />
                    <span className="text-[10px] font-bold text-[#0f5132] mt-1">Android App</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Navigation Bar */}
      <nav
        id="bottom-navigation-bar"
        aria-label="Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-[#fbfaf6]/95 backdrop-blur-md border-t border-[#d9d2c2] shadow-[0_-4px_20px_rgba(12,28,45,0.10)] pb-[env(safe-area-inset-bottom)] cockpit-nav"
      >
        <div className="max-w-[1500px] mx-auto px-2 sm:px-6">
          {/* Mobile View: 5 slots (Home, Lines, Checklist, To-Do, and More/Secondary) */}
          <div className="flex md:hidden items-center justify-around h-16 select-none">
            {/* 1. Home */}
            <button
              id="bottom-nav-mobile-dashboard"
              onClick={() => handleTabClick('dashboard')}
              aria-current={currentTab === 'dashboard' ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 ${
                currentTab === 'dashboard'
                  ? 'text-[#176f78]'
                  : 'text-slate-500 hover:text-[#176f78]'
              }`}
            >
              <div className="relative">
                <Activity
                  className={`w-5 h-5 transition-transform ${
                    currentTab === 'dashboard' ? 'scale-110' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  currentTab === 'dashboard' ? 'font-bold' : 'font-medium'
                }`}
              >
                Home
              </span>
              {currentTab === 'dashboard' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#176f78] mt-0.5 animate-fadeIn" />
              )}
            </button>

            {/* 2. Lines (Moved to 2nd position) */}
            <button
              id="bottom-nav-mobile-lines"
              onClick={() => handleTabClick('linedata')}
              aria-current={currentTab === 'linedata' ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 ${
                currentTab === 'linedata'
                  ? 'text-[#176f78]'
                  : 'text-slate-500 hover:text-[#176f78]'
              }`}
            >
              <div className="relative">
                <Layers
                  className={`w-5 h-5 transition-transform ${
                    currentTab === 'linedata' ? 'scale-110' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  currentTab === 'linedata' ? 'font-bold' : 'font-medium'
                }`}
              >
                Lines
              </span>
              {currentTab === 'linedata' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#176f78] mt-0.5 animate-fadeIn" />
              )}
            </button>

            {/* 3. Simulator */}
            <button
              id="bottom-nav-mobile-simulator"
              onClick={() => handleTabClick('simulator')}
              aria-current={currentTab === 'simulator' ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative cursor-pointer touch-manipulation active:scale-95 ${
                currentTab === 'simulator'
                  ? 'text-[#176f78]'
                  : 'text-slate-500 hover:text-[#176f78]'
              }`}
            >
              <div className="relative">
                <Sliders
                  className={`w-5 h-5 transition-transform ${
                    currentTab === 'simulator' ? 'scale-110' : ''
                  }`}
                />
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full text-[8px] font-mono-numbers font-bold bg-[#176f78] text-white">
                  PRO
                </span>
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  currentTab === 'simulator' ? 'font-bold' : 'font-medium'
                }`}
              >
                Simulator
              </span>
              {currentTab === 'simulator' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#176f78] mt-0.5 animate-fadeIn" />
              )}
            </button>

            {/* 4. Checklist */}
            <button
              id="bottom-nav-mobile-checklist"
              onClick={() => handleTabClick('checklist')}
              aria-current={currentTab === 'checklist' ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative cursor-pointer touch-manipulation active:scale-95 ${
                currentTab === 'checklist'
                  ? 'text-[#176f78]'
                  : 'text-slate-500 hover:text-[#176f78]'
              }`}
            >
              <div className="relative">
                <CheckSquare
                  className={`w-5 h-5 transition-transform ${
                    currentTab === 'checklist' ? 'scale-110' : ''
                  }`}
                />
                <span className="absolute -top-1.5 -right-3 px-1 py-0.2 rounded-full text-[8px] font-mono-numbers font-bold bg-[#dceceb] text-[#176f78] border border-[#176f78]/20">
                  {checklistProgress}%
                </span>
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  currentTab === 'checklist' ? 'font-bold' : 'font-medium'
                }`}
              >
                Activity
              </span>
              {currentTab === 'checklist' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#176f78] mt-0.5 animate-fadeIn" />
              )}
            </button>

            {/* 5. More / Active Secondary Module */}
            <button
              id="bottom-nav-mobile-more"
              onClick={() => setIsMoreOpen(prev => !prev)}
              aria-expanded={isMoreOpen}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative cursor-pointer touch-manipulation active:scale-95 ${
                isSecondaryActive || isMoreOpen
                  ? 'text-[#176f78]'
                  : 'text-slate-500 hover:text-[#176f78]'
              }`}
            >
              <div className="relative">
                {isSecondaryActive && activeSecondaryTab ? (
                  <activeSecondaryTab.icon className="w-5 h-5 scale-110" />
                ) : (
                  <MoreHorizontal className="w-5 h-5" />
                )}
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#176f78] opacity-70" />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 flex items-center gap-0.5 ${
                  isSecondaryActive || isMoreOpen ? 'font-bold' : 'font-medium'
                }`}
              >
                {isSecondaryActive && activeSecondaryTab
                  ? activeSecondaryTab.label
                  : 'More'}
                <ChevronUp
                  className={`w-2.5 h-2.5 transition-transform ${
                    isMoreOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
              {isSecondaryActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#176f78] mt-0.5 animate-fadeIn" />
              )}
            </button>
          </div>

          {/* Tablet & Desktop View: Seamless Bottom Navigation Dock */}
          <div className="hidden md:flex items-center justify-between h-14">
            {/* Left label / brand indicator */}
            <div className="flex items-center gap-2 text-xs text-[#527078]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[#17343a]">Floor Status:</span>
              <span>All 5 Lines Operational</span>
            </div>

            {/* Center 7 Tabs */}
            <div
              id="bottom-nav-desktop-tabs"
              className="flex items-center gap-1 bg-[#f1eee6] p-1 rounded-2xl border border-[#d9d2c2]"
            >
              {allTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = isTabActive(tab.id);
                return (
                  <button
                    key={tab.id}
                    id={`bottom-nav-desktop-${tab.id}`}
                    onClick={() => handleTabClick(tab.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                      isActive
                        ? 'bg-[#176f78] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#176f78] hover:bg-[#e7e1d5]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-numbers font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#dceceb] text-[#176f78]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Quick Sheet Toggle */}
            <div className="flex items-center gap-2">
              <button
                id="bottom-nav-desktop-more-btn"
                onClick={() => setIsMoreOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f1eee6] border border-[#d9d2c2] text-xs font-bold text-[#17343a] hover:bg-[#e7e1d5] transition-colors"
              >
                <MoreHorizontal className="w-3.5 h-3.5 text-[#176f78]" />
                <span>Quick Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
