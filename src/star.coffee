class Star

    constructor : (@x, @y, @alpha, @size, @speed, @minBrightness) ->
        @delta          = 0
        @brightness     = @alpha
        @minBrightness  = @alpha * (@minBrightness ? 0.5)

    draw : (ctx) ->
        ctx.globalAlpha = @brightness
        ctx.fillRect(@x, @y, @size, @size)

    twinkle : ->

        if @brightness is @alpha
            @delta = @speed * -1
            @brightness += @delta

        else if @brightness + @delta >= @alpha
            @brightness = @alpha
            @delta = 0
            return

        else if @brightness + @delta <= @minBrightness
            @brightness = @alpha / 2
            @delta = @speed

        else
            @brightness += @delta

        setTimeout (=> @twinkle.apply @), 10

