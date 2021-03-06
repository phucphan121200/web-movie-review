const mongoose = require("mongoose");

const ProductionSchema = new mongoose.Schema({
        name: { type: String},
        founder: {type: String},
        foundingdate: {type: Date},
        status: {type: Boolean, default: true}
    },
    {
      timestamps: true
    }
);

const production = mongoose.model("Production", ProductionSchema);

module.exports = {production, ProductionSchema};