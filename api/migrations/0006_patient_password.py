# Generated by Django 3.1.7 on 2021-04-02 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_patient_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='password',
            field=models.CharField(default='passwordqwert', max_length=50),
        ),
    ]
