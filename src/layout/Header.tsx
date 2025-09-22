import { Input } from "@mantine/core";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useContextPet } from "../context/PetContext";

export default function Header() {
  const { dispatch } = useContextPet();
  const [input, setInput] = useState<string>("");
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);

    // hủy debounce trước đó nếu có
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    // debounce 0.5s trước khi gọi setPetId
    typingTimer.current = setTimeout(() => {
      const id = parseInt(value);
      // setPetId(!isNaN(id) ? id : null);
      dispatch({
        type: "SEARCH_PARAMS",
        payload: {
          petId: !isNaN(id) ? id : undefined,
        },
      });
    }, 500);
  };

  return (
    <div className="flex justify-between items-center gap-12 p-6 bg-slate-700">
      <Link to="/" className="text-white font-bold text-3xl cursor-pointer">
        PetShop
      </Link>
      <Input
        placeholder="Tìm theo ID Pet"
        w={700}
        size="lg"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <div className="text-white/80 font-bold">
        <span>Nguyễn Minh Nhật</span>
      </div>
    </div>
  );
}
