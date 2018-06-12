const express = require('express')
const app = express()
const students = require('./data/students.js')
const cors = require("cors")
app.use(cors())

function getId(students, number) {
    return students.filter(student => {
        if (student.id == number) {
            return student
        } else {
            return null
        }
    })[0]
}

app.get('/', (req, res, next) =>
    res.status(200).json({
        data: students
    }))

app.get('/:id', (req, res) => {
    var record = getId(students, req.params.id)
    if (record) {
        res.status(200).json({
            data: record
        })
    } else {
        res.status(404).json({
            error: {
                message: "No record found!"
            }
        })
    }
})

app.listen(process.env.PORT || 3000)