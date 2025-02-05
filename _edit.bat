@echo off
chcp 65001

echo vscodeをOpen
start code .

echo vscodeが起動するのを待機中...
timeout /t 3 /nobreak >nul

echo バッチファイルを終了
exit /b