# Generated by Django 4.2.1 on 2024-02-10 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dashboard', '0003_alter_dashboarddata_added_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboarddata',
            name='title',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
