import { GetProfileListQueryHandler } from './get-profile-list';
import { GetProfileDetailHandler } from './get-profile-detail';

export * from './get-profile-list';
export * from './get-profile-detail';

export const QueryHandlers = [GetProfileListQueryHandler, GetProfileDetailHandler];
