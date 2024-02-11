# Generated by Django 4.2.1 on 2024-02-10 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dashboard', '0002_alter_dashboarddata_added_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboarddata',
            name='added',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='country',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='end_year',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='impact',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='insight',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='intensity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='likelihood',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='pestle',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='published',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='region',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='relevance',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='sector',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='source',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='start_year',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='topic',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
