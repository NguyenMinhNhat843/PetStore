import { createFileRoute } from "@tanstack/react-router";
import AddPetForm from "../../components/AddPetForm";
import { Container } from "@mantine/core";

export const Route = createFileRoute("/pet/addPet")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container size={"sm"}>
      <AddPetForm />
    </Container>
  );
}
