"use client"

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getConsumeByCategory } from "@/api/dashboard";

// Chart.js 컴포넌트 및 플러그인 등록
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export default function DoughnutChart() {
    const { data: chartData, isLoading } = useQuery({
        queryKey: ["consume-category"],
        queryFn: getConsumeByCategory
    });

    // 도넛 차트 데이터 정의
    const data = {
        // 이미지에 맞춰 레이블 변경
        labels: chartData?.labels || [],
        datasets: [
            {
                // 이미지에 맞춰 데이터 값 변경 (총합 100)
                data: chartData?.data || [], // 이미지 비율에 맞춰 데이터 조정
                backgroundColor: [ // 이미지에 맞춰 배경 색상 변경
                    '#FFC21F', // 식비 (짙은 오렌지색)
                    '#ffc31f81', // 취미생활 (밝은 살구색)
                    '#F68701', // 교통 (주황색)
                    '#f6880176'  // 기타 (아주 밝은 오렌지/노란색)
                ],
                borderColor: [ // 조각 사이의 간격을 만들기 위해 테두리 색상을 흰색으로 설정
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF'
                ],
                borderWidth: 2, // 조각 사이의 간격 두께 설정
                hoverOffset: 10, // 마우스 호버 시 분리되는 효과
            },
        ],
    };

    // 중앙 텍스트용 데이터
    const centerText = chartData?.totalMount ? chartData.totalMount.toLocaleString("ko-KR") : '0';

    // 도넛 차트 옵션 정의
    const options = {
        plugins: {
            legend: {
                display: false, // 범례 숨김 (이미지와 동일)
            },
            tooltip: { // 툴팁(마우스 오버 시 나타나는 정보) 설정
                callbacks: {
                    label: function (context: any) { // 툴팁에 표시될 레이블 형식 정의
                        const label = context.label || '';
                        const value = context.dataset.data[context.dataIndex];
                        const percentage = value + '%';
                        return `${label}: ${percentage}`;
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: '#fff',
                bodyColor: '#fffff',
                padding: 10,
                displayColors: false,
            },
            datalabels: { // chartjs-plugin-datalabels 설정 (중앙 텍스트를 위해 비활성화)
                display: false, // 이미지에서는 차트 조각 위에 라벨이 없으므로 비활성화
            }
        },
        responsive: true,
        // maintainAspectRatio: false,
        cutout: '80%', // 도넛 차트의 중앙 구멍 크기 (이미지와 유사하게)
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600" />
                <p>차트 데이터 불러오는 중...</p>
            </div>
        )
    }

    return (
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            {/* Doughnut 컴포넌트를 사용하여 차트 렌더링 */}
            <div className="max-w-[150px] mx-auto">
                <Doughnut
                    options={options}
                    data={data}
                    height={300}
                    // 중앙 텍스트 플러그인 로직을 plugins prop에 인라인으로 직접 전달
                    plugins={[{
                        id: 'centerText',
                        beforeDraw: function (chart) {
                            const { ctx, width, height } = chart;
                            ctx.restore();
                            const fontSize = (height / 114).toFixed(2);
                            ctx.font = `bold ${fontSize}em Inter`; // 폰트 설정
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = '#333'; // 텍스트 색상 (어두운 회색)

                            const textX = Math.round((width - ctx.measureText(centerText).width) / 2);
                            const textY = height / 2;

                            ctx.fillText(centerText, textX, textY);
                            ctx.save();
                        }
                    }]}
                />
            </div>
            {/* 이미지 하단의 라벨 목록 */}
            <div className="mt-8 text-left w-full">
                {chartData && chartData.labels && (
                    chartData.labels.map((label, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center">
                                {/* 색상 원 */}
                                <span
                                    className="inline-block w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                                ></span>
                                <span className="text-gray-700 text-base">{label}</span>
                            </div>
                            <span className="text-gray-900 font-medium text-base">{chartData.data[index]}%</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}