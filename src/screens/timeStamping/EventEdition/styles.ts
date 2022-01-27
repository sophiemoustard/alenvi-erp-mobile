import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { BORDER_RADIUS, BUTTON_HEIGHT, HEADER_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COPPER_GREY[50],
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COPPER_GREY[800],
    alignItems: 'center',
    paddingHorizontal: PADDING.MD,
    height: HEADER_HEIGHT,
  },
  billedHeader: {
    ...FIRA_SANS_REGULAR.MD,
    backgroundColor: COPPER[400],
    color: WHITE,
    textAlign: 'center',
    paddingVertical: PADDING.MD,
  },
  arrow: {
    marginHorizontal: MARGIN.SM,
  },
  customerProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: MARGIN.XS,
    marginBottom: MARGIN.XL,
  },
  customerProfileButtonTitle: {
    ...FIRA_SANS_REGULAR.MD,
    marginRight: MARGIN.XS,
    color: COPPER[500],
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    textAlign: 'left',
    flex: 1,
  },
  buttonTitle: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    textAlign: 'center',
  },
  button: {
    width: 130,
    borderRadius: BORDER_RADIUS.MD,
    height: BUTTON_HEIGHT,
    backgroundColor: COPPER[400],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING.XL,
    textAlign: 'center',
    marginRight: MARGIN.XS,
  },
  container: {
    flex: 1,
    paddingHorizontal: PADDING.XL,
    marginBottom: MARGIN.LG,
  },
  name: {
    ...FIRA_SANS_BLACK.XL,
    marginTop: MARGIN.XL,
    color: COPPER_GREY[800],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MARGIN.XL,
  },
  addressText: {
    marginLeft: MARGIN.SM,
    marginRight: MARGIN.MD,
    color: COPPER_GREY[500],
  },
});
