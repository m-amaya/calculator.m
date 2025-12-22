import { useLiveQuery } from '@tanstack/react-db';
import { userSettingsCollection } from '~/db/collections';

export const useThemeSettings = () => {
  return useLiveQuery((q) =>
    q
      .from({ userSettings: userSettingsCollection })
      .findOne()
      .select(({ userSettings }) => ({ theme: userSettings.theme })),
  );
};
