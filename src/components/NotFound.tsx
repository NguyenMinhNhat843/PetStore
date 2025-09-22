import { Container, Button, Stack, Title, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <Container
      size="sm"
      className="flex flex-col justify-center items-center text-center"
    >
      <Stack align="center">
        <Title order={1} className="text-[6rem] font-bold text-gray-300">
          404
        </Title>
        <Title order={3} className="text-gray-600">
          Trang bạn tìm kiếm không tồn tại
        </Title>
        <Text color="gray-500">
          Có vẻ bạn đã đi nhầm hướng. Nhưng không sao, hãy quay về trang chủ!
        </Text>
        <Link to="/">
          <Button
            size="md"
            variant="filled"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Quay về trang chủ
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
