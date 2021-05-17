import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';

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
  },
  infosProfilView: {
    marginHorizontal: MARGIN.MD,
    marginTop: MARGIN.MD,
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
  },
  company: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[600],
    marginTop: MARGIN.XS,
  },
  contactContainer: {
    marginHorizontal: MARGIN.XL,
  },
  contact: {
    ...FIRA_SANS_BOLD.LG,
  },
  infos: {
    ...FIRA_SANS_MEDIUM.MD,
    marginTop: MARGIN.XS,
    color: GREY[900],
  },
  subtitle: {
    ...FIRA_SANS_REGULAR.MD,
    marginTop: MARGIN.MD,
    color: GREY[600],
  },
  buttonContainer: {
    marginHorizontal: MARGIN.LG,
    marginTop: MARGIN.MD,
  },
});
