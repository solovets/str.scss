# str.scss

str.scss - set of functions that helps to manipulate strings.

* * * *
Contents:

+ [str-chars](#str-charsinput-string--list) Returns SCSS list with all string characters.
+ [str-char-at](#str-char-atinput-string-index--string) Returns character from input string at provided index
+ [str-split](#str-splitinput-string-separator--list) Returns an array of strings by separating the string into substrings
+ [str-join](#str-joininput-list-separator--string) Returns input list converted to a string
+ [str-to-uppercase](#str-to-uppercaseinput-string--string) Returns the calling string value converted to uppercase
+ [str-to-lowercase](#str-to-lowercaseinput-string--string) Returns the calling string value converted to lowercase
+ [str-to-swapcase](#str-to-swapcaseinput-string--string) Returns a copy of the string in which all the case-based characters have had their case swapped.
+ [str-replace](#str-replaceinput-string-substring-replace-g--string) Returns copy of input string where defined substring replaced by $replace argument
+ [str-bulk-replace](#str-bulk-replaceinput-string-substrings-replace-g--string) Returns copy of input string where defined substrings replaced by $replace argument
+ [str-include](#str-includeinput-string-substring--boolean) Returns boolean result of check if string contains a substring.
+ [str-count](#str-countinput-string-substring--number) Returns number of occurrences of substring in string.
+ [str-first-index](#str-first-indexinput-string-substring--number) Returns first index of substring in provided string
+ [str-last-index](#str-last-indexinput-string-substring--number) Returns last index of substring in provided string
+ [str-capitalize](#str-capitalizeinput-string-lowercase-rest--string) Returns string with capitalized first letter
+ [str-decapitalize](#str-decapitalizeinput-string-lowercase-rest--string) Returns string with decapitalized first letter
+ [str-reverse](#str-reverseinput-string--string) Returns reversed string.
+ [str-trim](#str-triminput-string-trim-chars--string) Returns trimmed string
+ [str-ltrim](#str-ltriminput-string-trim-chars--string) Returns string with removed leading characters.
+ [str-rtrim](#str-rtriminput-string-trim-chars--string) Returns string with removed trailing characters.
+ [str-clean](#str-cleaninput-string--string) Returns trimmed string with multiply spaces replaced with single space
+ [str-is-blank](#str-is-blankinput-string--boolean) Returns true if string is empty or contains whitespaces only
+ [str-starts-with](#str-starts-withinput-string-substring-ignore-case--boolean) Returns true if string starts with provided substring
+ [str-ends-with](#str-ends-withinput-string-substring-ignore-case--boolean) Returns true if string ends with provided substring
+ [str-repeat](#str-repeatinput-string-times-separator--string) Returns input string repeated provided number of times

* * * *

## Install

```
npm install str.scss
```

## Usage


```scss
@import "~node_modules/str.scss/str";

$section-name: 'Hello World';

.#{str-to-lowercase(str-replace($section-name, ' ', '-'))} {
    &__title {
        &::after {
            content: str-to-uppercase($section-name)
        }    
    }
}
```

Compiled to

```css
.hello-world__title:after {
    content: "HELLO WORLD";
}
```

## Global settings

## $str-scss-strong-type-check: boolean

_Dafault_: `false`  
_Required_: `false`

Use `$str-scss-strong-type-check: true;` to crash compilation each time when any `str.scss` function is provided with argument with wrong type.



* * * *

## str-chars($input-string) => list

Returns SCSS list with all string characters.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `list`

**Example**

```scss
@debug str-chars('Hello world');
// => ("H" "e" "l" "l" "o" " " "w" "o" "r" "l" "d")
```

## str-char-at($input-string, $index) => string

Returns character from input string at provided index

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| index | number | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-char-at('Hello World', 2);
// => "e"
@debug str-char-at('Hello World', -4);
// => "o"
```

## str-split($input-string[, $separator]) => list

Returns an array of strings by separating the string into substrings

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input | string | `+` | `-` |

**return** `list`

**Example**

```scss
@debug str-split('Hello World');
// => ("Hello" "World")
@debug str-split('Hello World, Hello World', ', ');
// => ("Hello World" "Hello World")
```

## str-join($input-list[, $separator]) => string

Returns input list converted to a string

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-list | list | `+` | `-` |
| separator | string | `-` | '' |

**return** `string`

**Example**

```scss
@debug str-join((1, '. ', 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'));
// => "1. Hello World"
@debug str-join(('a', 'b', 'c'), '*');
// => "a*b*c"
```

## str-to-uppercase($input-string) => string

Returns the calling string value converted to uppercase

_Alias for to-upper-case String SASS built-in function_

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-to-uppercase('hello world');
// => "HELLO WORLD"
```

## str-to-lowercase($input-string) => string

Returns the calling string value converted to lowercase

_Alias for to-lower-case String SASS built-in function_

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-to-lowercase('Hello World');
// => "hello world"
```

## str-to-swapcase($input-string) => string

Returns a copy of the string in which all the case-based characters have had their case swapped.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-to-swapcase('hELLO wORLD');
// => "Hello World"
```

## str-replace($input-string, $substring[, $replace, $g]) => string

Returns copy of input string where defined substring replaced by $replace argument

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |
| replace | string | `-` | '' |
| g | boolean | `-` | true |

**return** `string`

**Example**

```scss
@debug str-replace('Hello world', 'l');
// => "Heo word"
@debug str-replace('Hello world', 'l', $g: false);
// => "Helo world"
@debug str-replace('Hello world', 'Hello', 'Privet');
// => "Privet world"
```

## str-bulk-replace($input-string, $substrings[, $replace, $g]) => string

Returns copy of input string where defined substrings replaced by $replace argument

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substrings | list | `+` | `-` |
| replace | string | `-` | '' |
| g | boolean | `-` | true |

**return** `string`

**Example**

```scss
@debug str-bulk-replace('Hello world', ('l', 'o'), '*');
// => "He*** w*r*d"
@debug str-bulk-replace('Hello world', ('l', 'o'), $g: false);
// => "Hel world"
@debug str-bulk-replace('Hello To The world', ('Hello', 'To The'), 'Privet');
// => "Privet Privet world"
```

## str-include($input-string, $substring) => boolean

Returns boolean result of check if string contains a substring.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |

**return** `boolean`

**Example**

```scss
@debug str-include('Hello World', 'lo');
// => true
```

## str-count($input-string, $substring) => number

Returns number of occurrences of substring in string.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |

**return** `number`

**Example**

```scss
@debug str-count('Hello World', 'z');
// => 0
@debug str-count('Hello World', 'l');
// => 3
@debug str-count('Hello World Hello World Hello World', 'ello');
// => 3
```

## str-first-index($input-string, $substring) => number

Returns first index of substring in provided string

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |

**return** `number`

**Example**

```scss
@debug str-first-index('Hello World', 'l');
// => 3
@debug str-first-index('Hello World', 'z');
// => null
```

## str-last-index($input-string, $substring) => number

Returns last index of substring in provided string

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |

**return** `number`

**Example**

```scss
@debug str-last-index('Hello World', 'l');
// => 10
@debug str-last-index('Hello World', 'z');
// => null
```

## str-capitalize($input-string[, $lowercase-rest]) => string

Returns string with capitalized first letter

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| lowercase-rest | boolean | `-` | false |

**return** `string`

**Example**

```scss
@debug str-capitalize('hello wold');
// => "Hello wold"
@debug str-capitalize('hELLO wold');
// => "HELLO wold"
@debug str-capitalize('hELLO wold', true);
// => "Hello wold"
```

## str-decapitalize($input-string[, $lowercase-rest]) => string

Returns string with decapitalized first letter

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| lowercase-rest | boolean | `-` | false |

**return** `string`

**Example**

```scss
@debug str-decapitalize('Hello World');
// => "hello World"
@debug str-decapitalize('HELLO WORLD');
// => "hELLO WORLD"
@debug str-decapitalize('HELLO world', true);
// => "hello world"
```

## str-reverse($input-string) => string

Returns reversed string.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-reverse('Hello World');
// => "dlroW olleH"
```

## str-trim($input-string[, $trim-chars]) => string

Returns trimmed string

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| trim-chars | string | `-` | ' ' |

**return** `string`

**Example**

```scss
@debug str-trim(' Hello World ');
// => "Hello World"
@debug str-trim(' -_ Helllo World _- ', '- _');
// => "Hello World"
```

## str-ltrim($input-string[, $trim-chars]) => string

Returns string with removed leading characters.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| trim-chars | string | `-` | ' ' |

**return** `string`

**Example**

```scss
@debug str-ltrim(' Hello World ');
// => "Hello World "
@debug str-ltrim(' -_ Helllo World _- ', '- _');
// => "Helllo World _- "
```

## str-rtrim($input-string[, $trim-chars]) => string

Returns string with removed trailing characters.

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| trim-chars | string | `-` | ' ' |

**return** `string`

**Example**

```scss
@debug str-rtrim(' Hello World ');
// => " Hello World"
@debug str-rtrim(' -_ Helllo World _- ', '- _');
// => " -_ Helllo World"
```

## str-clean($input-string) => string

Returns trimmed string with multiply spaces replaced with single space

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `string`

**Example**

```scss
@debug str-clean('Hello  World');
// => "Hello World"
@debug str-clean('  Hello  World   ');
// => "Hello World"
```

## str-is-blank($input-string) => boolean

Returns true if string is empty or contains whitespaces only

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |

**return** `boolean`

**Example**

```scss
@debug str-is-blank('');
// => true
@debug str-is-blank(' ');
// => true
@debug str-is-blank('Hello World');
// => false
```

## str-starts-with($input-string, $substring[, $ignore-case]) => boolean

Returns true if string starts with provided substring

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |
| ignore-case | boolean | `+` | `-` |

**return** `boolean`

**Example**

```scss
@debug str-starts-with('Hello World', 'Hel');
// => true
@debug str-starts-with('Hello World', 'hel');
// => false
@debug str-starts-with('Hello World', 'hel', true);
// => true
```

## str-ends-with($input-string, $substring[, $ignore-case]) => boolean

Returns true if string ends with provided substring

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| substring | string | `+` | `-` |
| ignore-case | boolean | `-` | false |

**return** `boolean`

**Example**

```scss
@debug str-starts-with('Hello World', 'Hel');
// => true
@debug str-starts-with('Hello World', 'hel');
// => false
@debug str-starts-with('Hello World', 'hel', true);
// => true
```

## str-repeat($input-string[, $times, $separator]) => string

Returns input string repeated provided number of times

| Argument        | Type     | Required | Default |
| --------------- | -------- | -------- | ------- |
| input-string | string | `+` | `-` |
| times | number | `-` | 1 |
| separate-with | string | `-` | '' |

**return** `string`

**Example**

```scss
@debug str-repeat('Hello');
// => "Hello"
@debug str-repeat('Hello', 2);
// => "HelloHello"
@debug str-repeat('Hello', 2, ', ');
// => "Hello, Hello"
```

