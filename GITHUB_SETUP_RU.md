# 🚀 Как загрузить Anongram на GitHub

## Шаг 1: Установите Git

### Вариант A: Через winget (автоматически)
```powershell
winget install --id Git.Git -e --source winget
```
После установки **перезапустите PowerShell** и продолжайте.

### Вариант B: Вручную
1. Скачайте Git с https://git-scm.com/download/win
2. Запустите установщик
3. Нажмите "Next" → "Next" → ... → "Finish"
4. **Перезапустите PowerShell**

## Шаг 2: Проверьте установку Git

```powershell
git --version
```

Должно вывести что-то вроде: `git version 2.53.0.windows.2`

## Шаг 3: Настройте Git (один раз)

```powershell
git config --global user.name "Ваше Имя"
git config --global user.email "your-email@example.com"
```

Пример:
```powershell
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

## Шаг 4: Создайте репозиторий на GitHub

1. Зайдите на https://github.com
2. Войдите в свой аккаунт
3. Нажмите кнопку **"+"** (справа сверху) → **"New repository"**
4. Заполните:
   - **Repository name**: `anongram` (или другое имя)
   - **Description**: "Secure anonymous messenger with seed phrase authentication"
   - **Public** или **Private** (на ваш выбор)
   - ❌ НЕ ставьте галочку "Initialize this repository with a README"
5. Нажмите **"Create repository"**

## Шаг 5: Инициализируйте Git локально

В PowerShell в папке проекта:

```powershell
cd C:\Users\user\Desktop\messengerweb
git init
```

## Шаг 6: Добавьте все файлы в Git

```powershell
git add .
```

## Шаг 7: Сделайте первый коммит

```powershell
git commit -m "Initial commit: Anongram messenger with seed phrase authentication"
```

## Шаг 8: Подключите удаленный репозиторий GitHub

На странице вашего нового репозитория на GitHub скопируйте URL.

Затем выполните (замените YOUR_USERNAME на ваш логин GitHub):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/anongram.git
```

Пример:
```powershell
git remote add origin https://github.com/johndoe/anongram.git
```

## Шаг 9: Отправьте файлы на GitHub

```powershell
git branch -M main
git push -u origin main
```

## ✅ Готово!

Теперь ваш проект загружен на GitHub!

Проверьте страницу репозитория на GitHub - вы должны увидеть все файлы.

---

## 🔁 Если нужно обновить файлы после изменений

После любых изменений в проекте:

```powershell
git add .
git commit -m "Описание изменений"
git push
```

---

## 📝 Быстрая шпаргалка команд

```powershell
# Проверить статус файлов
git status

# Посмотреть изменения
git diff

# Добавить все файлы
git add .

# Сделать коммит
git commit -m "Описание"

# Отправить на GitHub
git push

# Получить обновления с GitHub
git pull
```

---

## ⚠️ Возможные проблемы и решения

### Проблема: Git не найден после установки
**Решение**: Полностью закройте PowerShell и откройте заново

### Проблема: Ошибка при push
**Решение**: 
```powershell
git push -u origin main --force
```

### Проблема: Конфликты при пуше
**Решение**:
```powershell
git pull --rebase
git push
```

### Проблема: Нужно сменить ветку на 'master' вместо 'main'
```powershell
git branch -M master
git push -u origin master
```

---

## 🎯 Альтернатива: GitHub Desktop (для новичков)

Если команды PowerShell сложны:

1. Скачайте GitHub Desktop: https://desktop.github.com/
2. Установите и войдите в аккаунт GitHub
3. Нажмите **File** → **Add Local Repository**
4. Выберите папку `C:\Users\user\Desktop\messengerweb`
5. Нажмите **"Commit to main"**
6. Нажмите **"Publish repository"**

---

## 📦 Что будет загружено:

✅ app.py - Flask приложение  
✅ templates/ - HTML шаблоны  
✅ static/ - CSS и JavaScript  
✅ requirements.txt - Зависимости  
✅ Procfile - Для деплоя  
✅ runtime.txt - Версия Python  
✅ .gitignore - Исключения  
✅ Документация (README, DEPLOYMENT_GUIDE, etc.)  

❌ anongram.db - База данных (в .gitignore)  
❌ __pycache__/ - Скомпилированные файлы Python  
❌ .env - Переменные окружения  

---

**Удачи с загрузкой на GitHub! 🚀**
