module.exports = function(sequelize, DataTypes) {
  var Exercises = sequelize.define("Exercises", {
    id: {
      type: DataTypes.Integer,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    level: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    muscle: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    equipment: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  });
  return Exercises;
};
