export type EventType = {
  _id: string,
  customer: {
    identity: {
      title: string,
      firstname: string,
      lastname: string,
    }
  },
  startDate: Date,
  endDate: Date,
};
