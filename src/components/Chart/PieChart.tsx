import { Pie } from "react-chartjs-2";

export default function PieChart() {
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
        <Pie
            options={options}
            data={data}
            height={300} // 필요에 따라 높이 조절
        />
    )
}