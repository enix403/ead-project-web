import { apiRoutes } from "~/app/api-routes";

import { UserOwnedCard } from "~/components/UserOwnedCard";
import { Button } from "~/components/Button/Button";
import { useResumableAction } from "~/app/hooks/useResumableAction";
import { reportedCall } from "~/app/utils/promises";

export function CandidateCard({ employee }: { employee: any }) {
  const employeeId = employee["_id"];

  const {
    isDone: isInvited,
    isExecuting: isInviting,
    isLoading,
    execute: invite,
  } = useResumableAction({
    executeFn: async (isInvited) => {
      if (!isInvited) {
        await reportedCall(apiRoutes.inviteEmployee({ employeeId }));
      }

      return true;
    },
    hydrateFn: async () => {
      const { invited } = await apiRoutes.isEmployeeInvited({ employeeId });
      return invited;
    },
    hydrateDeps: [employeeId],
  });

  return (
    <UserOwnedCard
      key={employee["_id"]}
      user={employee}
      actions={
        <>
          <Button
            fullRounded
            onClick={invite}
            loading={isInviting}
            disabled={isLoading || isInvited}
          >
            {isInvited === true ? "Already invited" : "Invite"}
          </Button>
          <Button fullRounded variant="outlined">
            Message
          </Button>
        </>
      }
    />
  );
}
