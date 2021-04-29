import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    marginVertical: MARGIN.XL,
  },
  identityContainer: {
    marginHorizontal: MARGIN.XL,
  },
  profilView: {
    flexDirection: 'row',
    marginBottom: MARGIN.XL,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: GREY[200],
  },
  name: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    marginHorizontal: MARGIN.MD,
    display: 'flex',
    alignItems: 'flex-end',
  },
  company: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[600],
    marginTop: MARGIN.XS,
    marginHorizontal: MARGIN.MD,
    display: 'flex',
    alignItems: 'flex-end',
  },
  contactContainer: {
    marginHorizontal: MARGIN.XL,
    marginTop: MARGIN.SM,
    marginBottom: MARGIN.MD,
  },
  contact: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
  },
  subtitle: {
    ...FIRA_SANS_REGULAR.MD,
    marginTop: MARGIN.MD,
    color: GREY[600],
  },
  buttonContainer: {
    marginHorizontal: MARGIN.LG,
  },
  button: {
    marginVertical: MARGIN.LG,
  },
});
