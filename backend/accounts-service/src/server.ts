import app from './app'

const port = parseInt(`${process.env.PORT}`);

app.listen(port, () =>{
    console.log(`Run on port ${port}`);
});
