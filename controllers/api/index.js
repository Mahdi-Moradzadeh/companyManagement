const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.json(req.params.id);
});

module.exports = router;