import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, HEADER_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';

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
  arrow: {
    marginHorizontal: MARGIN.SM,
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
  },
  name: {
    ...FIRA_SANS_BLACK.XL,
    marginVertical: MARGIN.XL,
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
  auxiliaryCell: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    height: 72,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: PADDING.LG,
    paddingRight: PADDING.XXL,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[200],
  },
  auxiliaryCellNotEditable: {
    flexDirection: 'row',
    height: 72,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: PADDING.XXL,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: COPPER_GREY[200],
  },
  auxiliaryInfos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  auxiliaryText: {
    color: COPPER_GREY[800],
    textAlign: 'left',
    marginLeft: MARGIN.MD,
    fontSize: 16,
  },
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
});
