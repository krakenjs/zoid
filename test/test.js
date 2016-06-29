
import postRobot from 'post-robot/src';
postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS[postRobot.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD] = false;

import './tests';
