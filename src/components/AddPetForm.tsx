import { ActionIcon, Anchor, Button, Group, TextInput } from "@mantine/core";
import { useId, useState } from "react";
import { $api } from "../api/client";
import { PetStatus } from "../type/schema.d";
import { useNavigate } from "@tanstack/react-router";

type FormData = {
  name: string;
  photoUrls: string[];
};

const validateImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true); // ảnh load được
    img.onerror = () => resolve(false); // lỗi -> không phải ảnh
  });
};

export default function AddPetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    photoUrls: [],
  });
  const [photoInput, setPhotoInput] = useState<string>("");
  const { mutate } = $api.useMutation("post", "/pet", {
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });
  const { name, photoUrls } = formData;

  const handleOnChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onPhotoUrlsChange = async (e: any) => {
    const value = e.target.value;
    setPhotoInput(value);

    if (!value) return;

    const ok = await validateImageUrl(value);

    if (!ok) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      photoUrls: prev.photoUrls
        ? Array.from(new Set([...prev.photoUrls, value]))
        : [value],
    }));

    setPhotoInput("");
  };

  const onRemovePhotoUrl = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      photoUrls: prev.photoUrls?.filter((u) => u !== url),
    }));
  };

  const onSubmit = () => {
    console.log(formData);
    mutate({
      body: {
        id: Math.floor(100 + Math.random() * 900),
        name: formData.name,
        photoUrls: formData.photoUrls,
        status: PetStatus.available,
      },
    });
  };

  return (
    <>
      <p className="font-bold text-xl pb-4">Thêm 1 pet mới</p>
      <TextInput
        placeholder="name"
        label="Tên Pet"
        className="mb-4"
        name="name"
        value={name}
        onChange={handleOnChange}
      />
      <TextInput
        placeholder="photoUrls"
        label="Hình ảnh"
        name="photoUrls"
        value={photoInput}
        onChange={onPhotoUrlsChange}
      />

      {photoUrls && photoUrls.length > 0 && (
        <div className="mt-4 space-y-2">
          {photoUrls.map((url, idx) => (
            <Group key={idx}>
              <Anchor href={url} target="_blank" size="sm" className="flex-1">
                {url}
              </Anchor>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => onRemovePhotoUrl(url)}
              >
                x
              </ActionIcon>
            </Group>
          ))}
        </div>
      )}

      <Button onClick={onSubmit} className="mt-4">
        Thêm mới
      </Button>
    </>
  );
}
