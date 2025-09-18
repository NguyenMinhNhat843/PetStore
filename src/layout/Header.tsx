import { Button, Input } from "@mantine/core";
import { useState } from "react";

export default function Header() {
  const [textSearch, setTextSearch] = useState<string>("");

  const petId = parseInt(textSearch);

  // const query = $api.useQuery("get", "/pet/{petId}", {
  //   params: { path: { petId } },
  //   enabled: false, // không chạy tự động
  // });

  // const handleSearch = () => {
  //   if (!petId) return alert("Nhập petId trước!");
  //   query.refetch(); // trigger fetch
  // };

  // if (error) return <span>{error}</span>;

  // if (isLoading) return <span>Loading...</span>;

  return (
    <div className="flex justify-between items-center gap-12 p-6 bg-slate-700">
      <span className="text-white font-bold text-3xl cursor-pointer">
        PetShop
      </span>
      <Input
        placeholder="Input component"
        w={700}
        size="lg"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
      />
      <Button>Search</Button>
      <div className="text-white/80 font-bold">
        <span>Nguyễn Minh Nhật</span>
      </div>
    </div>
  );
}
