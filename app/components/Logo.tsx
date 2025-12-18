import { Flex, Heading } from '@radix-ui/themes';
import { Calculator } from 'lucide-react';

export const Logo = () => {
  return (
    <Flex
      align="center"
      gap="2"
    >
      <Calculator />
      <Heading
        as="h1"
        size="5"
        weight="bold"
      >
        Calculator.m
      </Heading>
    </Flex>
  );
};
