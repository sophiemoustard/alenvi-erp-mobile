import pick from 'lodash.pick';
import { HelperType } from '../../types/HelperType';
import { formatIdentity } from './utils';

export const formatHelper = (helper: HelperType) => ({
  ...pick(helper.user, ['_id', 'contact', 'identity']),
  formattedIdentity: formatIdentity(helper.user.identity, 'FL'),
  helperId: helper._id,
});
