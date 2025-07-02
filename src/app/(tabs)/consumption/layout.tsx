export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">소비 기록</h1>
                <p className="text-lg/tight font-semibold">영수증 등록 페이지에서는 사용자가 보유한 영수증을 사진으로 업로드하여 간편하게 소비 내역을 기록할 수 있습니다.</p>
            </div>
            {children}
        </div>
    )
}