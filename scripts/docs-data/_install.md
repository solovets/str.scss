## Install

**[NPM](https://www.npmjs.com/package/str.scss)**

```
npm install str.scss
```

**[Gist](https://gist.github.com/solovets/0021d71ba4871411481fb91f9a086103)**

[Github Gist](https://gist.github.com/solovets/0021d71ba4871411481fb91f9a086103) with all str.scss functions in one file.

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
