from django.urls import path
from .views import listar_produtos, consultar_produto

urlpatterns = [
    path('', listar_produtos, name='listar_produtos'),

    path(
        '<int:id_produto>/',
        consultar_produto,
        name='consultar_produto'
    ),
]