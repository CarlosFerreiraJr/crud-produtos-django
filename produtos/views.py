from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Produto
from .serializers import ProdutoSerializer

@api_view(['GET', 'POST'])
def listar_produtos(request):

    # GET - Consultar todos os produtos
    if request.method == 'GET':

        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)

        return Response(serializer.data)

    # POST - Cadastrar um novo produto
    elif request.method == 'POST':

        serializer = ProdutoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def consultar_produto(request, id_produto):

    produto = get_object_or_404(
        Produto,
        id_produto=id_produto
    )

    # GET - Consultar um produto pelo ID
    if request.method == 'GET':

        serializer = ProdutoSerializer(produto)

        return Response(serializer.data)

    # PUT - Alterar um produto existente
    elif request.method == 'PUT':

        serializer = ProdutoSerializer(
            produto,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=200
            )

        return Response(
            serializer.errors,
            status=400
        )
    
    # DELETE - Excluir um produto existente
    elif request.method == 'DELETE':

        produto.delete()

        return Response(status=204)

    # PATCH - Alterar parcialmente um produto
    elif request.method == 'PATCH':

        serializer = ProdutoSerializer(
            produto,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=200
            )

        return Response(
            serializer.errors,
            status=400
        )    

# Exibir a página inicial do sistema
def pagina_inicial(request):
    return render(request, 'index.html')    