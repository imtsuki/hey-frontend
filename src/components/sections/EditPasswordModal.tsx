import { Button } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const EditPasswordSchema = Yup.object({
  oldPassword: Yup.string().required('请输入原密码'),
  newPassword: Yup.string().min(8, '最短密码为 8 位').required('请输入新密码'),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref('newPassword')], '两次输入的密码不匹配')
    .required('请确认新密码'),
});

export const EditPasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
          }}
          validationSchema={EditPasswordSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              const { newPasswordConfirmation, ...editPasswordData } = values;
              toast({
                title: '密码修改成功',
                description: JSON.stringify(editPasswordData, null, 2),
                status: 'success',
              });
              actions.setSubmitting(false);
              onClose();
            }, 1000);
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader>修改密码</ModalHeader>
              <ModalBody>
                <Stack>
                  <FormControl
                    isInvalid={
                      formik.touched.oldPassword &&
                      Boolean(formik.errors.oldPassword)
                    }
                  >
                    <FormLabel htmlFor="oldPassword">原密码</FormLabel>
                    <Input
                      id="oldPassword"
                      onChange={formik.handleChange}
                      value={formik.values.oldPassword}
                      type="password"
                    />
                    <FormErrorMessage>
                      {formik.errors.oldPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                  >
                    <FormLabel htmlFor="newPassword">新密码</FormLabel>
                    <Input
                      id="newPassword"
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                      type="password"
                    />
                    <FormErrorMessage>
                      {formik.errors.newPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.newPasswordConfirmation &&
                      Boolean(formik.errors.newPasswordConfirmation)
                    }
                  >
                    <FormLabel htmlFor="newPasswordConfirmation">
                      确认新密码
                    </FormLabel>
                    <Input
                      id="newPasswordConfirmation"
                      onChange={formik.handleChange}
                      value={formik.values.newPasswordConfirmation}
                      type="password"
                    />
                    <FormErrorMessage>
                      {formik.errors.newPasswordConfirmation}
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
                  修改
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
