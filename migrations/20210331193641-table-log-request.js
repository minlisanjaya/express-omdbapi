'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('log_request', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    url: 'string',
    parameters: 'string',
    called_at: 'datetime',
  });
};

exports.down = function (db) {
  return db.dropTable('log_request');
};

exports._meta = {
  version: 1,
};
