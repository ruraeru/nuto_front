import React, { useState, useMemo, useCallback } from 'react';

// --- Constants ---
const MONTH_NAMES: { [key: number]: string } = {
    0: '1월', 1: '2월', 2: '3월', 3: '4월',
    4: '5월', 5: '6월', 6: '7월', 7: '8월',
    8: '9월', 9: '10월', 10: '11월', 11: '12월'
};
const WEEKDAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const events: Events = {
    '2025-05-02': { description: ['교통비', '식비 지출'], amount: 90000 },
    '2025-05-10': { description: ['월세 자동이체'], amount: 50000 },
    '2025-05-31': { description: ['월세 자동이체'], amount: 500000 },
    '2025-07-03': { description: ['월세 자동이체'], amount: 50000 },
    '2025-07-04': { description: ['월세 자동이체'], amount: 60000 },
    '2025-07-01': { description: ['월세 자동이체'], amount: 600000 },
};

// 날짜 상태를 나타내는 타입 (가독성 향상)
enum DateStatus {
    Default,      // 기본 (이벤트 없음)
    MinorEvent,   // 적당한 소비 (amount <= 50000)
    MajorEvent,   // 과소비 (amount > 50000)
}

// --- Types ---
export interface EventInfo {
    description: string[];
    amount: number;
}

export interface Events {
    [dateString: string]: EventInfo; // YYYY-MM-DD 형식의 키
}

interface SelectedDateInfo {
    day: number;
    weekIndex: number;
    dayIndex: number;
    dateString: string; // 선택된 날짜의 YYYY-MM-DD 문자열 추가
}

interface CalendarProps {
    initialDate?: Date;      // 초기 표시 날짜 (선택적)
    events?: Events;         // 캘린더에 표시할 이벤트 데이터 (선택적)
    onDateClick?: (date: Date, event?: EventInfo) => void; // 날짜 클릭 콜백 (선택적)
}

// --- Utility Functions ---

// 날짜를 'YYYY-MM-DD' 형식으로 포맷
const formatDateString = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// 현재 날짜인지 확인
const isCurrentDay = (day: number, currentMonthDate: Date): boolean => {
    const today = new Date();
    return (
        today.getDate() === day &&
        today.getMonth() === currentMonthDate.getMonth() &&
        today.getFullYear() === currentMonthDate.getFullYear()
    );
};

// --- Calendar Component ---
const Calendar: React.FC<CalendarProps> = ({
    initialDate = new Date(),
    // events = {}, // 기본값 빈 객체
    onDateClick
}) => {
    const [currentMonthDate, setCurrentMonthDate] = useState<Date>(initialDate);
    const [selectedDateInfo, setSelectedDateInfo] = useState<SelectedDateInfo | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ top: string; left: string }>({ top: '0', left: '0' });

    const currentYear = currentMonthDate.getFullYear();
    const currentMonth = currentMonthDate.getMonth();
    const currentMonthName = MONTH_NAMES[currentMonth];

    // 이벤트 정보 (선택된 날짜 기준)
    const selectedEventInfo = useMemo(() => {
        if (!selectedDateInfo || !events[selectedDateInfo.dateString]) {
            return null;
        }
        return events[selectedDateInfo.dateString];
    }, [selectedDateInfo, events]);


    // 캘린더 데이터 생성 (useMemo로 currentMonthDate 변경 시에만 재생성)
    const calendarGridData = useMemo(() => {
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const lastDateOfMonth = lastDayOfMonth.getDate();

        const grid: ({ day: number; status: DateStatus; dateString: string } | null)[][] = [];
        let currentWeek: ({ day: number; status: DateStatus; dateString: string } | null)[] = [];

        // 1일부터 마지막 날까지 순서대로 그리드에 채워 넣습니다.
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dateString = formatDateString(currentYear, currentMonth, i);
            let status = DateStatus.Default;
            if (events[dateString]) {
                status = events[dateString].amount > 50000 ? DateStatus.MajorEvent : DateStatus.MinorEvent;
            }
            currentWeek.push({ day: i, status, dateString });

            // 현재 주가 7일이 되거나, 마지막 날짜에 도달하면 새로운 주를 시작합니다.
            if (currentWeek.length === 7 || i === lastDateOfMonth) {
                // 마지막 주가 7일 미만일 때 null로 채웁니다.
                while (currentWeek.length < 7) {
                    currentWeek.push(null);
                }
                grid.push(currentWeek);
                currentWeek = []; // 다음 주를 위해 초기화
            }
        }

        // 항상 6주를 채우도록 빈 주 추가 (레이아웃 고정)
        while (grid.length < 6) {
            grid.push(Array(7).fill(null));
        }

        return grid;
    }, [currentYear, currentMonth, events]); // events도 dependency 추가


    // 날짜 상태에 따른 스타일 클래스 반환
    const getDayStyleByStatus = useCallback((dayData: { day: number; status: DateStatus; dateString: string } | null, isSelected: boolean): string => {
        if (dayData === null) return "invisible"; // 내용을 숨기지만 공간은 차지

        const { day, status, dateString } = dayData;
        const isToday = isCurrentDay(day, currentMonthDate);

        const baseClasses = "w-[50px] h-[50px] flex items-center justify-center rounded-md transition-colors duration-150 cursor-pointer relative border border-[#7CBBDE]";
        let backgroundClass = "";
        let textClass = "";
        let ringClass = isToday ? "ring-2 ring-blue-500 ring-offset-1" : ""; // ring-offset 추가하여 배경과 구분
        const selectedClass = isSelected ? "ring-2 ring-green-500 ring-offset-1" : ""; // 선택 시 테두리

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
    }, [currentMonthDate]); // currentMonthDate만 의존


    // 이벤트 팝업 위치 계산 (클릭된 셀 바로 아래에 표시)
    const calculateAndSetPopupPosition = useCallback((weekIndex: number, dayIndex: number) => {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        // 모든 셀을 가져옵니다.
        const allCells = calendarGrid.querySelectorAll('[role="button"]');
        // 변경된 로직에 따라 셀 인덱스를 단순하게 계산합니다.
        const targetCell = allCells[weekIndex * 7 + dayIndex] as HTMLElement;

        if (!targetCell) {
            console.error("Target date cell not found for positioning.");
            return;
        }

        const calendarContainer = targetCell.closest('.calendar-container') as HTMLElement | null;
        if (!calendarContainer) return;

        const cellRect = targetCell.getBoundingClientRect();
        const containerRect = calendarContainer.getBoundingClientRect();

        // --- Configuration ---
        const popupElement = document.querySelector('[role="tooltip"]') as HTMLElement | null;
        const popupWidth = popupElement?.offsetWidth || 128; // 실제 너비 또는 기본값 (w-32 = 128px)
        const margin = 8; // 셀과 팝업 사이 간격

        // --- Initial Calculation (Below, Centered Horizontally relative to cell) ---
        const top = cellRect.bottom - containerRect.top + margin;
        const left = cellRect.left - containerRect.left + (cellRect.width / 2) - (popupWidth / 2);

        setPopupPosition({ top: `${top}px`, left: `${left}px` });
    }, []); // currentMonth, currentYear는 더 이상 셀 인덱스 계산에 직접 영향을 주지 않으므로 제거


    // 날짜 선택 처리
    const handleDateClick = useCallback((dayData: { day: number; status: DateStatus; dateString: string } | null, weekIndex: number, dayIndex: number): void => {
        if (dayData === null) return;

        const { day, dateString } = dayData;
        const clickedDate = new Date(currentYear, currentMonth, day);
        const eventDetail = events[dateString] || undefined;

        // 외부 콜백 호출
        onDateClick?.(clickedDate, eventDetail);

        // 이미 선택된 날짜를 다시 클릭하면 선택 해제
        if (selectedDateInfo?.dateString === dateString) {
            setSelectedDateInfo(null);
        } else {
            const newSelectedInfo = { day, weekIndex, dayIndex, dateString };
            setSelectedDateInfo(newSelectedInfo);
            // 이벤트가 있는 경우에만 팝업 위치 계산
            if (eventDetail) {
                calculateAndSetPopupPosition(weekIndex, dayIndex);
            }
        }
    }, [currentYear, currentMonth, selectedDateInfo, calculateAndSetPopupPosition, onDateClick]);

    // 이전 달 이동
    const goToPreviousMonth = useCallback((): void => {
        setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setSelectedDateInfo(null); // 월 변경 시 선택 해제
    }, []);

    // 다음 달 이동
    const goToNextMonth = useCallback((): void => {
        setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setSelectedDateInfo(null); // 월 변경 시 선택 해제
    }, []);

    return (
        // calendar-container 클래스 추가하여 팝업 위치 계산 기준 설정
        <div className="w-[588px] h-[530px] p-4 sm:p-6 rounded-lg shadow-lg mx-auto relative calendar-container border-2 border-[#C1E7F0] bg-white">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                {/* <button
                    onClick={goToPreviousMonth}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="이전 달"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button> */}
                <div className="text-5xl font-bold pl-4">
                    {/* {currentYear}년 */}
                    {currentMonthName}
                </div>
                {/* <button
                    onClick={goToNextMonth}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="다음 달"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button> */}
            </div>

            {/* 요일 표시 */}
            {/* <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div> */}

            {/* 캘린더 그리드 (Tailwind grid 사용, gap 조절) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 calendar-grid">
                {calendarGridData.map((week, weekIndex) => (
                    // 각 주(week) 렌더링 최적화를 위해 React.Fragment 또는 div 사용 시 key 부여
                    <React.Fragment key={weekIndex}>
                        {week.map((dayData, dayIndex) => (
                            <div key={dayData ? dayData.dateString : `empty-${weekIndex}-${dayIndex}`} className='flex flex-col items-center'>
                                <span className='font-semibold text-lg'>{dayData?.day}</span>
                                <div
                                    className={getDayStyleByStatus(dayData, selectedDateInfo?.dateString === dayData?.dateString)}
                                    onClick={() => handleDateClick(dayData, weekIndex, dayIndex)}
                                    // 접근성: 클릭 가능한 요소 명확화
                                    role={dayData ? "button" : undefined}
                                    aria-label={dayData ? `${currentMonthName} ${dayData.day}일 ${events[dayData.dateString] ? '이벤트 있음' : ''}` : undefined}
                                    tabIndex={dayData ? 0 : undefined}
                                    // 비활성 날짜 포커스 제외
                                    aria-disabled={!dayData}
                                >
                                    {dayData && (
                                        <>
                                            {/* 이벤트 강조 시각화 (개선: 상태에 따라 다른 마커 표시 가능)
                                            {dayData.status === DateStatus.MajorEvent && (
                                                <div className="absolute bottom-1 right-1 bg-red-500 w-1.5 h-1.5 rounded-full"></div>
                                            )}
                                            {dayData.status === DateStatus.MinorEvent && (
                                                <div className="absolute bottom-1 right-1 bg-gray-400 w-1.5 h-1.5 rounded-full"></div>
                                            )} */}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* 이벤트 정보 팝업 */}
            {
                selectedDateInfo && selectedEventInfo && (
                    <div
                        className="bg-[#414141] text-white p-3 rounded-lg absolute z-10 shadow-lg text-xs w-32" // 너비 고정 또는 내용 기반 조정
                        style={popupPosition}
                    // // 팝업 접근성 개선
                    // role="tooltip" // 또는 dialog
                    // aria-live="polite" // 내용 변경 시 알림
                    >
                        {selectedEventInfo.description.map((item, index) => (
                            <div key={index} className="truncate">{item}</div> // 내용 길 경우 잘림 처리
                        ))}
                        {selectedEventInfo.amount > 0 && (
                            <div className="border-t border-gray-600 mt-1 pt-1 font-medium">
                                {selectedEventInfo.amount.toLocaleString()}원 {/* 단위 추가 */}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default Calendar;
