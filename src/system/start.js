//

"use strict"

const LABEL = "Spaceship 3000"
const PORT = 3000
const INTERFACE = "127.0.0.1"

import express from "express"
import http from "http"

let e = express()
let h = http.Server(e)

e.use((req, res, next) => {
    res.setHeader("X-Powered-By", LABEL)
    next()
})

e.use(express["static"](__dirname + "/../panel", {
    index: "index.html",
}))

h.listen(PORT, INTERFACE, () => {
    console.log("----------------------------------------")
    console.log("")
    console.log("    Now open http://" + INTERFACE+":"+PORT+"/")
    console.log("")
    console.log("----------------------------------------")
})
