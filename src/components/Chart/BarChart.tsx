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


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = () => {
    const data = {
        labels: Array(31).fill(1).map((i, idx) => i + idx),
        datasets: [
            {
                label: '데이터',
                data: [
                    15000, 23000, 5000, 30000, 12000, 8000, 45000,
                    18000, 27000, 6000, 35000, 14000, 9000, 50000,
                    20000, 22000, 7000, 28000, 11000, 10000, 40000,
                    16000, 25000, 4000, 32000, 13000, 7000, 48000,
                    19000, 21000, 9500
                ],
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


    return <Bar data={data} options={options} />;
};


export default BarChart;
