from django.conf.urls import url 
from django.urls import path
from webapp import views

urlpatterns = [
    # path('admin', admin.site.urls),
    path('webshowcase/',views.project_pages),
    path('webshowcase/search/', views.webapp_allproject),
]