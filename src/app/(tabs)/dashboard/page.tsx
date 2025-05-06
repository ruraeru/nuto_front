"use client"
import { Line, Pie } from "react-chartjs-2";
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
        <div className="m-5 max-h-[1625px] overflow-y-auto flex flex-col w-[1280px] gap-4">
            <div className="flex justify-center gap-4">
                <div className="flex flex-col w-[730px] gap-4">
                    <div className="flex justify-between w-full">
                        <p>My Cards</p>
                        <span>모두 보기</span>
                    </div>
                    <div className="flex gap-16">
                        <div className="w-[350px] h-[235px] bg-gray-400" />
                        <div className="w-[350px] h-[235px] bg-gray-400" />
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <span >올해 내 소비는?</span>
                    </div>
                    <div className="bg-gray-500 w-[270px] h-[235px]">
                        <Pie
                            options={options}
                            data={data}
                            height={300} // 필요에 따라 높이 조절
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="w-[730px] h-[460px]">
                    <div className="flex justify-between w-full">
                        <p>소비 그래프</p>
                        <span>모두 보기</span>
                    </div>
                    <div className="h-[460px]">
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
                                            stepSize: 50, // y축 간격 설정
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
                                labels: Array.from({ length: 30 }, (_, i) => i + 1),
                                datasets: [
                                    {
                                        label: '데이터',
                                        data: [
                                            5, 15, 35, 55, 40, 20, 5, 10, 30, 70,
                                            100, 130, 150, 160, 140, 100, 60, 30, 20, 40,
                                            70, 90, 100, 80, 60, 40, 30, 50, 80, 100
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
                </div>
                <div>
                    <div className="mb-4">
                        <div className="mb-4">
                            <span>이번 달 내 소비는?</span>
                        </div>
                        <div className="bg-gray-500 w-[270px] h-[235px]" />
                    </div>
                    <div>
                        <div className="mb-4">
                            <span>이번 달 내 소비는?</span>
                        </div>
                        <div className="bg-gray-500 w-[270px] h-[235px]" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="w-[730px]">
                    <div className="flex justify-between w-full">
                        <p>한달 소비 내역</p>
                        <span>모두 보기</span>
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
                <div>
                    <div>
                        <div className="mb-4">
                            <span>이번 달 내 소비는?</span>
                        </div>
                        <div className="bg-gray-500 w-[270px] h-[383px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}