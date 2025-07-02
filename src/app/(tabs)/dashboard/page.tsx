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
import DoughnutChart from "@/components/Chart/Doughnut";

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
        // 이미지에 맞춰 레이블을 "1월", "2월", "3월", "4월"로 변경
        labels: ["1월", "2월", "3월", "4월"],
        datasets: [
            {
                // 이미지의 시각적 비율에 맞춰 데이터 값 조정 (총합 100)
                data: [25, 15, 30, 30],
                backgroundColor: [ // 이미지에 맞춰 배경 색상 변경
                    '#FFDAB9', // 1월 (밝은 살구색)
                    '#FCE4A7', // 2월 (아주 밝은 오렌지/노란색)
                    '#FF8C00', // 3월 (짙은 오렌지색)
                    '#FFA500'  // 4월 (주황색)
                ],
                // 조각 사이의 간격을 만들기 위해 테두리 색상을 흰색으로 설정
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF'
                ],
                borderWidth: 2, // 조각 사이의 간격 두께 설정 (이미지와 유사하게)
                hoverOffset: 10, // 마우스 호버 시 분리되는 효과
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // 범례 숨김 (하단 라벨 제거)
            },
            tooltip: { // 툴팁(마우스 오버 시 나타나는 정보) 설정
                callbacks: {
                    label: function (context) { // 툴팁에 표시될 레이블 형식 정의
                        const label = context.label || ''; // 데이터 레이블 (예: "1월")
                        // 데이터셋의 dataIndex를 사용하여 원본 데이터 값에 접근
                        const value = context.dataset.data[context.dataIndex];
                        // 퍼센트 기호 추가 (데이터가 퍼센트 값이라고 가정)
                        const percentage = value + '%';
                        return `${label}: ${percentage}`; // "1월: 25%" 형식으로 반환
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)', // 툴팁 배경색
                titleColor: '#fff', // 툴팁 제목 색상
                bodyColor: '#fff', // 툴팁 본문 색상
                padding: 10, // 툴팁 패딩
                displayColors: false, // 툴팁 내 색상 박스 숨김
            },
            datalabels: { // chartjs-plugin-datalabels 설정
                color: '#FFFFFF', // 라벨 색상을 흰색으로 설정 (이미지와 동일)
                formatter: (value, context) => {
                    // 각 조각에 해당하는 레이블 (예: "1월")을 반환
                    return context.chart.data.labels[context.dataIndex];
                },
                font: {
                    weight: 'bold', // 폰트 두께를 bold로 설정
                    size: 16,      // 폰트 크기 설정
                },
                // 텍스트 그림자 추가 (이미지에서 약간의 그림자가 보임)
                textShadowBlur: 2,
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
            }
        },
        responsive: true, // 차트 크기를 부모 컨테이너에 맞게 조절
        maintainAspectRatio: false, // 반응형일 때 가로세로 비율 유지 안 함 (높이 조절 가능)
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex justify-center gap-6">
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
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-semibold text-2xl">올해 내 소비는?</p>
                    </div>
                    <div className="border-2 border-[#C1E7F0] shadow-xl rounded-2xl place-items-center w-[270px] h-[235px]">
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
                            <p className="font-semibold text-2xl">한달 소비 내역</p>
                            <Link href="/dashboard/spendingHistory">모두 보기</Link>
                        </div>
                        <div className="h-[463px] border-2 border-[#C1E7F0] rounded-2xl shadow-2xl p-3">
                            <table className="w-full">
                                <caption className="text-left p-5 text-black font-semibold text-2xl border-b-2 border-[#C1E7F0]">2025.04 소비 내역</caption>
                                <thead className="border-b-2 border-[#C1E7F0]">
                                    <tr className="*:p-3">
                                        <th>이름</th>
                                        <th>금액</th>
                                        <th>카드</th>
                                        <th>날짜</th>
                                        <th>카테고리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center font-medium *:border-b-1 *:border-[#C1E7F0] *:last:border-none ">
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col justify-center gap-4">
                        <div className="mb-4 flex flex-col gap-4">
                            <p className="font-semibold text-2xl">이번달 내 지출은?</p>
                            <div className=" bg-gradient-to-tr from-[#7CBBDE] to-[#C1E7F0] w-[270px] h-[235px] rounded-2xl shadow-xl
                            flex flex-col justify-center items-center text-white
                            ">
                                <p>저번달 대비</p>
                                <p className="font-semibold text-4xl py-3">100,000원</p>
                                <p>더 지출하였습니다</p>
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col gap-4">
                            <p className="font-semibold text-2xl">이번달 내 수익은?</p>
                            <div className=" bg-gradient-to-tr from-[#7CBBDE] to-[#C1E7F0] w-[270px] h-[235px] rounded-2xl shadow-xl
                            flex flex-col justify-center items-center text-white
                            ">
                                <p>저번달 대비</p>
                                <p className="font-semibold text-4xl py-3">50,000원</p>
                                <p>줄었습니다</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="mb-4">
                                <p className="font-semibold text-2xl">카테고리별 소비</p>
                            </div>
                            <div className="border-2 border-[#C1E7F0] rounded-2xl w-[270px] h-[383px] p-5 shadow-xl">
                                <DoughnutChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}