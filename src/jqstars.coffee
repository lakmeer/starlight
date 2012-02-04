#
# jQuery wrapper for starfield generator
#

$.fn.starlight = (config) ->

    # Extend default options
    totalStars = config?.totalStars ? 1000

    # Create starfields
    starfields = (new StarField $(element), totalStars, config for element in @toArray())

    # Init
    s.start() for s in starfields

    # jQuery chaining
    return @


