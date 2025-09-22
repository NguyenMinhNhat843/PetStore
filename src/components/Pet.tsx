import { Badge, Button, Card, Group, Image, Select, Text } from "@mantine/core";
import { useEffect } from "react";
import {
  components,
  PathsPetFindByStatusGetParametersQueryStatus as PetStatus,
} from "../type/schema.d";
import { $api } from "../api/client";
import { Link } from "@tanstack/react-router";
import { useContextPet } from "../context/PetContext";

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
  const { state, dispatch } = useContextPet();
  const { pets, searchParams } = state;
  const { status, petId } = searchParams;

  const onChangeStatus = (value: PetStatus) => {
    if (value) {
      dispatch({
        type: "SEARCH_PARAMS",
        payload: {
          status: value,
        },
      });
    }
  };

  const query = petId
    ? $api.useQuery(
        "get",
        "/pet/{petId}",
        {
          params: { path: { petId } },
        },
        {
          staleTime: 5 * 60 * 1000,
          retry: false,
        }
      )
    : $api.useQuery(
        "get",
        "/pet/findByStatus",
        {
          params: { query: { status: status ? status : PetStatus.available } },
        },
        {
          staleTime: 5 * 60 * 1000,
          retry: false,
        }
      );

  const { data, isLoading, error } = query;

  useEffect(() => {
    if (data) {
      const normalized = Array.isArray(data) ? data : [data];
      dispatch({ type: "SET_PETS", payload: normalized });
    }
  }, [data, dispatch]);

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Lỗi: {error}</span>;

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
        onChange={(value) => onChangeStatus(value as PetStatus)}
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
