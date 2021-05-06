export const formatPhone = (phoneNumber : any) => (phoneNumber
  ? phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5') : '');

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

export const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleTimeString('fr-FR', options);
};

export const capitalizeFirstLetter = (s: string) => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;
