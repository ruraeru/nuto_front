"use client"

import { getCalendarConsumes } from '@/api/calendar';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import LoadingSpinner from './Chart/LoadingSpinner';

// --- Constants ---
const MONTH_NAMES: Record<number, string> = {
    0: '1월', 1: '2월', 2: '3월', 3: '4월',
    4: '5월', 5: '6월', 6: '7월', 7: '8월',
    8: '9월', 9: '10월', 10: '11월', 11: '12월'
};

const WEEKDAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

// --- Types ---
export interface CalendarEvent {
    date: string;
    shopNames: string[];
    totalAmount: number;
}

export interface CalendarEvents {
    [date: string]: CalendarEvent;
}

interface SelectedDateInfo {
    day: number;
    weekIndex: number;
    dayIndex: number;
    dateString: string;
}

interface CalendarProps {
    initialDate?: Date;
    onDateClick?: (date: Date, eventDetail?: CalendarEvent) => void;
}

enum DateStatus {
    Default,
    MinorEvent,
    MajorEvent,
}

interface CalendarDayData {
    day: number;
    status: DateStatus;
    dateString: string;
}

const formatDateString = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const isCurrentDay = (day: number, currentMonthDate: Date): boolean => {
    const today = new Date();
    return (
        today.getDate() === day &&
        today.getMonth() === currentMonthDate.getMonth() &&
        today.getFullYear() === currentMonthDate.getFullYear()
    );
};

const isValidEvent = (event: unknown): event is CalendarEvent => {
    return (
        typeof event === 'object' &&
        event !== null &&
        'date' in event &&
        'shopNames' in event &&
        'totalAmount' in event &&
        Array.isArray((event as CalendarEvent).shopNames) &&
        typeof (event as CalendarEvent).totalAmount === 'number'
    );
};

const Calendar: React.FC<CalendarProps> = ({
    initialDate = new Date(),
}) => {
    const { data: events, isLoading, error } = useQuery({
        queryKey: ["consume", "calendar"],
        queryFn: getCalendarConsumes
    });

    const [currentMonthDate, setCurrentMonthDate] = useState<Date>(initialDate);
    const [selectedDateInfo, setSelectedDateInfo] = useState<SelectedDateInfo | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ top: string; left: string }>({ top: '0', left: '0' });

    const calendarRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const currentYear = currentMonthDate.getFullYear();
    const currentMonth = currentMonthDate.getMonth();
    const currentMonthName = MONTH_NAMES[currentMonth];

    // 안전한 events 처리
    const safeEvents = useMemo((): CalendarEvents => {
        if (!events) {
            return {};
        }

        const validEvents: CalendarEvents = {};

        // API에서 배열로 받은 경우
        if (Array.isArray(events)) {
            events.forEach((event) => {
                if (isValidEvent(event)) {
                    validEvents[event.date] = event;
                } else {
                }
            });
        }
        // API에서 객체로 받은 경우 (기존 로직)
        else if (typeof events === 'object') {
            Object.entries(events).forEach(([date, event]) => {
                if (isValidEvent(event)) {
                    validEvents[date] = event;
                } else {
                }
            });
        }
        return validEvents;
    }, [events]);

    // 선택된 날짜의 이벤트 정보
    const selectedEventInfo = useMemo(() => {
        if (!selectedDateInfo) return null;
        return safeEvents[selectedDateInfo.dateString] || null;
    }, [selectedDateInfo, safeEvents]);

    // 캘린더 데이터 생성
    const calendarGridData = useMemo(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const startOfWeek = firstDayOfMonth.getDay();
        const daysInMonth = lastDayOfMonth.getDate();

        const grid: (CalendarDayData | null)[][] = [];
        let currentWeek: (CalendarDayData | null)[] = [];

        // 첫 주의 빈 공간 채우기
        for (let i = 0; i < startOfWeek; i++) {
            currentWeek.push(null);
        }

        // 실제 날짜들 채우기
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = formatDateString(currentYear, currentMonth, day);
            const eventData = safeEvents[dateString];

            let status = DateStatus.Default;
            if (eventData) {
                status = eventData.totalAmount > 50000 ? DateStatus.MajorEvent : DateStatus.MinorEvent;
            }

            currentWeek.push({ day, status, dateString });

            // 주가 완성되면 그리드에 추가
            if (currentWeek.length === 7) {
                grid.push(currentWeek);
                currentWeek = [];
            }
        }

        // 마지막 주 완성
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            grid.push(currentWeek);
        }

        // 6주 고정 (레이아웃 일관성)
        while (grid.length < 6) {
            grid.push(Array(7).fill(null));
        }

        return grid;
    }, [currentYear, currentMonth, safeEvents]);

    // 날짜 스타일 클래스 생성 (원본 디자인 유지)
    const getDayStyleByStatus = useCallback((
        dayData: CalendarDayData | null,
        isSelected: boolean
    ): string => {
        if (!dayData) return "invisible";

        const { day, status } = dayData;
        const isToday = isCurrentDay(day, currentMonthDate);

        const baseClasses = "w-[50px] h-[50px] flex items-center justify-center rounded-md transition-colors duration-150 cursor-pointer relative border border-[#7CBBDE]";
        let backgroundClass = "";
        let textClass = "";
        let ringClass = isToday ? "ring-2 ring-blue-500 ring-offset-1" : "";
        const selectedClass = isSelected ? "ring-2 ring-green-500 ring-offset-1" : "";

        switch (status) {
            case DateStatus.MinorEvent:
                backgroundClass = "bg-[#C1E7F0]/40 hover:bg-[#C1E7F0]/30";
                textClass = "text-gray-700";
                break;
            case DateStatus.MajorEvent:
                backgroundClass = "bg-[#C1E7F0] hover:bg-[#C1E7F0]/80";
                textClass = "text-white";
                break;
            case DateStatus.Default:
            default:
                backgroundClass = "bg-white hover:bg-[#C1E7F0]/10";
                textClass = "text-black";
                break;
        }

        // 우선순위: selected > today
        if (selectedClass) ringClass = selectedClass;

        return `${baseClasses} ${backgroundClass} ${textClass} ${ringClass}`;
    }, [currentMonthDate]);

    // 팝업 위치 계산
    const calculatePopupPosition = useCallback((weekIndex: number, dayIndex: number) => {
        if (!calendarRef.current || !popupRef.current) return;

        const cells = calendarRef.current.querySelectorAll('[data-cell]');
        const targetCell = cells[weekIndex * 7 + dayIndex] as HTMLElement;

        if (!targetCell) return;

        const calendarRect = calendarRef.current.getBoundingClientRect();
        const cellRect = targetCell.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        const cellCenterX = cellRect.left - calendarRect.left + cellRect.width / 2;
        const cellBottom = cellRect.bottom - calendarRect.top + 8;

        // 팝업이 화면을 벗어나지 않도록 조정
        let left = cellCenterX - popupRect.width / 2;
        const containerWidth = calendarRef.current.offsetWidth;

        if (left < 0) {
            left = 8;
        } else if (left + popupRect.width > containerWidth) {
            left = containerWidth - popupRect.width - 8;
        }

        setPopupPosition({
            top: `${cellBottom}px`,
            left: `${left}px`
        });
    }, []);

    // 날짜 클릭 처리
    const handleDateClick = useCallback((
        dayData: CalendarDayData | null,
        weekIndex: number,
        dayIndex: number
    ) => {
        if (!dayData) return;

        const { day, dateString } = dayData;
        const clickedDate = new Date(currentYear, currentMonth, day);
        const eventDetail = safeEvents[dateString];

        // 선택 상태 토글
        const isSameDate = selectedDateInfo?.dateString === dateString;

        if (isSameDate) {
            setSelectedDateInfo(null);
        } else {
            const newSelectedInfo = { day, weekIndex, dayIndex, dateString };
            setSelectedDateInfo(newSelectedInfo);
        }
    }, [currentYear, currentMonth, selectedDateInfo, safeEvents]);

    // 키보드 이벤트 처리
    const handleKeyDown = useCallback((
        event: React.KeyboardEvent,
        dayData: CalendarDayData | null,
        weekIndex: number,
        dayIndex: number
    ) => {
        if (!dayData) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleDateClick(dayData, weekIndex, dayIndex);
        }
    }, [handleDateClick]);

    // 월 변경 함수들 (원본에서는 사용하지 않음)
    const goToPreviousMonth = useCallback(() => {
        setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setSelectedDateInfo(null);
    }, []);

    const goToNextMonth = useCallback(() => {
        setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setSelectedDateInfo(null);
    }, []);

    // 팝업 위치 업데이트
    useEffect(() => {
        if (selectedDateInfo && selectedEventInfo) {
            // 약간의 지연을 두어 DOM 업데이트 후 위치 계산
            const timer = setTimeout(() => {
                calculatePopupPosition(selectedDateInfo.weekIndex, selectedDateInfo.dayIndex);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [selectedDateInfo, selectedEventInfo, calculatePopupPosition]);

    // 외부 클릭 시 팝업 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node) &&
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setSelectedDateInfo(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isLoading) {
        return (
            <div className="w-[588px] h-[530px] p-4 sm:p-6 rounded-lg shadow-lg mx-auto relative calendar-container border-2 border-[#C1E7F0] bg-white">
                <LoadingSpinner text='소비 내역 불러오는 중' />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[588px] h-[530px] p-4 sm:p-6 rounded-lg shadow-lg mx-auto relative calendar-container border-2 border-[#C1E7F0] bg-white">
                <div className="flex items-center justify-center h-full">
                    <div className="text-red-500">캘린더를 불러오는데 실패했습니다.</div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={calendarRef}
            className="w-[588px] h-[530px] p-4 sm:p-6 rounded-lg shadow-lg mx-auto relative calendar-container border-2 border-[#C1E7F0] bg-white"
        >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-5xl font-bold pl-4">
                    {currentMonthName}
                </div>
            </div>

            {/* 캘린더 그리드 */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 calendar-grid">
                {calendarGridData.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                        {week.map((dayData, dayIndex) => (
                            <div key={dayData?.dateString || `empty-${weekIndex}-${dayIndex}`} className='flex flex-col items-center'>
                                <span className='font-semibold text-lg'>{dayData?.day}</span>
                                <div
                                    data-cell
                                    className={getDayStyleByStatus(dayData, selectedDateInfo?.dateString === dayData?.dateString)}
                                    onClick={() => handleDateClick(dayData, weekIndex, dayIndex)}
                                    onKeyDown={(e) => handleKeyDown(e, dayData, weekIndex, dayIndex)}
                                    role={dayData ? "button" : undefined}
                                    aria-label={dayData ? `${currentMonthName} ${dayData.day}일 ${safeEvents[dayData.dateString] ? '이벤트 있음' : ''}` : undefined}
                                    tabIndex={dayData ? 0 : -1}
                                    aria-disabled={!dayData}
                                >
                                    {dayData && (
                                        <>
                                            {/* 이벤트 강조 시각화 제거 */}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* 이벤트 정보 팝업 */}
            {selectedDateInfo && selectedEventInfo && (
                <div
                    ref={popupRef}
                    className="bg-[#414141] text-white p-3 rounded-lg absolute z-10 shadow-lg text-xs w-32"
                    style={popupPosition}
                    role="tooltip"
                    aria-live="polite"
                >
                    {selectedEventInfo.shopNames.map((item, index) => (
                        <div key={index} className="truncate">{item}</div>
                    ))}
                    {selectedEventInfo.totalAmount > 0 && (
                        <div className="border-t border-gray-600 mt-1 pt-1 font-medium">
                            {selectedEventInfo.totalAmount.toLocaleString()}원
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;