module.exports.index = (application, req, res) => {
    res.render("index", { data: {} });
}

module.exports.autenticar = (application, req, res) => {
    req.assert('usuario', "O campo usuario não pode ser vazio").notEmpty();
    req.assert('senha', "O campo senha não pode ser vazio").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('index', { validacao: errors, data: req.body });
        return;
    }

    var connection = application.config.database;
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);

    usuarioDAO.autenticar(req.body, req, res);
}