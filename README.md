# MovieExplorer

Code sample utilizing AngularJS, HTML5, and CSS3.

## Notes

* I haven't bothered to use a module loader, as all of the scripts need to be loaded before the DOM renders (so they stay in <head>) in order to have a usable UI, and the API dependencies loaded by app.js are asynchronous due to the virtue of using Promise objects.
* Styles are being compiled in the browser with LessJS. If this were going to be production code, I would configure a build system using something like GruntJS or GulpJS. For this code sample that seemed like overkill.
* While I've tried to use only semantic classes in my HTML, it appears that hooks for certain containers required by Bootstrap (e.g., .container-fluid and .input-group) cannot be removed without some kind of templating abstraction to append these nodes.
* I would normally separate app.js into separate files for config, controllers, services, etc., but the entire application is only 51 lines of code at the time of me writing this, so that seems like overkill.

## Possible Improvements

* Implement spinners to convey state of API requests (which often take a couple of seconds). Possibly use: https://github.com/ajoslin/angular-promise-tracker
* Navigating through search results should be possible using keyboard keys (arrows and return).
* Add movie posters to search result items.
