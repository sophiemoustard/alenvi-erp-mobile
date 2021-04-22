type DateProps = Date | string | null;

const formatDate = (date: DateProps) => (date ? new Date(date) : new Date());

const isBefore = (date1: DateProps, date2: DateProps) => formatDate(date1) < formatDate(date2);

export default {
  isBefore,
};
