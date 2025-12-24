import { Flex, IconButton, Select, Text } from '@radix-ui/themes';
import {
  Moon,
  Sun,
  SunMoon,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import { useUserSettings } from '~/hooks/useUserSettings';
import type { ThemeAppearance } from '~/types';
import { updateAppearanceSetting } from '~/utils/updateAppearanceSetting';

type AppearanceOption = {
  value: ThemeAppearance;
  label: string;
  Icon: LucideIcon;
};

const commonIconProps: LucideProps = { size: 20, strokeWidth: 1.5 };

const APPEARANCE_OPTIONS: AppearanceOption[] = [
  { value: 'inherit', label: 'Use system settings', Icon: SunMoon },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
];

export const AppearanceSwitcher = () => {
  const { data: userSettings } = useUserSettings();
  const selectedAppearance = userSettings?.theme.appearance ?? 'inherit';
  const SelectedAppearanceIcon =
    APPEARANCE_OPTIONS.find((option) => option.value === selectedAppearance)
      ?.Icon ?? SunMoon;

  const handleAppearanceChange = (value: ThemeAppearance) => {
    updateAppearanceSetting(value);
  };

  return (
    <Select.Root
      defaultValue={selectedAppearance}
      onValueChange={handleAppearanceChange}
    >
      <Select.Trigger
        radius="full"
        variant="ghost"
      >
        <IconButton
          radius="full"
          variant="ghost"
        >
          <SelectedAppearanceIcon
            {...commonIconProps}
            size={28}
          />
        </IconButton>
      </Select.Trigger>
      <Select.Content position="popper">
        {APPEARANCE_OPTIONS.map(({ label, value, Icon }) => (
          <Select.Item
            key={value}
            value={value}
          >
            <Flex
              align="center"
              gap="2"
            >
              <Icon {...commonIconProps} />
              <Text>{label}</Text>
            </Flex>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
