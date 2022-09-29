import type { ModalProps } from "@mantine/core";
import { Button, CopyButton } from "@mantine/core";
import { Group, Paper } from "@mantine/core";
import { Text } from "@mantine/core";
import { Modal } from "@mantine/core";

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
      <Paper component={Group} withBorder p="lg">
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
      </Paper>
    </Modal>
  );
};

export default ShareModal;
