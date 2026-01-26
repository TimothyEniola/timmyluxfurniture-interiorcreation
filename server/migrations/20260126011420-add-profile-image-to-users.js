'use strict';

export async function up(db) {
  return db.runSql(`
    ALTER TABLE users ADD COLUMN profile_image TEXT;
    ALTER TABLE users ADD COLUMN phone VARCHAR(20);
  `);
};

export async function down(db) {
  return db.runSql(`
    ALTER TABLE users DROP COLUMN profile_image;
    ALTER TABLE users DROP COLUMN phone;
  `);
};