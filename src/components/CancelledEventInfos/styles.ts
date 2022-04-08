import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  container: {
    padding: PADDING.XL,
  },
  separator: {
    width: '100%',
    borderWidth: BORDER_WIDTH / 2,
    borderColor: COPPER_GREY[200],
    marginBottom: MARGIN.MD,
  },
  section: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[900],
    marginBottom: MARGIN.LG,
  },
  subsection: {
    ...FIRA_SANS_REGULAR.SM,
    color: COPPER_GREY[700],
    marginVertical: MARGIN.MD,
  },
  infos: {
    ...FIRA_SANS_REGULAR.SM,
    color: COPPER_GREY[900],
    marginBottom: MARGIN.MD,
  },
  dashedLine: {
    borderRadius: 1,
    borderStyle: 'dashed',
    width: '50%',
    height: 0,
    borderColor: COPPER_GREY[300],
    borderWidth: BORDER_WIDTH / 2,
    marginVertical: MARGIN.SM,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.MD,
  },
  button: {
    borderColor: COPPER_GREY[200],
    backgroundColor: COPPER_GREY[50],
  },
  textButton: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[700],
  },
});
