# Generated by Django 3.2.10 on 2021-12-27 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empm', '0012_auto_20211227_1113'),
    ]

    operations = [
        migrations.CreateModel(
            name='OverallMonthlyOutput',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('housing_capacity', models.IntegerField()),
                ('working_hours', models.DecimalField(decimal_places=1, max_digits=4)),
                ('sick_hours', models.DecimalField(decimal_places=1, max_digits=4)),
                ('vacation_hours', models.DecimalField(decimal_places=1, max_digits=4)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
    ]