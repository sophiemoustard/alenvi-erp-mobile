import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    backgroundColor: COPPER_GREY[50],
  },
  container: {
    flex: 1,
    paddingHorizontal: PADDING.XL,
  },
  billedHeader: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
    paddingVertical: PADDING.MD,
  },
  date: {
    marginTop: MARGIN.XL,
  },
  customerProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: MARGIN.XS,
  },
  customerProfileButtonTitle: {
    ...FIRA_SANS_REGULAR.MD,
    marginRight: MARGIN.XS,
    color: COPPER[500],
  },
  name: {
    ...FIRA_SANS_BLACK.XL,
    marginTop: MARGIN.XL,
    color: COPPER_GREY[800],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: MARGIN.XL,
  },
  addressText: {
    marginLeft: MARGIN.SM,
    marginRight: MARGIN.MD,
    color: COPPER_GREY[500],
  },
});
