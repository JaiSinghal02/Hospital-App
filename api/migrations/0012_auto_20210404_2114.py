# Generated by Django 3.1.7 on 2021-04-04 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210404_1547'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='slotTime',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
