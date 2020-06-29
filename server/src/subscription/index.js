import { PubSub } from 'apollo-server';

import * as PERFORMER_EVENTS from './performer';

export const EVENTS = {
  PERFORMER: PERFORMER_EVENTS,
};

export default new PubSub();
