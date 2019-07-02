module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'MeetApp',
  define: {
    timestamps: true,
    // user_groups - table
    underscored: true,
    // user_groups - columns
    underscoredAll: true,
  },
};
