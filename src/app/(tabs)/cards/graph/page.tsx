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
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">
                    매일매일 얼마나 소비했는지 궁금하셨나요? 한 달 동안의 소비 변화를 직관적으로 확인할 수 있습니다. <br />
                    가장 많이 소비한 날과 가장 적게 소비한 날을 바로 파악할 수 있으며,<br />그래프를 클릭하면 해당 날의 상세 소비 내역도 확인할 수 있습니다.
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="h-[460px] w-full">
                    <Line
                        options={{
                            scales: {
                                x: {
                                    type: 'category',
                                    title: {
                                        display: false,
                                        text: '일',
                                    },
                                },
                                y: {
                                    title: {
                                        display: false,
                                        text: '값',
                                    },
                                    ticks: {
                                        stepSize: 10, // y축 간격 설정
                                    },
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
                                        1, 50, 5, 17, 150, 25, 200,
                                    ],
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    fill: false,
                                    tension: 0.3, // 선을 부드럽게 만드는 옵션
                                    pointRadius: 0, // 데이터 포인트 원 숨김
                                },
                            ]
                        }}
                    />
                </div>
                <div className="*:bg-gray-400 *:px-3 *:rounded-lg flex gap-4">
                    <select>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                    </select>
                    <select>
                        <option>1월</option>
                        <option>2월</option>
                        <option>3월</option>
                        <option>4월</option>
                        <option>5월</option>
                        <option>6월</option>
                        <option>7월</option>
                        <option>8월</option>
                        <option>9월</option>
                        <option>10월</option>
                        <option>11월</option>
                        <option>12월</option>
                    </select>
                </div>
            </div>
        </div>
    )
}