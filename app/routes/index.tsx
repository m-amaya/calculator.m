import { Theme } from '@radix-ui/themes';
import { useUserSettings } from '~/hooks/useUserSettings';
import { CalculatorPage } from '~/pages/calculator/CalculatorPage';
import type { Route } from './+types/index';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Calculator.m | mamaya' },
    { name: 'description', content: 'A calculator app created by mamaya' },
  ];
}

export default function Index() {
  const { data: userSettings } = useUserSettings();
  const appearance = userSettings?.theme.appearance ?? 'inherit';
  return (
    <Theme appearance={appearance}>
      <CalculatorPage />
    </Theme>
  );
}
