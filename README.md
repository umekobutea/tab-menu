# tab-menu
タブメニューを表現するweb componentsの要素です。[Imperative Slotting API](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Imperative-Shadow-DOM-Distribution-API.md) を試すために作りました。

## 使いかた

要素を定義します。

```js
import {TabMenuElement, TabPanelElement} from "tab-menu.js";
customElements.define("tab-panel", TabPanelElement);
customElements.define("tab-menu", TabMenuElement);
```
上のようにTabMenuElementをtab-menu、TabPanelElementをtab-panelとしたなら、HTMLは以下のようにします。

```html
<tab-menu show-label="A">
  <tab-panel label="A">A</tab-panel>
  <tab-panel label="B">B</tab-panel>
  <tab-panel label="C">C</tab-panel>
</tab-menu>
```

タブで切り替えるコンテンツはtab-panelで用意して`label`属性で名前を付けておきます。表示するタブはtab-menuに`show-tab`属性で、tab-panelの`label`を指定します。

## デモの起動

[@web/dev-server](https://github.com/modernweb-dev/web) を使ってます。下記のコマンドでサーバを実行します。
すると自動でページがブラウザで開かれます。

```bash
npm run start
```

http://localhost:8000/demo/ でブラウザからアクセスできます。


