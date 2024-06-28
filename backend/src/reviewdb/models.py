from django.db import models
from djmoney.models.fields import MoneyField
from djmoney.money import Money
# Create your models here.

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    level = models.DecimalField(max_digits=2, decimal_places=0)
    location = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    division = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=100, default='SEK')

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

class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.DecimalField(max_digits=2, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'rating'
        ordering = ['-created_at']

    def __str__(self):
        return str(self.rating)
    
class IncreaseSuggestion(models.Model):
    id = models.AutoField(primary_key=True)
    id_rating = models.ForeignKey(Rating, on_delete=models.CASCADE)
    suggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'increase_suggestion'
        ordering = ['-created_at']

class MarketSalary(models.Model):
    id = models.AutoField(primary_key=True)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.suggestion
    
class DatasetList(models.Model):
    id = models.AutoField(primary_key=True)
    dataset_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'dataset_list'
        ordering = ['-created_at']

    def __str__(self):
        return self.dataset_name