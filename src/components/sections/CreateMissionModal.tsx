import { ImageUploader } from '../ImageUploader';
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
  Textarea,
  Select,
} from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const CreateMissionSchema = Yup.object({
  missionTitle: Yup.string().required('请输入召集令标题'),
  missionType: Yup.string().required('请选择召集令类型'),
  missionDescription: Yup.string().required('请输入召集令描述'),
});

export const CreateMissionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            missionTitle: '11',
            missionType: '',
            missionPeople: 4,
            missionDeadline: '',
            missionDescription: '',
            missionImageUrl: '',
          }}
          validationSchema={CreateMissionSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              toast({
                title: '召集令发布成功',
                description: JSON.stringify(values, null, 2),
                status: 'success',
              });
              actions.setSubmitting(false);
              onClose();
            }, 1000);
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader>发布召集令</ModalHeader>
              <ModalBody>
                <Stack>
                  <FormControl
                    isInvalid={
                      formik.touched.missionTitle &&
                      Boolean(formik.errors.missionTitle)
                    }
                  >
                    <FormLabel htmlFor="missionTitle">召集令标题</FormLabel>
                    <Input
                      id="missionTitle"
                      onChange={formik.handleChange}
                      value={formik.values.missionTitle}
                    />
                    <FormErrorMessage>
                      {formik.errors.missionTitle}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>召集人数</FormLabel>
                    <NumberInput
                      id="missionPeople"
                      min={1}
                      onChange={(_, valueAsNumber) =>
                        formik.setFieldValue('missionPeople', valueAsNumber)
                      }
                      value={formik.values.missionPeople}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.missionType &&
                      Boolean(formik.errors.missionType)
                    }
                  >
                    <FormLabel>召集令类型</FormLabel>
                    <Select
                      id="missionType"
                      placeholder="选择召集令类型"
                      value={formik.values.missionType}
                      onChange={formik.handleChange}
                    >
                      <option value="技术交流">技术交流</option>
                      <option value="学业探讨">学业探讨</option>
                      <option value="社会实践">社会实践</option>
                      <option value="公益志愿者">公益志愿者</option>
                      <option value="游玩">游玩</option>
                    </Select>
                    <FormErrorMessage>
                      {formik.errors.missionType}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.missionDescription &&
                      Boolean(formik.errors.missionDescription)
                    }
                  >
                    <FormLabel>召集令描述</FormLabel>
                    <Textarea
                      id="missionDescription"
                      value={formik.values.missionDescription}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>
                      {formik.errors.missionDescription}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>召集令介绍图片</FormLabel>
                    <ImageUploader
                      onUploadFinished={(imageUrl) =>
                        formik.setFieldValue('missionImageUrl', imageUrl)
                      }
                      onImageRemoved={() =>
                        formik.setFieldValue('missionImageUrl', '')
                      }
                    />
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
                  发布
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
