# Generated by Django 3.1.7 on 2021-04-03 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20210403_1627'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='phone_number',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
