import { createFileRoute } from "@tanstack/react-router";
import Pet from "../components/Pet";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Pet />;
}
