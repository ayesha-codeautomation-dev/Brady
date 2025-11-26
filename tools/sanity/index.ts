// Sanity Client
import { default as client } from './client';

// Sanity Helpers
import * as helpers from './helpers';

// Sanity Queries
import * as query from './query';

const sanity = {
  client,
  query,
  helpers
};

export default sanity;
