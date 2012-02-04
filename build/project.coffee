#
# Project make process specification
#

project =

    # Uses uglify to minify output if true
    minify : false

    # Disable CoffeeScript safety closure
    bare : true

    # Specify directories or files to monitor for file writes
    monitor : [
        "src"
    ]

    # Target file contains resulting compiled code
    target : "starlight.js"

    # List of source files, in concatenation order
    source : [
        "src/star.coffee"
        "src/starfield.coffee"
        "src/jqstars.coffee"
    ]
