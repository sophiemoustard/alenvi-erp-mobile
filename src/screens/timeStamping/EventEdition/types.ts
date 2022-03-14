import { ModeType } from '../../../types/DateTimeType';
import { EventType } from '../../../types/EventType';

export type EventEditionType = EventType & { title: string };

export type EventEditionStateType = {
  _id: EventType['_id'],
  customer: EventType['customer'],
  startDate: EventType['startDate'],
  endDate: EventType['endDate'],
  startDateTimeStamp?: EventType['startDateTimeStamp'],
  endDateTimeStamp?: EventType['endDateTimeStamp'],
  isBilled?: EventType['isBilled'],
  auxiliary: EventType['auxiliary'],
  company: EventType['company'],
  misc: EventType['misc'],
  kmDuringEvent: EventType['kmDuringEvent'],
  transportMode: EventType['transportMode'],
  type: EventType['type'],
  histories: EventType['histories'],
  address: { street: string },
  title: string,
  start: boolean,
  internalHour: string,
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
    title?: string,
  },
}

export type EditedEventValidType = { dateRange: boolean, kmDuringEvent: boolean };
