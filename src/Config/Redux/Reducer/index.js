import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import CardManagementReducer from './CardManagementReducer';
import ControlReducer from './ControlReducer';
import HistoryReducer from './HistoryReducer';
import UserManagementReducer from './UserManagementReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  userManagement: UserManagementReducer,
  cardManagement: CardManagementReducer,
  control: ControlReducer,
  history: HistoryReducer,
});

export default rootReducer;
