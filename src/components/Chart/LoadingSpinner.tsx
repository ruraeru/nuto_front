export default function LoadingSpinner({ text = "차트 데이터 불러오는 중" }: { text?: string }) {
    return (
        <div className="flex flex-col animate-pulse gap-4 justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600" />
            <p>{text}...</p>
        </div>
    )
}