import * as React from "react";
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
  useToast,
} from "@chakra-ui/react";
import { EditLink } from "./EditLink";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";

export const ProfileItem: React.FC<{
  label?: string;
  profileKey?: string;
  value?: string;
  isEditable?: boolean;
  hideLabel?: boolean;
  onEdit?: (value: string) => void;
}> = ({
  label,
  profileKey,
  value,
  onEdit,
  isEditable = false,
  hideLabel = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

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
            <Formik
              initialValues={{ newValue: "" }}
              onSubmit={(values, actions) => {
                fetch("/api/profile", {
                  headers: {
                    Authorization:
                      "Bearer " + String(localStorage.getItem("accessToken")),
                    "content-type": "application/json",
                  },
                  method: "PUT",
                  body: JSON.stringify({ [profileKey ?? ""]: values.newValue }),
                }).then((res) => {
                  actions.setSubmitting(false);
                  queryClient.invalidateQueries("profile");
                  onClose();
                });
              }}
            >
              {(formik) => (
                <Form>
                  <ModalHeader>修改{label}</ModalHeader>
                  <ModalBody>
                    <FormControl>
                      <FormLabel>输入新的{label}</FormLabel>
                      <Input
                        id="newValue"
                        onChange={formik.handleChange}
                        value={formik.values.newValue}
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="primary"
                      mr={3}
                      type="submit"
                      isLoading={formik.isSubmitting}
                    >
                      保存修改
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      取消
                    </Button>
                  </ModalFooter>
                  <ModalCloseButton />
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
