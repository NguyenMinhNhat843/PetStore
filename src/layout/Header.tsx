import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { useContextPet } from "../context/PetContext";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const { setPetId } = useContextPet();
  const [input, setInput] = useState<string>("");

  const handleSearchById = () => {
    const id = parseInt(input);
    if (!isNaN(id)) {
      setPetId(id);
    } else {
      setPetId(null);
    }
  };

  return (
    <div className="flex justify-between items-center gap-12 p-6 bg-slate-700">
      <Link to="/" className="text-white font-bold text-3xl cursor-pointer">
        PetShop
      </Link>
      <Input
        placeholder="Input component"
        w={700}
        size="lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSearchById}>Search</Button>
      <div className="text-white/80 font-bold">
        <span>Nguyễn Minh Nhật</span>
      </div>
    </div>
  );
}
