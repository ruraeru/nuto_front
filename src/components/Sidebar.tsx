"use client";

import { useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    expanded?: boolean;
    hasChildren?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    active = false,
    expanded = false,
    hasChildren = false,
    onClick,
    children
}) => {
    return (
        <div className="mb-1">
            <div
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${active ? 'bg-orange-400 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={onClick}
            >
                <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{label}</span>
                </div>
                {hasChildren && (
                    <span className={`transform ${expanded ? 'rotate-180' : ''} transition-transform`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                )}
            </div>
            {expanded && children && (
                <div className="pl-8 mt-1">
                    {children}
                </div>
            )}
        </div>
    );
};

const SubNavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active = false }) => {
    return (
        <div
            className={`px-3 py-2 text-sm rounded-md cursor-pointer mb-1 ${active ? 'text-orange-500' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {label}
        </div>
    );
};

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState<string | null>('dashboard');
    const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
        // dashboard: true,
    });

    const toggleMenu = (menu: string) => {
        if (expandedMenus[menu]) {
            setExpandedMenus(prev => ({
                ...prev,
                [menu]: !prev[menu]
            }));
        }
        else {
            const resetExpandedMenus: { [key: string]: boolean } = {};
            resetExpandedMenus[menu] = true;
            setExpandedMenus(resetExpandedMenus);
        }
        setActiveMenu(menu);
    };

    return (
        <div className="w-56 h-full bg-gray-100 rounded-lg p-4 flex flex-col">
            <div className="text-center mb-8 mt-2">
                <h1 className="text-2xl font-medium">nuto</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    }
                    label="Home"
                    hasChildren={true}
                    expanded={expandedMenus['home'] || false}
                    onClick={() => toggleMenu('home')}
                    active={activeMenu === 'home'}
                >
                    <SubNavItem label="카드 혜택" />
                    <SubNavItem label="한달 그래프" />
                    <SubNavItem label="카테고리" />
                    <SubNavItem label="소비 내역" />
                </NavItem>

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                    label="Dashboard"
                    hasChildren={true}
                    expanded={expandedMenus['dashboard'] || false}
                    onClick={() => toggleMenu('dashboard')}
                    active={activeMenu === 'dashboard'}
                >
                    <SubNavItem label="카드 혜택" />
                    <SubNavItem label="한달 그래프" />
                    <SubNavItem label="카테고리" />
                    <SubNavItem label="소비 내역" />
                </NavItem>

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    }
                    label="Product"
                    hasChildren={true}
                    expanded={expandedMenus['product'] || false}
                    onClick={() => toggleMenu('product')}
                    active={activeMenu === 'product'}
                >
                    <SubNavItem label="카드 혜택" />
                    <SubNavItem label="한달 그래프" />
                    <SubNavItem label="카테고리" />
                    <SubNavItem label="소비 내역" />
                </NavItem>

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    label="Spending history"
                    active={activeMenu === 'spending'}
                    onClick={() => setActiveMenu('spending')}
                />

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    }
                    label="Notification"
                    active={activeMenu === 'notification'}
                    onClick={() => setActiveMenu('notification')}
                />

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                    label="Calendar"
                    active={activeMenu === 'calendar'}
                    onClick={() => setActiveMenu('calendar')}
                />
            </nav>
        </div>
    );
}