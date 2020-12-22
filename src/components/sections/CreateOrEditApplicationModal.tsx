import { Button } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import * as Yup from "yup";

const CreateApplicationSchema = Yup.object({
  applicationDescription: Yup.string().required("请输入接令申请描述"),
});

export const CreateOrEditApplicationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  missionId: string;
  description?: string;
  applicationId: string;
}> = ({
  isOpen,
  onClose,
  isEditing = false,
  missionId,
  description = "",
  applicationId = "",
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            applicationDescription: description,
          }}
          validationSchema={CreateApplicationSchema}
          onSubmit={(values, actions) => {
            // setTimeout(() => {
            //   toast({
            //     title: isEditing ? '申请修改成功' : '申请提交成功',
            //     description: JSON.stringify(values, null, 2),
            //     status: 'success',
            //   });
            //   actions.setSubmitting(false);
            //   onClose();
            // }, 1000);
            const url = isEditing
              ? `/api/mission/${missionId}/application/${applicationId}`
              : `/api/mission/${missionId}/application`;
            const method = isEditing ? "PUT" : "POST";
            fetch(url, {
              method: method,
              body: JSON.stringify({
                description: values.applicationDescription,
              }),
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
                  toast({ title: "失败" });
                  actions.setSubmitting(false);
                }
              })
              .then((res) => {
                toast({ title: "成功" });
                console.log(res);
                queryClient.invalidateQueries(`${missionId}/userappliaction`);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                toast({ title: "失败", description: err.message });
                actions.setSubmitting(false);
              });
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader>
                {isEditing ? "修改接令申请" : "我要接令"}
              </ModalHeader>
              <ModalBody>
                <Stack>
                  <FormControl
                    isInvalid={
                      formik.touched.applicationDescription &&
                      Boolean(formik.errors.applicationDescription)
                    }
                  >
                    <FormLabel>申请描述</FormLabel>
                    <Textarea
                      id="applicationDescription"
                      value={formik.values.applicationDescription}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>
                      {formik.errors.applicationDescription}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="primary"
                  mr={3}
                  type="submit"
                  isLoading={formik.isSubmitting}
                >
                  提交
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
  );
};
