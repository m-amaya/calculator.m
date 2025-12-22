import type { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';
import { availableThemeColors } from '~/constants';
import type { UserSettings } from '~/types';

export type UserSettingsDocument = RxDocument<UserSettings>;

export type UserSettingsCollection = RxCollection<UserSettings>;

export const userSettingsSchema: RxJsonSchema<UserSettings> = {
  title: 'user settings schema',
  description: 'user settings for the calculator app',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', enum: ['user-settings'], maxLength: 20 },
    theme: {
      type: 'object',
      properties: {
        appearance: { type: 'string', enum: ['inherit', 'light', 'dark'] },
        accentColor: { type: 'string', enum: availableThemeColors },
      },
      required: ['appearance', 'accentColor'],
    },
  },
  required: ['id', 'theme'],
};
