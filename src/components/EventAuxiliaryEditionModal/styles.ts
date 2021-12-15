import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { AVATAR_SIZE, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default ({ isSelectedAuxiliary }: { isSelectedAuxiliary?: boolean }) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: COPPER_GREY[200],
    borderBottomWidth: 1,
  },
  searchBar: {
    height: 24,
    flex: 1,
    marginLeft: 24,
  },
  auxiliaryItem: {
    paddingHorizontal: PADDING.LG,
    paddingVertical: PADDING.MD,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isSelectedAuxiliary ? COPPER_GREY[100] : WHITE,
  },
  auxiliaryItemText: {
    ...(isSelectedAuxiliary ? { ...FIRA_SANS_BOLD.MD } : { ...FIRA_SANS_REGULAR.MD }),
    flex: 1,
  },
  avatar: {
    ...AVATAR_SIZE.SM,
    borderColor: COPPER_GREY[200],
    borderWidth: BORDER_WIDTH,
    marginRight: MARGIN.MD,
  },
});
