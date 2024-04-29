import { GetTaskListQueryHandler } from './get-task-list';
import { GetTaskDetailHandler } from './get-task-detail';

export * from './get-task-list';
export * from './get-task-detail';

export const QueryHandlers = [GetTaskListQueryHandler, GetTaskDetailHandler];
