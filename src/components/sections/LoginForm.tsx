import {
  VStack,
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  useToast,
  Link,
} from "@chakra-ui/react";
import { Logo } from "../ui/Logo";
import { Link as ReactLink } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  username: Yup.string().required("请输入用户名"),
  password: Yup.string().required("请输入密码"),
});

export const LoginForm = () => {
  const toast = useToast();
  return (
    <VStack pt={16} spacing={8}>
      <VStack color="primary.800">
        <Link as={ReactLink} to="/">
          <Logo size={48} />
        </Link>
        <Text as="h1" fontSize="3xl">
          登录 Hey
        </Text>
      </VStack>
      <Box
        border="1px"
        borderColor="gray.200"
        p="6"
        rounded="md"
        w={{ base: "100%", sm: "24em" }}
      >
        <Formik
          initialValues={{
            username: "alice",
            password: "12345678",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "content-type": "application/json" },
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                } else {
                  toast({ title: "登录失败" });
                  actions.setSubmitting(false);
                }
              })
              .then((res) => {
                toast({ title: JSON.stringify(res) });
                localStorage.setItem("accessToken", res.accessToken);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                toast({ title: "登录失败", description: err.message });
                actions.setSubmitting(false);
              });
          }}
        >
          {(formik) => (
            <Form>
              <VStack>
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
                  pb={4}
                  isInvalid={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  <FormLabel htmlFor="password">密码</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
                  colorScheme="primary"
                  w="100%"
                >
                  登录
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        border="1px"
        borderColor="gray.200"
        p="6"
        rounded="md"
        w={{ base: "100%", sm: "24em" }}
      >
        <Text fontSize="sm" align="center">
          没有账户？
          <Link as={ReactLink} to="/signup" color="primary.600">
            创建账户
          </Link>
        </Text>
      </Box>
    </VStack>
  );
};
