// LICENSE : MIT
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-no-nfd";
// ruleName, rule, { valid, invalid }
tester.run("no-nfd", rule, {
    valid: [
        "ポケット",
        "エンジン"
    ],
    invalid: [
        {
            text: "ホ\u309aケット",
            output: "ポケット",
            errors: [
                {
                    message: `Disallow to use NFD(well-known as UTF8-MAC 濁点): "ホ\u309a" => "ポ"`,
                    line: 1,
                    column: 2
                }
            ]
        },
        {
            text: "ホ゜ケット",
            output: "ポケット",
            errors: [
                {
                    message: `Disallow to use NFD(well-known as UTF8-MAC 濁点): "ホ\u309c" => "ポ"`,
                    line: 1,
                    column: 2
                }
            ]
        },
        {
            text: "エンシ\u3099ン",
            output:"エンジン",
            errors: [
                {
                    message: `Disallow to use NFD(well-known as UTF8-MAC 濁点): "シ\u3099" => "ジ"`,
                    line: 1,
                    column: 4
                }
            ]
        },

        {
            text: "エンシ゛ン",
            output:"エンジン",
            errors: [
                {
                    message: `Disallow to use NFD(well-known as UTF8-MAC 濁点): "シ\u309b" => "ジ"`,
                    line: 1,
                    column: 4
                }
            ]
        }
    ]
});