import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='bg-gray-50'>
      {/* Main Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="size-[200px] mb-6 relative">
                <Image src={"/nuto_Simbol.svg"} alt='nuto_simbol' width={200} height={200} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              누구나 쉽게 시작할 수 있는<br />
              소비 관리
            </h1>
            <h2 className="text-5xl font-bold text-blue-500 mb-6">
              토닥토닥 nuto
            </h2>
            <div className="flex gap-2 mb-8">
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#내가쓰는</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#돈은</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#어디로</span>
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-right font-semibold text-lg">
            <div className="p-8">
              <p className="text-black mb-4">
                nuto와 함께할 누구나<br />
                똑똑한 소비습관 소비 습관
              </p>

              <Link href="/home" className="w-[218px] h-[60px] inline-flex items-center bg-blue-300 text-white rounded-full text-base font-medium px-6 py-3 hover:bg-blue-400 transition-colors">
                소비 습관 만들러 가기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
              나만을 위한<br />
              소비 대시보드를<br />
              간편하게 확인해보세요!
            </h2>
            <div className="flex gap-2 mb-6">
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#내가쓰는</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#돈은</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#어디로</span>
            </div>
          </div>
          <div className="lg:w-2/3">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">대시보드 관리?</h2>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">하나도 어렵지 않아요!</h3>
            <p className="text-gray-600 mb-2">소비내역을 사진으로 등록하여</p>
            <p className="text-gray-600 mb-4">손쉽게 기록해요</p>
            <div className="flex gap-2">
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#영수증 등록</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#카드 내역서</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">#소비 내역</span>
            </div>
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
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            복잡한 금융상품을 한눈에
          </h2>
          <p className="text-gray-600 mb-2">내 소비습관을 분석해 맞춤형</p>
          <p className="text-gray-600">금융 상품을 추천해요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">나의 소비 패턴을</h3>
            <p className="text-sm text-gray-600">신용카드로 확인하세요</p>
          </div>

          <div className="bg-blue-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">소비할 분석에 어울 지출을</h3>
            <p className="text-sm text-gray-600">효과적으로 관리할 수 있는</p>
            <p className="text-sm text-gray-600">적합 및 적금 상품을</p>
            <p className="text-sm text-gray-600">찾아보세요</p>
          </div>

          <div className="bg-blue-300 rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">소비 여력을 바탕으로</h3>
            <p className="text-sm text-gray-600">스마트한 사회를 수 있는</p>
            <p className="text-sm text-gray-600">투자 상품을 추천해 드립니다</p>
          </div>
        </div>
      </section>
    </main>
  );
}