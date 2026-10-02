import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/the-work")({
  beforeLoad: () => {
    throw redirect({ to: "/work" });
  },
  component: () => null,
});
