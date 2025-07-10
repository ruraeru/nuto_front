import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getConsumeByGraph } from '@/api/dashboard';
import LoadingSpinner from './LoadingSpinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ILineChartProps {
    year: number;
    month: number;
}

const LineChart = ({ year, month }: ILineChartProps) => {
    const { data: chartData, isLoading } = useQuery({
        queryKey: ['consume-graph', year, month],
        queryFn: () => getConsumeByGraph(year, month)
    });

    const data = {
        labels: chartData?.labels || [],
        datasets: [
            {
                label: "",
                data: chartData?.data || [],
                borderColor: '#7CBBDE',
                borderWidth: 3,
                fill: false,
                tension: 0.4, // 선을 부드럽게 만드는 옵션
                pointRadius: 0, // 데이터 포인트 원 숨김
                cubicInterpolationMode: "monotone" as const // 타입 단언으로 정확한 타입 지정
            },
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category' as const, // 타입 단언 추가
                title: {
                    display: false,
                    text: '일',
                },
                grid: {
                    drawOnChartArea: false, // 차트 영역 내 세로 그리드 라인 제거
                    drawTicks: false, // x축 눈금 제거
                }
            },
            y: {
                title: {
                    display: false,
                    text: '값',
                },
                ticks: {
                    // stepSize: 50, // y축 간격 설정
                },
                border: {
                    display: false, // y축 메인 축 선 제거
                },
                grid: {
                    color: "#C1E7F0" // y축 수평 그리드 라인 색상
                },
                min: 1 // y축 최소값 1로 설정
            },
        },
        plugins: {
            legend: {
                display: false, // 범례 숨김
            },
            tooltip: {
                mode: 'index' as const, // 타입 단언 추가
                intersect: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    return <Line data={data} options={options} />;
};

export default LineChart;