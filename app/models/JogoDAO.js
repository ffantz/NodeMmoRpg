function JogoDAO(connection){
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
    this._connection.open(function (err, mongoClient){
        mongoClient.collection("jogo", function(err, collection){
            collection.insert({
                usuario: usuario,
                moeda: 20,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000),
            });
            mongoClient.close();
        })
    })
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
    this._connection.open(function (err, mongoClient){
        mongoClient.collection("jogo", function(err, collection){
            collection.find({ usuario: usuario }).toArray(function(err, result){
                if (result.length > 0) {
                    res.render("jogo", { img: casa, jogo: result[0], msg: msg });
                }
            });
            mongoClient.close();
        })
    })
}

JogoDAO.prototype.acao = function(data){
    this._connection.open(function (err, mongoClient){
        mongoClient.collection("acao", function(err, collection){
            var date = new Date();
            var tempo = null;

            switch(data.acao) {
                case 1:
                    tempo = 1 * 60 * 60000;
                    break;
                case 2:
                    tempo = 2 * 60 * 60000;
                    break;
                case 3:
                    tempo = 5 * 60 * 60000;
                    break;
                case 4:
                    tempo = 5 * 60 * 60000;
                    break;
            }

            data.acao_termina_em = date.getTime() + tempo;
            collection.insert(data);
            mongoClient.close();
        })
    })
}

module.exports = () => {
    return JogoDAO;
};