# Generated by Django 3.1.7 on 2021-04-03 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_patient_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='slotTime',
            field=models.TimeField(null=True),
        ),
    ]
