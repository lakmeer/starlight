class StarField

    constructor : (@host, total, config) ->
        @saveConfig config
        @stars = @generate(
            total,
            @width,
            @height,
            config.minAlpha,
            config.maxAlpha,
            config.starSize,
            config.sizeVariance
        )

    saveConfig : (config) ->
        @width    = config?.width           ? @host.width()
        @height   = config?.height          ? @host.height()
        @speed    = config?.twinkleSpeed    ? 0.02
        @activity = config?.twinkleActivity ? 1



    styles :
        host :
            position : 'relative'
        canvas :
            position : 'absolute'
            top      : '0px'
            left     : '0px'

    newCanvas : ->
        canvas = document.createElement 'canvas'
        canvas.width  = @width
        canvas.height = @height
        return canvas

    newContext : (canvas) ->
        ctx = canvas.getContext '2d'
        ctx.fillStyle = 'white'
        return ctx

    generate : (total, sfx, sfy, minA = 0, maxA = 1, sz = 1, szV = 1) ->

        for i in [0...total]
            p = i / total                                # progress through the loop from 0..1
            a = p * (minA - maxA) + maxA                 # alpha inversly related to y position
            x = Math.floor(Math.random() * sfx)          # random x position
            y = Math.floor(      p       * sfy)          # y position evenly distributed
            s = sz + Math.round(Math.random() * szV)     # size varies by random integer amount
            new Star x, y, a, s, @speed

    draw : (ctx) =>
        ctx.clearRect(0, 0, @width, @height)
        star.draw(ctx) for star in @stars
        @twinkle()
        webkitRequestAnimationFrame(=> @draw(ctx))

    twinkle : ->
        for [0..@activity]
            @stars[Math.floor(Math.random() * @stars.length)].twinkle()

    start : () ->
        canvas  = @newCanvas()
        context = @newContext(canvas)

        @host.css     @styles.host
        $(canvas).css @styles.canvas
        @host.prepend(canvas)

        @draw(context)
