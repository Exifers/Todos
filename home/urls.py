from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='home/index.html')),
    path('openapi', get_schema_view(
      title="Your Project",
      description="API for all things …",
      version="1.0.0"
    ), name='openapi-schema'),
]
