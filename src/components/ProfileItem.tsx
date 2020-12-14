import * as React from 'react';
import {
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { EditLink } from './EditLink';

export const ProfileItem: React.FC<{
  label?: string;
  value?: string;
  isEditable?: boolean;
  hideLabel?: boolean;
  onEdit?: (value: string) => void;
}> = ({ label, value, onEdit, isEditable = false, hideLabel = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack direction="row" align="bottom">
        <Text fontSize="sm">
          {hideLabel ? `${value}` : `${label}：${value}`}
        </Text>
        {isEditable ? <EditLink onClick={onOpen} /> : <></>}
      </Stack>
      {isEditable ? (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>修改{label}</ModalHeader>
            <ModalBody>
              <FormControl mt={4}>
                <FormLabel>输入新的{label}</FormLabel>
                <Input placeholder={label} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="primary" mr={3} onClick={onClose}>
                保存修改
              </Button>
              <Button variant="ghost" onClick={onClose}>
                取消
              </Button>
            </ModalFooter>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
