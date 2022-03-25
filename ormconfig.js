module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mobiakross',
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
