from django.db import models

from account.models import User
class Topic(models.Model):

    # class tagEnum(models.TextChoices):
    #     DUVIDA = "Duvida" #Essa tag para duvidas
    #     DIVULGACAO_EST = "Divulgação Estudantil" #Essa tag é para divulgação de trabalhos, artigos, entre outros...
    #     DIVULGACAO_OP = "Divulgação de Oportunidade" #Essa tag é para divulgação de Estagios, concursos, entre outros...
        
    tagChoices = [
         "Dúvida",
         "Artigo",
         "Projeto",
         "Oportunidade",
         "Evento"
    ]
    
    couserChoices = [
        "Administração"
        "Biomedicina"
        "Enfermagem"
        "Engenharia Civil"
        "Farmácia"
        "Nutrição"
        "Arquitetura e Urbanimos"
        "Direito"
        "Engenharia Ambiental"
        "Letras"
        "Psicologia"
        "Análise e Desenvolvimento de Sistema"
        "Ciências Contabeis"
        "Engenharia Mecânica"
        "Gastronomia"
        "Pedagogia"
        "Sistemas de Informção"
    ]

    id = models.BigAutoField(primary_key=True)
    id_author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_leaght=120)
    content = models.TextField()
    tag = models.CharField(choices=tagChoices)
    course = models.CharField(couserChoices)
    qt_likes = models.IntegerField()
    qt_comments = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    

class Comments(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_topic = models.ForeignKey(Topic ,on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    qt_likes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
