import { userSettingsCollection } from '~/db/collections';
import type { ThemeAppearance } from '~/types';

export const updateAppearanceSetting = async (appearance: ThemeAppearance) => {
  const result = userSettingsCollection.update('user-settings', (doc) => {
    doc.theme.appearance = appearance;
  });

  await result.isPersisted.promise;
};
