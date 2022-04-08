import { UserType } from './UserType';

export type EventTypeEnum = 'intervention'| 'absence'| 'internal_hour' | 'unavailability';

export type EventType = {
  _id: string,
  customer: {
    _id: string,
    identity: {
      title: string,
      firstname: string,
      lastname: string,
    },
    contact: { primaryAddress: { fullAddress: string, street: string, zipCode: string, city: string } },
  },
  startDate: string,
  endDate: string,
  histories?: EventHistoryType[],
  startDateTimeStamp?: boolean,
  endDateTimeStamp?: boolean,
  isBilled?: boolean,
  isCancelled?: boolean,
  cancel?: { condition: string, reason: string },
  auxiliary: UserType,
  company: string,
  misc: string,
  kmDuringEvent: string,
  transportMode: string,
  type: EventTypeEnum,
  internalHour: { _id: string, name: string },
  address: { street: string },
};

export type EventHistoryType = {
  _id: string,
  action: string,
  update: { startHour?: Date, endHour?: Date },
  isCancelled: boolean,
};

export type InternalHoursType = {
  _id: string,
  name: string,
  company: string,
  createdAt: string,
  updatedAt: string,
};
