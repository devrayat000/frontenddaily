import type { ModalProps } from "@nextui-org/react";
import { Button, CopyButton } from "@nextui-org/react";
import { Group, Paper } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Modal } from "@nextui-org/react";

import { useDrawerStyles } from "../home/FilterDrawer/drawer";

export type ShareModalProps = ModalProps;

const ShareModal: React.FC<ShareModalProps> = (props) => {
  const { classes } = useDrawerStyles();

  return (
    <Modal
      centered
      withinPortal
      title={
        <Text component="p" weight={600} size="lg">
          Share this project
        </Text>
      }
      closeButtonLabel="Close Sharing"
      classNames={{ close: classes.filter }}
      padding="xl"
      size={"fit-content"}
      {...props}
    >
      <Text component="em">Or,</Text>
      <Paper withBorder p="lg">
        <Group>
          <Text
            component="p"
            my={0}
            sx={{
              textOverflow: "ellipsis",
              width: "75%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            {window.location.href}
          </Text>
          <CopyButton value={window.location.href}>
            {({ copy }) => (
              <Button color="gray" variant="light" onClick={copy}>
                Copy
              </Button>
            )}
          </CopyButton>
        </Group>
      </Paper>
    </Modal>
  );
};

export default ShareModal;
