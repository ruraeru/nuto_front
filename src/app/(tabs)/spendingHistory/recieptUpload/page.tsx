import Button from "@/components/Button";
import Input from "@/components/Input";
import TagInput from "@/components/TagInput";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function UploadReceipt() {
    return (
        <div className="flex justify-between gap-6">
            <div className="w-[432px] h-[600px] rounded-2xl border-1 border-[#D1D1D1] flex justify-center items-center">
                <PlusIcon width={85} color="#D1D1D1" />
            </div>
            <form className="w-[432px] flex flex-col gap-6">
                <Input name="receipt" label="파일 명칭" placeholder="파일 이름을 작성해주세요" />
                <TagInput />
                <Input name="day" label="날짜" placeholder="날짜를 작성해주세요"
                    defaultValue={new Date().toISOString().substring(0, 10)} type="date"
                />
                <Input name="shop_name" label="가게 명칭" placeholder="가게 명칭을 작성해주세요" />
                <Input name="price" label="금액" placeholder="금액을 작성해주세요" />
                <Button text="등록하기" />
            </form>
        </div>
    )
}