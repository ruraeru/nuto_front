"use clinet"

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getCardsConsumeHistory } from '@/lib/fetchChartData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = () => {
    const { data: cards, isLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: getCardsConsumeHistory
    });

    const data = {
        labels: cards?.labels,
        datasets: [
            {
                data: cards?.data,
                backgroundColor: '#7CBBDE', // 막대 색상
            },
        ],
    };


    const options = {
        scales: {
            x: {
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
                    stepSize: 5000, // y축 간격 설정 (숫자 데이터에 맞춰 조정)
                    callback: function (value: number, index: number, ticks: any) {
                        return value.toLocaleString(); // y축 값에 쉼표 표시
                    }
                },
                border: {
                    display: false,
                },
                grid: {
                    color: "#C1E7F0"
                },
                min: 0 // y축 최소값 0으로 설정
            },
        },
        plugins: {
            legend: {
                display: false, // 범례 숨김
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';


                        if (context.parsed.y !== null) {
                            label += ': ' + context.parsed.y.toLocaleString() + ' 원'; // 툴팁 값에 쉼표와 단위 추가
                        }
                        return label;
                    }
                }
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    if (isLoading) {
        return <div>차트 데이터 불러오는 중....</div>
    }

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
};


export default BarChart;
