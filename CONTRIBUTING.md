# Contributing

## Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-anchornav/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

## Code

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
2. Install all dependencies (`npm i`)
3. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Tips

Following tasks are there to help with development:

- `npm start` (aka `npm run grunt watch:bdd`) listens to tests and source, reruns tests
- `npm test` (aka `npm run grunt qa`) run QA task that includes tests and JSHint
- `npm run grunt build` minify source to dist/
