import { queryClient } from "@/api/client";
import { sessionMutation } from "@/api/mutations/session";
import { sessionQuery } from "@/api/queries/session";
import { EmptyState } from "@/components/empty-state";
import { CreateSession } from "@/components/features/create-session";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(
      sessionQuery.getAllSessionsQuery(),
    );
  },
  component: Index,
});

function Index() {
  const { data: sessions } = useQuery(sessionQuery.getAllSessionsQuery());

  const { mutate } = useMutation({
    mutationFn: sessionMutation.deleteSession,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: sessionQuery.keys.sessions(),
      });
    },
  });

  if (!sessions) {
    return <div>Loading...</div>;
  }

  if (Object.keys(sessions).length === 0) {
    return (
      <EmptyState message="No sessions found!">
        <CreateSession />
      </EmptyState>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {Object.values(sessions).map((s) => (
            <div
              key={s.id}
              className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center items-center gap-2"
              title={s.name}
            >
              <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight line-clamp-1 text-center">
                {s.name}
              </h4>
              <div className="flex gap-2">
                <Button asChild size="lg">
                  <Link
                    to="/session/$sessionId"
                    params={{
                      sessionId: s.id,
                    }}
                  >
                    Enter
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => mutate(s.id)}
                >
                  Terminate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
