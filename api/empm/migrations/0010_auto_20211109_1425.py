# Generated by Django 3.2.3 on 2021-11-09 13:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('empm', '0009_rename_company_shift_companyid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shift',
            old_name='companyId',
            new_name='companyID',
        ),
        migrations.RenameField(
            model_name='shift',
            old_name='employees',
            new_name='employeeIDs',
        ),
    ]
