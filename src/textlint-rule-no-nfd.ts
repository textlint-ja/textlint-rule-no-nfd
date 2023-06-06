// LICENSE : MIT
"use strict";
import { matchCaptureGroupAll } from "match-index"
import { RuleHelper } from "textlint-rule-helper";
import type { TextlintRuleReporter } from "@textlint/types";

const reporter: TextlintRuleReporter = function (context) {
    const { Syntax, RuleError, report, fixer, getSource, locator } = context;
    const helper = new RuleHelper(context);
    return {
        [Syntax.Str](node) {
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            matchCaptureGroupAll(text, /([\u309b\u309c\u309a\u3099])/g).forEach(({ index }) => {
                if (index === 0) {
                    return;
                }
                // \u309b\u309c => \u309a\u3099
                const dakutenChars = text.slice(index - 1, index + 1);
                const nfdlized = dakutenChars.replace("\u309B", "\u3099").replace("\u309C", "\u309A");
                const expectedText = nfdlized.normalize('NFC');
                const ruleError = new RuleError(`Disallow to use NFD(well-known as UTF8-MAC 濁点): "${dakutenChars}" => "${expectedText}"`, {
                    padding: locator.at(index),
                    fix: fixer.replaceTextRange([index - 1, index + 1], expectedText)
                });
                report(node, ruleError);
            });
        }
    }
};
export default {
    linter: reporter,
    fixer: reporter
};
