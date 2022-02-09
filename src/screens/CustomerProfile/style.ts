import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BLACK, FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: PADDING.XXL,
    paddingHorizontal: PADDING.XL,
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
    marginVertical: MARGIN.MD,
    width: '100%',
    borderWidth: BORDER_WIDTH / 2,
    borderColor: COPPER_GREY[200],
  },
  sectionText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[700],
  },
});
