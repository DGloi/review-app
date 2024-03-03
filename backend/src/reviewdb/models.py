from django.db import models
from djmoney.models.fields import MoneyField
from djmoney.money import Money
# Create your models here.

class employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    level = models.DecimalField(max_digits=2, decimal_places=0)
    location = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    division = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    currency = MoneyField(max_digits=14, decimal_places=2, default=Money(0, 'USD'))

    SALARY_TIMEBASE_CHOICES = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    salary_timebase = models.CharField(max_length=100, choices=SALARY_TIMEBASE_CHOICES, default='monthly')
    hire_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employee'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class rating(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.DecimalField(max_digits=2, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'rating'
        ordering = ['-created_at']

    def __str__(self):
        return self.rating
    
class increase_suggestion(models.Model):
    id = models.AutoField(primary_key=True)
    id_rating = models.ForeignKey(rating, on_delete=models.CASCADE)
    suggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'increase_suggestion'
        ordering = ['-created_at']

class market_salary(models.Model):
    id = models.AutoField(primary_key=True)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.suggestion