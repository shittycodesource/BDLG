import { format, isToday, isYesterday, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import store from '@/store';

import localizeFilter from './localize.filter';

const locales = {
	'English': undefined,
	'Русский': ru,
}

/**
 * @param {Date} date - 
 * @param {Boolean} onlyTime - 'H:mm' Format if true. 'd MMMM H:mm' if false.
 * @param {Boolean} usingWords - Returns in "Today", "Yesterday" format
*/
export default function dateFilter(date, { onlyTime = false, usingWords = false, onlyDay = false, seconds = false }) {
    const currentDate = Date.now();

    if (onlyDay) {
        return format(new Date(date), 'd MMMM, EEEE,', { locale: locales[store.getters.getSettings.language] });
    }

    if (usingWords) {
        if (isToday(date)) {
            return `${localizeFilter('TodayAt')} ${format(date, 'kk:mm', { locale: locales[store.getters.getSettings.language] } )}`;
          }
        
        if (isYesterday(date)) {
            return `${localizeFilter('YesterdayAt')} ${format(date, 'kk:mm', { locale: locales[store.getters.getSettings.language] } )}`;
        }

        // in case if it's not today or yesterday:
        const now = new Date();
        const formattedDate = formatRelative(date, now, { locale: locales[store.getters.getSettings.language] });

        return formattedDate;
    }

    if (onlyTime == false) {
        if (new Date(currentDate).getFullYear() != new Date(date).getFullYear()) {
            return format(new Date(date), 'd MMMM yyyy H:mm', { locale: locales[store.getters.getSettings.language] });
        } else {
            
            return format(new Date(date), 'd MMMM H:mm', { locale: locales[store.getters.getSettings.language] });
        }
    }

    if (seconds) {
        return format(new Date(date), 'H:mm:ss', { locale: locales[store.getters.getSettings.language] });
    }

    return format(new Date(date), 'H:mm', { locale: locales[store.getters.getSettings.language] });
}