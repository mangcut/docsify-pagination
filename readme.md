# docsify-pagination
> Pagination for docsify which supports:
> - Multi-level sidebar items
> - router mode of 'history'

[![npm](https://img.shields.io/npm/v/docsify-pagination.svg?style=flat-square)](https://www.npmjs.com/package/docsify-pagination)
[![license](https://img.shields.io/github/license/imyelo/docsify-pagination.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## How does it look like?
![screenshot](./_medias/screenshot.png)

## Install
1. insert script into document

  ```html
  <script src="//unpkg.com/docsify-m-pagination"></script>
  ```

2. specify the label text (optional)

  ```javascript
  window.$docsify = {
    // ...
    pagination: {
      previousText: 'Bài trước',
      nextText: 'Bài tiếp',
    },
  }
  ```

## Options
### pagination.previousText
* **Default:** ``'PREVIOUS'``
* **Type:** ``String``
* **Description:** The text of previous label.

### pagination.nextText
* **Default:** ``'NEXT'``
* **Type:** ``String``
* **Description:** The text of next label.

## Example
- [example/index.html](example/index.html)
- [Tina.js](https://tina.js.org/)

## Related
- [docsify](https://github.com/QingWei-Li/docsify/)

## License
MIT @ [yelo](https://github.com/imyelo)
