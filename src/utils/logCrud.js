import { Log } from '../models/index.js';

export async function logCrud({ userId, action, entity, entityId }) {
  await Log.create({ userId, action, entity, entityId });
} 