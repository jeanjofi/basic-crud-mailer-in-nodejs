'use strict';

var Schema = {
    user: {
        id: {type: 'increments', nullable: false, primary: true},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true},
        username: {type: 'string', maxlength: 150, nullable: false, unique: true},
        modifiedby: {type: 'integer', nullable: true},
        modifiedon: {type: 'dateTime', nullable: false},
    },

    role: {
        id: {type: 'increments', nullable: false, primary: true},
        rolename: {type: 'string', maxlength: 150, nullable: false, unique: true}
    }
};

module.exports = Schema;
