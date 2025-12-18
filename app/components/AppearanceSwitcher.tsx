import { Flex, IconButton, Select, Text } from '@radix-ui/themes';
import { Moon, Sun, SunMoon } from 'lucide-react';

export const AppearanceSwitcher = () => {
  return (
    <Select.Root>
      <Select.Trigger
        radius="full"
        variant="ghost"
      >
        <IconButton
          radius="full"
          variant="ghost"
        >
          <SunMoon
            size={28}
            strokeWidth={1.5}
          />
        </IconButton>
      </Select.Trigger>
      <Select.Content position="popper">
        <Select.Item value="inherit">
          <Flex
            align="center"
            gap="2"
          >
            <SunMoon
              size={20}
              strokeWidth={1.5}
            />
            <Text>Use system settings</Text>
          </Flex>
        </Select.Item>
        <Select.Item value="light">
          <Flex
            align="center"
            gap="2"
          >
            <Sun
              size={20}
              strokeWidth={1.5}
            />
            <Text>Light</Text>
          </Flex>
        </Select.Item>
        <Select.Item value="dark">
          <Flex
            align="center"
            gap="2"
          >
            <Moon
              size={20}
              strokeWidth={1.5}
            />
            <Text>Dark</Text>
          </Flex>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};
