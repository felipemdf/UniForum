from django.db import models
from django.db.models import models
from django.utils.translation import ugettext_lazy as _

class user(models.Model):

    class sex(models.TextChoices):
        MASCULINO = "MAS", _("Masculino")
        FEMININO = "FEM", _("Feminino")

    class courses(models.TextChoices):
        ADMINISTRACAO = "ADM", _("Administração")
        BIOMEDICINA = "BIO", _("Biomedicina")
        ENFERMAGEM = "ENF", _("Enfermagem")
        ENGENHARIA_CIVIL = "EGC", _("Engenharia Civil")
        FARMACIA = "FMC", _("Farmácia")
        NUTRICAO = "NUT", _("Nutrição")
        ARQUITETURA_E_URBANISMO = "ARU", _("Arquitetura e Urbanimos")
        DIREITO = "DIR", _("Direito")
        ENGENHARIA_AMBIENTAL = "EGA", _("Engenharia Ambiental")
        LETRAS  = "LET", _("Letras")
        PSICOLOGIA = "PSI", _("Psicologia")
        ADS  = "ADS", _("Análise e Desenvolvimento de Sistema")
        CIENCIAS_CONTABEIS = "CIC", _("Ciências Contabeis")
        ENGENHARIA_MECANICA = "EGM", _("Engenharia Mecânica")
        GASTRONOMIA = "GAS", _("Gastronomia")
        PEDAGOGIA = "PDG", _("Pedagogia")
        SISTEMAS_DE_INFORMACAO = "STI", _("Sistemas de Informção")


    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_leagth=90)
    matriculation = models.CharField(max_leaght=30)
    email = models.CharField(max_leaght=90)
    password = models.CharField(max_leaght=30)
    course = models.CharField(courses, max_leaght=3, choices=courses.choices, default=courses.ADMINISTRACAO,)
    photo = models.ImageField()
    sexo = models.CharField(sex)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
