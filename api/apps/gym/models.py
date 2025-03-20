from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.db.models.deletion import CASCADE
class User(AbstractUser):
    pass

class Measurement(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    weight = models.FloatField()
    height = models.FloatField()
    date = models.DateField(default=timezone.now)

    @property
    def bmi(self):
        return round(self.weight / (self.height ** 2), 2)

    def __str__(self):
        return f"{self.user.username} - {self.weight}kg - {self.height}m - {self.date}"
