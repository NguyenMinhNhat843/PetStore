import { Badge, Button, Card, Group, Image, Select, Text } from "@mantine/core";
import { useState } from "react";
import {
  components,
  PathsPetFindByStatusGetParametersQueryStatus as PetStatus,
} from "../type/schema.d";
import { $api } from "../api/client";
import { useContextPet } from "../context/PetContext";
import { Link } from "@tanstack/react-router";

function isValidUrl(url?: string) {
  if (!url) return false;
  try {
    new URL(url); // nếu không throw -> URL hợp lệ
    return true;
  } catch {
    return false;
  }
}

export default function Pet() {
  const { petId } = useContextPet();
  const [status, setStatus] = useState<PetStatus>(PetStatus.available);

  const { data, error, isLoading } = petId
    ? $api.useQuery(
        "get",
        "/pet/{petId}",
        {
          params: { path: { petId } },
        },
        {
          // staleTime: 5 * 60 * 1000,
          retry: false,
        }
      )
    : $api.useQuery(
        "get",
        "/pet/findByStatus",
        { params: { query: { status } } },
        {
          staleTime: 5 * 60 * 1000,
          retry: false,
        }
      );

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Lỗi: {error}</span>;

  const pets = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div>
      <Link to="/pet/addPet">
        <Button variant="filled">Thêm Pet</Button>
      </Link>
      <Select
        label="Trạng thái"
        placeholder="Pick value"
        autoSelectOnBlur
        searchable
        data={Object.values(PetStatus)}
        value={status}
        onChange={(value) => {
          console.log(value);
          if (value) {
            setStatus(value as PetStatus);
          }
        }}
        className="pb-6 w-[300px]"
      />
      <div className="grid grid-cols-5 gap-4 ">
        {pets &&
          pets.map((pet: components["schemas"]["Pet"]) => {
            const a = Array.isArray(pet.photoUrls);
            if (!a) {
              console.log(JSON.stringify(pet, null, 2));
            }
            return (
              <Card shadow="sm" withBorder key={pet.id}>
                <Card.Section>
                  <Image
                    src={
                      isValidUrl(pet.photoUrls?.[0])
                        ? pet.photoUrls![0]
                        : "/image_error.png"
                    }
                    alt={pet.name}
                  />
                </Card.Section>

                <Text fw={500}>{pet.name}</Text>
                <Group mt="md" mb="xs">
                  <Badge color="pink">{pet.status}</Badge>
                  <Badge color="blue">{pet.category?.name}</Badge>
                  {pet.tags !== undefined &&
                    pet.tags.length > 0 &&
                    pet.tags
                      .filter(
                        (tag: components["schemas"]["Tag"]) =>
                          tag.name?.trim() !== ""
                      ) // chỉ giữ tag có name khác rỗng
                      .map((tag: any) => (
                        <Badge key={tag.id} color="blue">
                          {tag.name}
                        </Badge>
                      ))}
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord
                  landscapes with tours and activities on and around the fjords
                  of Norway
                </Text>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
