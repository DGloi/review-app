from django.contrib import admin
from .models import Employee, Rating, IncreaseSuggestion, MarketSalary, DatasetList
# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    pass
admin.site.register(Employee, EmployeeAdmin)
class RatingAdmin(admin.ModelAdmin):
    pass
admin.site.register(Rating, RatingAdmin)

class IncreaseSuggestionAdmin(admin.ModelAdmin):
    pass
admin.site.register(IncreaseSuggestion, IncreaseSuggestionAdmin)

class market_salaryAdmin(admin.ModelAdmin):
    pass
admin.site.register(MarketSalary, market_salaryAdmin)

class dataset_listAdmin(admin.ModelAdmin):
    pass
admin.site.register(DatasetList, dataset_listAdmin)