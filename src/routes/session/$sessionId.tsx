import { queryClient } from "@/api/client";
import { sessionMutation } from "@/api/mutations/session";
import { sessionQuery } from "@/api/queries/session";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/session/$sessionId")({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      sessionQuery.getDetailsQuery(params.sessionId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { sessionId } = Route.useParams();
  const { data: session } = useQuery(sessionQuery.getDetailsQuery(sessionId));

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (session) {
        sessionMutation.attachSession(session);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: sessionQuery.keys.sessions(),
      });
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect need to be called just once
  useEffect(() => {
    mutate();
  }, []);

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  if (session === null) {
    return (
      <EmptyState message="No session found!">
        <Button asChild size="lg">
          <Link to="/">Back to dashboard</Link>
        </Button>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col justify-center flex-1 items-center gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Name: {session.name}
      </h1>
      <p>ID: {session.id}</p>
    </div>
  );
}
