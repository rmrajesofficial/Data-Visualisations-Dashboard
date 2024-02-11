from django.urls import path
from .views import *

urlpatterns = [
    path('getdata/', GetData.as_view(), name='getdata-list'),
    path('postdata/', PostData.as_view(), name='postdata-create'),
]