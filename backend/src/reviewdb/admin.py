from django.contrib import admin
from .models import employee, rating, increase_suggestion, market_salary
# Register your models here.

class employeeAdmin(admin.ModelAdmin):
    pass
admin.site.register(employee, employeeAdmin)
class ratingAdmin(admin.ModelAdmin):
    pass
admin.site.register(rating, ratingAdmin)

class increase_suggestionAdmin(admin.ModelAdmin):
    pass
admin.site.register(increase_suggestion, increase_suggestionAdmin)

class market_salaryAdmin(admin.ModelAdmin):
    pass
admin.site.register(market_salary, market_salaryAdmin)
