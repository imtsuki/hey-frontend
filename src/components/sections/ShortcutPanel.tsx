import { Card } from "../Card";
import { CreateMissionModal } from "./CreateMissionModal";
import { EditPasswordModal } from "./EditPasswordModal";
import { EditMissionModal } from "./EditMissionModal";
import { Button, useToast } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CreateOrEditApplicationModal } from "./CreateOrEditApplicationModal";

const CreateMissionShortcut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>发布召集令</Button>
      <CreateMissionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const EditMissionShortcut: React.FC<{
  missionId: string;
  missionTitle: string;
  missionPeople: number;
  missionType: string;
  missionDescription: string;
}> = ({
  missionId,
  missionTitle,
  missionPeople,
  missionType,
  missionDescription,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div>
        <Button onClick={onOpen}>修改召集令</Button>
        <EditMissionModal
          isOpen={isOpen}
          onClose={onClose}
          missionId={missionId}
          missionTitle={missionTitle}
          missionType={missionType}
          missionPeople={missionPeople}
          missionDescription={missionDescription}
        />
      </div>
      <Button
        colorScheme="red"
        lineHeight="1"
        size="md"
        onClick={() => {
          fetch(`/api/mission/${missionId}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              Authorization:
                "Bearer " + String(localStorage.getItem("accessToken")),
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                toast({ title: "删除失败" });
              }
            })
            .then((res) => {
              toast({ title: "删除成功" });
              console.log(res);
            })
            .catch((err) => {
              toast({ title: "删除失败", description: err.message });
            });
        }}
      >
        删除召集令
      </Button>
    </>
  );
};

export const CreateOrEditApplicationShortcut: React.FC<{
  missionId: string;
  description?: string;
  isEditing?: boolean;
  applicationId?: string;
}> = ({
  missionId,
  description = "",
  isEditing = false,
  applicationId = "",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{isEditing ? "修改请求" : "我要接令"}</Button>
      <CreateOrEditApplicationModal
        isOpen={isOpen}
        onClose={onClose}
        description={description}
        missionId={missionId}
        isEditing={isEditing}
        applicationId={applicationId}
      />
    </>
  );
};

const EditPasswordShortcut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>修改密码</Button>
      <EditPasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const ShortcutPanel = () => (
  <Card width="100%">
    <HStack justify="center">
      <CreateMissionShortcut />
      <EditPasswordShortcut />
    </HStack>
  </Card>
);
