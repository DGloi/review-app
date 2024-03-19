const Util = {
    isArray: function (val) {
        return Object.prototype.toString.call(val) === "[object Array]"
    },
    isNil: function (val) {
        return val === null || Util.typeOf(val)
    },
    typeOf: function (val, type) {
        return (type || "undefined") === typeof val
    },
    funEach: function (obj, fun) {
        if (Util.isNil(obj)) return // empty value

        if (!Util.typeOf(obj, "object")) obj = [obj] // Convert to array

        if (Util.isArray(obj)) {
            // Iterate over array
            for (var i = 0, l = obj.length; i < l; i++)
                fun.call(null, obj[i], i, obj)
        } else {
            // Iterate over object
            for (var key in obj)
                Object.prototype.hasOwnProperty.call(obj, key) &&
                    fun.call(null, obj[key], key, obj)
        }
    },
}

export const uriSerialized = (params) => {
    let pair = []

    const encodeValue = (v) => {
        if (Util.typeOf(v, "object")) v = JSON.stringify(v)

        return encodeURIComponent(v)
    }

    Util.funEach(params, (val, key) => {
        let isNil = Util.isNil(val)

        if (!isNil && Util.isArray(val)) key = `${key}[]`
        else val = [val]

        Util.funEach(val, (v) => {
            pair.push(`${key}=${isNil ? "" : encodeValue(v)}`)
        })
    })

    return pair.join("&")
}