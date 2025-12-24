import { createCollection } from '@tanstack/react-db';
import { rxdbCollectionOptions } from '@tanstack/rxdb-db-collection';
import { createRxDatabase } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { USER_SETTINGS_ID } from '~/constants';
import {
  userSettingsSchema,
  type UserSettingsCollection,
} from './schemas/userSettings';

type CalculatorDbCollections = { userSettings: UserSettingsCollection };

// Use localStorage in browser, memory storage on server
const isBrowser = typeof window !== 'undefined';
const storage =
  isBrowser ?
    wrappedValidateAjvStorage({ storage: getRxStorageLocalstorage() })
  : wrappedValidateAjvStorage({ storage: getRxStorageMemory() });

const db = await createRxDatabase<CalculatorDbCollections>({
  name: 'calculatorDb',
  storage,
  closeDuplicates: true,
});

await db.addCollections<CalculatorDbCollections>({
  userSettings: { schema: userSettingsSchema },
});

// Only upsert default data in browser (localStorage persists, memory doesn't)
if (isBrowser) {
  const existingDocs = await db.userSettings.find().exec();
  if (existingDocs.length === 0) {
    await db.userSettings.upsert({
      id: USER_SETTINGS_ID,
      theme: { appearance: 'inherit', accentColor: 'indigo' },
    });
  }
}

export const userSettingsCollection = createCollection(
  rxdbCollectionOptions({ rxCollection: db.userSettings, startSync: true }),
);
