# Generated by Django 3.1.7 on 2021-04-04 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20210405_0010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='slot',
            field=models.JSONField(),
        ),
    ]
