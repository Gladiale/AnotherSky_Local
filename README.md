## ローカル環境で構築する方法

- 簡単に流れを説明
1. 自分のパソコンにNodejsをインストール

2. @install.batを実行して必要なパッケージをダウンロード

3. _start.batを実行してプログラムを作動テスト(ctrl + cでサーバー終了)

4. 成功したらpublicフォルダの下で自分の欲しいメディアファイルを配置

5. _init.extを実行してメディア情報を初期化

6. _start.batを実行してプログラムを作動(ctrl + cでサーバー終了)

***
#### public フォルダ中身の説明
![配置説明](./README/ファイル構造.png)

***
#### _init.exe（メディア情報初期化）成功の場合
![配置説明](./README/初期化.png)

***
#### _start.bat（プログラムを作動）成功の場合
![配置説明](./README/作動成功.png)

***
### 追記
自分の作動環境: Windows + Google Chrome

もしご自身のパソコンが以下のように画面拡大倍率が設置された場合、
![DPI](./README/DPI.png)

ブラウザ内部の解像度は下げてしまいますので、実際レンダリングされた画像の画質も下げます、以下のコードをブラウザのショートカットに追加すれば問題が解決できます。(コード先頭の半角スペースの空白も必要です、ご注意)
```
 --force-device-scale-factor=1
```
![Chrome](./README/Chrome.png)

***
> [アプリ操作方法参照](https://github.com/Gladiale/AnotherSky_Web)

