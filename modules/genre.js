const mongoose=require("mongoose");
const Joi=require("joi");

const genreschema=mongoose.Schema({
    name:String
});

const Genre=mongoose.model("Genre",genreschema);

function validategenre(genre)
{
    const schema=Joi.object({
      name:Joi.string().required()
    });
    return schema.validate({name:genre.name});
}

module.exports.Genre=Genre;
module.exports.validategenre=validategenre;
module.exports.genreschema=genreschema;