type acceptedDate = Date | string | null;

const formatDate = (date: acceptedDate) => (date ? new Date(date) : new Date());

const isSameOrAfter = (date1: acceptedDate, date2: acceptedDate) => formatDate(date1) >= formatDate(date2);

export default {
  isSameOrAfter,
};
