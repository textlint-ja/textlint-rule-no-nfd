# textlint-rule-no-nfd

textlint rule that disallow to use NFD like UTF8-MAC 濁点.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-no-nfd

## Usage

Via `.textlintrc`(Recommended)


```json
{
    "rules": {
        "no-nfd": true
    }
}
```

Via CLI

```
textlint --rule no-nfd README.md
```

## Example

゜(`\u309a`)

    NG: ホ゜ケット
      : ホ\u309aケット
    OK: ポケット
    
゛(`\u3099`)

    NG: エンシ゛ン
      : エンシ\u3099ン
    OK: エンジン


## Changelog

See [Releases page](https://github.com/azu/textlint-rule-no-nfd/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Further Reading

- [String.prototype.normalize() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- [walling/unorm: JavaScript Unicode 8.0 Normalization - NFC, NFD, NFKC, NFKD.](https://github.com/walling/unorm)
- [UTF-8にもいろいろある - ザリガニが見ていた...。](http://d.hatena.ne.jp/zariganitosh/20131124/utf8_nfd_nfc_bom)
- [[JavaScript]\uXXXX形式にunicodeエスケープする関数 / LiosK-free Blog](http://liosk.blog103.fc2.com/blog-entry-67.html)
- [unoh.github.com by unoh](http://unoh.github.io/2007/09/04/unicode-on-mac.html)
- [正規化 - odz buffer](http://d.hatena.ne.jp/odz/20070904/1188884960)

## Contributing

Pull requests and stars are always welcome.
For bugs and feature requests, [please create an issue](https://github.com/azu/textlint-rule-no-nfd/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re]http://twitter.com/azu_re)

## License

MIT © azu
