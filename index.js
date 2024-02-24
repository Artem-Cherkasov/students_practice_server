require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const fileUpload = require('express-fileupload');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));
app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'REQUEST WORKS'})
});

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('CONNECTION ESTABLISHED')
        // await sequelize.sync({ alter:true });
        await sequelize.sync();
        app.listen(process.env.PORT || PORT, () =>
            console.log(`server started on port ${PORT}`)
        );
    } catch (e) {
        console.log('CONNECTION ERROR')
        console.log(e);
    }
}

start();