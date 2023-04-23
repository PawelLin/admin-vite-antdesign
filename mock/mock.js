import fs from 'fs'
import url from 'url'

var defaults = {
    root: './mock',
    route: '/api',
}

module.exports = function (options) {
    options = Object.assign(defaults, options)

    var route = formatRoute(options.route)
    var root = options.root

    console.info('[mock] inited')

    return function mw(req, res, next) {
        if (!route(req.url)) {
            next()
            return
        }

        console.info('[mock] %s %s', req.method, req.url)

        req.cgiRoot = root

        bodyParser(req, function (err) {
            if (err) {
                error(res, err)
                return
            }

            handler(req, res, function (err, ret) {
                if (err) {
                    error(res, err)
                    return
                }
                res.setHeader('Content-Type', 'application/json')
                res.end(ret)
            })
        })
    }
}

function formatRoute(route) {
    if (typeof route === 'string') {
        return function (url) {
            return url.indexOf(route) === 0
        }
    }

    if (route instanceof RegExp) {
        return function (url) {
            return route.test(url)
        }
    }

    if (route instanceof Function) {
        return route
    }

    throw new Error('[mock] illegal route')
}

function bodyParser(req, next) {
    var chunkArr = [],
        bufLen = 0

    req.on('data', function (chunk) {
        chunkArr.push(chunk)
        bufLen += chunk.length
    })

    req.on('end', function () {
        var input = Buffer.concat(chunkArr, bufLen).toString()

        try {
            req.data = JSON.parse(input)
        } catch (err) {
            req.data = input
        }

        next()
    })
}

function handler(req, res, next) {
    var urlObj = url.parse(req.url, true)

    fs.readFile(req.cgiRoot + '/' + urlObj.pathname + '.js', function (err, file) {
        if (err) {
            err.statusCode = 404
            next(err)
            return
        }

        try {
            var mock = new Function('req', 'res', 'next', file.toString())

            req.query = urlObj.query

            mock(req, res, function (err, ret) {
                next(err, JSON.stringify(ret))
            })
        } catch (err) {
            err.statusCode = 500
            next(err)
        }
    })
}

function error(res, err) {
    console.error('[mock] %s %s', err.code, err.message)

    res.statusCode = err.statusCode || 500
    res.setHeader('Content-Type', 'application/json')

    res.end(
        JSON.stringify({
            code: err.code,
            message: err.message,
        })
    )
}
