import store from '@/store';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const locales = {
    'English': en,
    'Русский': ru,
}


/**
 * @param {String} key - Text to localize.
 * @param {Boolean} error - Show error if can't localize text.
*/
export default function localizeFilter(key, error = true) {
    

	const errorMessage = error ? `[Localize error]: key ${key} not found` : key;
    const locale = store.getters.getSettings.language || 'English';

    return locales[locale][key] || key

    // console.log(locale);
    // return locales[locale][key] || errorMessage;
}