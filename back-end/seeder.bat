@echo off

echo Carregando fixtures do usuário...
python manage.py loaddata apps\account\fixtures\user_fixture.json

echo Carregando fixtures dos tópicos...
python manage.py loaddata apps\forum\fixtures\topic_fixture.json

echo Carregando fixtures dos comentários...
python manage.py loaddata apps\forum\fixtures\comment_fixture.json

echo Carregando fixtures dos likes de tópicos...
python manage.py loaddata apps\forum\fixtures\like_topic_fixture.json

echo Carregando fixtures dos likes de comentários...
python manage.py loaddata apps\forum\fixtures\like_comment_fixture.json

echo Fixtures carregadas com sucesso!
pause
