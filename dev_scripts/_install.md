## Install

```
npm install str.scss
```

## Usage


```scss
@import "~node_modules/str.scss/str";

$section-name: 'Hello World';

.#{str-join($section-name)} {
    &__title {
        &::after {
            content: str-to-uppercase($section-name)
        }    
    }
}
```

Compiled to

```css
.HelloWorld__title:after {
    content: "HELLO WORLD";
}
```
