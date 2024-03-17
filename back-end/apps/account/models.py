from django.db import models

class User(models.Model):

    # class sexEnum(models.TextChoices):
    #     MASCULINO = "MAS", _("Masculino")
    #     FEMININO = "FEM", _("Feminino")
        
    sexChoices = [
        "Masculino",
        "Feminino"
    ]

    # class courseEnum(models.TextChoices):
    #     ADMINISTRACAO = "Administração"
    #     BIOMEDICINA = "Biomedicina"
    #     ENFERMAGEM = "Enfermagem"
    #     ENGENHARIA_CIVIL = "Engenharia Civil"
    #     FARMACIA = "Farmácia"
    #     NUTRICAO = "Nutrição"
    #     ARQUITETURA_E_URBANISMO = "Arquitetura e Urbanimos"
    #     DIREITO = "Direito"
    #     ENGENHARIA_AMBIENTAL = "Engenharia Ambiental"
    #     LETRAS  = "Letras"
    #     PSICOLOGIA = "Psicologia"
    #     ADS  = "Análise e Desenvolvimento de Sistema"
    #     CIENCIAS_CONTABEIS = "Ciências Contabeis"
    #     ENGENHARIA_MECANICA = "Engenharia Mecânica"
    #     GASTRONOMIA = "Gastronomia"
    #     PEDAGOGIA = "Pedagogia"
    #     SISTEMAS_DE_INFORMACAO = "Sistemas de Informção"
        
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
    name = models.CharField(max_leagth=90)
    matriculation = models.CharField(max_leaght=30,blank = False)
    email = models.CharField(max_leaght=90, blank = False)
    password = models.CharField(max_leaght=30, blank = False)
    course = models.CharField(choices=couserChoices, blank = False)
    photo = models.ImageField()
    sex = models.CharField(sexChoices)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
