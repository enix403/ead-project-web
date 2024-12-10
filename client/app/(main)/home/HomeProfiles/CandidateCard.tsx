import { ApiReplyError, apiRoutes } from "~/app/api-routes";

import { UserOwnedCard } from "~/components/UserOwnedCard";
import { Button } from "~/components/Button/Button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export function CandidateCard({ employee }: { employee: any }) {
  const [isInviting, setIsInviting] = useState(false);
  const [isInvited, setIsInvited] = useState<boolean | "waiting">("waiting");

  useEffect(() => {
    async function checkInvitation() {
      setIsInvited("waiting");
      try {
        // ...
        const { invited } = await apiRoutes.isEmployeeInvited({
          employeeId: employee["_id"]
        });
        setIsInvited(invited);
      } catch {}
    }
    checkInvitation();
  }, [employee]);

  async function invite() {
    setIsInviting(true);
    try {
      const responsePromise = apiRoutes.inviteEmployee({
        employeeId: employee["_id"]
      });
      await toast.promise(responsePromise, {
        loading: "Inviting...",
        success: (reply) => reply["message"],
        error: (error) => ApiReplyError.userMessage(error),
      });
      setIsInvited(true);
    } catch (err) {
      if (ApiReplyError.check(err)) {
        if (err.errorCode == "already_invited") {
          setIsInvited(true);
        }
      }
    } finally {
      setIsInviting(false);
    }
  }

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
            disabled={isInvited === true || isInvited === "waiting"}
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
