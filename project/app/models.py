from django.db import models

# Create your models here.

class React(models.Model):
    employee=models.CharField(max_length=30)
    department=models.CharField(max_length=30)

    def __str__(self):
        return self.employee


