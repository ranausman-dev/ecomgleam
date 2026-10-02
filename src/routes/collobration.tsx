import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/collobration")({
  beforeLoad: () => {
    throw redirect({ to: "/collaboration" });
  },
  component: () => null,
});
