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

