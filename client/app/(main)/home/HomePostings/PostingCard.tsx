import { Button } from "~/components/Button/Button";
import { UserOwnedCard } from "~/components/UserOwnedCard";
import { apiRoutes } from "~/app/api-routes";
import { useResumableAction } from "~/app/hooks/useResumableAction";
import { reportedCall } from "~/app/utils/promises";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export function PostingCard({
  posting,
  isBestMatch,
  isFavourite = false,
  setIsFavourite,
}: {
  posting: any;
  isBestMatch?: boolean;
  isFavourite?: boolean;
  setIsFavourite?: (fav: boolean) => void;
}) {
  /* ======================= */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Modal handlers for buttons
  const [modalHandlers, setModalHandlers] = useState<any>({
    handleOk: null,
    handleCancel: null,
  });

  // Function to handle the async inputCV process
  const inputCV = async () => {
    return new Promise((resolve) => {
      setIsModalOpen(true);

      const handleOk = () => {
        setIsModalOpen(false);
        resolve(file); // Resolve with the uploaded file
      };

      const handleCancel = () => {
        setIsModalOpen(false);
        resolve(null); // Resolve with null if the user cancels
      };

      setModalHandlers({ handleOk, handleCancel });
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  /* ======================= */

  const postingId = posting["_id"];

  const {
    isDone: isApplied,
    isExecuting: isApplying,
    isLoading,
    execute: apply,
  } = useResumableAction({
    executeFn: async (isApplied) => {
      if (!isApplied) {
        if (!(await inputCV()))
          return false;

        await reportedCall(
          apiRoutes.applyToJob({
            postingId: postingId,
            answers: [],
          })
        );
      }

      return true;
    },
    hydrateFn: async () => {
      const { applied } = await apiRoutes.isPostingApplied(postingId);
      return applied;
    },
    hydrateDeps: [postingId],
  });

  return (
    <>
      <UserOwnedCard
        user={posting?.poster}
        title={posting?.title}
        subtitle={posting?.description}
        tag={isBestMatch && "Best Match"}
        withFavouriteToggle
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
        actions={
          <>
            <Button
              fullRounded
              onClick={apply}
              loading={isApplying}
              disabled={isLoading || isApplied}
            >
              {isApplied === true ? "Already Applied" : "Apply"}
            </Button>
            <Link href={`/chat/${posting?.poster["_id"]}`}>
              <Button fullRounded variant="outlined">
                Message
              </Button>
            </Link>
          </>
        }
      />
      <Dialog
        open={isModalOpen}
        onClose={() => {}}
        className="fixed inset-0 z-50 bg-transparent flex items-center justify-center overflow-y-auto"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 mx-4 sm:max-w-lg sm:w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            Upload Your CV
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Please select a file to upload as your CV.
          </Dialog.Description>

          <div className="mt-4 flex items-center space-x-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              id="file_input"
              onChange={handleFileChange}
              type="file"
            />

            {file && (
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {file.name}
              </span>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={modalHandlers.handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={modalHandlers.handleOk}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
