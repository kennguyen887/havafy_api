import { GetProfileDetailByHirerQueryHandler } from './get-profile-detail-by-hirer';
import { GetProfileDetailHandler } from './get-profile-detail';

export * from './get-profile-detail';
export * from './get-profile-detail-by-hirer';

export const QueryHandlers = [
  GetProfileDetailHandler,
  GetProfileDetailByHirerQueryHandler,
];
