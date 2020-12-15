import { Card } from '../Card';
import { CreateMissionModal } from './CreateMissionModal';
import { EditPasswordModal } from './EditPasswordModal';
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const CreateMissionShortcut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>发布召集令</Button>
      <CreateMissionModal isOpen={isOpen} onClose={onClose} />
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
