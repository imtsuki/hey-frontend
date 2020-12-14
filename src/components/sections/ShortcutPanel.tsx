import { Card } from '../Card';
import { Button } from '@chakra-ui/react';
import { HStack, Stack } from '@chakra-ui/react';
import { useDisclosure, useToast } from '@chakra-ui/react';
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
  Textarea,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const NewMissionShortcut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>发布召集令</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>发布召集令</ModalHeader>
          <ModalBody>
            <Stack>
              <FormControl>
                <FormLabel>标题</FormLabel>
                <Input placeholder="召集令标题" />
              </FormControl>
              <FormControl>
                <FormLabel>召集人数</FormLabel>
                <Input placeholder="召集人数" />
              </FormControl>
              <FormControl>
                <FormLabel>类型</FormLabel>
                <Input placeholder="召集令标题" />
              </FormControl>
              <FormControl>
                <FormLabel>内容</FormLabel>
                <Textarea placeholder="召集令内容" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              发布
            </Button>
            <Button variant="ghost">取消</Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

const EditPasswordSchema = Yup.object({
  oldPassword: Yup.string().required('请输入原密码'),
  newPassword: Yup.string().min(8, '最短密码为 8 位').required('请输入新密码'),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref('newPassword')], '两次输入的密码不匹配')
    .required('请确认新密码'),
});

const EditPasswordShortcut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button onClick={onOpen}>修改密码</Button>
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
                  position: 'bottom-right',
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
    </>
  );
};

export const ShortcutPanel = () => (
  <Card width="100%">
    <HStack justify="center">
      <NewMissionShortcut />
      <EditPasswordShortcut />
    </HStack>
  </Card>
);
