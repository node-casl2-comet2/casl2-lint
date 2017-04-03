## casl2-lint

[![Build Status](https://travis-ci.org/node-casl2-comet2/casl2-lint.svg?branch=master)](https://travis-ci.org/node-casl2-comet2/casl2-lint)
[![Coverage Status](https://coveralls.io/repos/github/node-casl2-comet2/casl2-lint/badge.svg?branch=master)](https://coveralls.io/github/node-casl2-comet2/casl2-lint?branch=master)

casl2-lintはCASL2のコード整形を行います。

## Rules

### Hex upper case rule
16進数文字に大文字を使用することを強制します。

```
#000a  |> #000A
=#000a |> =#000A
```

### Indent rule
ラベルや命令コードのインデントを揃えます。

```
CASL         START           |>   CASL      START
          LAD  GR1, 2        |>             LAD     GR1, 2
    LD              GR2, 3   |>             LD      GR2, 3
 RET                         |>             RET
    END                      |>             END
```

### Trailing whitespace rule
行末尾の空白を削除します。

```
CASL      START_____         |>   CASL      START
          RET_               |>             RET
          END___             |>             END
```

### Whitespace rule
オペランド間に適切な間隔をあけます。
```
GR1,1,    GR2   |>   GR1, 1, GR2
```



## Author
[Maxfield Walker](https://github.com/MaxfieldWalker)

## License
MIT
