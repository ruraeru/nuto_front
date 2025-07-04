import Image from 'next/image';
import Link from 'next/link';

const Tags = ({ tagItems }: { tagItems: string[] }) => {
  return (
    <div className="flex gap-2 mb-8 *:bg-[#FFC21F] *:hover:bg-white *:hover:outline-[#F68701] *:hover:outline-2">
      {tagItems.map((tag, index) => (
        <span key={index} className="px-3 py-1 rounded-full text-sm">#{tag}</span>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <main className='bg-gray-50'>
      {/* Main Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="size-[200px] mb-6 relative">
                <Image src={"/nuto_symbol.svg"} alt='nuto_symbol' width={200} height={200} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              누구나 쉽게 시작할 수 있는<br />
              소비 관리
            </h1>
            <h2 className="text-5xl font-bold text-[#89C1E2] mb-6">
              토닥토닥 nuto
            </h2>
            <Tags tagItems={["내가쓰는", "돈은", "어디로"]} />
          </div>
          <div className="lg:w-1/2 text-center lg:text-right font-semibold text-lg">
            <div className="p-8">
              <p className="text-black mb-4">
                nuto와 함께할 누구나<br />
                똑똑한 소비습관 소비 습관
              </p>

              <Link href="/home" className="w-[218px] h-[60px] inline-flex items-center bg-[#89C1E2] text-white rounded-full text-base font-medium px-6 py-3 hover:bg-[#89C1E2]/80 transition-colors">
                소비 습관 만들러 가기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col justify-between lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-5xl text-nowrap font-bold text-gray-900 mb-6 leading-tight">
              나만을 위한<br />
              소비 대시보드를<br />
              간편하게 확인해보세요!
            </h2>
            <Tags tagItems={["내가쓰는", "돈은", "어디로"]} />
          </div>
          <div className="lg:w-2/3 max-w-[580px]">
            <div className="bg-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-400 rounded flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 3h18v18H3zM9 9h6v6H9z" strokeWidth="2" />
                  </svg>
                </div>
                <p>대시보드 이미지</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">대시보드 관리?<br />하나도 어렵지 않아요!</h2>
            <p className="font-semibold mb-4">소비내역을 사진으로 등록하여 <br />손쉽게 기록해요</p>
            <Tags tagItems={["영수증 등록", "카드 내역서", "소비 내역"]} />
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-200 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-400 rounded flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14.828 14.828L21 21M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" strokeWidth="2" />
                  </svg>
                </div>
                <p>관리 도구 이미지</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Products Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            복잡한 금융상품을 한눈에
          </h2>
          <p className="font-semibold mb-2">내 소비습관을 분석해 맞춤형 <br /> 금융 상품을 추천해요</p>
        </div>

        <div className="flex justify-between gap-6">
          <Image src={"/financial_img.svg"} alt='나의 소비 패턴에 최적화된 신용카드를 찾아보세요' width={306} height={400} className='w-[306px] h-[400px]' />
          <Image src={"/financial_img2.svg"} alt='저축 및 적금 상품 이미지' width={306} height={400} className='w-[306px] h-[400px]' />
          <Image src={"/financial_img3.svg"} alt='투자 상품 추천 이미지' width={306} height={400} className='w-[306px] h-[400px]' />
        </div>
      </section>
    </main>
  );
}