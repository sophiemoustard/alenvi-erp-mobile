import { ModeType } from '../../../types/DateTimeType';
import { EventType } from '../../../types/EventType';
import { NavigationType } from '../../../types/NavigationType';

export interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

export type EventEditionStateType = EventType & { start: boolean };

export type EventEditionActionType = {
  type: string,
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}
