"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CalendarDaysIcon, HomeIcon, RectangleStackIcon, Squares2X2Icon } from '@heroicons/react/24/solid';

// 메뉴와 경로 매핑 객체
const menuPaths: { [key: string]: string } = {
    home: '/home',
    dashboard: '/dashboard',
    product: '/product',
    spending: '/spending',
    notification: '/notification',
    calendar: '/calendar',
    consumption: '/consumption',
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    expanded?: boolean;
    hasChildren?: boolean;
    onClick?: () => void;
    onToggle?: () => void;
    children?: React.ReactNode;
    isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    active = false,
    expanded = false,
    hasChildren = false,
    onClick,
    onToggle,
    children,
    isCollapsed = false,
}) => {
    const handleArrowClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="mb-1 relative group">
            <div
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${active ? 'bg-[#7CBBDE] text-white' : 'text-gray-600 hover:bg-gray-200'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                onClick={onClick}
            >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <span className={`ml-2 transition-all duration-200 ${isCollapsed ? ' hidden' : 'opacity-100'
                        }`}>
                        {label}
                    </span>
                </div>
                {hasChildren && !isCollapsed && (
                    <span
                        className={`transform ${expanded ? 'rotate-180' : ''} transition-transform duration-200 p-1 rounded hover:bg-opacity-50`}
                        onClick={handleArrowClick}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                )}
            </div>

            {/* 축소 상태에서 호버 시 표시되는 툴팁 */}
            {isCollapsed && (
                <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    {label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
            )}

            {expanded && children && !isCollapsed && (
                <div className="pl-8 mt-1 transition-all duration-200 flex flex-col justify-center">
                    {children}
                </div>
            )}
        </div>
    );
};

const SubNavItem: React.FC<{ label: string; active?: boolean; url?: string }> = ({
    label,
    active = false,
    url = ''
}) => {
    return (
        <Link
            href={url}
            className={`px-3 py-2 text-sm rounded-md cursor-pointer mb-1 transition-colors duration-200 ${active ? 'text-orange-500' : 'text-gray-600 hover:bg-gray-200'
                }`}
        >
            {label}
        </Link>
    );
};

export default function Sidebar() {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState<string | null>('home');
    const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});
    const [isHovered, setIsHovered] = useState(true);

    const toggleMenu = (menu: string) => {
        // 축소 상태에서는 토글하지 않고 바로 이동
        if (!isHovered) {
            setActiveMenu(menu);
            const path = menuPaths[menu] || `/${menu}`;
            router.push(path);
            return;
        }

        // 확장 상태에서는 페이지 이동
        setActiveMenu(menu);
        const path = menuPaths[menu] || `/${menu}`;
        router.push(path);
    };

    const toggleSubMenu = (menu: string) => {
        // 서브메뉴만 토글 (페이지 이동 없음)
        setExpandedMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu] || false,
        }));
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        // setIsHovered(false);
        // 마우스가 벗어나면 모든 서브메뉴 접기
        // setExpandedMenus({});
    };

    return (
        <div
            //xl:left-100 z-200 lg:left-10 fixed
            className={`bg-white h-screen border-[#7CBBDE] border-1 rounded-lg p-4 flex flex-col transition-all duration-300 ease-in-out ${isHovered ? 'w-[218px]' : 'w-[70px]'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`mb-6 mt-2 mx-auto transition-all duration-300 ${isHovered ? '' : 'mb-4'
                }`}>
                <Image
                    src="/nuto_symbol.svg"
                    alt='nuto_symbol'
                    width={isHovered ? 60 : 40}
                    height={isHovered ? 60 : 40}
                    className="transition-all duration-300"
                />
            </div>

            <nav className="flex-1">
                <NavItem
                    icon={<HomeIcon width={18} height={18} />}
                    label="Home"
                    expanded={expandedMenus['home'] || false}
                    onClick={() => toggleMenu('home')}
                    onToggle={() => toggleSubMenu('home')}
                    active={activeMenu === 'home'}
                    isCollapsed={!isHovered}
                >
                </NavItem>
                <NavItem
                    icon={<CalendarDaysIcon width={18} height={18} />}
                    label="Calendar"
                    active={activeMenu === 'calendar'}
                    onClick={() => toggleMenu('calendar')}
                    isCollapsed={!isHovered}
                />
                <NavItem
                    icon={<RectangleStackIcon width={18} height={18} />}
                    label="Dashboard"
                    hasChildren={true}
                    expanded={expandedMenus['dashboard'] || false}
                    onClick={() => toggleMenu('dashboard')}
                    onToggle={() => toggleSubMenu('dashboard')}
                    active={activeMenu === 'dashboard'}
                    isCollapsed={!isHovered}
                >
                    <SubNavItem label="My Card" url="/dashboard/cards" />
                    <SubNavItem label="Graph" url="/dashboard/cards/graph" />
                    <SubNavItem label="Spending History" url="/dashboard/spendingHistory" />
                </NavItem>

                <NavItem
                    icon={<Squares2X2Icon width={18} height={18} />}
                    label="Product"
                    expanded={expandedMenus['product'] || false}
                    onClick={() => toggleMenu('product')}
                    onToggle={() => toggleSubMenu('product')}
                    active={activeMenu === 'product'}
                    isCollapsed={!isHovered}
                >
                </NavItem>

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    label="Consumption"
                    hasChildren={true}
                    expanded={expandedMenus['consumption'] || false}
                    active={activeMenu === 'consumption'}
                    onClick={() => toggleMenu('consumption')}
                    onToggle={() => toggleSubMenu('consumption')}
                    isCollapsed={!isHovered}
                >
                    <SubNavItem label='Income' url='/consumption/income' />
                    <SubNavItem label='Spending' url='/consumption/spending' />
                </NavItem>

                <NavItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    }
                    label="Notification"
                    active={activeMenu === 'notification'}
                    onClick={() => toggleMenu('notification')}
                    isCollapsed={!isHovered}
                />
            </nav>
        </div>
    );
}