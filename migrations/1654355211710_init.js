/* eslint-disable camelcase */

const { PgLiteral } = require("node-pg-migrate");

exports.shorthands = undefined;

exports.up = pgm => {
    // create extension for uuid
    pgm.createExtension('uuid-ossp', {
        ifNotExists: true,
        schema: 'public'
    });

    // create table Product
    pgm.createTable('product', {
        id: {
            type: 'uuid',
            default: new PgLiteral('uuid_generate_v4()'),
            notNull: true,
            primaryKey: true
        },
        name: {
            type: 'varchar(200)',
            notNull: true,
            unique: true
        },
        price_in_cents: {
            type: 'integer',
            notNull: true
        },
        expiration_date: {
            type: 'date'
        },
        supermarket: {
            type: 'varchar(200)',
            notNull: true
        }
    }, 
    {
        ifNotExists: true
    });

    // create table Shopping List
    pgm.createTable('shopping_list', {
        id: {
            type: 'uuid',
            default: new PgLiteral('uuid_generate_v4()'),
            notNull: true,
            primaryKey: true
        },
        name: {
            type: 'varchar(200)',
            notNull: true
        },
        expiration_date: {
            type: 'date'
        },
        room: {
            type: 'varchar(200)',
            notNull: true
        },
        active: {
            type: 'boolean',
            default: true,
            notNull: true
        }
    }, {
        ifNotExists: true
    });

    pgm.addConstraint('shopping_list', 'unique_name_room', { unique: ['name', 'room'] });

    // create table product_shopping_list
    pgm.createTable('product_shopping_list', {
        product_id: {
            type: 'uuid',
            notNull: true,
            references: 'product'
        },
        shopping_list_id: {
            type: 'uuid',
            notNull: true,
            references: 'shopping_list'
        },
        chosen: {
            type: 'boolean',
            default: false,
            notNull: true
        },
        paid: {
            type: 'boolean',
            default: false,
            notNull: true
        },
        username: {
            type: 'varchar(200)',
            notNull: true
        }
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => {};
