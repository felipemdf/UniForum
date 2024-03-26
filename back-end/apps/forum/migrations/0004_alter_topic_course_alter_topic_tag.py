# Generated by Django 5.0.3 on 2024-03-24 17:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("forum", "0003_alter_topic_course_alter_topic_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="topic",
            name="course",
            field=models.IntegerField(
                choices=[
                    (1, "Administração"),
                    (2, "Biomedicina"),
                    (3, "Enfermagem"),
                    (4, "Engenharia Civil"),
                    (5, "Farmácia"),
                    (6, "Nutrição"),
                    (7, "Arquitetura e Urbanismo"),
                    (8, "Direito"),
                    (9, "Engenharia Ambiental"),
                    (10, "Letras"),
                    (11, "Psicologia"),
                    (12, "Análise e Desenvolvimento de Sistema"),
                    (13, "Ciências Contábeis"),
                    (14, "Engenharia Mecânica"),
                    (15, "Gastronomia"),
                    (16, "Pedagogia"),
                    (17, "Sistemas de Informação"),
                ]
            ),
        ),
        migrations.AlterField(
            model_name="topic",
            name="tag",
            field=models.IntegerField(
                choices=[
                    (1, "Dúvida"),
                    (2, "Artigo"),
                    (3, "Projeto"),
                    (4, "Oportunidade"),
                    (5, "Evento"),
                ]
            ),
        ),
    ]