
import postRobot from 'post-robot/src';
import { once } from 'src/lib';

postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS[postRobot.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD] = false;

angular.bootstrap = once(angular.bootstrap);

import './tests';
