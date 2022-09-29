import { ActionIcon } from "@mantine/core";
import { IconShare } from "@tabler/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

const ShareModal = dynamic(() => import("./ShareModal"), { ssr: false });

const ShareButton = () => {
  const [shareModalOpen, setshareModalOpen] = useState(false);

  return (
    <>
      <ActionIcon
        variant="outline"
        size="xl"
        radius="xl"
        onClick={() => setshareModalOpen(true)}
      >
        <IconShare />
      </ActionIcon>
      <ShareModal
        opened={shareModalOpen}
        onClose={() => setshareModalOpen(false)}
      />
    </>
  );
};

export default ShareButton;
