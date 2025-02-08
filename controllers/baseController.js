const startController = (req, res) => {
   res.send('Hello World!')
}

const hiController = (req, res) => {
   res.set('Content-Type', 'text/html');
   res.status(200).send("<h1>This is hi route'!</h1>");
}

// module.exports = {startController, hiController}
export { startController, hiController };