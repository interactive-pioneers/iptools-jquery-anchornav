# iptools-jquery-anchornav [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-anchornav.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-anchornav) [![Bower version](https://badge.fury.io/bo/iptools-jquery-anchornav.svg)](http://badge.fury.io/bo/iptools-jquery-anchornav)

jQuery anchor navigation.

## Features

- Shows or hides the navigation bar depending on the scroll position.
- Scrolls smoothly to the targets when the anchor has been clicked.

## Requirements

- jQuery 1.11.3 or greater

## Example

```html
<div>
  <header class='header'>
    ...
  </header>
  <nav class='anchor__nav anchor__nav--dark'>
    <ul class='anchor__nav__list'><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#a'>Übersicht</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#b'>Auswahl</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#c'>Top-Produkte</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#d'>Accessoires &amp; Ersatzteile</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#e'>Kontakt</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#f'>Magalog</a>
      </li><li class='anchor__nav__list__item'>
        <a class='anchor__nav__list__item__link' href='#g'>Tools</a>
      </li>
    </ul>
    <a class='anchor__nav__top' href='#'>Back to Top</a>
  </nav>

  <section id="a" style="height: 750px; background: rgba(0,0,0,.1);"></section>
  <section id="b" style="height: 750px; background: rgba(0,0,0,.2);"></section>
  <section id="c" style="height: 750px; background: rgba(0,0,0,.3);"></section>
  <section id="d" style="height: 750px; background: rgba(0,0,0,.4);"></section>
  <section id="e" style="height: 750px; background: rgba(0,0,0,.5);"></section>
  <section id="f" style="height: 750px; background: rgba(0,0,0,.6);"></section>
  <section id="g" style="height: 750px; background: rgba(0,0,0,.7);"></section>

</div>

<script src="scripts/iptools-jquery-anchornav.js"></script>
<script type="text/javascript">
   $(document).ready(function() {
      $(".anchor__nav").iptAnchorNavigation({
        animEasing: 'swing',
        animDuration: 600,
        gapY: 60,
        showHideNavAt: 200
      });
   });
</script>
```

## Options

1. animEasing - time function of the animation
2. animDuration - animation duration
3. gapY - the distance in pixels from the top of the browser window
4. showHideNavAt - the switching point in pixels from the top of the browser window when the navigation is shown or hidden. If no setting is provided the header height is assigned as a value.

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH, contributors. Licenced under [GPL-3](LICENSE).
