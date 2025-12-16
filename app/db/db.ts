import { createCollection } from '@tanstack/react-db';
import { rxdbCollectionOptions } from '@tanstack/rxdb-db-collection';
import { createRxDatabase } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import {
  userSettingsSchema,
  type UserSettingsCollection,
} from './schemas/userSettings';

type CalculatorDbCollections = { userSettings: UserSettingsCollection };

const localStorage = wrappedValidateAjvStorage({
  storage: getRxStorageLocalstorage(),
});

const db = await createRxDatabase<CalculatorDbCollections>({
  name: 'calculatorDb',
  storage: localStorage,
});

await db.addCollections<CalculatorDbCollections>({
  userSettings: { schema: userSettingsSchema },
});

await db.userSettings.upsert({
  id: 'user-settings',
  theme: { appearance: 'inherit', accentColor: 'indigo' },
});

export const userSettingsCollection = createCollection(
  rxdbCollectionOptions({ rxCollection: db.userSettings, startSync: true }),
);
