import { pick } from 'lodash';
import { FormattedAuxiliaryType } from '../../screens/timeStamping/EventEdition/types';
import { UserType } from '../../types/UserType';
import { formatIdentity } from './utils';

export const formatAuxiliary = (auxiliary: UserType): FormattedAuxiliaryType => ({
  _id: auxiliary._id,
  ...pick(auxiliary, ['picture', 'contracts', 'identity']),
  formattedIdentity: formatIdentity(auxiliary.identity, 'FL'),
  administrative: { transportInvoice: { transportType: auxiliary.administrative?.transportInvoice?.transportType } },
});
