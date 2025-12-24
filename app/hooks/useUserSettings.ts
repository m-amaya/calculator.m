import { eq, useLiveQuery } from '@tanstack/react-db';
import { USER_SETTINGS_ID } from '~/constants';
import { userSettingsCollection } from '~/db/collections';

export const useUserSettings = () => {
  return useLiveQuery((q) =>
    q
      .from({ userSettings: userSettingsCollection })
      .where(({ userSettings }) => eq(userSettings.id, USER_SETTINGS_ID))
      .findOne(),
  );
};
