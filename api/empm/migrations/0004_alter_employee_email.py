# Generated by Django 3.2.3 on 2021-07-28 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empm', '0003_auto_20210726_1943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
