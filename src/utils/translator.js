/* eslint-disable */
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';


const langs = [
    'ru', 'en'
]

const outputLanguageDataDir = './src/locales/';
mkdirpSync(outputLanguageDataDir);
langs.map(lang => {
    const filePattern = './build/messages/src/**/'+lang+'.json';
    // Aggregates the default messages that were extracted from the example app's
    // React components via the React Intl Babel plugin. An error will be thrown if
    // there are messages in different components that use the same `id`. The result
    // is a flat collection of `id: message` pairs for the app's default locale.
    const defaultMessages = globSync(filePattern)
        .map((filename) => fs.readFileSync(filename, 'utf8'))
        .map((file) => JSON.parse(file))
        .reduce((collection, descriptors) => {
            descriptors.forEach(({ id, defaultMessage }) => {
                if (collection.hasOwnProperty(id)) {
                    throw new Error(`Duplicate message id: ${id}`);
                }
                collection[id] = defaultMessage;
            });

            return collection;
        }, {});
       
        fs.writeFileSync(outputLanguageDataDir + lang+ '.json', ` ${JSON.stringify(defaultMessages, null, 2)}`);

})

// const filePatternRu = './build/messages/src/**/ru.json';
// const filePatternEn = './build/messages/src/**/en.json';

// const defaultMessagesEn = globSync(filePatternEn)
//     .map((filename) => fs.readFileSync(filename, 'utf8'))
//     .map((file) => JSON.parse(file))
//     .reduce((collection, descriptors) => {
//         descriptors.forEach(({ id, defaultMessage }) => {
//             if (collection.hasOwnProperty(id)) {
//                 throw new Error(`Duplicate message id: ${id}`);
//             }
//             collection[id] = defaultMessage;
//         });

//         return collection;
//     }, {});

// mkdirpSync(outputLanguageDataDir);

// fs.writeFileSync(outputLanguageDataDir + 'ru.json', ` ${JSON.stringify(defaultMessagesRu, null, 2)}`);
// fs.writeFileSync(outputLanguageDataDir + 'en.json', ` ${JSON.stringify(defaultMessagesEn, null, 2)}`);