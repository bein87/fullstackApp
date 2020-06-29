const performer = (sequelize, DataTypes) => {
  const Performer = sequelize.define('performer', {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: { notEmpty: true },
    },
    category: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
  });

  //associate with the user who created the performer
  Performer.associate = (models) => {
    Performer.belongsTo(models.User, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    });
  };

  return Performer;
};

export default performer;
