import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/*Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">nuto</h1>
        <Link href="/login" className="text-sm">Login</Link>
      </header>

      <main className='*:mb-96 mt-36'>
        {/*Main title */}
        <section className="py-12 px-4 max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-5xl">똑똑한 <span className="text-green-400">”</span>소비<span className="text-green-400">”</span>의 비결</h2>
              <h3 className="text-2xl font-bold text-blue-500 mb-4">스마트소비</h3>
              <p className="text-sm text-gray-600 mb-4">#내가쓰는 #돈은 #어디로</p>
            </div>
            <div className="text-right md:w-1/2  rounded-lg p-6">
              <p className="text-sm mb-4">나도 모르는 소비습관을<br />하나부터 열까지 정리해드립니다.</p>
              <p></p>
              <Link href="/smart-spending" className="inline-flex items-center text-sm bg-gray-300 rounded-full px-6 py-2">
                소비습관 보러 가기 &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/*Manage Dashboard section */}
        <section className="py-8 px-4 max-w-screen-lg mx-auto">
          <div className='flex justify-around'>
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">나만을 위한<br />소비 대시보드를<br />간편하게 확인해보세요!</h2>
              </div>
              <div className="w-full md:w-1/3 bg-gray-200 rounded-lg p-4 flex items-center justify-center h-40">
                <div className="w-16 h-16 border border-gray-400 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 18L12 14L16 18" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11L12 7L16 11" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 bg-gray-200 rounded-lg p-4 flex items-center justify-center h-80">
              <div className="w-16 h-16 border border-gray-400 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 18L12 14L16 18" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 11L12 7L16 11" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/*bank product section */}
        <section className="py-8 px-4 max-w-screen-lg mx-auto flex justify-between">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-1">대시보드 관리?</h2>
            <h3 className="text-lg font-bold mb-4">하나도 어렵지 않아요!</h3>
            <p className="text-sm text-gray-600 mb-2">사진으로 돈독하는 절약</p>
            <p className="text-sm text-gray-600">#영수증 #카드 내역서 #계좌이체</p>
          </div>
          <div className="w-1/2 bg-gray-200 rounded-lg p-4 flex items-center justify-center h-40">
            <div className="w-16 h-16 border border-gray-400 flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 18L12 14L16 18" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11L12 7L16 11" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* Financial Products Section */}
        <section className="py-8 px-4 max-w-screen-lg mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">똑같한 금융상품을 한눈에</h2>
            <p className="text-sm text-gray-600 mb-2">대시보드를 통해 나를 위한 금융상품을 찾고</p>
            <p className="text-sm text-gray-600">#액티브 #패시브</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-40">
                <div className="w-16 h-16 border border-gray-400 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 18L12 14L16 18" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11L12 7L16 11" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 mt-8 bg-gray-200">
        <div className="max-w-screen-lg mx-auto px-4">
          Footer
        </div>
      </footer>
    </div>
  );
}