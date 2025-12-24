import { createCollection } from '@tanstack/react-db';
import { rxdbCollectionOptions } from '@tanstack/rxdb-db-collection';
import { createRxDatabase } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { USER_SETTINGS_ID } from '~/constants';
import {
  userSettingsSchema,
  type UserSettingsCollection,
} from './schemas/userSettings';

type CalculatorDbCollections = { userSettings: UserSettingsCollection };

const storage = wrappedValidateAjvStorage({
  storage: getRxStorageLocalstorage(),
});

const db = await createRxDatabase<CalculatorDbCollections>({
  name: 'calculatorDb',
  storage,
  closeDuplicates: true,
});

await db.addCollections<CalculatorDbCollections>({
  userSettings: { schema: userSettingsSchema },
});

export const userSettingsCollection = createCollection(
  rxdbCollectionOptions({ rxCollection: db.userSettings, startSync: true }),
);

// Hydrate
const userSettingsExists = (await db.userSettings.count().exec()) > 0;
if (!userSettingsExists) {
  await db.userSettings.upsert({
    id: USER_SETTINGS_ID,
    theme: { appearance: 'inherit', accentColor: 'indigo' },
  });
}
