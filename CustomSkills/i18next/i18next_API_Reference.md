# i18next API Reference

API | i18next documentation

### [hashtag](#init) init

`i18next.init(options, callback) // -> returns a Promise`

The default export of the i18next module is an i18next instance ready to be initialized by calling `init`. You can create additional instances using the [createInstance](/overview/api#createinstance) function.

Please read the [options page](/overview/configuration-options) for details on configuration options.

The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).

**So you should wait for init to complete (wait for the callback or promise resolution) before using the** `t` **function!**

circle-info

In case of [react-i18nextarrow-up-right](https://react.i18next.com/) make sure useSuspense is enabled or handle the ready state in [HOCsarrow-up-right](https://react.i18next.com/latest/withtranslation-hoc#not-using-suspense) or [hooksarrow-up-right](https://react.i18next.com/latest/usetranslation-hook#not-using-suspense) yourself.

triangle-exclamation

Do not call init multiple times.
To change language use [changeLanguage](/overview/api#changelanguage). If you need complete different configs use [createInstance](/overview/api#createinstance) or [cloneInstance](/overview/api#cloneinstance).

circle-exclamation

An error can occur if for example there was a loading issue when using a [backend](/overview/plugins-and-utils#backends) plugin.

JavaScript

TypeScript

Copy

```
i18next.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// with only callback
i18next.init((err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// using Promises
i18next
  .init({ /* options */ })
  .then(function(t) { t('key'); });
```

Copy

```
i18next.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t($ => $.key); // -> same as i18next.t
});

// with only callback
i18next.init((err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t($ => $.key); // -> same as i18next.t
});

// using Promises
i18next
  .init({ /* options */ })
  .then(function(t) { t($ => $.key); });
```

### [hashtag](#use) use

`i18next.use(module)`

The use function is there to load additional plugins to i18next.

For available module see the [plugins page](/overview/plugins-and-utils) and don't forget to read the documentation of the plugin.

Copy

```
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // used with i18next-chained-backend for caching
import postProcessor from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(LocalStorageBackend)
  .use(LanguageDetector)
  .use(postProcessor)
  .init(options, callback);
```

### [hashtag](#t) t

`i18next.t(keys, options)`

Please have a look at the translation functions like [interpolation](/translation-function/interpolation), [formatting](/translation-function/formatting) and [plurals](/translation-function/plurals) for more details on using it.

JavaScript

TypeScript

You can specify either one key as a `String` or multiple keys as an `Array` of `String`. The first one that resolves will be returned.

Copy

```
i18next.t('my.key'); // -> will return value in set language

i18next.t(['unknown.key', 'my.key']); // -> will return value for 'my.key' in set language
```

You can select the key you want using a selector function (`$ => $.my.key`). Keys will auto-complete automatically.

If you want to set a default value, use the `defaultValue` option:

Copy

```
i18next.t($ => $.my.key); 
// -> will return value in set language

i18next.t($ => $.unknown.key, { defaultValue: t($ => $.my.key) }); 
// -> will return value for 'my.key' in set language
```

### [hashtag](#exists) exists

`i18next.exists(key, options)`

Uses the same resolve functionality as the `t` function and returns true if a key exists.

Copy

```
i18next.exists('my.key'); // -> true if exists, false if not
```

### [hashtag](#getfixedt) getFixedT

`i18next.getFixedT(lng, ns, keyPrefix, fixedOpts?)`

Returns a `t` function that defaults to given language or namespace.

All arguments can be optional/null.

`lng` and `ns` params could be arrays of languages or namespaces and will be treated as fallbacks in that case.

The optional `keyPrefix` will be automatically applied to the returned t function. i.e.

The optional `fixedOpts.scopeNs` (added in v26.0.10) carries a namespace list that the **selector API** uses to detect when a path's first segment is a namespace prefix — without affecting resolution scope. This is what `react-i18next`'s `useTranslation([nsA, nsB])` passes through so that `t($ => $.nsB.foo)` correctly routes to `nsB`, while plain `t('foo')` lookups stay isolated to the primary `ns`. Set it to the same array you would pass to `useTranslation`.

JavaScript

TypeScript

Copy

```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t('title'); // same as i18next.t('user.accountSettings.changePassword.title');
```

Copy

```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t($ => $.title); 
// same as i18next.t($ => $.user.accountSettings.changePassword.title);
```

circle-exclamation

If you want to use keys with a prefixed namespace and the `keyPrefix` argument was provided, you'll need to override it in the `t` function options.

See below for an example.

JavaScript

TypeScript

Copy

```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t('ns:title'); // this will not work
const title = t('ns:title', { keyPrefix: '' }); // this will work
```

Copy

```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t($ => $.title, { ns: 'ns' });                // this won't work
const title = t($ => $.title, { ns: 'ns', keyPrefix: '' }); // this will work
```

On the returned function you can like in the `t` function override the languages or namespaces by passing them in options or by prepending namespace.

JavaScript

TypeScript

Copy

```
// fix language to german
const de = i18next.getFixedT('de');
de('myKey');

// or fix the namespace to anotherNamespace
const anotherNamespace = i18next.getFixedT(null, 'anotherNamespace');
anotherNamespace('anotherNamespaceKey'); // no need to prefix ns i18n.t('anotherNamespace:anotherNamespaceKey');
```

Copy

```
// fix language to german
const de = i18next.getFixedT('de');
de($ => $.myKey);

// or fix the namespace to anotherNamespace
const anotherNamespace = i18next.getFixedT(null, 'anotherNamespace');
anotherNamespace($ => $.anotherNamespaceKey); 
// no need to prefix ns i18n.t($ => $.anotherNamespace.anotherNamespaceKey);
```

### [hashtag](#changelanguage) changeLanguage

`i18next.changeLanguage(lng, callback) // -> returns a Promise`

Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.

Calling `changeLanguage` without `lng` uses the [language detector](/misc/creating-own-plugins#languagedetector) to choose the language to set.

**HINT:** For easy testing—setting `lng` to 'cimode' will cause the `t` function to always return the key.

JavaScript

TypeScript

Copy

```
i18next.changeLanguage('en', (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// using Promises
i18next
  .changeLanguage('en')
  .then((t) => {
    t('key'); // -> same as i18next.t
  });

// manually re-detecting language
i18next.changeLanguage().then(...)
```

Copy

```
i18next.changeLanguage('en', (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t($ => $.key); // -> same as i18next.t
});

// using Promises
i18next
  .changeLanguage('en')
  .then((t) => {
    t($ => $.key); // -> same as i18next.t
  });

// manually re-detecting language
i18next.changeLanguage().then(...)
```

### [hashtag](#language) language

`i18next.language`

Is set to the current detected or set language.

If you need the primary used language depending on your configuration (supportedLngs, load) you will prefer using [`i18next.resolvedLanguage`](/overview/api#resolvedlanguage) or [`i18next.languages[0]`](/overview/api#languages).

### [hashtag](#languages) languages

`i18next.languages`

Is set to an array of language codes that will be used to look up the translation value.

When the language is set, this array is populated with the new language codes. Unless overridden, this array is populated with less-specific versions of that code for fallback purposes, followed by the list of fallback languages.

circle-info

Values are unique, so if they appear earlier in the array, they will not be added again.

Copy

```
// initialize with fallback languages
i18next.init({
  fallbackLng: ["es", "fr", "en-US", "dev"]
});

// change the language
i18next.changeLanguage("en-US-xx");

// new language and its more generic forms, followed by fallbacks
i18next.languages; // ["en-US-xx", "en-US", "en", "es", "fr", "dev"]

// change the language again
i18next.changeLanguage("de-DE");

// previous language is not retained
i18next.languages; // ["de-DE", "de", "es", "fr", "en-US", "dev"]
```

### [hashtag](#resolvedlanguage) resolvedLanguage

`i18next.resolvedLanguage`

Is set to the current resolved language.
It can be used as primary used language, for example in a language switcher.

*(introduced in v21.0.0)*

### [hashtag](#hasloadednamespace) hasLoadedNamespace

`i18next.hasLoadedNamespace(ns, options) // -> returns true or false`

Checks if namespace has loaded yet. i.e. used by [react-i18nextarrow-up-right](https://react.i18next.com/)

### [hashtag](#loadnamespaces) loadNamespaces

`i18next.loadNamespaces(ns, callback) // -> returns a Promise`

Loads additional namespaces not defined in init options.

Copy

```
i18next.loadNamespaces('myNamespace', (err) => { /* resources have been loaded */ });
i18next.loadNamespaces(['myNamespace1', 'myNamespace2'], (err) => { /* resources have been loaded */ });

// using Promises
i18next
  .loadNamespaces(['myNamespace1', 'myNamespace2'])
  .then(() => {});
```

### [hashtag](#loadlanguages) loadLanguages

`i18next.loadLanguages(lngs, callback) // -> returns a Promise`

Loads additional languages not defined in init options (preload).

Copy

```
i18next.loadLanguages('de', (err) => { /* resources have been loaded */ });
i18next.loadLanguages(['de', 'fr'], (err) => { /* resources have been loaded */ });

// using Promises
i18next
  .loadLanguages(['de', 'fr'])
  .then(() => {});
```

### [hashtag](#reloadresources) reloadResources

`i18next.reloadResources() // -> returns a Promise`

Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.

Copy

```
// reload all
i18next.reloadResources();

// reload languages
i18next.reloadResources(['de', 'fr']);

// reload namespaces for all languages
i18next.reloadResources(null, ['ns1', 'ns2']);

// reload namespaces in languages
i18next.reloadResources(['de', 'fr'], ['ns1', 'ns2']);

// reload a namespace in a language
i18next.reloadResources('de', 'ns1');

// optional third param callback i18next@>=11.9.0
i18next.reloadResources('de', 'ns1', () => { /* reloaded */ });

// using Promises
i18next
  .reloadResources()
  .then(() => {});
```

### [hashtag](#setdefaultnamespace) setDefaultNamespace

`i18next.setDefaultNamespace(ns)`

Changes the default namespace.

### [hashtag](#dir) dir

`i18next.dir(lng)`

Returns `rtl` or `ltr` depending on languages read direction.

Copy

```
// for current language
i18next.dir();

// for another language
i18next.dir('en-US'); // -> "ltr";
i18next.dir('ar'); // -> "rtl";
```

### [hashtag](#format) format

`i18next.format(data, format, lng)`

*introduced in v8.4.0 (not recommended anymore)*

Exposes the Formatter's format function. Starting with v26.0.0, this will always be backed by the built-in [Formatter](/translation-function/formatting) (or a custom Formatter module provided via `.use()`).

For formatting used in translation files checkout the [formatting doc](/translation-function/formatting).

JavaScript

TypeScript

Copy

```
// key = 'hello {{what}}'
i18next.t('key', { what: i18next.format('world', 'uppercase') }); // -> hello WORLD
```

Copy

```
// key = 'hello {{what}}'
i18next.t($ => $.key, { what: i18next.format('world', 'uppercase') }); // -> hello WORLD
```

## [hashtag](#instance-creation) instance creation

### [hashtag](#createinstance) createInstance

`i18next.createInstance(options, callback)`

Will return a new i18next instance.

Please read the [options page](/overview/configuration-options) for details on configuration options.

Providing a callback will automatically call init.

The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).

JavaScript

TypeScript

Copy

```
const newInstance = i18next.createInstance({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// is the same as
const newInstance = i18next.createInstance();
newInstance.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});
```

Copy

```
const newInstance = i18next.createInstance({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t($ => $.key); // -> same as i18next.t
});

// is the same as
const newInstance = i18next.createInstance();
newInstance.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t($ => $.key); // -> same as i18next.t
});
```

### [hashtag](#cloneinstance) cloneInstance

`i18next.cloneInstance(options)`

Creates a clone of the current instance. Shares store, plugins and initial configuration. Can be used to create an instance sharing storage but being independent on set language or default namespaces.

Copy

```
const newInstance = i18next.cloneInstance({
  fallbackLng: 'en',
  defaultNS: 'file1'
});
```

#### [hashtag](#forkresourcestore) forkResourceStore

By setting the forkResourceStore option to true, it will not shares the store.

Copy

```
const newInstance = i18next.cloneInstance({
  forkResourceStore: true,
  keySeparator: '[[my-new-separator]]'
});
```

## [hashtag](#events) events

circle-info

Every event can be unsubscribed using

`i18next.off('name', myFunction);`

All attached listeners can be unsubscribed using

`i18next.off('name');`

### [hashtag](#oninitialized) onInitialized

`i18next.on('initialized', function(options) {})`

Gets fired after initialization.

### [hashtag](#onlanguagechanged) onLanguageChanged

`i18next.on('languageChanged', function(lng) {})`

Gets fired when changeLanguage got called.

### [hashtag](#onloaded) onLoaded

`i18next.on('loaded', function(loaded) {})`

Gets fired on loaded resources.

### [hashtag](#onfailedloading) onFailedLoading

`i18next.on('failedLoading', function(lng, ns, msg) {})`

Gets fired if loading resources failed (after the in-built retry algorithm).

### [hashtag](#onmissingkey) onMissingKey

`i18next.on('missingKey', function(lngs, namespace, key, res) {})`

Gets fired on accessing a key not existing. Needs [saveMissing](/overview/configuration-options#missing-keys) set to true.

## [hashtag](#store-events) store events

Please be aware the `i18next.store` is only available on i18next after the init call.

### [hashtag](#onadded) onAdded

`i18next.store.on('added', function(lng, ns) {})`

Gets fired when resources got added.

### [hashtag](#onremoved) onRemoved

`i18next.store.on('removed', function(lng, ns) {})`

Gets fired when resources got removed.

## [hashtag](#resource-handling) resource handling

Can be accessed on `i18next` or `i18next.services.resourceStore`.

### [hashtag](#getresource) getResource

`i18next.getResource(lng, ns, key, options)`

Gets one value by given key.

options:

option

default

description

keySeparator

"."

char to separate keys, or false if no separator is preferred

ignoreJSONStructure

true

if a key is not found as nested key, it will try to lookup as flat key

### [hashtag](#addresource) addResource

`i18next.addResource(lng, ns, key, value, options)`

Adds one key/value.

options:

option

default

description

keySeparator

"."

char to separate keys, or false if no separator is preferred

silent

false

if set to true adding will not emit an added event

### [hashtag](#addresources) addResources

`i18next.addResources(lng, ns, resources)`

Adds multiple key/values.

### [hashtag](#addresourcebundle) addResourceBundle

`i18next.addResourceBundle(lng, ns, resources, deep, overwrite)`

Adds a complete bundle.

Setting deep (default false) param to true will extend existing translations in that file. Setting deep and overwrite (default false) to true it will overwrite existing translations in that file.

So omitting deep and overwrite will overwrite all existing translations with the one provided in resources. Using deep you can choose to keep existing nested translation and to overwrite those with the new ones.

Copy

```
i18next.addResourceBundle('en', 'translations', {
  key: 'value',
}, true, true);
```

### [hashtag](#hasresourcebundle) hasResourceBundle

`i18next.hasResourceBundle(lng, ns)`

Checks if a resource bundle exists.

### [hashtag](#getdatabylanguage) getDataByLanguage

`i18next.getDataByLanguage(lng)`

Returns a resource data by language.

### [hashtag](#getresourcebundle) getResourceBundle

`i18next.getResourceBundle(lng, ns)`

Returns a resource bundle.

### [hashtag](#removeresourcebundle) removeResourceBundle

`i18next.removeResourceBundle(lng, ns)`

Removes an existing bundle.

---

circle-info

Managing resources manually? [Locizearrow-up-right](https://www.locize.com/i18next?utm_source=i18next_com&utm_medium=gitbook&utm_campaign=overview_api) provides a managed backend for i18next that handles resource loading, CDN delivery, and translation management — so you can focus on building your app instead of managing JSON files. Built by the i18next team. [Get started →arrow-up-right](https://www.locize.com/i18next?utm_source=i18next_com&utm_medium=gitbook&utm_campaign=overview_api)

Last updated 2 hours ago

This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the [privacy policy](https://policies.gitbook.com/privacy/cookies).

close

AcceptReject