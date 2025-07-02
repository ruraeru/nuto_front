"use client"

import { Line } from "react-chartjs-2";
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
import Link from "next/link";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);


export default function CardsGraph() {
    return (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">
                    매일매일 얼마나 소비했는지 궁금하셨나요? 한 달 동안의 소비 변화를 직관적으로 확인할 수 있습니다. <br />
                    가장 많이 소비한 날과 가장 적게 소비한 날을 바로 파악할 수 있습니다.
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-[1006px] h-[460px] p-5 border-2 border-[#C1E7F0] rounded-lg">
                    <Line
                        options={{
                            scales: {
                                x: {
                                    type: 'category',
                                    title: {
                                        display: false,
                                        text: '일',

                                    },
                                    grid: {
                                        drawOnChartArea: false,
                                        drawTicks: false,
                                    }
                                },
                                y: {
                                    title: {
                                        display: false,
                                        text: '값',
                                    },
                                    ticks: {
                                        stepSize: 50, // y축 간격 설정
                                    },
                                    border: {
                                        display: false,
                                    },
                                    grid: {
                                        color: "#C1E7F0"
                                    },
                                    min: 1
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false, // 범례 숨김
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        data={{
                            labels: [1, 5, 10, 15, 20, 25, 30],
                            datasets: [
                                {
                                    label: '데이터',
                                    data: [
                                        1, 50, 100, 17, 150, 25, 200,
                                    ],
                                    borderColor: '#7CBBDE',
                                    borderWidth: 3,
                                    fill: false,
                                    tension: 0.4, // 선을 부드럽게 만드는 옵션
                                    pointRadius: 0, // 데이터 포인트 원 숨김
                                    cubicInterpolationMode: "monotone"
                                },
                            ]
                        }}
                    />
                </div>
                <div className="*:border-1 *:px-3 *:py-1 *:rounded-lg flex gap-4">
                    <select>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                    </select>
                    <select>
                        <option>3월</option>
                        <option>4월</option>
                        <option>5월</option>
                        <option>6월</option>
                        <option>7월</option>
                    </select>
                </div>
            </div>
        </div>
    )
}