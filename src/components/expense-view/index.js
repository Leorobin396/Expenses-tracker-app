// In ExpenseView.js
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function ExpenseView({ type, data }) {
  const { isDarkMode } = useContext(GlobalContext);

  return (
    <Box
      flex={1}
      w="full"
      bg={isDarkMode ? "gray.800" : "white"}
      mr={"4"}
      mt={"10"}
      p={"5"}
      pb={"4"}
      border={"1px solid"}
      borderColor={isDarkMode ? "gray.600" : "gray.100"}
      borderRadius={"12"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading size={"md"} color={isDarkMode ? "gray.200" : "red.700"}>
          {type === "income" ? "Income" : "Expense"}
        </Heading>
      </Flex>
      {data.map((item) => (
        <Flex
          key={item.id}
          bg={type === "expense" ? "red.900" : "blue.900"}
          mt={"4"}
          justifyContent={"space-around"}
          alignItems={"center"}
          border={"1px solid"}
          borderColor={type === "expense" ? "red.600" : "blue.600"}
          p={"4"}
          borderRadius={"8"}
        >
          <Text flex={1} textAlign={"left"} ml="3" fontWeight="bold" color={isDarkMode ? "gray.300" : "gray.600"}>
            {item.description}
          </Text>
          <Text flex={1} textAlign={"center"} color={isDarkMode ? "gray.400" : "gray.500"}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text flex={1} textAlign={"right"} color={isDarkMode ? "gray.300" : "gray.600"}>
            $ {item.amount}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
