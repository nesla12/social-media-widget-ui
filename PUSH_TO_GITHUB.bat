@echo off
echo.
echo ========================================
echo  GitHub Repository Setup
echo ========================================
echo.
echo Schritt 1: Remote hinzufuegen...
git remote add origin https://github.com/nesla12/social-media-widget-ui.git

echo.
echo Schritt 2: Branch zu main umbenennen...
git branch -M main

echo.
echo Schritt 3: Zu GitHub pushen...
git push -u origin main

echo.
echo ========================================
echo  Fertig! Repository ist auf GitHub!
echo ========================================
echo.
echo Naechster Schritt: Vercel mit GitHub verbinden
echo   1. Gehe zu https://vercel.com/dashboard
echo   2. Import Git Repository
echo   3. Waehle: nesla12/social-media-widget-ui
echo   4. Deploy!
echo.
pause
