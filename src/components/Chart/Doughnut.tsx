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
    // 도넛 차트 데이터 정의
    const data = {
        // 이미지에 맞춰 레이블 변경
        labels: ["식비", "취미생활", "교통", "기타"],
        datasets: [
            {
                // 이미지에 맞춰 데이터 값 변경 (총합 100)
                data: [43, 27, 16, 33], // 이미지 비율에 맞춰 데이터 조정
                backgroundColor: [ // 이미지에 맞춰 배경 색상 변경
                    '#FF8C00', // 식비 (짙은 오렌지색)
                    '#FFDAB9', // 취미생활 (밝은 살구색)
                    '#FFA500', // 교통 (주황색)
                    '#FCE4A7'  // 기타 (아주 밝은 오렌지/노란색)
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

    // 도넛 차트 옵션 정의
    const options = {
        plugins: {
            legend: {
                display: false, // 범례 숨김 (이미지와 동일)
            },
            tooltip: { // 툴팁(마우스 오버 시 나타나는 정보) 설정
                callbacks: {
                    label: function (context) { // 툴팁에 표시될 레이블 형식 정의
                        const label = context.label || '';
                        const value = context.dataset.data[context.dataIndex];
                        const percentage = value + '%';
                        return `${label}: ${percentage}`;
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                displayColors: false,
            },
            datalabels: { // chartjs-plugin-datalabels 설정 (중앙 텍스트를 위해 비활성화)
                display: false, // 이미지에서는 차트 조각 위에 라벨이 없으므로 비활성화
            },
            // 중앙 텍스트 플러그인 옵션을 여기에 정의합니다.
            centerText: {
                display: true,
                text: '360,000' // 이미지의 중앙 텍스트
            }
        },
        responsive: true,
        // maintainAspectRatio: false,
        cutout: '80%', // 도넛 차트의 중앙 구멍 크기 (이미지와 유사하게)
    };

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
                            // chart.options.plugins.centerText를 통해 커스텀 옵션에 접근
                            const centerTextOptions = chart.options.plugins.centerText;

                            if (centerTextOptions && centerTextOptions.display) {
                                const { ctx, width, height } = chart;
                                ctx.restore();
                                const fontSize = (height / 114).toFixed(2);
                                ctx.font = `bold ${fontSize}em Inter`; // 폰트 설정
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = '#333'; // 텍스트 색상 (어두운 회색)

                                const text = centerTextOptions.text; // centerTextOptions.text로 접근
                                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                                const textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                    }]}
                />
            </div>
            {/* 이미지 하단의 라벨 목록 */}
            <div className="mt-8 text-left w-full">
                {data.labels.map((label, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center">
                            {/* 색상 원 */}
                            <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                            ></span>
                            <span className="text-gray-700 text-base">{label}</span>
                        </div>
                        <span className="text-gray-900 font-medium text-base">{data.datasets[0].data[index]}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
