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

**Example**

```scss
$str-scss-strong-type-check: false;

@debug str-capitalize('hello wold');
// => Hello wold
@debug str-capitalize(123);
// => 123
```

```scss
$str-scss-strong-type-check: true;

@debug str-capitalize('hello wold');
// => Hello wold
@debug str-capitalize(123);
// => Error: "[str.scss] [str-capitalize] `123` must be of type `string`, got `number`."
```
