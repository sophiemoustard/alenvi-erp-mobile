import { ModeType } from '../../../types/DateTimeType';
import { EventType } from '../../../types/EventType';
import { NavigationType } from '../../../types/NavigationType';

export interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

export type EventEditionStateType = EventType & {
  start: boolean,
  histories: EventType['histories'],
  internalHour: string
};

export type EventEditionActionType = {
  type: string,
  payload?: {
    date?: string,
    mode?: ModeType,
    start?: boolean,
    histories?: EventType['histories'],
    auxiliary?: EventType['auxiliary'],
    misc?: string,
    kmDuringEvent?: string,
    transportMode?: string,
    internalHour?: string,
  },
}

export type EditedEventValidType = { dateRange: boolean, kmDuringEvent: boolean };
