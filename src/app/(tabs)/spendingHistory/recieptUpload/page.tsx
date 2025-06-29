import Button from "@/components/Button";
import Input from "@/components/Input";

export default function UploadReceipt() {
    return (
        <div className="flex justify-around">
            <div className="bg-neutral-500 w-[432px] h-[600px]">

            </div>
            <div className="w-[432px] flex flex-col gap-4">
                <Input name="receipt" label="파일 명칭" placeholder="내용을 입력하세요" />
                <label>카테고리</label>
                <div>
                    태그들ㅁㄴㅇㅁㄴㅇㅁㄴㅇ
                </div>
                <Input name="day" label="날짜" placeholder="내용을 입력하세요" />
                <Input name="shop_name" label="가게 명칭" placeholder="내용을 입력하세요" />
                <Input name="price" label="금액" placeholder="내용을 입력하세요" />
                <Button text="등록하기" />
            </div>
        </div>
    )
}