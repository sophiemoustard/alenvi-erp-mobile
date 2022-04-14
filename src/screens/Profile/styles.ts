import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS } from '../../styles/metrics';
import { COPPER_GREY, COPPER } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  screen: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COPPER_GREY[50],
  },
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH / 2,
    borderColor: COPPER_GREY[200],
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
    borderColor: COPPER_GREY[200],
  },
  name: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
  },
  company: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[600],
    marginTop: MARGIN.XS,
  },
  contactContainer: {
    marginHorizontal: MARGIN.XL,
    marginBottom: MARGIN.XL,
  },
  contact: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
  },
  infos: {
    ...FIRA_SANS_MEDIUM.MD,
    marginTop: MARGIN.XS,
    color: COPPER[900],
  },
  subtitle: {
    ...FIRA_SANS_REGULAR.MD,
    marginTop: MARGIN.MD,
    color: COPPER_GREY[600],
  },
  buttonContainer: {
    marginHorizontal: MARGIN.XL,
  },
  button: {
    marginBottom: MARGIN.SM,
  },
});
