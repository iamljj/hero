module.exports = app => {
    const expree = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const router = expree.Router({
        mergeParams: true
    })
    const auth = require('../../middleware/auth')

    router.post('/', auth(), async(req, res) => {
        const module = await req.Model.create(req.body)
        res.send(module)
    })

    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    router.get('/', auth(), async(req, res) => {
        let queryOptions = {}
        if (req.Model.modelName === 'Catgory') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions) 
        res.send(items)
    })
    router.get('/:id', async(req, res) => {
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })

    app.use('/admin/api/rest/:resource', auth(), async(req, res, next) => {
            const Modelname = require('inflection').classify(req.params.resource)
            req.Model = require(`../../models/${Modelname}`)
            next()
        },
        router)
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '../../../uploads'
    })
    app.post('/admin/api/upload', upload.single('file'), auth(), async(req, res) => {
            const file = req.file
            file.url = `http://localhost:3000/uploads/${file.filename}`
            res.send(file)
        }),
        app.post('/admin/api/login', async(req, res) => {
            const { username, password } = req.body
                //1.根据用户名找用户

            const user = await AdminUser.findOne({ username }).select('+password')
            if (!user) {
                return res.status(422).send({
                    message: '用户不存在'
                })
            }
            const isvalid = require('bcryptjs').compareSync(password, user.password)
            if (!isvalid) {
                return res.status(422).send({
                    message: '密码错误'
                })
            }

            const token = jwt.sign({
                id: user._id,

            }, app.get('secret'))
            res.send({ token })
        })
}