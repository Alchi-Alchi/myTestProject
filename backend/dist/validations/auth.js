"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.registerValidator = exports.validator = void 0;
const express_validator_1 = require("express-validator");
exports.validator = [
    (0, express_validator_1.body)('login', 'Short login. Min 3 symbols').isLength({ min: 3 }),
    (0, express_validator_1.body)('password', 'Short password. Min 5 symbols').isLength({ min: 5 }),
];
exports.registerValidator = [
    (0, express_validator_1.body)('userName', 'Short name. Min 3 symbols').isLength({ min: 3 }),
    (0, express_validator_1.body)('login', 'Short login. Min 3 symbols').isLength({ min: 3 }),
    (0, express_validator_1.body)('password', 'Short password. Min 5 symbols').isLength({ min: 5 }),
];
exports.addUser = [
    (0, express_validator_1.body)('login', 'Short login. Min 3 symbols').isLength({ min: 3 }),
    (0, express_validator_1.body)('password', 'Short password. Min 5 symbols').isLength({ min: 5 }),
    (0, express_validator_1.body)('userName', 'Add name of user').isString(),
];
