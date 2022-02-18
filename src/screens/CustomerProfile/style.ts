import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BLACK, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: PADDING.XL,
    paddingHorizontal: PADDING.LG,
  },
  infosContainer: {
    flex: 1,
    paddingHorizontal: PADDING.LG,
    paddingTop: PADDING.XL,
  },
  loader: {
    margin: MARGIN.XXXL,
  },
  header: {
    marginBottom: MARGIN.XL,
  },
  identity: {
    ...FIRA_SANS_BLACK.XL,
    color: COPPER_GREY[800],
  },
  input: {
    marginTop: MARGIN.MD,
  },
  separator: {
    marginTop: MARGIN.MD,
    width: '100%',
    borderWidth: BORDER_WIDTH / 2,
    borderColor: COPPER_GREY[200],
  },
  sectionText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: MARGIN.SM,
  },
  infoText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[900],
    marginHorizontal: MARGIN.SM,
  },
});
