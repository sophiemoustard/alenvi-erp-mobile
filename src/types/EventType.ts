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
  startDate: Date,
  endDate: Date,
  histories?: EventHistoryType[],
  startDateTimeStamp?: boolean,
  endDateTimeStamp?: boolean,
  isBilled?: boolean,
  auxiliary: UserType,
  company: string,
};

export type EventHistoryType = {
  action: string,
  update: { startHour?: Date, endHour?: Date },
  isCancelled: boolean,
};
