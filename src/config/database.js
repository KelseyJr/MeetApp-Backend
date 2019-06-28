module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'Challange02',
  define: {
    timestamps: true,
    // user_groups - table
    underscored: true,
    // user_groups - columns
    underscoredAll: true,
  },
};
