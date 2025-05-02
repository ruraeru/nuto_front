import React, { useState, useMemo, useCallback } from 'react';

// --- Constants ---
const MONTH_NAMES: { [key: number]: string } = {
    0: '1월', 1: '2월', 2: '3월', 3: '4월',
    4: '5월', 5: '6월', 6: '7월', 7: '8월',
    8: '9월', 9: '10월', 10: '11월', 11: '12월'
};
const WEEKDAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜 상태를 나타내는 타입 (가독성 향상)
enum DateStatus {
    Default,      // 기본 (이벤트 없음)

    MinorEvent,   // 경미한 일정 (amount 0 이하)
    MajorEvent,   // 중요 일정 (amount > 0)
    Inactive      // 해당 월의 날짜 아님
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
    events = {}, // 기본값 빈 객체
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
        console.log("Generating calendar data for:", currentMonthDate); // 디버깅용 로그
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (일) ~ 6 (토)
        const lastDateOfMonth = lastDayOfMonth.getDate();

        const grid: ({ day: number; status: DateStatus; dateString: string } | null)[][] = [];
        let dayCounter = 1;
        let weekIndex = 0;

        while (dayCounter <= lastDateOfMonth) {
            const weekData: ({ day: number; status: DateStatus; dateString: string } | null)[] = [];
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                if ((weekIndex === 0 && dayIndex < firstDayOfWeek) || dayCounter > lastDateOfMonth) {
                    weekData.push(null);
                } else {
                    const dateString = formatDateString(currentYear, currentMonth, dayCounter);
                    let status = DateStatus.Default;
                    if (events[dateString]) {
                        status = events[dateString].amount > 0 ? DateStatus.MajorEvent : DateStatus.MinorEvent;
                    }
                    weekData.push({ day: dayCounter, status, dateString });
                    dayCounter++;
                }
            }
            grid.push(weekData);
            weekIndex++;
            // 6주 이상 필요한 경우 방지 (일반적으론 최대 6주)
            if (weekIndex > 5 && dayCounter <= lastDateOfMonth) {
                console.warn("Calendar grid exceeds 6 weeks, potential layout issue.");
                break;
            }
        }
        // 마지막 주가 7일 미만일 때 null 채우기 (레이아웃 유지)
        if (grid.length > 0) {
            const lastWeek = grid[grid.length - 1];
            while (lastWeek.length < 7) {
                lastWeek.push(null);
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
        if (dayData === null) return "invisible"; // 내용을 숨기지만 공간은 차지 (bg-gray-300 opacity-0 대신)

        const { day, status, dateString } = dayData;
        const isToday = isCurrentDay(day, currentMonthDate);

        const baseClasses = "w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-150 cursor-pointer relative";
        let backgroundClass = "";
        let textClass = "";
        let ringClass = isToday ? "ring-2 ring-blue-500 ring-offset-1" : ""; // ring-offset 추가하여 배경과 구분
        const selectedClass = isSelected ? "ring-2 ring-green-500 ring-offset-1" : ""; // 선택 시 테두리

        switch (status) {
            case DateStatus.MinorEvent:
                backgroundClass = "bg-gray-200 hover:bg-gray-300"; // 약간 밝게 조정
                textClass = "text-gray-700";
                break;
            case DateStatus.MajorEvent:
                backgroundClass = "bg-gray-800 hover:bg-gray-700";
                textClass = "text-white";
                break;
            case DateStatus.Default:
            default:
                backgroundClass = "bg-white hover:bg-gray-100";
                textClass = "text-black";
                break;
        }

        // 우선순위: selected > today
        if (selectedClass) ringClass = selectedClass;

        return `${baseClasses} ${backgroundClass} ${textClass} ${ringClass}`;
    }, [currentMonthDate]); // currentMonthDate만 의존


    // 이벤트 팝업 위치 계산 (개선된 로직 유지, Ref 사용 고려 가능성)
    // 이벤트 팝업 위치 계산 (클릭된 셀 바로 아래에 표시)
    const calculateAndSetPopupPosition = useCallback((weekIndex: number, dayIndex: number) => {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        const allCells = calendarGrid.querySelectorAll('[role="button"]'); // 클릭 가능한 모든 셀
        const cellIndex = weekIndex * 7 + dayIndex - (new Date(currentYear, currentMonth, 1).getDay()); // 실제 데이터가 있는 셀의 인덱스 계산
        const targetCell = allCells[cellIndex] as HTMLElement; // 계산된 인덱스로 타겟 셀 접근

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

        // const popupHeight = popupElement?.offsetHeight || 80; // 실제 높이 또는 기본값
        const margin = 8; // 셀과 팝업 사이 간격

        // --- Initial Calculation (Below, Centered Horizontally relative to cell) ---
        const top = cellRect.bottom - containerRect.top + margin;
        const left = cellRect.left - containerRect.left + (cellRect.width / 2) - (popupWidth / 2);

        console.log(top, left)

        setPopupPosition({ top: `${top}px`, left: `${left}px` });
    }, [currentMonth, currentYear]); // currentMonth, currentYear 변경 시 셀 인덱스 계산에 영향

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
    }, [currentYear, currentMonth, events, selectedDateInfo, calculateAndSetPopupPosition, onDateClick]);

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

    // 월 변경 시 선택된 날짜 및 이벤트 정보 초기화 (이제 이동 함수 내에서 처리)
    // useEffect(() => {
    //     setSelectedDateInfo(null);
    // }, [currentMonthDate]);

    return (
        // calendar-container 클래스 추가하여 팝업 위치 계산 기준 설정
        <div className="bg-gray-300 h-fit p-4 sm:p-6 rounded-lg shadow-lg max-w-sm mx-auto relative calendar-container border border-gray-200">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="이전 달"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="text-lg sm:text-xl font-semibold text-gray-800"> {currentYear}년 {currentMonthName}</div>
                <button
                    onClick={goToNextMonth}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="다음 달"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* 요일 표시 */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* 캘린더 그리드 (Tailwind grid 사용, gap 조절) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 calendar-grid">
                {calendarGridData.map((week, weekIndex) => (
                    // 각 주(week) 렌더링 최적화를 위해 React.Fragment 또는 div 사용 시 key 부여
                    <React.Fragment key={weekIndex}>
                        {week.map((dayData, dayIndex) => (
                            <div
                                key={dayData ? dayData.dateString : `empty-${weekIndex}-${dayIndex}`} // 고유 키 보장
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
                                        <span>{dayData.day}</span>
                                        {/* 이벤트 강조 시각화 (개선: 상태에 따라 다른 마커 표시 가능) */}
                                        {dayData.status === DateStatus.MajorEvent && (
                                            <div className="absolute bottom-1 right-1 bg-red-500 w-1.5 h-1.5 rounded-full"></div>
                                        )}
                                        {dayData.status === DateStatus.MinorEvent && (
                                            <div className="absolute bottom-1 right-1 bg-gray-400 w-1.5 h-1.5 rounded-full"></div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* 이벤트 정보 팝업 */}
            {selectedDateInfo && selectedEventInfo && (
                <div
                    className="bg-gray-800 text-white p-3 rounded-lg absolute z-10 shadow-lg text-xs w-32" // 너비 고정 또는 내용 기반 조정
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
                            {selectedEventInfo.amount.toLocaleString()} 원 {/* 단위 추가 */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;