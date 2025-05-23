import auth from './modules/auth.js';
import files from './modules/files.js';
import space from './modules/space.js';
import settings from './modules/settings.js';
import time from './modules/time.js';
import drop from './modules/drop.js';

export default {
    ...auth,
    ...files,
    ...space,
    ...settings,
    ...time,
    ...drop
}