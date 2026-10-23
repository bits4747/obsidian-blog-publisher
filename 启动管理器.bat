@echo off
chcp 65001 >nul
title 博客发布管理器
cd /d "%~dp0"

echo.
echo   博客发布管理器
echo   ----------------------------------------
echo.

rem 检查 node 是否装了, 没装就直说, 不丢一堆报错
where node >nul 2>nul
if errorlevel 1 (
  echo   [错误] 没有找到 Node.js
  echo   请先到 https://nodejs.org 下载安装 LTS 版本, 装完重开这个窗口
  echo.
  pause
  exit /b 1
)

rem 检查依赖是否装过, manager.mjs 要用到 gray-matter 等
if not exist "node_modules" (
  echo   首次运行, 正在安装依赖, 请稍等...
  call npm install
  if errorlevel 1 (
    echo.
    echo   [错误] 依赖安装失败, 请检查网络后重试
    echo.
    pause
    exit /b 1
  )
)

rem 先看 3457 是不是已经被占了 -- 多半是管理器已经在跑
rem 直接启动会报 EADDRINUSE 然后窗口一闪就没, 看着就像"闪退"
netstat -ano | findstr /r /c:"127\.0\.0\.1:3457 .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo   管理器似乎已经在运行了, 直接打开网页
  echo   如果网页打不开, 请先关掉已经开着的管理器窗口再试
  echo.
  start "" http://localhost:3457
  echo   按任意键关闭本窗口, 不会关掉已运行的管理器
  pause >nul
  exit /b 0
)

start "" http://localhost:3457
echo   正在启动管理器, 网页会自动打开
echo   关掉这个窗口就是关掉管理器
echo.
node scripts\manager.mjs

echo.
echo   管理器已退出
pause
