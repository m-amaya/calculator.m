import { Flex } from '@radix-ui/themes';
import { AppearanceSwitcher } from './AppearanceSwitcher';
import { Logo } from './Logo';

export const Topbar = () => {
  return (
    <Flex
      align="center"
      justify="between"
      height="60px"
      width="100%"
      pl={{ initial: '3', sm: '4', md: '5' }}
      pr={{ initial: '3', sm: '4', md: '5' }}
    >
      <Logo />
      <AppearanceSwitcher />
    </Flex>
  );
};
