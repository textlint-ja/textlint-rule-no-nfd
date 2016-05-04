// LICENSE : MIT
"use strict";
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index"
const unorm = require("unorm");
function reporter(context) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper(context);
    return {
        [Syntax.Str](node){
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            matchCaptureGroupAll(text, /([\u309a\u3099])/g).forEach(({index}) => {
                const dakutenChars = text.slice(index - 1, index + 1);
                const expectedText = unorm.nfc(dakutenChars);
                const ruleError = new RuleError(`Disallow to use NFD(well-known as Mac濁点): "${dakutenChars}" => "${expectedText}"`, {
                    index,
                    fix: fixer.replaceTextRange([index - 1, index + 1], expectedText)
                });
                report(node, ruleError);
            });
        }
    }
}
module.exports = {
    linter: reporter,
    fixer: reporter
};