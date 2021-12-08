from django.conf.urls import url 
from django.urls import path
from webapp import views

urlpatterns = [
    # path('admin', admin.site.urls),
    path('webshowcase/', views.webapp_allproject),
    path('webshowcase/counter/',views.count_project),
]