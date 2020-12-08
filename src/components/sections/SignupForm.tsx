import {
  Text,
  VStack,
  Button,
  Input,
  Heading,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字与下划线')
    .required('请输入用户名'),
  password: Yup.string().min(8, '最短密码为 8 位').required('请输入密码'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], '输入的密码不匹配')
    .required('请确认密码'),
  phone: Yup.string()
    .matches(
      /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      '手机号码为 11 位数字'
    )
    .required('请输入手机号码'),
  identity: Yup.string()
    .matches(/^\d{18}$/, '正确格式的身份证号为 18 位')
    .required('请输入身份证号'),
  eula: Yup.boolean().equals([true], '请同意最终用户许可条款'),
});

export const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        username: 'alice',
        password: '12345678',
        passwordConfirmation: '12345678',
        phone: '13312345678',
        identity: '110100199901010101',
        city: '北京',
        eula: true,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          const { passwordConfirmation, eula, ...signupData } = values;
          alert(JSON.stringify(signupData, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(formik) => (
        <Form>
          <VStack
            align="center"
            justify={{ base: 'flex-start' }}
            direction={{ base: 'column' }}
            wrap="nowrap"
            minH="70vh"
            px={8}
            mb={16}
            spacing="48px"
            w="100%"
          >
            <VStack>
              <Text color="primary.800">加入 Hey</Text>
              <Heading as="h1" color="primary.800">
                创建你的账户
              </Heading>
            </VStack>

            <Box px={{ base: 0, sm: 8 }} w={{ base: '100%', sm: '30em' }}>
              <VStack>
                <Heading as="h2" size="md">
                  基本信息
                </Heading>
                <FormControl
                  isInvalid={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                >
                  <FormLabel htmlFor="username">用户名</FormLabel>
                  <Input
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  <FormLabel htmlFor="password">密码</FormLabel>
                  <Input
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.passwordConfirmation &&
                    Boolean(formik.errors.passwordConfirmation)
                  }
                >
                  <FormLabel>确认密码</FormLabel>
                  <Input
                    id="passwordConfirmation"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                    type="password"
                  />
                  <FormErrorMessage>
                    {formik.errors.passwordConfirmation}
                  </FormErrorMessage>
                </FormControl>
                <Heading as="h2" size="md" pt={4}>
                  其他信息
                </Heading>
                <FormControl
                  isInvalid={
                    formik.touched.identity && Boolean(formik.errors.identity)
                  }
                >
                  <FormLabel htmlFor="identity">身份证号</FormLabel>
                  <Input
                    id="identity"
                    onChange={formik.handleChange}
                    value={formik.values.identity}
                  />
                  <FormErrorMessage>{formik.errors.identity}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.phone && Boolean(formik.errors.phone)
                  }
                >
                  <FormLabel htmlFor="phone">手机号码</FormLabel>
                  <Input
                    id="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.city && Boolean(formik.errors.city)}
                >
                  <FormLabel htmlFor="city">城市</FormLabel>
                  <Input
                    id="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                  <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                </FormControl>
                <FormControl
                  pt={4}
                  isInvalid={formik.touched.eula && Boolean(formik.errors.eula)}
                >
                  <Checkbox
                    align="center"
                    colorScheme="primary"
                    id="eula"
                    onChange={formik.handleChange}
                    isChecked={formik.values.eula}
                  >
                    我已阅读并同意最终用户许可条款
                  </Checkbox>
                  <FormErrorMessage>{formik.errors.eula}</FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              w={{ base: '100%', sm: '26em' }}
              colorScheme="primary"
            >
              创建账户
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
