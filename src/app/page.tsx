export default function Home() {
  return (
    <div>
      <header className="flex justify-around items-center h-20 bg-amber-300">
        <div>
          햄버거
        </div>
        <div className="text-5xl font-extrabold">
          nuto
        </div>
        <div>
          Login
        </div>
      </header>
      <main>
        <section className="flex items-center h-screen max-h-96">
          <div className="flex justify-around items-center w-full">
            <div className="flex-col">
              <h1 className="text-6xl">똑똑한 <span className="text-green-400">”</span>소비<span className="text-green-400">”</span>의 비결</h1>
              <h1 className="text-6xl text-cyan-300 mb-4">스마트소비</h1>
              <p>#내가쓰는 #돈은 #어디로</p>
            </div>
            <div>
              <div className="text-right mb-4">
                <p>나도 모르는 소비습관을</p>
                <p>하나부터 열까지 정리해드립니다.</p>
              </div>
              <div className="bg-neutral-400 p-3 rounded-3xl float-right">
                <button>
                  소비습관 보러 가기 &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
