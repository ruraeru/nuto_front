"use client"

import { Doughnut, Line, Pie } from "react-chartjs-2";
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
import Image from "next/image";
import Card from "@/components/dashboard/Card";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export default function Page() {
    const data = {
        labels: ["Entertainment", "Bill Expense", "Investment", "Others"],
        datasets: [
            {
                data: [30, 15, 20, 35],
                backgroundColor: [
                    '#343C6A',
                    '#FC7900',
                    '#FA00FF',
                    '#1814F3'
                ],
                borderColor: [
                    '#343C6A',
                    '#FC7900',
                    '#FA00FF',
                    '#1814F3'
                ],
                borderWidth: 0, // 분리된 것처럼 보이게 하기 위해 테두리 없앰
                hoverOffset: 10, // 마우스 호버 시 분리되는 효과
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.formattedValue || '';
                        const percentage = context.dataset.data[context.dataIndex] + '%';
                        return `${label}: ${percentage}`;
                    }
                }
            },
        },
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex justify-center gap-4">
                <div className="flex flex-col w-[730px] gap-4">
                    <div className="flex justify-between items-end">
                        <p className="font-semibold text-2xl">My Cards</p>
                        <Link href="/dashboard/cards">모두 보기</Link>
                    </div>
                    <div className="flex gap-6">
                        <Card gradientColors={["#FFC21F", "#F68701"]}
                            cardInfo={{
                                usageAmount: "56,000",
                                cardName: "토스뱅크",
                                cardNumber: "4907-0000-0000...",
                                cardExpirationPeriod: "12/22",
                                cardBrand: "MATER",
                            }} />

                        <Card gradientColors={["#C1E7F0", "#7CBBDE"]}
                            cardInfo={{
                                usageAmount: "120,250",
                                cardName: "하나은행",
                                cardNumber: "4097-0000-0000...",
                                cardExpirationPeriod: "12/22",
                                cardBrand: "VISA",
                            }} />
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <span >올해 내 소비는?</span>
                    </div>
                    <div className="bg-gray-500 place-items-center w-[270px] h-[235px]">
                        <Pie
                            options={options}
                            data={data}
                            height={300} // 필요에 따라 높이 조절
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="flex flex-col justify-between gap-4">
                    <div className="w-[730px] h-[460px]">
                        <div className="flex justify-between w-full">
                            <p className="font-semibold text-2xl">소비 그래프</p>
                            <Link href="/dashboard/cards/graph">모두 보기</Link>
                        </div>
                        <div className="h-[460px] w-full p-5 border-2 border-[#C1E7F0] rounded-xl">
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
                    </div>
                    <div className="w-[730px]">
                        <div className="flex justify-between w-full">
                            <p>한달 소비 내역</p>
                            <span>
                                <Link href="/dashboard/spendingHistory">모두 보기</Link>
                            </span>
                        </div>
                        <div className="h-[463px] bg-gray-600 text-white">
                            <table className="w-full">
                                <caption className="text-left p-5 text-black font-bold">Top Selling Product</caption>
                                <thead className="text-left">
                                    <tr className="*:p-5">
                                        <th>Product</th>
                                        <th>Day</th>
                                        <th>Price</th>
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="*:p-5">
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-white rounded-full" />
                                                <div>
                                                    <span className="text-sm">Nike v22</span>
                                                    <p className="text-xs">Running Shoes</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>8000</td>
                                        <td>$130</td>
                                        <td>$9,500</td>
                                    </tr>
                                    <tr className="*:p-5">
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-white rounded-full" />
                                                <div>
                                                    <span className="text-sm">Nike v22</span>
                                                    <p className="text-xs">Running Shoes</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>8000</td>
                                        <td>$130</td>
                                        <td>$9,500</td>
                                    </tr>
                                    <tr className="*:p-5">
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-white rounded-full" />
                                                <div>
                                                    <span className="text-sm">Nike v22</span>
                                                    <p className="text-xs">Running Shoes</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>8000</td>
                                        <td>$130</td>
                                        <td>$9,500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col justify-center gap-4">
                        <div className="mb-4">
                            <div className="mb-4">
                                <span>이번 달 내 소비는?</span>
                            </div>
                            <div className="bg-gray-500 w-[270px] h-[235px]">

                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <span>지금 내 소비는?</span>
                            </div>
                            <div className="bg-gray-500 w-[270px] h-[235px]" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="mb-4">
                                <span>이번 달 내 소비는?</span>
                            </div>
                            <div className="bg-gray-100 w-[270px] h-[383px]">
                                <h1>총 소비 : 18K</h1>
                                <Doughnut data={{
                                    labels: ["Direct", "Organic", "Paid", "Social"],
                                    datasets: [
                                        {
                                            data: [43, 27, 16, 33],
                                            backgroundColor: ['#FFA500', '#00FF7F', '#87CEEB', '#FF4040'],
                                            borderWidth: 1,
                                        }
                                    ]
                                }} options={{
                                    plugins: {
                                        legend: {
                                            position: "bottom"
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}