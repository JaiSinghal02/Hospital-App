# Generated by Django 3.1.7 on 2021-04-02 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210402_1749'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='phone_number',
        ),
    ]
