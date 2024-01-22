import express from 'express';
import router from './routers/url.mjs';
import os from 'os'

const app = express();
console.log(os.cpus().length,'os');
app.use(express.json())

app.use('/url',router)

app.listen(8002,()=>{
    console.log('server running')
})