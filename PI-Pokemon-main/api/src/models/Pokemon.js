const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{ 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.STRING,
    },
    defensa: {
      type: DataTypes.STRING,
    },
    altura: {
      type: DataTypes.INTEGER,
    },
    velocidad:{
      type: DataTypes.STRING,
    },
    peso:{
     type: DataTypes.INTEGER,
    },
    fuerza:{
      type: DataTypes.INTEGER
    }
  });
};
