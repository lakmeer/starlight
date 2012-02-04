Starlight
=========

Generate a sky-full of scattered, twinkling stars. Uses Canvas.

Demo and build script included.


Stars
-----

Project is presented with a jQuery wrapper, but really doesn't care once it gets started. It is called
on a host element which serves as a backdrop for the stars, and overlays a new canvas with `position:absolute`.


Support
-------

Requires canvas API. So no IE8. Great in IE9 tho.
To build the source, you'll need Node.js. From the root dir, run:
`node build/compile.js build/project.coffee`
and it will auto-compile when coffeescript files are modified.
See `build/project.coffee` for options.


Configuration
-------------

Configuration is made by config object. Here are the available properties with thier default values:

#### height

Height in pixels of starfield. Defaults to dimensions of parent object.


#### width

Same deal.


#### totalStars

How many stars do you want? Add more for larger canvas sizes. Default 1000.


#### twinkleSpeed

How fast an individual twinkle event lasts. Number from 0 to 1. Defaults to 0.02, anything over 0.1 is
usually way too fast to be a compelling effect.


#### twinkleActivity

This one's a bit more intersting. Normally, every frame, the field picks a new random star to begin a
twinkle effect. With lots and lots of stars, this effect becomes so subtle that it gets lost - you can
increase this number to compensate. Think of it as twinkle-events-per-frame. You can also use it to
overdrive the twinkle effect to create sparkley disco madness if you are inclined.


Future
------

Starfield class is pretty ugly, could maybe do with better seperation. Potential for speed
optimisations all over the pace, but performance hasn't been a problem so far, YMMV.
