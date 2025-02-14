import auth from './modules/auth.js';
import files from './modules/files.js';
import space from './modules/space.js';
import settings from './modules/settings.js';
import time from './modules/time.js';
import schedule from './modules/schedule.js';
import drop from './modules/drop.js';
import link from './modules/link.js';
import folders from './modules/folders.js';

export default {
    ...auth,
    ...files,
    ...space,
    ...settings,
    ...time,
    ...schedule,
    ...drop,
    ...link,
    ...folders
}